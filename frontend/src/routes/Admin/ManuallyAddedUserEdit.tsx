import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
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
} from '../../components/styles/admin/Styles';
import { GoBackAndTitleWrapper, WelcomeText } from '../../components/styles/DashboardStyles';
import {
  CardTheme,
  Label,
  ProfileCardImg,
} from '../../components/styles/profile/Styles';
import { Accordion } from '../../components/styles/place-order/Styles';
import { themes } from '../../utils/profileCardThemes';
import { STATES } from '../../utils/states';
import { manuallyAddUser } from '../../actions/manuallyAddUserActions';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';

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
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [showCardThemes, setShowCardThemes] = useState(false);
  const state = useSelector((state: any) => state);
  const loadingUpdate = state.manuallyAddedUserUpdate.loading;
  const errorUpdate = state.manuallyAddedUserUpdate.error;
  const successUpdate = state.manuallyAddedUserUpdate.success;
  const loadingCreate = state.manuallyAddedUserCreate.loading;
  const errorCreate = state.manuallyAddedUserCreate.error;
  const successCreate = state.manuallyAddedUserCreate.success;

  const editManuallyAddedUserCallback = async () => {
    setUploading(true);

    let image = manuallyAddedUser?.image;
    if (file?.name) {
      image = await uploadFileToFirebase(file);
    }

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
      history('/admin/manuallyAddedUserList');
      dispatch({ type: MANUALLY_ADD_USER_CREATE_RESET });
      dispatch({ type: MANUALLY_ADD_USER_UPDATE_RESET });
    }
  }, [dispatch, history, successCreate, successUpdate]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/manuallyAddedUserList' color='#121212' />
        <WelcomeText>Board Member {isEditMode ? 'Edit' : 'Create'}</WelcomeText>
      </GoBackAndTitleWrapper>
      {(errorCreate || errorUpdate) && (
        <Message variant='danger'>{errorCreate || errorUpdate}</Message>
      )}
      <EditFormAndPreviewContainer>
        <EditForm>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              type='text'
              value={inputs.name || ''}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
          <UploadSingleImage
            inputs={inputs}
            handleInput={handleInput}
            item={manuallyAddedUser}
            file={file}
            uploading={uploading}
            editPhotoHandler={editPhotoHandler}
          />
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
