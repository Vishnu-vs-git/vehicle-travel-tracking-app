import multer from "multer";
import path from "path";
import { ERROR_MESSAGES } from "../common/errorMessages";

const CSV_MIME_TYPES = [
  "text/csv",
  "application/vnd.ms-excel",
];

export const csvUpload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const isCsvExt = ext === ".csv";
    const isCsvMime = CSV_MIME_TYPES.includes(file.mimetype);

    if (!isCsvExt || !isCsvMime) {
     
      cb(new Error(ERROR_MESSAGES.CSV.CSV_FILE_ERROR));
      return;
    }

    cb(null, true);
  },
});
