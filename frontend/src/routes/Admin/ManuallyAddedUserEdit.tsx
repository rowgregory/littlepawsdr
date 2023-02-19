import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useHistory, useLocation } from 'react-router-dom';
import { updateManuallyAddedUser } from '../../actions/manuallyAddUserActions';
import {
  MANUALLY_ADD_USER_CREATE_RESET,
  MANUALLY_ADD_USER_UPDATE_RESET,
} from '../../constants/manuallyAddUserConstants';
import Message from '../../components/Message';
import {
  Container,
  EditForm,
  EditFormAndPreviewContainer,
  FormFile,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import BreadCrumb from '../../components/common/BreadCrumb';
import {
  CardTheme,
  Label,
  ProfileCardImg,
} from '../../components/styles/profile/Styles';
import { Accordion } from '../../components/styles/place-order/Styles';
import { themes } from '../../utils/profileCardThemes';
import { STATES } from '../../utils/states';
import { manuallyAddUser } from '../../actions/manuallyAddUserActions';
import API from '../../utils/api';
import { staticUploadImage } from '../../utils/misc';

const useManuallyAddedUserEditForm = (callback?: any, data?: any) => {
  const values = {
    name: '',
    affiliation: '',
    email: '',
    image: '',
    profileCardTheme: '',
    location: '',
    bio: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data.name,
        affiliation: data.affiliation,
        email: data.email,
        image: data.image,
        profileCardTheme: data.profileCardTheme || themes[0],
        location: data.location,
        bio: data.bio,
      }));
    }
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

const ManuallyAddedUserEdit = () => {
  const {
    state: { manuallyAddedUser, isEditMode },
  } = useLocation() as any;
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [showCardThemes, setShowCardThemes] = useState(false);

  const {
    manuallyAddedUserUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
    manuallyAddedUserCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    },
  } = useSelector((state: any) => state);

  const editManuallyAddedUserCallback = async () => {
    setUploading(true);
    if (manuallyAddedUser?.image !== staticUploadImage) {
      API.deleteImage(manuallyAddedUser?.image);
    }
    const image = await uploadFileHandler(
      file,
      setUploading,
      setImageUploadStatus
    );
    if (isEditMode) {
      dispatch(
        updateManuallyAddedUser({
          _id: manuallyAddedUser._id,
          name: inputs.name,
          affiliation: inputs.affiliation,
          email: inputs.email,
          image,
          profileCardTheme: inputs.profileCardTheme,
          location: inputs.location,
          bio: inputs.bio,
        })
      );
    } else {
      dispatch(
        manuallyAddUser({
          name: inputs.name,
          affiliation: inputs.affiliation,
          email: inputs.email,
          image,
          profileCardTheme: inputs.profileCardTheme,
          location: inputs.location,
          bio: inputs.bio,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useManuallyAddedUserEditForm(
    editManuallyAddedUserCallback,
    manuallyAddedUser
  );

  useEffect(() => {
    if (successCreate || successUpdate) {
      history.push('/admin/manuallyAddedUserList');
      dispatch({ type: MANUALLY_ADD_USER_CREATE_RESET });
      dispatch({ type: MANUALLY_ADD_USER_UPDATE_RESET });
    }
  }, [dispatch, history, successCreate, successUpdate]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <WelcomeText className='mb-1'>Board Member Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Board Members'
        step4={isEditMode ? 'Update' : 'Create'}
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/manuallyAddedUserList'
      />
      {(errorCreate || errorUpdate) && (
        <Message variant='danger'>{errorCreate || errorUpdate}</Message>
      )}
      <EditFormAndPreviewContainer>
        <EditForm style={{ maxWidth: '400px', width: '100%' }}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              type='text'
              value={inputs.name || ''}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image' className='d-flex flex-column'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              name='image'
              className='img-link'
              type='text'
              value={inputs.image || ''}
              onChange={handleInput}
            ></Form.Control>
            <div className='d-flex'>
              <FormFile
                id='image-file'
                label={
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
            </div>
          </Form.Group>
          <Form.Group controlId='affiliation' className='mt-5'>
            <Form.Label>Affiliation</Form.Label>
            <Form.Control
              name='affiliation'
              type='text'
              value={inputs.affiliation || ''}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='mt-5'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              type='text'
              value={inputs.email || ''}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='state' className='mt-5'>
            <Form.Label>State</Form.Label>
            <Form.Control
              name='location'
              value={inputs.location || ''}
              as='select'
              onChange={handleInput}
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
              name='bio'
              rows={5}
              as='textarea'
              value={inputs.bio || ''}
              onChange={handleInput}
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
                  name='profileCardTheme'
                  key={i}
                  selected={theme === inputs.profileCardTheme}
                  inline
                  label={<ProfileCardImg src={theme} alt={`${theme}-${i}`} />}
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
          <UpdateBtn onClick={onSubmit}>
            {isEditMode ? 'Updat' : 'Creat'}
            {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
          </UpdateBtn>
        </EditForm>
      </EditFormAndPreviewContainer>
    </Container>
  );
};

export default ManuallyAddedUserEdit;
