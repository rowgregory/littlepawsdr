import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listBlogs } from '../../actions/blogActions';
import Message from '../../components/Message';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { localizeDate } from '../../utils/localizeDate';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { Text } from '../../components/styles/Styles';
import NoBlogs from '../../components/svg/NoBlogs';
import BlogDog from '../../components/assets/blog01.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { Container } from '../../components/styles/shop/Styles';

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
  const {
    blogList: { loading, error, blogs },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  return (
    <>
      <div style={{ position: 'relative', marginTop: '75px' }}>
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
        <Text
          onClick={() =>
            window.open(
              'https://pixabay.com/users/marlyneart-15261801/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4977599',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Martine Auvray
        </Text>
      </div>
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='To Home' url='/' text2='Events' url2='/events' />
          <RightArrow text='Education Tips' url='/about/education' />
        </div>
        {loading && <HexagonLoader />}
        <Text
          marginBottom='48px'
          marginTop='56px'
          fontSize='32px'
          fontWeight={400}
          textAlign='center'
        >
          Litlte Paws blog with the latest updates
        </Text>
      </Container>
      <div
        style={{
          maxWidth: '768px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '128px',
        }}
      >
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : blogs?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-4'>
              <NoBlogs />
            </div>
            <Text>
              Sorry, no blogs available at the moment. Check back soon!
            </Text>
          </div>
        ) : (
          blogs?.map((blog: any, i: number) => (
            <BlogCard
              to={{ pathname: `/about/blog/${blog?._id}`, state: { blog } }}
              key={i}
            >
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
          ))
        )}
      </div>
    </>
  );
};

export default Blog;
