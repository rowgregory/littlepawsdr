import { app } from '../config/firebase';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const uploadFileToFirebase = async (file?: File, isAuction?: boolean) => {
  const options = {
    maxSizeMb: 0.1,
    maxWidthOrHeight: 600,
    quality: 0.2,
  };

  const isHEIC = file?.type === 'image/heic';
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

    return isAuction
      ? {
          url: downloadURL,
          name: snapshot.metadata.name,
          size: Math.round(snapshot.metadata.size / 1024),
        }
      : downloadURL;
  } catch (error) {
    return null;
  }
};

const uploadMultipleFilesToFirebase = async (files: FileList | File[], isAuction?: boolean) => {
  const downloadURLs = await Promise.all(
    Array.from(files).map((file) => uploadFileToFirebase(file, isAuction))
  );
  return downloadURLs;
};

const deleteImageFromFirebase = async (fileName: string) => {
  const storage = getStorage();

  const desertRef = ref(storage, `images/${fileName}`);

  try {
    await deleteObject(desertRef);
    return true;
  } catch (error) {
    return false;
  }
};

export { uploadFileToFirebase, uploadMultipleFilesToFirebase, deleteImageFromFirebase };
