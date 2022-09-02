import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionContainer, SectionTitle } from '../../components/home/styles';
import { listBlogs } from '../../actions/blogActions';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import toast from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../../components/LoadingImg';

const BlogsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StyledBlog = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  img {
    border-radius: 12px 12px 0 0;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-bottom: 0rem;
  }
`;

const BlogBody = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.secondaryBg};
  min-height: 275px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 0 0 12px 12px;
`;

const BlogTitle = styled.div`
  font-weight: 900;
  letter-spacing: -1px;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ReadMoreLink = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.tertiary};
  width: fit-content;
  color: ${({ theme }) => theme.white};
  font-family: 'Ubuntu', sans-serif;
  transitino: 300ms;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.white};
    filter: brightness(1.1);
  }
`;

const Blog = () => {
  const dispatch = useDispatch();
  const blogList = useSelector((state: any) => state.blogList);
  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  useEffect(() => {
    error &&
      toast.notify(({ onClose }) => ToastAlert(error, onClose, 'error'), {
        position: 'bottom-left',
      });
  }, [error]);

  return (
    <SectionContainer>
      <SectionTitle to='/about/blog'>Blog</SectionTitle>

      {loading ? (
        <BlogsContainer>
          {[1, 2, 3, 4].map((num) => (
            <LoadingImg key={num} w='100%' h='475px' />
          ))}
        </BlogsContainer>
      ) : blogs?.length === 0 ? (
        <div>
          <Text textAlign='center'>Check back soon!</Text>
        </div>
      ) : (
        <BlogsContainer>
          {blogs
            ?.map((blog: any) => (
              <StyledBlog key={blog?._id}>
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  width='100%'
                  height='200px'
                  style={{ objectFit: 'cover' }}
                />
                <BlogBody>
                  <div>
                    <BlogTitle>{blog?.title}</BlogTitle>
                    <Text marginBottom='1.25rem'>
                      {blog?.article.substring(0, 100)}
                    </Text>
                  </div>
                  <ReadMoreLink to={`/about/blog/${blog._id}`}>
                    Read more
                  </ReadMoreLink>
                </BlogBody>
              </StyledBlog>
            ))
            .filter((_: any, i: number) => i < 4)}
        </BlogsContainer>
      )}
    </SectionContainer>
  );
};

export default Blog;
