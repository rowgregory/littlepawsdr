import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../utils/formatDate';
import Loader from '../../Loader';
import Message from '../../Message';
import { Text } from '../../styles/Styles';
import { useHistory } from 'react-router-dom';
import { listBlogs } from '../../../actions/blogActions';
import { VerticalSection } from './VerticalSection';
import styled from 'styled-components';
import { reduceArticleLengthIfTooBig } from '../../../routes/AboutUs/Blog';

export const NewsArticleWrapper = styled.div`
  padding: 2rem 3rem;
  cursor: pointer;
  width: 100%;
  height: 180px;
  background: rgba(20, 20, 20, 0.8);
  border-radius: 1.25rem;
  :hover {
    filter: brightness(1.25);
  }
`;

export const ArticleTitle = styled.div`
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #fff;
  font-weight: bold;
  :first-letter {
    font-size: 2rem;
  }
`;

export const NewsArticleContainer = styled.div`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LatestContainer = styled.div`
  max-width: 980px;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin: 0 auto;
  perspective: 1000px;
  -webkit-perspective: 1000px;
  grid-gap: 1rem;
`;

const Articles = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const newsArticleList = useSelector((state: any) => state.newsArticleList);
  const {
    loading: loadingNewsArticleList,
    error: errorNewsArticleList,
    newsArticles,
  } = newsArticleList;
  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);
  return (
    <NewsArticleContainer>
      {loadingNewsArticleList ? (
        <Loader />
      ) : errorNewsArticleList ? (
        <Message variant='danger'>{errorNewsArticleList}</Message>
      ) : (
        <>
          <VerticalSection title='THE LATEST' />
          <LatestContainer>
            {newsArticles?.map((news: any) => (
              <NewsArticleWrapper
                key={news?.title}
                onClick={() => history.push(`/news-article/${news._id}`)}
              >
                <Text marginBottom='0.75rem' fontSize='14px' color='#fff'>
                  <em>{formatDate(news?.createdAt)}</em>
                </Text>
                <ArticleTitle className='article-title'>
                  {news.title}
                </ArticleTitle>
                <Text marginBottom='3rem' fontSize='1rem' color='#fff'>
                  {reduceArticleLengthIfTooBig(news?.article)}
                </Text>
              </NewsArticleWrapper>
            ))}
          </LatestContainer>
        </>
      )}
    </NewsArticleContainer>
  );
};

export default Articles;
