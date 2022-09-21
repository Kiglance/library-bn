/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';

export async function uploadImage(path) {
  const { secure_url } = await cloudinary.uploader.upload(path, {
    use_filename: true,
    unique_filename: true,
    folder: 'library/cover'
  });

  return secure_url;
}

export function getPublicId(cover) {
  const arr = cover.split('/').at(-1).split('.');
  return `library/cover/${arr.slice(0, arr.length - 1).join('.')}`;
}

export async function deleteImage(cover) {
  const res = await cloudinary.uploader.destroy(getPublicId(cover));

  if (res.result === 'ok') {
    return true;
  }

  return false;
}
