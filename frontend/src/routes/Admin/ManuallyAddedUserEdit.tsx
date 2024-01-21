import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text, UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateManuallyAddedUser } from '../../actions/manuallyAddUserActions';
import {
  MANUALLY_ADD_USER_CREATE_RESET,
  MANUALLY_ADD_USER_UPDATE_RESET,
} from '../../constants/manuallyAddUserConstants';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';
import { CardTheme, ProfileCardImg } from '../../components/styles/profile/Styles';
import { themes } from '../../utils/profileCardThemes';
import { STATES } from '../../utils/states';
import { manuallyAddUser } from '../../actions/manuallyAddUserActions';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';
import BoardMemberEditCreateLayout from '../../components/dashboard/dashboard2024/layouts/BoardMemberEditCreateLayout';

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
    <BoardMemberEditCreateLayout
      error={errorUpdate || errorCreate}
      box1={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Board Member {isEditMode ? 'Edit' : 'Create'}
        </Text>
      }
      box2={<GoBackBtn to='/admin/manuallyAddedUserList' color='#121212' />}
      box3={
        loadingUpdate || loadingCreate ? (
          <Spinner animation='border' size='sm' />
        ) : (
          errorUpdate ||
          (errorCreate && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorUpdate || errorCreate}
            </Text>
          ))
        )
      }
      box4={
        <UploadSingleImage
          inputs={inputs}
          handleInput={handleInput}
          item={manuallyAddedUser}
          file={file}
          uploading={uploading}
          editPhotoHandler={editPhotoHandler}
        />
      }
      box5={
        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl name='name' type='text' value={inputs.name || ''} onChange={handleInput}></FormControl>
        </FormGroup>
      }
      box6={
        <FormGroup controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            name='email'
            type='text'
            value={inputs.email || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box7={
        <FormGroup controlId='state'>
          <FormLabel>State</FormLabel>
          <FormControl name='location' value={inputs.location || ''} as='select' onChange={handleInput}>
            {STATES.map((state: any, i: number) => (
              <option style={{ color: '#777' }} key={i}>
                {state.text}
              </option>
            ))}
          </FormControl>
        </FormGroup>
      }
      box8={
        <FormGroup controlId='affiliation'>
          <FormLabel>Affiliation</FormLabel>
          <FormControl
            name='affiliation'
            type='text'
            value={inputs.affiliation || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box9={
        <FormGroup controlId='message'>
          <FormLabel>Bio</FormLabel>
          <FormControl
            name='bio'
            rows={5}
            as='textarea'
            value={inputs.bio || ''}
            onChange={handleInput}
            className='pt-3 px-3'
          ></FormControl>
        </FormGroup>
      }
      box10={
        <FormGroup controlId='profileCardTheme'>
          <FormLabel>Profile card theme</FormLabel>
          <Flex flexWrap='wrap' height='300px' style={{ overflowY: 'scroll' }}>
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
          </Flex>
        </FormGroup>
      }
      box11={
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      }
    />
  );
};

export default ManuallyAddedUserEdit;
