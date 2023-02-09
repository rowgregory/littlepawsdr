import React, { useEffect, useState } from 'react';
import { Card, Form, Image } from 'react-bootstrap';
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
  CardImg,
  Container,
  EditForm,
  EditFormAndPreviewContainer,
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
import { Name, Position, ProfileCard } from '../AboutUs/TeamMembers';
import { STATES } from '../../utils/states';

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
  const [state, setState] = useState('');
  const [bio, setBio] = useState('');

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
    setState(manuallyAddedUser?.location);
    setBio(manuallyAddedUser?.bio);
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
          profileCardTheme,
          location: state,
          bio,
        })
      );
    }
  }, [
    affiliation,
    cloudinaryData,
    dispatch,
    manuallyAddedUserId,
    email,
    name,
    profileCardTheme,
    state,
    bio,
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
          email,
          image,
          profileCardTheme,
          location: state,
          bio,
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
      <EditFormAndPreviewContainer>
        <EditForm style={{ maxWidth: '400px', width: '100%' }}>
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
                      <PhotoUploadIcon
                        ready={file}
                        imgStatus={imgUploadStatus}
                      />
                    </UploadImageSquare>
                  ) : (
                    <Image
                      src={manuallyAddedUser?.image}
                      width='200px'
                      height='200px'
                      style={{ objectFit: 'cover' }}
                      alt='Board Member'
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
          <Form.Group controlId='state' className='mt-5'>
            <Form.Label>State</Form.Label>
            <Form.Control
              name='state'
              value={state || ''}
              as='select'
              onChange={(e: any) => setState(e.target.value)}
            >
              {STATES.map((state: any, i: number) => (
                <option style={{ color: '#777' }} key={i}>
                  {state.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='message' className='mt-5'>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              rows={5}
              as='textarea'
              value={bio || ''}
              onChange={(e) => setBio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            className='d-flex flex-column mt-5'
            controlId='profileCardTheme'
          >
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
        <div className='d-flex flex-column'>
          <Text fontWeight={400} fontSize='13px'>
            Preview
          </Text>

          <ProfileCard
            className='d-flex my-3'
            style={{ height: '323px', maxWidth: '300px', width: '100%' }}
          >
            <Card.Img
              src={profileCardTheme}
              alt='lanscape-card-theme'
              style={{
                height: '200px',
                borderRadius: '12px 12px 0 0',
                objectFit: 'cover',
              }}
            />

            <Card.Body className='d-flex flex-column mx-auto align-items-center'>
              <CardImg
                src={image}
                alt={name}
                width='170px'
                height='170px'
                style={{ borderRadius: '50%' }}
              />
              <Name className='pt-2'>
                <strong>{name}</strong>
              </Name>
              <Position className='pb-1'>{affiliation}</Position>
              <Card.Text>{email}</Card.Text>
            </Card.Body>
          </ProfileCard>
        </div>
      </EditFormAndPreviewContainer>
    </Container>
  );
};

export default ManuallyAddedUserEdit;
