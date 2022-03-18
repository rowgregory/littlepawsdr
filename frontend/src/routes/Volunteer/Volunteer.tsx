import React, { FC } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import { Text } from '../../components/styles/Styles';
import { Tab, TabContainer } from '../Adopt/Adoption';

const Container = styled.div`
  margin: 0 48px;
`;

const Volunteer: FC<{
  tabCategory: string;
  setTabCategory: (tabCategory: string) => void;
}> = ({ tabCategory, setTabCategory }) => {
  const history = useHistory();
  const { pathname: path } = useLocation();
  return (
    <Container>
      <div className='mb-5'>
        <Text fontFamily={`Ubunutu, sans-serif`} fontSize='2rem'>
          Get Involved!
        </Text>
        <Text fontFamily={`Duru Sans`}>
          Would you like to donate to Little Paws?{' '}
          <Link to='/donate'>Go to our donation page!</Link> Or would you rather
          give to Little Paws as you do your daily online shopping?{' '}
          <Link to={{ pathname: '/donate', search: `?Shop to Help` }}>
            Visit our Shop to Help page to learn more.
          </Link>
        </Text>
      </div>
      <div className='mb-5'>
        <Text fontFamily={`Ubunutu, sans-serif`} fontSize='2rem'>
          Join the Little Paws Family!
        </Text>
        <Text fontFamily={`Duru Sans`} marginBottom='1rem'>
          We are always seeking new volunteers or fosters! Visit our{' '}
          <Link to='volunteer/foster-application'>Foster Application</Link> or
          our <Link to='/volunteer/application'>Volunteer Application</Link>{' '}
          page.
        </Text>
        <Text fontFamily={`Duru Sans`}>
          Are you crafty? We need your help! We are also looking for artists and
          crafters both for our{' '}
          <Link to='/events'>upcoming auctions and events</Link> along with our{' '}
          <Link to='/donate'>ETSY store</Link>.
        </Text>
      </div>

      <TabContainer>
        {[
          {
            linkText: 'Volunteer Application',
            linkKey: '/volunteer/volunteer-application',
          },
          {
            linkText: 'Foster Application',
            linkKey: '/volunteer/foster-application',
          },
        ].map((tab: { linkText: string; linkKey: string }, i: number) => (
          <Tab
            key={i}
            onClick={() => {
              history.push(tab.linkKey);
              setTabCategory(tab.linkText);
            }}
            active={tab.linkText === tabCategory || tab.linkKey === path}
          >
            {tab.linkText}
          </Tab>
        ))}
      </TabContainer>
      <HorizontalLine />
    </Container>
  );
};

export default Volunteer;
