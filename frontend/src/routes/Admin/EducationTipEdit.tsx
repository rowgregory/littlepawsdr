import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createEducationTip, updateEducationTip } from '../../actions/educationTipActions';
import {
  EDUCATION_TIP_CREATE_RESET,
  EDUCATION_TIP_UPDATE_RESET,
} from '../../constants/educationTipConstants';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';
import EducationTipEditCreateLayout from '../../components/dashboard/dashboard2024/layouts/EducationTipEditCreateLayout';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';

const useEcardEditForm = (callback?: any, data?: any) => {
  const values = {
    title: '',
    externalLink: '',
    image: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        title: data?.title,
        externalLink: data?.externalLink,
        image: data?.image,
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

const EducationTipEdit = () => {
  const {
    state: { eTip, isEditMode },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;

  const state = useSelector((state: any) => state);
  const loadingUpdate = state.educationTipUpdate.loading;
  const successUpdate = state.educationTipUpdate.success;
  const errorUpdate = state.educationTipUpdate.error;

  const loadingCreate = state.educationTipCreate.loading;
  const successCreate = state.educationTipCreate.success;
  const errorCreate = state.educationTipCreate.error;

  const editETipCallback = async () => {
    setUploading(true);
    let image = eTip?.image;
    if (file?.name) {
      image = await uploadFileToFirebase(file);
    }

    if (isEditMode) {
      dispatch(
        updateEducationTip({
          _id: eTip._id,
          title: inputs.title,
          image,
          externalLink: inputs.externalLink,
        })
      );
    } else {
      dispatch(
        createEducationTip({
          title: inputs.title,
          image,
          externalLink: inputs.externalLink,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useEcardEditForm(editETipCallback, eTip);

  useEffect(() => {
    if (successCreate || successUpdate) {
      history('/admin/education-tips');
      dispatch({ type: EDUCATION_TIP_UPDATE_RESET });
      dispatch({ type: EDUCATION_TIP_CREATE_RESET });
    }
  }, [dispatch, history, successCreate, successUpdate]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <EducationTipEditCreateLayout
      error={errorUpdate || errorCreate}
      box1={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Education Tip {isEditMode ? 'Edit' : 'Create'}
        </Text>
      }
      box2={<GoBackBtn to='/admin/education-tips' color='#121212' />}
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
          item={eTip}
          file={file}
          uploading={uploading}
          editPhotoHandler={editPhotoHandler}
        />
      }
      box5={
        <FormGroup controlId='title'>
          <FormLabel>Title</FormLabel>
          <FormControl
            name='title'
            type='text'
            value={inputs.title || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box6={
        <FormGroup controlId='externalLink'>
          <FormLabel>Link</FormLabel>
          <FormControl
            name='externalLink'
            type='text'
            value={inputs.externalLink || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box7={
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      }
    />
  );
};

export default EducationTipEdit;
