import multer from "multer";

const storage = multer.memoryStorage();

export const image = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

        const extension = file.originalname
            .toLowerCase()
            .substring(file.originalname.lastIndexOf("."));

        const validMimeType =
            allowedMimeTypes.includes(file.mimetype);

        const validExtension =
            allowedExtensions.includes(extension);

        if (!validMimeType && !validExtension) {
            return cb(
                new Error(
                    "Only JPEG, PNG and WebP images are allowed"
                )
            );
        }

        cb(null, true);
    }
});