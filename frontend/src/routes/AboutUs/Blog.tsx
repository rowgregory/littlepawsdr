import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listBlogs } from '../../actions/blogActions';
import Message from '../../components/Message';
import { Col, Image, Row } from 'react-bootstrap';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { localizeDate } from '../../utils/localizeDate';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { Text } from '../../components/styles/Styles';
import NoBlogs from '../../components/svg/NoBlogs';
import BlogDog from '../../components/assets/blog_dog01.jpg';

const Container = styled(Col)`
  margin: 96px auto 128px;
`;

const ArticleContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  transition: 300ms;
  background: ${({ theme }) => theme.bg};
  padding: 16px;
  :hover {
    filter: brightness(1.1);
  }
`;

const ContentContainer = styled.div`
  padding: 0 8px 8px 24px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.quinary};
`;

const BlogCard = styled(Link)`
  transition: 300ms;
  cursor: pointer;
  position: relative;
  :hover {
    text-decoration: none;

    .title {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const reduceArticleLengthIfTooBig = (article: string) => {
  const articleCharLength = article.replace(/[^a-zA-Z]/g, '').length;
  if (articleCharLength > 300)
    return `${article.substring(0, 400)}... read more`;
  return `${article}... read more`;
};

const Blog = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state: any) => state.blogList);
  let { loading: loadingBlogList, error: errorBlogList, blogs } = blogList;
  blogs = [];
  useEffect(() => {
    dispatch(listBlogs());
    dispatch(listProducts());
  }, [dispatch]);

  if (blogs?.length === 0) {
    return (
      <div
        style={{
          height: 'calc(100vh - 475.5px)',
          width: '100%',
          padding: '56px 16px',
          marginInline: 'auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <NoBlogs />
        <Text fontSize='16px'>No Blogs at this time. Check back soon!</Text>
        <Text fontSize='16px'>
          Head on over and take a look at our{' '}
          <span style={{ fontSize: '16px' }}>
            <Link to='/shop'>shop</Link>
          </span>{' '}
          or check out our{' '}
          <span style={{ fontSize: '16px' }}>
            <Link to='/events'>events</Link>
          </span>
          .
        </Text>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={BlogDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
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
      <div
        style={{
          background: '#f7f7f7',
          // maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          // marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div style={{ maxWidth: '980px', width: '100%', marginInline: 'auto' }}>
          {errorBlogList && <Message variant='danger'>{errorBlogList}</Message>}
          {loadingBlogList && <HexagonLoader />}
          <Row style={{ margin: '0 auto' }} className='pl-0'>
            <Container md={9} className='px-0'>
              {blogs?.map((blog: any, i: number) => (
                <BlogCard to={`/about/blog/${blog?._id}`} key={i}>
                  <ArticleContainer>
                    <Image
                      src={blog?.image}
                      alt='Blog'
                      width='100%'
                      height='100%'
                      style={{
                        objectFit: 'cover',
                        aspectRatio: '1/1',
                        maxWidth: '150px',
                      }}
                    />
                    <ContentContainer>
                      <Text fontStyle='italic'>
                        {localizeDate(blog?.createdAt)}
                      </Text>
                      <Title className='title'>{blog?.title}</Title>
                      <Text fontSize='11px' className='mb-3'>
                        By {blog?.user?.name}
                      </Text>
                      <Text>{reduceArticleLengthIfTooBig(blog?.article)}</Text>
                    </ContentContainer>
                  </ArticleContainer>
                </BlogCard>
              ))}
            </Container>
            {/* <Container md={3} className='pr-0'>
              {products
                ?.map((product: any, i: number) => (
                  <Link
                    to={`/shop/product/${product._id}`}
                    key={i}
                    className='mx-auto d-flex align-items-center flex-column mb-3'
                  >
                    <Image
                      src={product?.image}
                      alt='product'
                      width='100%'
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        padding: '8px 1rem',
                      }}
                    >
                      {product?.name}
                    </div>
                  </Link>
                ))
                .filter((_: any, i: number) => i < 4)}
            </Container> */}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Blog;
