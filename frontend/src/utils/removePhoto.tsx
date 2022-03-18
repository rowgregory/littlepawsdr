import axios from 'axios';

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
  const image =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';
  const avatar =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png';
  const blogDefaultImg =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1641507406/img-placeholder.png';

  const {
    data: { result },
  } = await axios.post(`/api/remove-upload/${publicId}`);

  if (result === 'ok') {
    setPublicId('');
    if (userUpdateProfile) {
      return dispatch(
        update({
          _id: id,
          avatar,
          publicId: '',
        })
      );
    } else if (currentPage === 'blog') {
      update({
        _id: id,
        image: blogDefaultImg,
        publicId: '',
      });
    }
    return dispatch(
      update({
        _id: id,
        image,
        publicId: '',
      })
    );
  } else if (result === 'not found') {
    setErrorMsg('No image to remove');
  }
};
