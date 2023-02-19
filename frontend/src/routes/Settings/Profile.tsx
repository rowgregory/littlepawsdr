import React, { useEffect, useState } from 'react';
import { Form, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../actions/userActions';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import Checkmark from '../../components/svg/Checkmark';
import { themes } from '../../utils/profileCardThemes';
import {
  FormFile,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { defaultImages } from '../../utils/defaultImages';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { Accordion } from '../../components/styles/place-order/Styles';
import {
  AccordionWrapper,
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
import { useHistory } from 'react-router-dom';
import API from '../../utils/api';

const useProfileForm = (callback?: any, data?: any) => {
  const values = {
    name: '',
    avatar: '',
    volunteerTitle: '',
    profileCardTheme: '',
    location: '',
    bio: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data?.name,
        avatar: data?.image,
        volunteerTitle: data.volunteerTitle,
        profileCardTheme: data.profileCardTheme,
        location: data.location,
        bio: data.bio,
      }));
    }

    return () => {
      setInputs(() => ({
        name: '',
        avatar: '',
        volunteerTitle: '',
        profileCardTheme: '',
        location: '',
        bio: '',
      }));
    };
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [checkmark, setCheckmark] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [showCardThemes, setShowCardThemes] = useState(false);

  let {
    userLogin: { userInfo: user },
    userUpdateProfile: {
      success: successUpdate,
      loading: loadingUpdate,
      error: errorUpdate,
    },
  } = useSelector((state: any) => state);

  const profileCallback = async () => {
    setUploading(true);
    setImageUploadStatus('Uploading to Imgbb');
    const formData = new FormData();
    formData.append('image', file);
    const isFile = Object.keys(file).length > 0;
    const image = isFile && (await API.uploadImageToImgbb(formData));
    setImageUploadStatus('Image uploaded!');
    setImageUploadStatus('Updating profile details');

    const isValid = validateFullNameRegex.test(inputs.name);

    if (isValid) {
      dispatch(
        updateUserProfile({
          id: user?._id,
          name: inputs.name,
          volunteerTitle: inputs.volunteerTitle,
          profileCardTheme: inputs.profileCardTheme,
          avatar: image?.data?.url,
          location: inputs.location,
          bio: inputs.bio,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useProfileForm(
    profileCallback,
    user
  );

  useEffect(() => {
    if (successUpdate) {
      setFile('');

      setCheckmark(true);
      setTimeout(() => setCheckmark(false), 3000);
    }
  }, [successUpdate, history, dispatch, user]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <AccordionWrapper>
        <Accordion toggle={errorUpdate} maxheight='65px' className='w-100'>
          <Message variant='danger'>{errorUpdate}</Message>
        </Accordion>
      </AccordionWrapper>
      <SettingsTitleContainer className='d-flex justify-content-between align-items-center'>
        <WelcomeText>Profile</WelcomeText>
        {checkmark && <Checkmark />}
      </SettingsTitleContainer>
      <Form className='mt-4'>
        <div className='d-flex flex-wrap'>
          <FirstCol xl={6} lg={8} className='pl-0'>
            <Form.Group controlId='name'>
              <Label>Name</Label>
              <Input
                name='name'
                type='name'
                placeholder='Enter name'
                value={inputs.name || ''}
                onChange={handleInput}
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
                        name='profileCardTheme'
                        key={i}
                        selected={theme === inputs.profileCardTheme}
                        inline
                        label={
                          <ProfileCardImg src={theme} alt={`${theme}-${i}`} />
                        }
                        type='radio'
                        id={`inline-radio-${i} bgColor`}
                        value={theme || ''}
                        checked={inputs.profileCardTheme === theme}
                        onChange={handleInput}
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
                    name='volunteerTitle'
                    type='text'
                    placeholder='Enter position'
                    value={inputs.volunteerTitle || ''}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group controlId='location' className='d-flex flex-column'>
                  <Label>State</Label>
                  <Input
                    name='location'
                    value={inputs.location || ''}
                    as='select'
                    onChange={handleInput}
                    style={{ fontSize: '0.875rem' }}
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
                    name='bio'
                    rows={5}
                    as='textarea'
                    value={inputs.bio || ''}
                    onChange={handleInput}
                    style={{ fontSize: '0.875rem' }}
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
                  name='avatar'
                  className='img-link'
                  type='text'
                  value={inputs.avatar || ''}
                  onChange={handleInput}
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
                          alt='Profile'
                        />
                      )
                    }
                    onChange={(e: any) => editPhotoHandler(e)}
                  ></FormFile>
                </div>
              </Form.Group>
            </ProfilePicCol>
          )}
        </div>

        <span className='d-flex '>
          <UpdateBtn className='mt-0 mr-3' onClick={onSubmit}>
            Update
          </UpdateBtn>
          {loadingUpdate && <Spinner animation='grow' />}
        </span>
      </Form>
    </Container>
  );
};

export default Profile;
