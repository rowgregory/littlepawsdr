import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../../actions/blogActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { BLOG_UPDATE_RESET } from '../../constants/blogConstants';
import {
  LoadingImg,
  StyledUloadedImg,
  Text,
  UpdateBtn,
} from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { EditBtn } from './RaffleWinnerEdit';
import { FormFile } from './EventEdit';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { removePhoto } from '../../utils/removePhoto';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const BlogEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const blogId = match.params.id;
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [blogImg, setBlogImg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [publicId, setPublicId] = useState('');

  const blogDetails = useSelector((state: any) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogUpdate = useSelector((state: any) => state.blogUpdate);
  const {
    loading: loadingBlogUpdate,
    error: errorUpdate,
    success: successBlogUpdate,
  } = blogUpdate;

  useMemo(() => {
    dispatch(getBlogDetails(blogId));
  }, [blogId, dispatch]);

  useEffect(() => {
    if (successBlogUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/blogs');
      }
      dispatch(getBlogDetails(blogId));
      dispatch({ type: BLOG_UPDATE_RESET });
    } else {
      setTitle(blog?.title);
      setArticle(blog?.article);
      setBlogImg(blog?.image);
      setPublicId(blog?.publicId);
    }
  }, [dispatch, history, blog, blogId, submittedForm, successBlogUpdate]);

  useEffect(() => {
    if (error || errorUpdate || errorMsg) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(error || errorUpdate || errorMsg, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorUpdate, error, errorMsg]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        _id: blogId,
        title,
        article,
        image: blogImg,
        publicId,
      })
    );
    setSubmittedForm(true);
  };

  const uploadBlogImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1641507406/img-placeholder.png';

  const blogDataToUploadWithImg = {
    title,
    article,
  };

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/blogs' />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-4 mt-4 d-flex justify-content-center align-items-center'>
              <LoadingImg w='200px' h='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Blog image</Form.Label>
              <div className='mx-auto'>
                <Form.Control
                  className='img-link'
                  type='text'
                  value={blogImg || ''}
                  onChange={(e) => setBlogImg(e.target.value)}
                ></Form.Control>
                <StyledUloadedImg
                  src={blogImg || ''}
                  alt='avatar'
                  onClick={() => setShowImageOptions(!showImageOptions)}
                />
                <div style={{ position: 'relative' }}>
                  {uploading && (
                    <Loader
                      w='200px'
                      h='200px'
                      p='absolute'
                      z='1'
                      top='-200px'
                      left='0px'
                    />
                  )}
                  <EditBtn
                    top='-45px'
                    left='0px'
                    onClick={() => {
                      setShowImageOptions(!showImageOptions);
                    }}
                  >
                    <i className='fas fa-edit mr-2'></i>Edit
                  </EditBtn>
                  {showImageOptions && (
                    <EditBtn
                      top='-17px'
                      left='0px'
                      className='d-flex flex-column imgOptions'
                    >
                      <FormFile
                        mb={(blogImg !== uploadBlogImgUrl).toString()}
                        id='image-file'
                        label='Upload a photo...'
                        onChange={(e: any) =>
                          uploadFileHandler(
                            e,
                            setUploading,
                            setShowImageOptions,
                            setErrorMsg,
                            setPublicId,
                            updateBlog,
                            dispatch,
                            publicId,
                            blogId,
                            blogDataToUploadWithImg,
                            '',
                            blogImg,
                            () => {},
                            setBlogImg,
                            'blog'
                          )
                        }
                      ></FormFile>
                      {blogImg !== uploadBlogImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              blog.publicId,
                              setPublicId,
                              dispatch,
                              updateBlog,
                              blogId,
                              setErrorMsg,
                              false,
                              'blog'
                            )
                          }
                        >
                          Remove photo
                        </div>
                      )}
                    </EditBtn>
                  )}
                </div>
              </div>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='100%' h='10rem' />
            </div>
          ) : (
            <Form.Group controlId='message' className='mt-5'>
              <Form.Label>Article</Form.Label>
              <Form.Control
                rows={5}
                as='textarea'
                value={article || ''}
                onChange={(e) => setArticle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}

          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='8rem' h='2.5rem' borderRadius='0.5rem' />
            </div>
          ) : (
            <UpdateBtn type='submit'>
              {loadingBlogUpdate ? (
                <div className='d-flex align-items-center'>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <Text className='text-white ml-2'>Updating...</Text>
                </div>
              ) : (
                <Text className='text-white'>Update</Text>
              )}
            </UpdateBtn>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default BlogEdit;
