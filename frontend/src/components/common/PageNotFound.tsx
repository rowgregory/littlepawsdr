import React, { FC } from 'react';
import { StyledLink } from '../../routes/Login';
import { StyledCard, Text } from '../styles/Styles';

const PageNotFound: FC = (): JSX.Element => (
  <StyledCard className='p-5'>
    <Text fontSize='2rem' className='mb-4'>
      Oh snap! This page could not be found
    </Text>
    <Text>The requested URL does not exist or is temporarily unavailable.</Text>
    <StyledLink to='/'>Go to home page</StyledLink>
  </StyledCard>
);

export default PageNotFound;
