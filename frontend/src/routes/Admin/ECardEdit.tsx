import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createECard, updateECard } from '../../actions/eCardActions';
import {
  ECARD_CREATE_RESET,
  ECARD_UPDATE_RESET,
} from '../../constants/eCardConstants';
import { UpdateBtn } from '../../components/styles/Styles';
import { eCardCategories } from '../../utils/eCardCategories';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import { Container, EditForm } from '../../components/styles/admin/Styles';
import {
  GoBackAndTitleWrapper,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';

const useEcardEditForm = (callback?: any, data?: any) => {
  const values = {
    name: '',
    category: '',
    price: 0,
    image: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data?.name,
        category: data?.category,
        price: data?.price,
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

const ECardEdit = () => {
  const {
    state: { eCard, isEditMode },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;

  const state = useSelector((state: any) => state);

  const loadingUpdate = state.ecardUpdate.loading;
  const errorUpdate = state.ecardUpdate.error;
  const successUpdate = state.ecardUpdate.success;

  const loadingCreate = state.ecardCreate.loading;
  const errorCreate = state.ecardCreate.error;
  const successCreate = state.ecardCreate.success;

  const editEcardCallback = async () => {
    setUploading(true);

    let image = eCard?.image;
    if (file?.name) {
      image = await uploadFileToFirebase(file);
    }

    if (isEditMode) {
      dispatch(
        updateECard({
          _id: eCard._id,
          category: inputs.category,
          price: inputs.price,
          name: inputs.name,
          image,
        })
      );
    } else {
      dispatch(
        createECard({
          category: inputs.category,
          price: inputs.price,
          name: inputs.name,
          image,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useEcardEditForm(
    editEcardCallback,
    eCard
  );

  useEffect(() => {
    if (successCreate || successUpdate) {
      history('/admin/eCardList');
      dispatch({ type: ECARD_UPDATE_RESET });
      dispatch({ type: ECARD_CREATE_RESET });
    }
  }, [successCreate, successUpdate, history, dispatch]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/eCardList' color='#121212' />
        <WelcomeText>Ecard {isEditMode ? 'Edit' : 'Create'}</WelcomeText>
      </GoBackAndTitleWrapper>
      {(errorUpdate || errorCreate) && (
        <Message variant='danger'>{errorUpdate || errorCreate}</Message>
      )}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type='text'
            value={inputs?.name || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            name='category'
            as='select'
            value={inputs?.category || 'Choose One'}
            onChange={handleInput}
          >
            {eCardCategories?.map((category, i) => (
              <option key={i}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name='price'
            min={1}
            type='number'
            value={inputs?.price || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <UploadSingleImage
          inputs={inputs}
          handleInput={handleInput}
          item={eCard}
          file={file}
          uploading={uploading}
          editPhotoHandler={editPhotoHandler}
        />
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ECardEdit;
