import { v2 as cloud } from "cloudinary";

cloud.config({
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  cloud_name: process.env.CLOUD_API_NAME,
  secure: true,
});

export default cloud;
