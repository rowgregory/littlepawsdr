import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConstants';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import Checkmark from '../../components/svg/Checkmark';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { themes } from '../../utils/profileCardThemes';
import {
  FormFile,
  RemovePhoto,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { defaultImages } from '../../utils/defaultImages';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import RemovePhotoIcon from '../../components/svg/RemovePhotoIcon';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { Accordion } from '../../components/styles/place-order/Styles';
import {
  CardTheme,
  Container,
  FirstCol,
  Input,
  Label,
  ProfileCardImg,
  ProfilePicCol,
  SettingsTitleContainer,
} from '../../components/styles/profile/Styles';
import { validateFullNameRegex } from '../../utils/regex';
import { STATES } from '../../utils/states';

const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('') as any;
  const [uploading, setUploading] = useState(false);
  const [volunteerTitle, setVolunteerTitle] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [profileCardTheme, setProfileCardTheme] = useState('');
  const [checkmark, setCheckmark] = useState(false);
  const [publicId, setPublicId] = useState('') as any;
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;
  const [showCardThemes, setShowCardThemes] = useState(false);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const {
    userDetails: { loading, error, user },
    userUpdateProfile: { success: successUpdate, loading: loadingUpdate },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getUserDetails('profile'));
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    successUpdate && setCheckmark(true);
    setSubmittedForm(false);
    setUploading(false);
    setFile({});
    setTimeout(() => setCheckmark(false), 5000);
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setAvatar(user?.avatar);
      setVolunteerTitle(user?.volunteerTitle);
      setVolunteerEmail(user?.volunteerEmail);
      setProfileCardTheme(user?.profileCardTheme);
      setPublicId(user?.publicId);
      setLocation(user?.location);
      setBio(user?.bio);
    }

    return () => {
      setName('');
      setAvatar('');
      setVolunteerTitle('');
      setVolunteerEmail('');
      setProfileCardTheme('');
      setPublicId('');
      setLocation('');
      setBio('');
    };
  }, [user, successUpdate]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateUserProfile({
          id: user?._id,
          name,
          volunteerTitle,
          volunteerEmail,
          profileCardTheme,
          avatar: cloudinaryData?.secureUrl,
          publicId: cloudinaryData?.publicId,
          location,
          bio,
        })
      );
      setClouadinaryData({});
    }
  }, [
    cloudinaryData,
    dispatch,
    name,
    profileCardTheme,
    user,
    volunteerEmail,
    volunteerTitle,
    location,
    bio,
  ]);

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
      if (validateFullNameRegex.test(name)) {
        setErrorMsg('');
        dispatch(
          updateUserProfile({
            id: user._id,
            name,
            volunteerTitle,
            volunteerEmail,
            profileCardTheme,
            avatar,
            publicId,
            location,
            bio,
          })
        );
      } else {
        setUploading(false);
        setSubmittedForm(false);
        setErrorMsg('Please enter full name.');
      }
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      user.publicId,
      setPublicId,
      dispatch,
      updateUserProfile,
      user._id,
      setErrorMsg,
      true
    );
  };

  return (
    <Container>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
          marginInline: 'auto',
        }}
      >
        <Accordion
          toggle={errorMsg !== '' || error}
          maxheight='65px'
          className='w-100'
        >
          <Message variant='danger'>{errorMsg || error}</Message>
        </Accordion>
      </div>
      <SettingsTitleContainer className='d-flex justify-content-between align-items-center'>
        <WelcomeText>Profile</WelcomeText>
        {checkmark && <Checkmark />}
      </SettingsTitleContainer>
      {(loading || loadingUpdate || submittedForm) && <HexagonLoader />}
      <Form className='mt-4'>
        <div className='d-flex flex-wrap'>
          <FirstCol xl={6} lg={8} className='pl-0'>
            <Form.Group controlId='name'>
              <Label>Name</Label>
              <Input
                type='name'
                placeholder='Enter name'
                value={name || ''}
                onChange={(e: any) => setName(e.target.value)}
              />
            </Form.Group>
            {user?.isAdmin && (
              <>
                <Form.Group
                  className='d-flex flex-column'
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
                        label={
                          <ProfileCardImg src={theme} alt={`${theme}-${i}`} />
                        }
                        type='radio'
                        id={`inline-radio-${i} bgColor`}
                        value={theme || ''}
                        checked={profileCardTheme === theme}
                        onChange={(e: any) =>
                          setProfileCardTheme(e.target.value)
                        }
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
                <Form.Group controlId='volunteerTitle'>
                  <Label>Position at Little Paws</Label>
                  <Input
                    type='text'
                    placeholder='Enter position'
                    value={volunteerTitle || ''}
                    onChange={(e: any) => setVolunteerTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='volunteerEmail'>
                  <Label>Little Paws Email</Label>
                  <Input
                    type='email'
                    placeholder='Enter email'
                    value={volunteerEmail || ''}
                    onChange={(e: any) => setVolunteerEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='location' className='d-flex flex-column'>
                  <Label>State</Label>
                  <Input
                    name='location'
                    value={location || ''}
                    as='select'
                    onChange={(e: any) => setLocation(e.target.value)}
                  >
                    {STATES.map((state: any, i: number) => (
                      <option style={{ color: '#777' }} key={i}>
                        {state.text}
                      </option>
                    ))}
                  </Input>
                </Form.Group>
                <Form.Group controlId='bio' className='d-flex flex-column'>
                  <Label>Bio</Label>
                  <Input
                    rows={5}
                    as='textarea'
                    value={bio || ''}
                    onChange={(e: any) => setBio(e.target.value)}
                  ></Input>
                </Form.Group>
              </>
            )}
          </FirstCol>
          {user?.isAdmin && (
            <ProfilePicCol className='d-flex pl-3 pr-0' xl={3} lg={12}>
              <Form.Group controlId='image' className='d-flex flex-column'>
                <Label>Profile picture</Label>
                <Input
                  className='img-link'
                  type='text'
                  value={avatar || ''}
                  onChange={(e: any) => setAvatar(e.target.value)}
                />
                <div className='d-flex'>
                  <FormFile
                    id='image-file'
                    label={
                      user?.avatar === defaultImages.upload || file?.name ? (
                        <UploadImageSquare className={uploading ? 'anim' : ''}>
                          <PhotoUploadIcon
                            ready={file}
                            imgStatus={imgUploadStatus}
                          />
                        </UploadImageSquare>
                      ) : (
                        <Image
                          src={user?.avatar}
                          width='200px'
                          height='200px'
                          style={{ objectFit: 'cover' }}
                        />
                      )
                    }
                    onChange={(e: any) => editPhotoHandler(e)}
                  ></FormFile>
                  <RemovePhoto
                    style={{ border: '1px solid #ededed' }}
                    onClick={(e: any) =>
                      avatar === defaultImages.profile
                        ? {}
                        : removePhotoHandler(e)
                    }
                  >
                    <RemovePhotoIcon />
                    <Text marginLeft='0.75rem' fontWeight='300' color='#c4c4c4'>
                      Remove Photo
                    </Text>
                  </RemovePhoto>
                </div>
              </Form.Group>
            </ProfilePicCol>
          )}
        </div>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </Form>
    </Container>
  );
};

export default Profile;
