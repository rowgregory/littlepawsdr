import axios from 'axios';
import Compressor from 'compressorjs';

export const compressAndUpload = (
  file: any,
  setImageUploadStatus: any,
  setClouadinaryData?: any
) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  setImageUploadStatus('Compressing');
  new Compressor(file, {
    quality: 0.6,
    async success(res) {
      setImageUploadStatus('Uploading');
      const formData = new FormData();
      formData.append('image', res);

      const { data } = await axios.post('/upload', formData, config);
      setImageUploadStatus('Uploaded!');
      setClouadinaryData({
        publicId: data?.public_id,
        secureUrl: data?.secure_url,
      });
    },
  });
};
