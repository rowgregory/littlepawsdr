import API from './api';

export const uploadFilesToImgbb = async (files: any) => {
  return Promise.all(
    Array.from(files).map(async (file: any) => {
      const formData = new FormData();
      formData.append('image', file);
      const isFile = file?.name;
      const image = isFile && (await API.uploadImageToImgbb(formData));
      return image?.data?.url;
    })
  );
};
