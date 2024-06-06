import multer from "multer";
import {AuthRequest} from "../../../common/interfaces";
import path from "path";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20000000 // 20MB,
    },
    fileFilter: checkFileType,
});


function checkFileType(req: AuthRequest, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const allowedFileTypes = ['.jpg', '.png', '.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}