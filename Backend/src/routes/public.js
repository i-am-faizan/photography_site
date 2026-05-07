import express from "express";
import { buildHomepageResponse } from "../lib/homepageSerializer.js";
import { getHomepageContent } from "../lib/contentService.js";
import { PortfolioItem } from "../models/PortfolioItem.js";
import { ServiceItem } from "../models/ServiceItem.js";
import { ParallaxBlock } from "../models/ParallaxBlock.js";

const router = express.Router();

router.get("/homepage", async (_req, res, next) => {
  try {
    const [content, portfolioItems, serviceItems, parallaxBlocks] = await Promise.all([
      getHomepageContent(),
      PortfolioItem.find().sort({ sortOrder: 1 }),
      ServiceItem.find().sort({ sortOrder: 1 }),
      ParallaxBlock.find().sort({ sortOrder: 1 })
    ]);

    res.json(
      buildHomepageResponse({
        content,
        portfolioItems,
        serviceItems,
        parallaxBlocks,
        includeUnpublished: false
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get("/portfolio", async (_req, res, next) => {
  try {
    const items = await PortfolioItem.find({ published: true }).sort({ sortOrder: 1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
