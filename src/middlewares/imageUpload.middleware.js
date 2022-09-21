/* eslint-disable curly */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { v2 as cloudinary } from 'cloudinary';

export const imageUpload = async (req, res, next) => {
  const urls = [];
  const imageId = [];

  if (!req.body.images && req.body.profile_picture)
    return res.status(400).json({ message: 'images sholud not be empty' });

  if (!Array.isArray(req.body.images)) {
    const file = await cloudinary.uploader.upload(req.body.images.path);
    if (!file) return res.status(400).json({ message: 'not able to upload' });
    urls.push(file.url);
    imageId.push(file.public_id);
    req.body.images = urls;
    req.body.imagesId = imageId;
  } else {
    let file;
    for (let i = 0; i < req.body.images.length; i++) {
      file = await cloudinary.uploader.upload(req.body.images[i].path);

      if (!file) return res.status(400).json({ message: 'not able to upload' });

      urls.push(file.url);

      imageId.push(file.public_id);
    }
    req.body.images = urls;
    req.body.imagesId = imageId;
  }
  next();
};

export const imageUpdate = async (req, res, next) => {
  const urls = [];

  const imageId = [];

  if (!req.body.images)
    return res.status(400).json({ message: 'images sholud not be empty' });

  if (!Array.isArray(req.body.images)) {
    const file = await cloudinary.uploader.upload(req.body.images.path);

    if (!file) return res.status(400).json({ message: 'not able to upload' });

    urls.push(file.url);
    imageId.push(file.public_id);

    req.body.images = urls;
    req.body.imagesId = imageId;
  } else {
    let file;
    for (let i = 0; i < req.body.images.length; i++) {
      file = await cloudinary.uploader.upload(req.body.images[i].path);

      if (!file) return res.status(400).json({ message: 'not able to upload' });

      urls.push(file.url);
      imageId.push(file.public_id);
    }

    req.body.images = urls;
    req.body.imagesId = imageId;
  }

  next();
};

export const updateProfilePicture = async (req, res, next) => {
  if (req.body.profile_picture) {
    const uploadFile = await cloudinary.uploader.upload(
      req.body.profile_picture.path
    );

    req.body.profile_picture = uploadFile.url;
  }
  next();
};
