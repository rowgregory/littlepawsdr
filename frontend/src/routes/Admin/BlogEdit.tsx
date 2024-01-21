import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../actions/blogActions';
import { BLOG_CREATE_RESET, BLOG_UPDATE_RESET } from '../../constants/blogConstants';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';
import BlogEditCreateLayout from '../../components/dashboard/dashboard2024/layouts/BlogEditCreateLayout';

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

  const { inputs, handleInput, onSubmit } = useBlogEditForm(editBlogCallback, blog);

  useEffect(() => {
    if (successCreate || successUpdate) {
      history('/admin/blogs');
      dispatch({ type: BLOG_UPDATE_RESET });
      dispatch({ type: BLOG_CREATE_RESET });
    }
  }, [successUpdate, history, successCreate, dispatch]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <BlogEditCreateLayout
      error={errorUpdate || errorCreate}
      box1={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Blog {isEditMode ? 'Edit' : 'Create'}
        </Text>
      }
      box2={<GoBackBtn to='/admin/blogs' color='#121212' />}
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
          item={blog}
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
            value={inputs?.title || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box6={
        <FormGroup controlId='message' className=''>
          <FormLabel>Article</FormLabel>
          <FormControl
            className='p-3'
            name='article'
            rows={5}
            as='textarea'
            value={inputs?.article || ''}
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

export default BlogEdit;
