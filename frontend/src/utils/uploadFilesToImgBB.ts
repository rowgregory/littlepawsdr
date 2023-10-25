import API from './api';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

export const uploadFilesToImgbb = async (files: FileList | File[]) => {
  return Promise.all(
    Array.from(files).map(async (file: File) => {
      try {
        const options = {
          maxSizeMb: 0.1,
          maxWidthOrHeight: 600,
          quality: 0.2,
        };

        const isHEIC = file.type === 'image/heic';
        let compressedFile: File | Blob | Blob[] = file;

        if (isHEIC) {
          const jpegBlob = await heic2any({
            blob: file,
            quality: 0.6,
          });

          compressedFile = jpegBlob;
        }

        compressedFile = await imageCompression(
          compressedFile as File,
          options
        );

        const formData = new FormData();
        formData.append('image', compressedFile);

        const isFile = file?.name;
        const image = isFile && (await API.uploadImageToImgbb(formData));

        return image?.data?.url;
      } catch (err) {
        throw new Error('Error compressing image');
      }
    })
  );
};

export const compressAndUpload = async (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        maxSizeMb: 0.1,
        maxWidthOrHeight: 600,
        quality: 0.2,
      };

      const isHEIC = file.type === 'image/heic';
      let compressedFile: File | Blob | Blob[] = file;

      if (isHEIC) {
        const jpegBlob = await heic2any({
          blob: file,
          quality: 0.6,
        });

        compressedFile = jpegBlob;
      }

      compressedFile = await imageCompression(compressedFile as File, options);

      const formData = new FormData();
      formData.append('image', compressedFile);

      const isFile = file?.name;
      const image = isFile && (await API.uploadImageToImgbb(formData));

      resolve(image);
    } catch (err) {
      reject(`Error compressing image: ${err}`);
    }
  });
};
