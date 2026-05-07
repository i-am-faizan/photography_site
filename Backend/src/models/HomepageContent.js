import mongoose from "mongoose";
import { imageSchema, navLinkSchema, socialLinkSchema } from "./shared.js";

const featuredGalleryCardTitleSchema = new mongoose.Schema(
  {
    image: { type: imageSchema, required: true },
    title: { type: String, default: "", trim: true }
  },
  { _id: false }
);

const featuredGalleryStatSchema = new mongoose.Schema(
  {
    image: { type: imageSchema, required: true },
    stat: { type: String, default: "", trim: true },
    text: { type: String, default: "", trim: true }
  },
  { _id: false }
);

const featuredGalleryFamilySchema = new mongoose.Schema(
  {
    image: { type: imageSchema, required: true },
    accentTitle: { type: String, default: "", trim: true },
    lineOne: { type: String, default: "", trim: true },
    lineTwo: { type: String, default: "", trim: true },
    lineThree: { type: String, default: "", trim: true }
  },
  { _id: false }
);

const homepageContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: "homepage", unique: true },
    siteSettings: {
      brandName: { type: String, required: true, trim: true },
      navLinks: { type: [navLinkSchema], default: [] },
      socialLinks: { type: [socialLinkSchema], default: [] },
      seo: {
        title: { type: String, default: "", trim: true },
        description: { type: String, default: "", trim: true }
      }
    },
    hero: {
      heading: { type: String, required: true, trim: true },
      subheading: { type: String, default: "", trim: true },
      images: { type: [imageSchema], default: [] }
    },
    featuredGallery: {
      title: { type: String, required: true, trim: true },
      ctaLabel: { type: String, required: true, trim: true },
      ctaHref: { type: String, required: true, trim: true },
      cards: {
        lead: { type: featuredGalleryCardTitleSchema, required: true },
        stat: { type: featuredGalleryStatSchema, required: true },
        wide: { type: featuredGalleryCardTitleSchema, required: true },
        cta: {
          image: { type: imageSchema, required: true }
        },
        tall: { type: featuredGalleryCardTitleSchema, required: true },
        short: { type: featuredGalleryCardTitleSchema, required: true },
        family: { type: featuredGalleryFamilySchema, required: true }
      }
    },
    story: {
      eyebrow: { type: String, default: "", trim: true },
      title: { type: String, required: true, trim: true },
      paragraphs: { type: [String], default: [] },
      image: { type: imageSchema, required: true }
    },
    portfolioSection: {
      title: { type: String, required: true, trim: true },
      intro: { type: String, default: "", trim: true },
      loadMoreLabel: { type: String, required: true, trim: true },
      initialVisibleCount: { type: Number, default: 8 },
      loadMoreStep: { type: Number, default: 8 },
      filters: {
        type: [
          new mongoose.Schema(
            {
              value: { type: String, required: true, trim: true },
              label: { type: String, required: true, trim: true },
              sortOrder: { type: Number, default: 0 }
            },
            { _id: false }
          )
        ],
        default: []
      }
    },
    servicesSection: {
      subtitle: { type: String, default: "", trim: true },
      title: { type: String, required: true, trim: true }
    },
    speciality: {
      title: { type: String, required: true, trim: true },
      description: { type: String, default: "", trim: true },
      bullets: { type: [String], default: [] },
      image: { type: imageSchema, required: true }
    },
    contact: {
      subtitle: { type: String, default: "", trim: true },
      title: { type: String, required: true, trim: true },
      body: { type: String, default: "", trim: true },
      submitLabel: { type: String, required: true, trim: true },
      successMessage: { type: String, required: true, trim: true },
      details: {
        type: [
          new mongoose.Schema(
            {
              label: { type: String, required: true, trim: true },
              value: { type: String, required: true, trim: true },
              href: { type: String, default: "", trim: true }
            },
            { _id: false }
          )
        ],
        default: []
      }
    },
    footer: {
      logoText: { type: String, required: true, trim: true },
      copyrightText: { type: String, required: true, trim: true }
    }
  },
  { timestamps: true }
);

export const HomepageContent = mongoose.model("HomepageContent", homepageContentSchema);
