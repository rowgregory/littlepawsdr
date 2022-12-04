import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';

const BlogDetails = ({ location }: any) => {
  const { blog } = location.state;

  return (
    <>
      <div style={{ background: '#f6f9fe' }} className='mb-3'>
        <div
          style={{
            position: 'relative',
            marginTop: '75px',
            marginInline: 'auto',
            maxWidth: '980px',
          }}
        >
          <Image
            src={blog?.image}
            width='100%'
            style={{ height: '600px', objectFit: 'cover' }}
          />
          <Text
            fontWeight={500}
            fontSize='48px'
            color='#fff'
            style={{
              position: 'absolute',
              top: '200px',
              left: '50px',
              zIndex: 2,
            }}
          >
            Blog
          </Text>
        </div>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <LeftArrow text='Back to blogs' url='/about/blog' />
        <Row className='mt-5'>
          <Col md={2}>
            <Image
              className='mb-3'
              src={blog?.user?.avatar}
              alt='blog-author'
              width='100%'
              height='100px'
              style={{ objectFit: 'cover', maxWidth: '100px' }}
            />
          </Col>
          <Col
            xl={8}
            lg={9}
            md={8}
            sm={12}
            className='d-flex align-items-center'
          >
            <Text fontSize='24px' fontWeight='400'>
              {blog?.title}
            </Text>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col md={2}>
            <Text fontSize='14px' fontWeight={400} marginBottom='16px'>
              {blog?.user?.name}
            </Text>
          </Col>
          <Col xl={8} lg={9} md={8} sm={12}>
            <Text style={{ whiteSpace: 'pre-line' }}>{blog?.article}</Text>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </>
  );
};

export default BlogDetails;
