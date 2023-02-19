import heic2any from 'heic2any';
import { compressAndUpload } from './compressAndUploadImage';

const uploadFileHandler = async (
  file: any,
  setUploading: Function,
  setImageUploadStatus?: any
) => {
  try {
    if (file?.type === 'image/heic') {
      setImageUploadStatus('Converting');
      heic2any({ blob: file, toType: 'image/jpg', quality: 1 }).then(
        async (cFile: any) => {
          compressAndUpload(cFile, setImageUploadStatus);
        }
      );
    } else {
      const isImageType = file?.type?.substr(0, 6) === 'image/';

      if (isImageType) {
        const data = await compressAndUpload(file, setImageUploadStatus);
        return data;
      }
    }
  } catch (err) {
    console.error('err: ', err);
    setUploading(false);
  }
};

export default uploadFileHandler;
