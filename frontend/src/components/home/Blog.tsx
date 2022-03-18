import React from 'react';
import {
  HomeLink,
  ParallaxContent,
  SectionContainer,
  SectionTitle,
} from '../../components/home/styles';
import { Parallax } from 'react-parallax';

const Blog = () => {
  return (
    <SectionContainer>
      <SectionTitle>Blog</SectionTitle>
      <Parallax
        bgImage='https://res.cloudinary.com/doyd0ewgk/image/upload/v1643757166/PNG_image-702C7F100232-1.png'
        strength={600}
      >
        <div style={{ height: 650 }}>
          <ParallaxContent>
            <div className='support'>KEEP UP TO DATE</div>
            <div className='browse'>Latest Little Paws News</div>
            <HomeLink to='/about/blog'>Go To Blog</HomeLink>
          </ParallaxContent>
        </div>
      </Parallax>
    </SectionContainer>
  );
};

export default Blog;
