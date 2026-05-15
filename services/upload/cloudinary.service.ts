import cloudinary
  from "../../config/cloudinary.config";

export async function uploadImage(
  file: string,
  folder = "facturium"
) {

  const result =
    await cloudinary.uploader.upload(
      file,
      {
        folder,
      }
    );

  return {

    url:
      result.secure_url,

    publicId:
      result.public_id,
  };
}

export async function deleteImage(
  publicId: string
) {

  return cloudinary.uploader.destroy(
    publicId
  );
}