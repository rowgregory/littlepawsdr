import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getBlogDetails } from '../../actions/blogActions';
import { LoadingImg, Text } from '../../components/styles/Styles';
import Message from '../../components/Message';
import GoBackBtn from '../../utils/GoBackBtn';

const BlogDetails = () => {
  const match = useRouteMatch() as any;
  const blogId = match.params.id;
  const dispatch = useDispatch();
  const blogDetails = useSelector((state: any) => state.blogDetails);
  let { loading, error, blog } = blogDetails;

  useEffect(() => {
    dispatch(getBlogDetails(blogId));
  }, [blogId, dispatch]);

  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      <GoBackBtn to='/about/blog' />
      <Row>
        <Col md={3}>
          {loading ? (
            <LoadingImg h='380px' w='100%' />
          ) : (
            <Image
              className='mb-3'
              src={blog?.user?.avatar}
              alt='blog-author'
              width='100%'
            />
          )}
        </Col>
        <Col xl={8} lg={9} md={8} sm={12} className='d-flex align-items-center'>
          {loading ? (
            <LoadingImg h='75px' w='100%' />
          ) : (
            <Text
              fontFamily={`Ubunutu, sans-serif`}
              fontSize='2.5rem'
              bold='bold'
            >
              {blog?.title}
            </Text>
          )}
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={3}>
          {loading ? (
            <LoadingImg h='35px' w='100%' />
          ) : (
            <Text
              fontFamily={`Ubuntu, sans-serif`}
              fontSize='1.25rem'
              marginBottom='1rem'
            >
              {blog?.user.name}
            </Text>
          )}
        </Col>
        <Col xl={8} lg={9} md={8} sm={12}>
          {loading ? (
            <LoadingImg w='100%' h='500px' />
          ) : (
            <Text fontFamily='Duru Sans' style={{ whiteSpace: 'pre-line' }}>
              {blog?.article}
            </Text>
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default BlogDetails;