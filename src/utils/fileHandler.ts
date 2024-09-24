import cloud from "@/lib/cloud";
import { UploadApiOptions, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";


export const uploadFileToCloud = async (
  file: File,
  options?: UploadApiOptions
): Promise<UploadApiResponse | undefined> => {
  const arrayBuffer = await file.arrayBuffer();

  const buffer: Buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      options || {},
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
