import { defaultHomepageContent } from "./defaultContent.js";
import { HomepageContent } from "../models/HomepageContent.js";

export const singletonSectionKeys = [
  "siteSettings",
  "hero",
  "featuredGallery",
  "story",
  "portfolioSection",
  "servicesSection",
  "speciality",
  "contact",
  "footer"
];

export const getHomepageContent = async () => {
  let content = await HomepageContent.findOne({ key: "homepage" });

  if (!content) {
    content = new HomepageContent({
      key: "homepage",
      ...defaultHomepageContent
    });
    await content.save();
  }

  return content;
};

export const validateSectionKey = (sectionKey) => singletonSectionKeys.includes(sectionKey);
