import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Dog404 from '../../components/assets/404_dog01.png';
import { Text } from '../styles/Styles';

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Link404 = styled(Link)`
  color: ${({ theme }) => theme.colors.quinary};
  font-weight: 400;
  font-size: 18px;
  padding: 12px 28px;
  transition: 300ms;
  filter: drop-shadow(0px 8px 5px rgb(0 0 0/0.4));
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const linkSet = [
  {
    linkText: 'Volunteer',
    linkKey: '/volunteer/volunteer-application',
  },
  {
    linkText: 'Little Paws Crew',
    linkKey: '/about/team-members',
  },
  {
    linkText: 'Adoption Fees',
    linkKey: '/adopt/fees',
  },
  {
    linkText: 'Rainbow Bridge',
    linkKey: '/about/rainbow-bridge',
  },
];

const PageNotFound = () => (
  <Container>
    <Image
      src={Dog404}
      style={{
        maxWidth: '500px',
        width: '100%',
        marginTop: '22px',
        objectFit: 'cover',
        height: '300px',
      }}
    />
    <Text>I think you may be looking for one of these pages.</Text>
    <div className='d-flex'>
      {linkSet.map((obj: any, i: number) => (
        <Link404 key={i} to={obj.linkKey}>
          {obj.linkText}
        </Link404>
      ))}
    </div>
  </Container>
);

export default PageNotFound;
