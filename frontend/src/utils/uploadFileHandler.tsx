import axios from 'axios';
import heic2any from 'heic2any';
import { compressAndUpload } from './compressAndUploadImage';

const uploadFileHandler = async (
  file: any,
  setUploading: Function,
  publicId: any,
  setImageUploadStatus?: any,
  setClouadinaryData?: any
) => {
  try {
    if (publicId) {
      setImageUploadStatus('Removing previos image');
      await axios.post(`/api/remove-upload/${publicId}`);
    }

    if (file.name) {
      if (file.type === 'image/heic') {
        setImageUploadStatus('Converting');
        heic2any({ blob: file, toType: 'image/jpg', quality: 1 }).then(
          async (cFile: any) => {
            compressAndUpload(cFile, setImageUploadStatus, setClouadinaryData);
          }
        );
      }
      if (
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/webp'
      ) {
        compressAndUpload(file, setImageUploadStatus, setClouadinaryData);
      }
    }
  } catch (err) {
    console.error('err: ', err);
    setUploading(false);
  }
};

export default uploadFileHandler;
