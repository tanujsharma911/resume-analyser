import multer from "multer";
import type { RequestHandler } from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // NOTE: If folder is not created, multer will throw ENOENT error.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadResume: RequestHandler = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb: any) {
    const mime = file.mimetype;

    if (mime === "application/pdf") {
      return cb(null, true);
    } else {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
  },
}).single("resume");
