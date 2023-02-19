import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../actions/blogActions';
import {
  BLOG_CREATE_RESET,
  BLOG_UPDATE_RESET,
} from '../../constants/blogConstants';
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
import API from '../../utils/api';
import { defaultImages } from '../../utils/defaultImages';

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
  const history = useHistory();
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;

  const {
    blogUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
    blogCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    },
  } = useSelector((state: any) => state);

  const editBlogCallback = async () => {
    setUploading(true);
    setImageUploadStatus('Uploading to Imgbb');
    const formData = new FormData();
    formData.append('image', file);
    const isFile = file?.name;
    const image = isFile && (await API.uploadImageToImgbb(formData));
    setImageUploadStatus('Image uploaded!');
    setImageUploadStatus(
      isEditMode ? 'Updating ecard details' : 'Creating ecard details'
    );
    if (isEditMode) {
      dispatch(
        updateBlog({
          _id: blog._id,
          title: inputs.title,
          article: inputs.article,
          image: image?.data?.url,
        })
      );
    } else {
      dispatch(
        createBlog({
          title: inputs.title,
          article: inputs.article,
          image: image?.data?.url,
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
      history.push('/admin/blogs');
      dispatch({ type: BLOG_UPDATE_RESET });
      dispatch({ type: BLOG_CREATE_RESET });
    }
  }, [successUpdate, history, successCreate, dispatch]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <WelcomeText className='mb-1'>Blog Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Blogs'
        step4={isEditMode ? 'Update' : 'Create'}
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/blogs'
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
            value={inputs?.title || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            name='image'
            className='img-link'
            type='text'
            value={inputs?.image || ''}
            onChange={handleInput}
          ></Form.Control>
          <div className='d-flex'>
            <FormFile
              id='image-file'
              label={
                blog?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={blog?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                    alt='Blog'
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
          </div>
        </Form.Group>
        <Form.Group controlId='message' className='mt-5'>
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
