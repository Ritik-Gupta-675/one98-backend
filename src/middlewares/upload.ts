import multer from 'multer';
import { cloudinary } from "../utils/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "one98_articles", // You can change folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }as any, 
});

export const upload = multer({ storage });
