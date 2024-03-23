const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const getUri = (req) => {
  return req.file.buffer.toString("base64");
};

exports.ItemUploader = async function (req) {
  const file = getUri(req);
  return (result = await cloudinary.uploader.upload(
    "data:image/png;base64," + file,
    {
      public_id: `${Date.now()}`,
      folder: "ItemImages",
    }
  ));
};
