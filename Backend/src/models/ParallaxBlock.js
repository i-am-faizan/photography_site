import mongoose from "mongoose";
import { imageSchema } from "./shared.js";

const parallaxBlockSchema = new mongoose.Schema(
  {
    image: { type: imageSchema, required: true },
    subtitle: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    variant: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const ParallaxBlock = mongoose.model("ParallaxBlock", parallaxBlockSchema);
