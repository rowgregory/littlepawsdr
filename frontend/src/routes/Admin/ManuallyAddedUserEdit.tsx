import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  getManuallyAddedUserDetails,
  updateManuallyAddedUser,
} from '../../actions/manuallyAddUserActions';
import {
  MANUALLY_ADD_USER_DETAILS_RESET,
  MANUALLY_ADD_USER_UPDATE_RESET,
} from '../../constants/manuallyAddUserConstants';
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

const ManuallyAddedUserEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const manuallyAddedUserId = match.params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;

  const {
    manuallyAddedUserDetails: { loading, error, manuallyAddedUser },
    manuallyAddedUserUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: MANUALLY_ADD_USER_DETAILS_RESET });
    dispatch(getManuallyAddedUserDetails(manuallyAddedUserId));
    dispatch({ type: MANUALLY_ADD_USER_UPDATE_RESET });
  }, [dispatch, manuallyAddedUserId, successUpdate]);

  useEffect(() => {
    setName(manuallyAddedUser?.name);
    setImage(manuallyAddedUser?.image);
    setAffiliation(manuallyAddedUser?.affiliation);
    setMessage(manuallyAddedUser?.message);
    setPublicId(manuallyAddedUser?.publicId);
  }, [manuallyAddedUser]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateManuallyAddedUser({
          _id: manuallyAddedUserId,
          name,
          affiliation,
          message,
          image: cloudinaryData.secureUrl,
          publicId: cloudinaryData.publicId,
        })
      );
    }
  }, [
    affiliation,
    cloudinaryData,
    dispatch,
    manuallyAddedUserId,
    message,
    name,
  ]);

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/manuallyAddedUserList');
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
        updateManuallyAddedUser({
          _id: manuallyAddedUserId,
          name,
          affiliation,
          message,
          image,
        })
      );
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      manuallyAddedUser?.publicId,
      setPublicId,
      dispatch,
      updateManuallyAddedUser,
      manuallyAddedUserId,
      setErrorMsg
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Volunteer Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Volunteers'
        step4={manuallyAddedUser?.name}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/manuallyAddedUserList'
      />
      {(error || errorUpdate || errorMsg) && (
        <Message variant='danger'>{error || errorUpdate || errorMsg}</Message>
      )}
      {(loading || loadingUpdate || submittedForm) && <HexagonLoader />}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
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
                manuallyAddedUser?.image === defaultImages.upload ||
                file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={manuallyAddedUser?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
            <RemovePhoto
              onClick={(e: any) =>
                image === defaultImages.blog ? {} : removePhotoHandler(e)
              }
            >
              <RemovePhotoIcon />
              <Text marginLeft='0.75rem' fontWeight='300' color='#c4c4c4'>
                Remove Photo
              </Text>
            </RemovePhoto>
          </div>
        </Form.Group>
        <Form.Group controlId='affiliation' className='mt-5'>
          <Form.Label>Affiliation</Form.Label>
          <Form.Control
            type='text'
            value={affiliation || ''}
            onChange={(e) => setAffiliation(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='message' className='mt-5'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            type='textarea'
            value={message || ''}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ManuallyAddedUserEdit;
