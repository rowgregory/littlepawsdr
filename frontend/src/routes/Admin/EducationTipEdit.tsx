import { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEducationTip,
  updateEducationTip,
} from '../../actions/educationTipActions';
import {
  EDUCATION_TIP_CREATE_RESET,
  EDUCATION_TIP_UPDATE_RESET,
} from '../../constants/educationTipConstants';
import { UpdateBtn } from '../../components/styles/Styles';
import { useHistory, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import {
  Container,
  EditForm,
  FormFile,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import BreadCrumb from '../../components/common/BreadCrumb';
import { defaultImages } from '../../utils/defaultImages';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;

  const {
    educationTipCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    },
    educationTipUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

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

  const { inputs, handleInput, onSubmit } = useEcardEditForm(
    editETipCallback,
    eTip
  );

  useEffect(() => {
    if (successCreate || successUpdate) {
      history.push('/admin/education-tips');
      dispatch({ type: EDUCATION_TIP_UPDATE_RESET });
      dispatch({ type: EDUCATION_TIP_CREATE_RESET });
    }
  }, [dispatch, history, successCreate, successUpdate]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <WelcomeText className='mb-1'>Education Tip Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Education Tips'
        step4={eTip?.title}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/education-tips'
      />
      {(errorCreate || errorUpdate) && (
        <Message variant='danger'>{errorCreate || errorUpdate}</Message>
      )}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type='text'
            value={inputs.title || ''}
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
                eTip?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={eTip?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                    alt='Education Tip'
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
          </div>
        </Form.Group>
        <Form.Group controlId='externalLink' className='mt-5'>
          <Form.Label>Link</Form.Label>
          <Form.Control
            name='externalLink'
            type='text'
            value={inputs.externalLink || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default EducationTipEdit;
