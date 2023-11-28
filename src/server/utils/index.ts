import fs from "node:fs";
import type { H3Event } from "h3";
import type { DeleteApiResponse, UploadApiResponse } from "cloudinary";
import { v2 as _cloudinary } from "cloudinary";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "@/server/utils/auth";
import formidable from "formidable";

export const middleware = (event: H3Event, callback: () => void) => {
  const session = getServerSession(event);
  if (!session) {
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Not authenticated.",
        message: "You need to login first.",
      }),
    );
  }
  callback();
};

const cloudinary = () => {
  _cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  return _cloudinary;
};

const s3 = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.S3_KEY ?? "<ACCESS-KEY>",
    secretAccessKey: process.env.S3_KEY_SECRET ?? "<ACCESS-KEY>",
  },
});

export const uploadToCloudinary = (
  imagePath: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(imagePath, (error, data) => {
      if (error) {
        reject(error);
      }
      if (data) {
        return resolve(data);
      }
    });
  });
};

export const deleteCloudinaryImage = (
  imageId: string,
): Promise<DeleteApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.destroy(imageId, (error, data) => {
      if (error) {
        reject(error);
      }
      if (data) {
        return resolve(data);
      }
    });
  });
};

export const uploadToS3 = async (
  file: formidable.File,
  bucketName: string = process.env.S3_BUCKET_NAME ?? "",
) => {
  const fileContent = fs.readFileSync(file.filepath);
  const Key = uuidv4() + "." + file.originalFilename?.split(".")[1];
  return {
    ...(await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key,
        Body: fileContent,
        ACL: "public-read",
        ContentType: file.mimetype ?? undefined,
      }),
    )),
    Key,
  };
};

export const deleteFromS3 = async (
  Key: string,
  bucketName: string = process.env.S3_BUCKET_NAME ?? "",
) => {
  return await s3.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key,
    }),
  );
};
