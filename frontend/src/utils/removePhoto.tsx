import axios from 'axios';
import { defaultImages } from './defaultImages';

export const removePhoto = async (
  publicId: any,
  setPublicId: any,
  dispatch: any,
  update: any,
  id: any,
  setErrorMsg: any,
  userUpdateProfile?: boolean,
  currentPage?: string
) => {
  const {
    data: { result },
  } = await axios.post(`/api/remove-upload/${publicId}`);
  if (result === 'ok') {
    if (userUpdateProfile) {
      return dispatch(
        update({
          _id: id,
          avatar: defaultImages.profile,
          publicId: '',
        })
      );
    } else if (currentPage === 'blog') {
      update({
        _id: id,
        image: defaultImages.upload,
        publicId: '',
      });
    }
    return dispatch(
      update({
        _id: id,
        image: defaultImages.upload,
        publicId: '',
      })
    );
  } else if (result === 'not found') {
    setErrorMsg('No image to remove');
  }
};
