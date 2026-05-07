import mongoose from "mongoose";
import { imageSchema } from "./shared.js";

const serviceItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    panelColor: { type: String, required: true, trim: true },
    image: { type: imageSchema, required: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const ServiceItem = mongoose.model("ServiceItem", serviceItemSchema);
