import mongoose from "mongoose";
import { imageSchema } from "./shared.js";

const portfolioItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["wedding", "party", "birthday", "baby", "pre-wedding", "commercial"],
      required: true
    },
    image: { type: imageSchema, required: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const PortfolioItem = mongoose.model("PortfolioItem", portfolioItemSchema);
