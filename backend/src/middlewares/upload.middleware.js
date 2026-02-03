const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../services/cloudinary");

const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

console.log("Cloudinary configured:", isCloudinaryConfigured());

let upload;
if (isCloudinaryConfigured()) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "property-management",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
  upload = multer({ storage: storage });
} else {
  console.warn("⚠️ Cloudinary not configured - using memory storage");
  const memoryStorage = multer.memoryStorage();
  upload = multer({ 
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 }
  });
}

module.exports = upload;

