const normalizeDoc = (doc) => {
  if (!doc) {
    return null;
  }

  return typeof doc.toObject === "function" ? doc.toObject() : doc;
};

export const buildHomepageResponse = ({
  content,
  portfolioItems,
  serviceItems,
  parallaxBlocks,
  includeUnpublished = false
}) => {
  const normalizedContent = normalizeDoc(content);
  const normalizedPortfolio = portfolioItems
    .map(normalizeDoc)
    .filter((item) => includeUnpublished || item.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const normalizedServices = serviceItems
    .map(normalizeDoc)
    .filter((item) => includeUnpublished || item.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const normalizedParallax = parallaxBlocks
    .map(normalizeDoc)
    .filter((item) => includeUnpublished || item.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    siteSettings: normalizedContent.siteSettings,
    hero: normalizedContent.hero,
    featuredGallery: normalizedContent.featuredGallery,
    story: normalizedContent.story,
    portfolioSection: normalizedContent.portfolioSection,
    portfolioItems: normalizedPortfolio,
    servicesSection: normalizedContent.servicesSection,
    serviceItems: normalizedServices,
    speciality: normalizedContent.speciality,
    parallaxBlocks: normalizedParallax,
    contact: normalizedContent.contact,
    footer: normalizedContent.footer
  };
};
