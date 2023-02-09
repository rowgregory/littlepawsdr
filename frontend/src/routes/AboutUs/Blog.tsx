import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listBlogs } from '../../actions/blogActions';
import Message from '../../components/Message';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { localizeDate } from '../../utils/localizeDate';
import { Text } from '../../components/styles/Styles';
import NoBlogs from '../../components/svg/NoBlogs';
import BlogHigh from '../../components/assets/blog-high.jpg';
import BlogLow from '../../components/assets/blog-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { Container } from '../../components/styles/shop/Styles';
import Hero from '../../components/Hero';
import { LoadingImg } from '../../components/LoadingImg';

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
      <Hero
        low={BlogLow}
        high={BlogHigh}
        title='Blog'
        link={`https://pixabay.com/users/marlyneart-15261801/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4977599`}
        photographer='Martine Auvray'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Events' url2='/events' />
          <RightArrow text='Education Tips' url='/about/education' />
        </div>
        <Text
          marginBottom='48px'
          marginTop='56px'
          fontSize='32px'
          fontWeight={400}
          textAlign='center'
        >
          Little Paws blog with the latest updates
        </Text>
      </Container>
      <div
        style={{
          maxWidth: '768px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '64px',
        }}
      >
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : blogs?.length === 0 || blogs === undefined ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-4'>
              <NoBlogs color='#ccc' />
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
                {loading ? (
                  <LoadingImg w='100%' mw='150px' h='100%' />
                ) : (
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
                )}
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
