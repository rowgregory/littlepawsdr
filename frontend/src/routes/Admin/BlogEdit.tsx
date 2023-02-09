import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../../actions/blogActions';
import {
  BLOG_DETAILS_RESET,
  BLOG_UPDATE_RESET,
} from '../../constants/blogConstants';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { useRouteMatch, useHistory } from 'react-router-dom';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { removePhoto } from '../../utils/removePhoto';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import {
  Container,
  EditForm,
  FormFile,
  RemovePhoto,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import RemovePhotoIcon from '../../components/svg/RemovePhotoIcon';
import { defaultImages } from '../../utils/defaultImages';
import BreadCrumb from '../../components/common/BreadCrumb';

const BlogEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const blogId = match.params.id;
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [image, setImage] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [publicId, setPublicId] = useState('');
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;

  const {
    blogDetails: { loading, error, blog },
    blogUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: BLOG_DETAILS_RESET });
    dispatch(getBlogDetails(blogId));
    dispatch({ type: BLOG_UPDATE_RESET });
  }, [dispatch, blogId, successUpdate]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateBlog({
          _id: blogId,
          title,
          article,
          image: cloudinaryData.secureUrl,
          publicId: cloudinaryData.publicId,
        })
      );
    }
  }, [article, blogId, cloudinaryData, dispatch, title]);

  useEffect(() => {
    setTitle(blog?.title);
    setArticle(blog?.article);
    setImage(blog?.image);
    setPublicId(blog?.publicId);
  }, [blog]);

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/blogs');
    }
  }, [successUpdate, submittedForm, history]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setSubmittedForm(true);
    if (file?.name) {
      setUploading(true);
      uploadFileHandler(
        file,
        setUploading,
        publicId,
        setImageUploadStatus,
        setClouadinaryData
      );
    } else {
      dispatch(
        updateBlog({
          _id: blogId,
          title,
          article,
          image,
          publicId,
        })
      );
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      blog.publicId,
      setPublicId,
      dispatch,
      updateBlog,
      blogId,
      setErrorMsg,
      false,
      'blog'
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Blog Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Blogs'
        step4={blog?.title}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/blogs'
      />
      {(error || errorUpdate || errorMsg) && (
        <Message variant='danger'>{error || errorUpdate || errorMsg}</Message>
      )}
      {(loading || loadingUpdate || submittedForm) && <HexagonLoader />}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            className='img-link'
            type='text'
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <div className='d-flex'>
            <FormFile
              id='image-file'
              label={
                blog?.image === defaultImages.blog || file?.name ? (
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
            <RemovePhoto
              onClick={(e: any) =>
                image === defaultImages.blog ? {} : removePhotoHandler(e)
              }
            >
              <RemovePhotoIcon />
              <Text marginLeft='0.75rem' fontWeight='300' color='#c4c4c4'>
                Remove Photo
              </Text>
            </RemovePhoto>
          </div>
        </Form.Group>
        <Form.Group controlId='message' className='mt-5'>
          <Form.Label>Article</Form.Label>
          <Form.Control
            rows={5}
            as='textarea'
            value={article || ''}
            onChange={(e) => setArticle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default BlogEdit;
