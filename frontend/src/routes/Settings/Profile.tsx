import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Image,
  Accordion,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import styled from 'styled-components';
import {
  SettingsPageHeader,
  SettingsTitleContainer,
  StyledUloadedImg,
  Text,
} from '../../components/styles/Styles';
import Checkmark from '../../components/svg/Checkmark';
import { EditBtn } from '../Admin/RaffleWinnerEdit';
import { FormFile } from '../Admin/EventEdit';
import { removePhoto } from '../../utils/removePhoto';
import HorizontalLoader from '../../components/HorizontalLoader';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { themes } from '../../utils/profileCardThemes';

const CardTheme = styled(Form.Check)<{ selected?: boolean }>`
  border: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.colors.primary}` : '3px solid transparent'};
  padding: 0.2rem;
  margin-right: 0;
`;

const ProfilePicCol = styled(Col)`
  justify-content: flex-start;
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const UpdateBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
`;

const HorizontalLoaderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
`;

const ProfileCardImg = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const Profile = ({ history }: any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('') as any;
  const [uploading, setUploading] = useState(false);
  const [volunteerTitle, setVolunteerTitle] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [profileCardTheme, setProfileCardTheme] = useState('');
  const [see, setSee] = useState(false);
  const [checkmark, setCheckmark] = useState(false);
  const [publicId, setPublicId] = useState('') as any;
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { success: successUpdateProfile, loading: loadingUpdateProfile } =
    userUpdateProfile;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png';

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (successUpdateProfile) {
      dispatch(getUserDetails('profile'));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setCheckmark(true);
      setTimeout(() => {
        setCheckmark(false);
      }, 5000);
    } else if (!user?.name) {
      dispatch(getUserDetails('profile'));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      setName(user.name);
      setAvatar(user.avatar);
      setVolunteerTitle(user.volunteerTitle);
      setVolunteerEmail(user.volunteerEmail);
      setProfileCardTheme(user.profileCardTheme);
      setPublicId(user.publicId);
    }

    return () => {
      setName('');
      setAvatar('');
      setVolunteerTitle('');
      setVolunteerEmail('');
      setProfileCardTheme('');
      setPublicId('');
    };
  }, [dispatch, history, user, userInfo, successUpdateProfile]);

  const profileDataToUploadWithImg = {
    name,
    volunteerTitle,
    volunteerEmail,
    profileCardTheme,
  } as any;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        avatar,
        volunteerTitle,
        volunteerEmail,
        profileCardTheme,
        publicId,
      })
    );
  };

  return (
    <>
      {errorMsg && <Message variant='danger'>No photo to remove</Message>}
      <SettingsTitleContainer className='d-flex justify-content-between align-items-center'>
        <SettingsPageHeader>Public profile</SettingsPageHeader>
        {checkmark && <Checkmark />}
      </SettingsTitleContainer>
      {(loading || loadingUpdateProfile) && (
        <HorizontalLoaderContainer>
          <HorizontalLoader />
        </HorizontalLoaderContainer>
      )}
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler} className='mt-4'>
          <div className='d-flex flex-wrap'>
            <Col lg={8} md={12} className='pr-4 pl-0'>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {(user.isVolunteer || user.isAdmin) && (
                <>
                  <Form.Group
                    className='d-flex flex-column'
                    controlId='profileCardTheme'
                  >
                    <Form.Label>Profile card theme</Form.Label>
                    <div className='d-flex flex-wrap'>
                      {themes
                        .map((theme: string, i: number) => (
                          <CardTheme
                            key={i}
                            selected={theme === profileCardTheme}
                            inline
                            label={
                              <ProfileCardImg
                                src={theme}
                                alt={`${theme}-${i}`}
                              />
                            }
                            type='radio'
                            id={`inline-radio-${i} bgColor`}
                            isValid
                            value={theme}
                            checked={profileCardTheme === theme}
                            onChange={(e: any) =>
                              setProfileCardTheme(e.target.value)
                            }
                            name='profileCardTheme'
                          />
                        ))
                        .filter((_: any, i: number) => i > 0 && i < 13)}
                    </div>
                    <Accordion
                      defaultActiveKey='0'
                      className='d-flex flex-column'
                    >
                      <Accordion.Collapse eventKey='1'>
                        <div className='d-flex flex-wrap'>
                          {themes
                            .map((theme: string, i: number) => (
                              <CardTheme
                                key={i}
                                selected={theme === profileCardTheme}
                                inline
                                label={
                                  <Image
                                    src={theme}
                                    alt={`${theme}-${i}`}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                      objectFit: 'cover',
                                      cursor: 'pointer',
                                    }}
                                  />
                                }
                                type='radio'
                                id={`inline-radio-${i} bgColor`}
                                isValid
                                value={theme}
                                checked={profileCardTheme === theme}
                                onChange={(e: any) =>
                                  setProfileCardTheme(e.target.value)
                                }
                                name='profileCardTheme'
                              />
                            ))
                            .filter((_: any, i: number) => i > 12)}
                        </div>
                      </Accordion.Collapse>
                      <div className='d-flex flex-column'>
                        <Accordion.Toggle
                          className='d-flex border-0 bg-transparent'
                          eventKey='1'
                          onClick={() => {
                            setSee(!see);
                          }}
                        >
                          <Text fontSize='0.85rem'>
                            {see ? 'see less...' : 'see more...'}
                          </Text>
                        </Accordion.Toggle>
                      </div>
                    </Accordion>
                  </Form.Group>
                  <Form.Group controlId='volunteerTitle'>
                    <Form.Label>Position at Little Paws</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Position'
                      value={volunteerTitle}
                      onChange={(e: any) => setVolunteerTitle(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='volunteerEmail'>
                    <Form.Label>Little Paws Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter Email to display'
                      value={volunteerEmail}
                      onChange={(e: any) => setVolunteerEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </>
              )}
            </Col>
            {(user?.isVolunteer || user?.isAdmin) && (
              <ProfilePicCol className='d-flex pl-3 pr-0' lg={4} md={12}>
                <Form.Group controlId='image' className='d-flex flex-column'>
                  <Form.Label>Profile Picture</Form.Label>
                  <div className='mx-auto'>
                    <Form.Control
                      className='img-link'
                      type='text'
                      value={avatar || ''}
                      onChange={(e) => setAvatar(e.target.value)}
                    ></Form.Control>
                    <StyledUloadedImg
                      src={avatar || ''}
                      alt='avatar'
                      onClick={() => setShowImageOptions(!showImageOptions)}
                    />
                    <div style={{ position: 'relative' }}>
                      <EditBtn
                        onClick={() => setShowImageOptions(!showImageOptions)}
                      >
                        <i className='fas fa-edit mr-2'></i>Edit
                      </EditBtn>
                      {showImageOptions && (
                        <EditBtn className='d-flex flex-column imgOptions'>
                          <FormFile
                            mb={(avatar !== uploadDefaultImgUrl).toString()}
                            id='image-file'
                            label='Upload a photo...'
                            onChange={(e: any) =>
                              uploadFileHandler(
                                e,
                                setUploading,
                                setShowImageOptions,
                                setErrorMsg,
                                setPublicId,
                                updateUserProfile,
                                dispatch,
                                publicId,
                                user._id,
                                profileDataToUploadWithImg,
                                avatar,
                                '',
                                setAvatar,
                                () => {},
                                'profile'
                              )
                            }
                          ></FormFile>
                          {avatar !== uploadDefaultImgUrl && (
                            <div
                              className='remove-img'
                              onClick={() =>
                                removePhoto(
                                  user.publicId,
                                  setPublicId,
                                  dispatch,
                                  updateUserProfile,
                                  user._id,
                                  setErrorMsg,
                                  true
                                )
                              }
                            >
                              Remove photo
                            </div>
                          )}
                        </EditBtn>
                      )}
                    </div>
                    {uploading && (
                      <Loader
                        w='200px'
                        h='200px'
                        p='absolute'
                        z='1'
                        top='29px'
                        left='34px'
                      />
                    )}
                  </div>
                </Form.Group>
              </ProfilePicCol>
            )}
          </div>
          <Row style={{ marginRight: '0px' }}>
            <Col className='my-5'>
              <UpdateBtn type='submit'>
                {loadingUpdateProfile ? (
                  <div className='d-flex align-items-center'>
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    <Text className='text-white ml-2'>Loading...</Text>
                  </div>
                ) : (
                  <Text className='text-white'>Update</Text>
                )}
              </UpdateBtn>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default Profile;
