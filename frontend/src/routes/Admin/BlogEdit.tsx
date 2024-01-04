import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../actions/blogActions';
import {
  BLOG_CREATE_RESET,
  BLOG_UPDATE_RESET,
} from '../../constants/blogConstants';
import { UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import {
  Container,
  EditForm,
} from '../../components/styles/admin/Styles';
import {
  GoBackAndTitleWrapper,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';

const useBlogEditForm = (callback?: any, data?: any) => {
  const values = {
    title: '',
    article: '',
    image: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        title: data?.title,
        article: data?.article,
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

const BlogEdit = () => {
  const {
    state: { blog, isEditMode },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;

  const state = useSelector((state: any) => state);
  const loadingUpdate = state.blogUpdate.loading;
  const errorUpdate = state.blogUpdate.error;
  const successUpdate = state.blogUpdate.success;
  const loadingCreate = state.blogCreate.loading;
  const errorCreate = state.blogCreate.error;
  const successCreate = state.blogCreate.success;

  const editBlogCallback = async () => {
    setUploading(true);
    let image = blog?.image;
    if (file?.name) {
      image = await uploadFileToFirebase(file);
    }

    if (isEditMode) {
      dispatch(
        updateBlog({
          _id: blog._id,
          title: inputs.title,
          article: inputs.article,
          image,
        })
      );
    } else {
      dispatch(
        createBlog({
          title: inputs.title,
          article: inputs.article,
          image,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useBlogEditForm(
    editBlogCallback,
    blog
  );

  useEffect(() => {
    if (successCreate || successUpdate) {
      history('/admin/blogs');
      dispatch({ type: BLOG_UPDATE_RESET });
      dispatch({ type: BLOG_CREATE_RESET });
    }
  }, [successUpdate, history, successCreate, dispatch]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/blogs' color='#121212' />
        <WelcomeText>
          Blog {isEditMode ? 'Edit' : 'Create'}
        </WelcomeText>
      </GoBackAndTitleWrapper>
      {(errorCreate || errorUpdate) && (
        <Message variant='danger'>{errorCreate || errorUpdate}</Message>
      )}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type='text'
            value={inputs?.title || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <UploadSingleImage
          inputs={inputs}
          handleInput={handleInput}
          item={blog}
          file={file}
          uploading={uploading}
          editPhotoHandler={editPhotoHandler}
        />
        <Form.Group controlId='message'>
          <Form.Label>Article</Form.Label>
          <Form.Control
            name='article'
            rows={5}
            as='textarea'
            value={inputs?.article || ''}
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

export default BlogEdit;
