import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEducationTipDetails,
  updateEducationTip,
} from '../../actions/educationTipActions';
import {
  EDUCATION_TIP_DETAILS_RESET,
  EDUCATION_TIP_UPDATE_RESET,
} from '../../constants/educationTipConstants';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
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

const EducationTipEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const educationTipId = match.params.id;
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;

  const {
    educationTipDetails: { loading, error, educationTip },
    educationTipUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: EDUCATION_TIP_DETAILS_RESET });
    dispatch(getEducationTipDetails(educationTipId));
    dispatch({ type: EDUCATION_TIP_UPDATE_RESET });
  }, [dispatch, educationTipId, successUpdate]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateEducationTip({
          _id: educationTipId,
          title,
          image: cloudinaryData.secureUrl,
          publicId: cloudinaryData.publicId,
          externalLink,
        })
      );
    }
  }, [cloudinaryData, dispatch, educationTipId, externalLink, title]);

  useEffect(() => {
    setTitle(educationTip?.title);
    setImage(educationTip?.image);
    setExternalLink(educationTip?.externalLink);
    setPublicId(educationTip?.publicId);
  }, [educationTip]);

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/education-tips');
    }
  }, [history, submittedForm, successUpdate]);

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
        updateEducationTip({
          _id: educationTipId,
          title,
          image,
          publicId,
          externalLink,
        })
      );
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      educationTip?.publicId,
      setPublicId,
      dispatch,
      updateEducationTip,
      educationTipId,
      setErrorMsg
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Education Tip Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Education Tips'
        step4={educationTip?.title}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/education-tips'
      />
      {(loading || loadingUpdate || submittedForm) && <HexagonLoader />}
      {(error || errorUpdate || errorMsg) && (
        <Message variant='danger'>{error || errorUpdate || errorMsg}</Message>
      )}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
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
                educationTip?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={educationTip?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                    alt='Education Tip'
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
        <Form.Group controlId='externalLink' className='mt-5'>
          <Form.Label>Link</Form.Label>
          <Form.Control
            type='text'
            value={externalLink || ''}
            onChange={(e) => setExternalLink(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default EducationTipEdit;
