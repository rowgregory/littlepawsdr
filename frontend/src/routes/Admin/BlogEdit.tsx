import React, { useEffect, useMemo, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../../actions/blogActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { BLOG_UPDATE_RESET } from '../../constants/blogConstants';
import {
  StyledUloadedImg,
  Text,
  UpdateBtn,
} from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { EditBtn } from './RaffleWinnerEdit';
import { FormFile } from './EventEdit';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { removePhoto } from '../../utils/removePhoto';

const BlogRow = styled(Row)`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

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
  const {
    loading: loadingBlogDetails,
    error: errorBlogDetails,
    blog,
  } = blogDetails;

  const blogUpdate = useSelector((state: any) => state.blogUpdate);
  const {
    loading: loadingBlogUpdate,
    error: errorBlogUpdate,
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

  return (
    <>
      <GoBackBtn to='/admin/blogs' />
      {errorMsg !== '' && <Message variant='danger'>{errorMsg}</Message>}
      <FormContainer>
        {errorBlogUpdate && (
          <Message variant='danger'>{errorBlogUpdate}</Message>
        )}
        {loadingBlogDetails ? (
          <Loader />
        ) : errorBlogDetails ? (
          <Message variant='danger'>{errorBlogDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <BlogRow>
              <Col xl={8} md={12}>
                <Form.Group controlId='name'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
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
                    <div style={{ position: 'relative' }}>
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
                <Form.Group controlId='message' className='mt-5'>
                  <Form.Label>Article</Form.Label>
                  <Form.Control
                    rows={5}
                    as='textarea'
                    value={article || ''}
                    onChange={(e) => setArticle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </BlogRow>
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
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogEdit;
