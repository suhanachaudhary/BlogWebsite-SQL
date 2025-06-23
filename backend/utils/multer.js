
// utils/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-images",
    format: async (req, file) => "png", // or 'jpeg', or leave undefined to keep original
    public_id: (req, file) => Date.now() + "-" + file.originalname.split(".")[0],
  },
});

export const parser = multer({ storage });
