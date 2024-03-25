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

exports.getImageUrl = function (publicId) {
  if (publicId) {
    return cloudinary.url(publicId, { invalidate: true });
  } else {
    return "";
  }
};

exports.ItemUpload = async function (req, itemId, invalidate = false) {
  const file = getUri(req);
  return (result = await cloudinary.uploader.upload(
    "data:image/png;base64," + file,
    {
      public_id: `${itemId}`,
      folder: "ItemImages",
      invalidate: invalidate,
    }
  ));
};

exports.ItemDelete = async function (publicId) {
  cloudinary.uploader.destroy(publicId, function (result) {
    console.log(result);
  });
};
