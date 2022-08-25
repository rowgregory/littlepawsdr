import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import { listBlogs } from '../../actions/blogActions';
import Message from '../../components/Message';
import { Col, Image, Row } from 'react-bootstrap';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { LoadingImg } from '../../components/styles/Styles';
import { localizeDate } from '../../utils/localizeDate';

const BlogTitle = styled.div<{ isnight: boolean }>`
  font-size: 3rem;
  text-align: center;
  height: 15rem;
  width: 100%;
  transition: 300ms;
  background: ${({ isnight, theme }) =>
    `-webkit-linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`};
  background: ${({ isnight, theme }) =>
    `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`};
  color: ${({ theme }) => theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Col)`
  margin: 5rem auto 0;
`;

const ArticleContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;
  transition: 300ms;
  :hover {
    filter: brightness(1.2);
  }
`;

const ImagePlaceHolder = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 150px;
  height: 150px;
`;

const ContentContainer = styled.div`
  padding: 0 0.5rem 0.5rem 1.25rem;
  width: 100%;
`;

const Date = styled.div`
  font-style: italic;
  font-size: 0.35remn;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  transition: 300ms;
  :hover {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
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
  const { loading: loadingBlogList, error: errorBlogList, blogs } = blogList;

  const productList = useSelector((state: any) => state.productList);
  const {
    loading: loadingProductList,
    error: errorProductList,
    products,
  } = productList;

  useEffect(() => {
    dispatch(listBlogs());
    dispatch(listProducts());
  }, [dispatch]);

  const theme = useTheme() as any;

  return errorBlogList || errorProductList ? (
    <Message variant='danger'>{errorBlogList}</Message>
  ) : (
    <>
      <BlogTitle isnight={theme.mode === 'night'}>Blog</BlogTitle>
      <Row style={{ margin: '0 auto' }} className='pl-0'>
        <Container md={8} className='px-0'>
          {loadingBlogList
            ? [1, 2, 3, 4].map((i: number) => (
                <div key={i} style={{ marginBottom: '5rem' }}>
                  <LoadingImg h='160px' w='100%' />
                </div>
              ))
            : blogs.map((blog: any, i: number) => (
                <StyledLink to={`/about/blog/${blog._id}`} key={i}>
                  <ArticleContainer>
                    <ImagePlaceHolder>
                      <Image
                        src={blog?.image}
                        alt='Blog'
                        width='100%'
                        height='100%'
                        style={{ objectFit: 'cover' }}
                      />
                    </ImagePlaceHolder>
                    <ContentContainer>
                      <Date>{localizeDate(blog?.createdAt)}</Date>
                      <Title>{blog?.title}</Title>
                      <div className='mb-3'>By {blog?.user?.name}</div>
                      <div>{reduceArticleLengthIfTooBig(blog?.article)}</div>
                    </ContentContainer>
                  </ArticleContainer>
                  <HorizontalLine />
                </StyledLink>
              ))}
        </Container>
        <Container md={4} className='pr-0'>
          {loadingProductList ? (
            <LoadingImg h='50%' w='100%' />
          ) : (
            products
              ?.map((product: any, i: number) => (
                <Link
                  to={`/shop/product/${product._id}`}
                  style={{ position: 'relative', cursor: 'pointer' }}
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
                      padding: '0.5rem 1rem',
                    }}
                  >
                    {product?.name}
                  </div>
                </Link>
              ))
              .filter((_: any, i: number) => i < 4)
          )}
        </Container>
      </Row>
    </>
  );
};

export default Blog;
