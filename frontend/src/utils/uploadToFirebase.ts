// import heic2any from 'heic2any';
// import imageCompression from 'browser-image-compression';
import { app } from '../config/firebase';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadFileToFirebase = async (file: File) => {
  const options = {
    maxSizeMb: 0.1,
    maxWidthOrHeight: 600,
    quality: 0.2,
  };

  const isHEIC = file.type === 'image/heic';
  let compressedFile: any = file;

  if (isHEIC) {
    const jpegBlob = await heic2any({
      blob: file,
      quality: 0.6,
    });

    compressedFile = jpegBlob;
  }

  compressedFile = await imageCompression(compressedFile as File, options);

  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + compressedFile.name);

  try {
    const snapshot = await uploadBytes(storageRef, compressedFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

const uploadMultipleFilesToFirebase = async (files: FileList | File[]) => {
  const downloadURLs = await Promise.all(
    Array.from(files).map((file) => uploadFileToFirebase(file))
  );
  return downloadURLs;
};

export { uploadFileToFirebase, uploadMultipleFilesToFirebase };
