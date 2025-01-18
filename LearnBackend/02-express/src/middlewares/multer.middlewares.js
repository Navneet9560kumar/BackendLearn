import multer from "multer";
import path from "path";

// Set up disk storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer middleware to handle avatar and cover image uploads
const upload = multer({
    storage: storage,
}).fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
]);

export { upload };
