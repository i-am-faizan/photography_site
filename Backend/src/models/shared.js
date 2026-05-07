import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, default: "", trim: true },
    alt: { type: String, default: "", trim: true },
    width: { type: Number, default: null },
    height: { type: Number, default: null }
  },
  { _id: false }
);

export const navLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 }
  },
  { _id: false }
);

export const socialLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true }
  },
  { _id: false }
);
