import multer from "multer";
import { extname } from "path";
import { randomUUID } from "crypto";
export const uploadHandler = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(201).json({ filename: req.file.filename });
 }

export const uploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, randomUUID() + extname(file.originalname));
        }
    }),
});

