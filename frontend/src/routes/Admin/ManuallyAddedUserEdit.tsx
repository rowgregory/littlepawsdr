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
import {
  CardTheme,
  Label,
  ProfileCardImg,
} from '../../components/styles/profile/Styles';
import { Accordion } from '../../components/styles/place-order/Styles';
import { themes } from '../../utils/profileCardThemes';

const ManuallyAddedUserEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const manuallyAddedUserId = match.params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [email, setEmail] = useState('');
  const [profileCardTheme, setProfileCardTheme] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;
  const [showCardThemes, setShowCardThemes] = useState(false);

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
    setEmail(manuallyAddedUser?.email);
    setPublicId(manuallyAddedUser?.publicId);
    setProfileCardTheme(manuallyAddedUser?.profileCardTheme);
  }, [manuallyAddedUser]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateManuallyAddedUser({
          _id: manuallyAddedUserId,
          name,
          affiliation,
          email,
          image: cloudinaryData.secureUrl,
          publicId: cloudinaryData.publicId,
        })
      );
    }
  }, [affiliation, cloudinaryData, dispatch, manuallyAddedUserId, email, name]);

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
          email,
          image,
          profileCardTheme,
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
      <WelcomeText className='mb-1'>Board Member Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Board Members'
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
        <Form.Group controlId='email' className='mt-5'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='d-flex flex-column' controlId='profileCardTheme'>
          <Label>Profile card theme</Label>
          <Accordion
            toggle={showCardThemes}
            maxheight='1015px'
            style={{ minHeight: '225px' }}
          >
            {themes.map((theme: string, i: number) => (
              <CardTheme
                key={i}
                selected={theme === profileCardTheme}
                inline
                label={<ProfileCardImg src={theme} alt={`${theme}-${i}`} />}
                type='radio'
                id={`inline-radio-${i} bgColor`}
                value={theme || ''}
                checked={profileCardTheme === theme}
                onChange={(e: any) => setProfileCardTheme(e.target.value)}
              />
            ))}
          </Accordion>
          <Text
            onClick={() => setShowCardThemes(!showCardThemes)}
            cursor='pointer'
            marginTop='8px'
          >
            {showCardThemes ? 'See Less...' : 'See More...'}
          </Text>
        </Form.Group>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ManuallyAddedUserEdit;
