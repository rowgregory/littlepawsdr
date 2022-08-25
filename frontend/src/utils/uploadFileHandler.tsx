import axios from 'axios';
import Compressor from 'compressorjs';
import heic2any from 'heic2any';

const uploadFileHandler = async (
  e: any,
  setUploading: Function,
  setShowImageOptions: Function,
  setErrorMsg: Function,
  setPublicId: Function,
  update: Function,
  dispatch: Function,
  publicId: any,
  objectId: string,
  dataToUploadWithImg: any,
  avatar?: string,
  image?: string,
  setAvatar?: any,
  setImage?: any,
  currentPage?: string
) => {
  setUploading(true);
  setShowImageOptions(false);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const defaultProfileImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png';
  const defaultUploadImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  const defaultBlogImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1641507406/img-placeholder.png';

  try {
    if (currentPage === 'profile') {
      const ifThereIsAnImgToRemove = avatar !== defaultProfileImgUrl;
      if (ifThereIsAnImgToRemove) {
        await axios.post(`/api/remove-upload/${publicId}`);
      }
    } else if (currentPage === 'blog') {
      const ifThereIsAnImgToRemove = image !== defaultBlogImgUrl;
      if (ifThereIsAnImgToRemove) {
        await axios.post(`/api/remove-upload/${publicId}`);
      }
    } else {
      const ifThereIsAnImgToRemove = image !== defaultUploadImgUrl;
      if (ifThereIsAnImgToRemove) {
        await axios.post(`/api/remove-upload/${publicId}`);
      }
    }

    let file = e.target.files[0];

    if (file.type === 'image/heic') {
      heic2any({ blob: file, toType: 'image/jpg', quality: 1 }).then(
        async (newImage: any) => {
          file = newImage;

          new Compressor(file, {
            quality: 0.6,
            async success(res) {
              const formData = new FormData();
              formData.append('image', file);

              const { data } = await axios.post('/upload', formData, config);

              if (data.msg === 'Upload cancelled') {
                return setUploading(false);
              } else if (data.msg === 'Please upload a photo first') {
                return setErrorMsg(data.msg);
              }

              if (currentPage === 'profile') {
                setAvatar(data?.secure_url);
              } else {
                setImage(data?.secure_url);
              }

              setPublicId(data?.public_id);
              setUploading(false);
              setShowImageOptions(false);

              switch (currentPage) {
                case 'profile':
                  const {
                    name: username,
                    volunteerTitle,
                    volunteerEmail,
                    profileCardTheme,
                  } = dataToUploadWithImg;
                  return dispatch(
                    update({
                      _id: objectId, // user._id
                      name: username,
                      avatar: data.secure_url,
                      volunteerTitle,
                      volunteerEmail,
                      profileCardTheme,
                      publicId: data.public_id,
                    })
                  );
                case 'e-card':
                  const { category: eCardCategory, price: eCardPrice } =
                    dataToUploadWithImg;
                  return dispatch(
                    update({
                      _id: objectId,
                      category: eCardCategory,
                      image: data.secure_url,
                      price: eCardPrice,
                      publicId: data.public_id,
                    })
                  );
                case 'product':
                  const {
                    name: productName,
                    price: productPrice,
                    brand,
                    category: productCategory,
                    countInStock,
                    description,
                    sizes,
                  } = dataToUploadWithImg;
                  return dispatch(
                    update({
                      _id: objectId,
                      name: productName,
                      price: productPrice,
                      brand,
                      category: productCategory,
                      description,
                      countInStock,
                      image: data.secure_url,
                      publicId: data.public_id,
                      sizes,
                    })
                  );
                case 'event':
                  const {
                    title,
                    description: eventDescription,
                    background,
                    color,
                    startDate,
                    endDate,
                    status,
                  } = dataToUploadWithImg;
                  return dispatch(
                    update({
                      _id: objectId,
                      title,
                      description: eventDescription,
                      startDate,
                      endDate,
                      image: data.secure_url,
                      background,
                      color,
                      status,
                      publicId: data.public_id,
                    })
                  );
                case 'raffle-winner':
                  const {
                    name: raffleWinnerName,
                    message,
                    month,
                  } = dataToUploadWithImg;
                  return dispatch(
                    update({
                      _id: objectId,
                      name: raffleWinnerName,
                      image: data.secure_url,
                      publicId: data.public_id,
                      month,
                      message,
                    })
                  );
                case 'blog':
                  const { title: blogTitle, article } = dataToUploadWithImg;
                  return dispatch(
                    update({
                      _id: objectId,
                      title: blogTitle,
                      article,
                      image: data.secure_url,
                      publicId: data.public_id,
                    })
                  );
                default:
                  return;
              }
            },
          });
        }
      );
    } else {
      new Compressor(file, {
        quality: 0.6,
        async success(res) {
          const formData = new FormData();
          formData.append('image', file);

          const { data } = await axios.post('/upload', formData, config);

          if (data.msg === 'Upload cancelled') {
            return setUploading(false);
          } else if (data.msg === 'Please upload a photo first') {
            return setErrorMsg(data.msg);
          }

          if (currentPage === 'profile') {
            setAvatar(data?.secure_url);
          } else {
            setImage(data?.secure_url);
          }

          setPublicId(data?.public_id);
          setUploading(false);
          setShowImageOptions(false);

          switch (currentPage) {
            case 'profile':
              const {
                name: username,
                volunteerTitle,
                volunteerEmail,
                profileCardTheme,
              } = dataToUploadWithImg;
              return dispatch(
                update({
                  _id: objectId, // user._id
                  name: username,
                  avatar: data.secure_url,
                  volunteerTitle,
                  volunteerEmail,
                  profileCardTheme,
                  publicId: data.public_id,
                })
              );
            case 'e-card':
              const { category: eCardCategory, price: eCardPrice } =
                dataToUploadWithImg;
              return dispatch(
                update({
                  _id: objectId,
                  category: eCardCategory,
                  image: data.secure_url,
                  price: eCardPrice,
                  publicId: data.public_id,
                })
              );
            case 'product':
              const {
                name: productName,
                price: productPrice,
                brand,
                category: productCategory,
                countInStock,
                description,
                sizes,
              } = dataToUploadWithImg;
              return dispatch(
                update({
                  _id: objectId,
                  name: productName,
                  price: productPrice,
                  brand,
                  category: productCategory,
                  description,
                  countInStock,
                  image: data.secure_url,
                  publicId: data.public_id,
                  sizes,
                })
              );
            case 'event':
              const {
                title,
                description: eventDescription,
                background,
                color,
                startDate,
                endDate,
                status,
              } = dataToUploadWithImg;
              return dispatch(
                update({
                  _id: objectId,
                  title,
                  description: eventDescription,
                  startDate,
                  endDate,
                  image: data.secure_url,
                  background,
                  color,
                  status,
                  publicId: data.public_id,
                })
              );
            case 'raffle-winner':
              const {
                name: raffleWinnerName,
                message,
                month,
              } = dataToUploadWithImg;
              return dispatch(
                update({
                  _id: objectId,
                  name: raffleWinnerName,
                  image: data.secure_url,
                  publicId: data.public_id,
                  month,
                  message,
                })
              );
            case 'blog':
              const { title: blogTitle, article } = dataToUploadWithImg;
              return dispatch(
                update({
                  _id: objectId,
                  title: blogTitle,
                  article,
                  image: data.secure_url,
                  publicId: data.public_id,
                })
              );
            default:
              return;
          }
        },
      });
    }
  } catch (err) {
    console.error('err: ', err);
    setUploading(false);
  }
};

export default uploadFileHandler;
