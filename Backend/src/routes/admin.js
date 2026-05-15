import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { requireAdminAuth } from "../middleware/auth.js";
import { AdminUser } from "../models/AdminUser.js";
import { getHomepageContent, validateSectionKey } from "../lib/contentService.js";
import { buildHomepageResponse } from "../lib/homepageSerializer.js";
import { PortfolioItem } from "../models/PortfolioItem.js";
import { ServiceItem } from "../models/ServiceItem.js";
import { ParallaxBlock } from "../models/ParallaxBlock.js";
import { uploadImageBuffer, deleteCloudinaryAsset } from "../lib/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 1000 * 60 * 60 * 24 * 7
};

const signToken = (admin) =>
  jwt.sign({ id: admin._id.toString(), email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

const getHomepagePayload = async (includeUnpublished = true) => {
  const [content, portfolioItems, serviceItems, parallaxBlocks] = await Promise.all([
    getHomepageContent(),
    PortfolioItem.find().sort({ sortOrder: 1 }),
    ServiceItem.find().sort({ sortOrder: 1 }),
    ParallaxBlock.find().sort({ sortOrder: 1 })
  ]);

  return buildHomepageResponse({
    content,
    portfolioItems,
    serviceItems,
    parallaxBlocks,
    includeUnpublished
  });
};

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ email: String(email || "").toLowerCase() });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isValid = await bcrypt.compare(String(password || ""), admin.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.cookie("admin_token", signToken(admin), cookieOptions);
    res.json({ ok: true, admin: { email: admin.email } });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("admin_token", cookieOptions);
  res.json({ ok: true });
});

router.get("/session", requireAdminAuth, (req, res) => {
  res.json({ ok: true, admin: req.admin });
});

router.get("/homepage", requireAdminAuth, async (_req, res, next) => {
  try {
    res.json(await getHomepagePayload(true));
  } catch (error) {
    next(error);
  }
});

router.put("/sections/:sectionKey", requireAdminAuth, async (req, res, next) => {
  try {
    const { sectionKey } = req.params;

    if (!validateSectionKey(sectionKey)) {
      return res.status(400).json({ message: "Unknown section key." });
    }

    const content = await getHomepageContent();
    content[sectionKey] = req.body;
    await content.save();

    res.json({ ok: true, sectionKey, data: content[sectionKey] });
  } catch (error) {
    next(error);
  }
});

router.post("/media/upload", requireAdminAuth, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const image = await uploadImageBuffer(req.file.buffer, req.body.folder || "photography-cms");
    image.alt = req.body.alt || "";
    res.json(image);
  } catch (error) {
    next(error);
  }
});

router.delete("/media", requireAdminAuth, async (req, res, next) => {
  try {
    await deleteCloudinaryAsset(req.body.publicId);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

const createCrudRoutes = (path, Model) => {
  router.post(`/${path}`, requireAdminAuth, async (req, res, next) => {
    try {
      const created = await Model.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  router.put(`/${path}/:id`, requireAdminAuth, async (req, res, next) => {
    try {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!updated) {
        return res.status(404).json({ message: "Item not found." });
      }

      res.json(updated);
    } catch (error) {
      next(error);
    }
  });

  router.delete(`/${path}/:id`, requireAdminAuth, async (req, res, next) => {
    try {
      const deleted = await Model.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Item not found." });
      }

      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });
};

createCrudRoutes("portfolio", PortfolioItem);
createCrudRoutes("services", ServiceItem);
createCrudRoutes("parallax-blocks", ParallaxBlock);

export default router;
