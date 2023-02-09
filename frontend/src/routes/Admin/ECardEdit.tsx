import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getECardDetails, updateECard } from '../../actions/eCardActions';
import {
  ECARD_DETAILS_RESET,
  ECARD_UPDATE_RESET,
} from '../../constants/eCardConstants';
import { UpdateBtn, Text } from '../../components/styles/Styles';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { eCardCategories } from '../../utils/eCardCategories';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import {
  Container,
  EditForm,
  FormFile,
  RemovePhoto,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import RemovePhotoIcon from '../../components/svg/RemovePhotoIcon';
import { defaultImages } from '../../utils/defaultImages';
import BreadCrumb from '../../components/common/BreadCrumb';

const ECardEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const eCardId = match.params.id;
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [publicId, setPublicId] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;

  const {
    eCardDetails: { loading, error, eCard },
    eCardUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: ECARD_DETAILS_RESET });
    dispatch(getECardDetails(eCardId));
    dispatch({ type: ECARD_UPDATE_RESET });
  }, [dispatch, eCardId, successUpdate]);

  useEffect(() => {
    setCategory(eCard?.category);
    setImage(eCard?.image);
    setPrice(eCard?.price);
    setPublicId(eCard?.publicId);
    setName(eCard?.name);
  }, [eCard]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateECard({
          _id: eCardId,
          category,
          image: cloudinaryData.secureUrl,
          price,
          publicId: cloudinaryData.publicId,
          name,
        })
      );
    }
  }, [
    category,
    cloudinaryData,
    dispatch,
    eCardId,
    imgUploadStatus,
    name,
    price,
  ]);

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/eCardList');
    }
  }, [successUpdate, submittedForm, history]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setSubmittedForm(true);
    if (file?.name) {
      setUploading(true);
      uploadFileHandler(
        file,
        setUploading,
        publicId,
        setImageUploadStatus,
        setClouadinaryData
      );
    } else {
      dispatch(
        updateECard({
          _id: eCardId,
          category,
          price,
          name,
        })
      );
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      eCard.publicId,
      () => {},
      dispatch,
      updateECard,
      eCardId,
      setErrorMsg
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Ecard Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Ecards'
        step4={eCard?.name}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/eCardList'
      />
      {(loading || loadingUpdate || submittedForm || uploading) && (
        <HexagonLoader />
      )}
      {(errorUpdate || errorMsg || error) && (
        <Message variant='danger'>{errorUpdate || errorMsg || error}</Message>
      )}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type='text'
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as='select'
            value={category || eCard?.category || ''}
            onChange={(e) => setCategory(e.target.value)}
          >
            {eCardCategories.map((category, i) => (
              <option key={i}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            min={1}
            type='number'
            value={price || ''}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='image' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            className='img-link'
            type='text'
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <div className='d-flex'>
            <FormFile
              id='image-file'
              label={
                eCard?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={eCard?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                    alt='Ecard'
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
            <RemovePhoto
              onClick={(e: any) =>
                image === defaultImages.upload ? {} : removePhotoHandler(e)
              }
            >
              <RemovePhotoIcon />
              <Text marginLeft='0.75rem' fontWeight='300' color='#c4c4c4'>
                Remove Photo
              </Text>
            </RemovePhoto>
          </div>
        </Form.Group>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{submittedForm ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ECardEdit;
