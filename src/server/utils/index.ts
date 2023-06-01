import { getServerSession } from '#auth';
import type { H3Event } from 'h3';
import { DeleteApiResponse, UploadApiResponse, v2 as _cloudinary } from 'cloudinary';

export const middleware = async (event: H3Event, callback: Function) => {
  const session = await getServerSession(event);
  if (!session) sendError(
    event,
    createError({
      statusCode: 401,
      statusMessage: 'Not authenticated.',
      message: 'You need to login first.'
    })
  );
  callback();
}

const cloudinary = () => {
  _cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME, 
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
  })

  return _cloudinary
}

export const uploadToCloudinary = (image_path: string) : Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
      cloudinary().uploader.upload(image_path, (error, data) => {
          if (error) {
              reject(error)
          }
          if(data) return resolve(data);
      })
  })
}

export const deleteCloudinaryImage = (image_id: string) : Promise<DeleteApiResponse> => {
  return new Promise((resolve, reject) => {
      cloudinary().uploader.destroy(image_id, (error, data) => {
          if (error) {
              reject(error)
          }
          if(data) return resolve(data);
      })
  })
}