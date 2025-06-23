import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import { db } from "./db.js";

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "./utils/cloudinary.js";

import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-images',
    format: async (req, file) => 'png',
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
  },
});
 
const parser = multer({ storage: storage });
 
app.post('/api/upload', parser.single('image'), function (req, res) {

  const imageUrl = req.file.path;
  console.log("cloudinary image",imageUrl);

  return res.status(200).json({
        message: "Post created successfully",
        imageUrl,
        public_id: req.file.filename
      });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
