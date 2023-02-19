import axios from 'axios';

export const compressAndUpload = async (
  file: any,
  setImageUploadStatus: any
) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  setImageUploadStatus('Uploading');
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axios.post('/upload', formData, config);

  setImageUploadStatus('Uploaded!');
  return data;
};
