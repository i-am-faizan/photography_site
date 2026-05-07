import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { HomepageContent } from "./src/models/HomepageContent.js";
import { PortfolioItem } from "./src/models/PortfolioItem.js";
import { ServiceItem } from "./src/models/ServiceItem.js";
import { ParallaxBlock } from "./src/models/ParallaxBlock.js";
import { AdminUser } from "./src/models/AdminUser.js";
import {
  defaultHomepageContent,
  defaultParallaxBlocks,
  defaultPortfolioItems,
  defaultServiceItems
} from "./src/lib/defaultContent.js";

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "ChangeMe123!", 10);

  await AdminUser.findOneAndUpdate(
    { email: (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase() },
    { email: (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase(), passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await HomepageContent.findOneAndUpdate(
    { key: "homepage" },
    { key: "homepage", ...defaultHomepageContent },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await PortfolioItem.deleteMany({});
  await ServiceItem.deleteMany({});
  await ParallaxBlock.deleteMany({});

  await PortfolioItem.insertMany(defaultPortfolioItems);
  await ServiceItem.insertMany(defaultServiceItems);
  await ParallaxBlock.insertMany(defaultParallaxBlocks);

  console.log("Seed complete.");
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error("Seed failed", error);
  await mongoose.disconnect();
  process.exit(1);
});
