import React, { FC, useEffect, useState } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import styled from 'styled-components';
import AdoptionApplication from './AdoptionApplication';
import AdoptionFAQ from './AdoptionFAQ';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import { Text } from '../../components/styles/Styles';
import Pretzel from '../../components/assets/pretzel-1.jpg';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  margin: 0 48px;
`;

export const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-gap: 0.25rem;
  margin-bottom: 5rem;
  flex-wrap: wrap;
`;

export const Tab = styled.div<{ active: boolean }>`
  width: 150px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.input.border};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 300ms;
  background: ${({ theme, active }) => (active ? theme.secondaryBg : '')};
  :hover {
    background: ${({ theme }) => theme.secondaryBg};
  }
`;

const Adopt: FC<{ setTabCategory: (tabCategory: string) => void }> = ({
  setTabCategory,
}) => (
  <Row className='mt-5 mx-0'>
    <Col xl={8} lg={12} className='d-flex flex-column mx-0 pl-0 pr-3 mb-4'>
      <Text fontSize='1.15rem' fontFamily='Duru Sans'>
        Adopting is a big decision. You are taking into your home a dog that is
        intelligent, loyal, fun loving, full of love, and more than likely very
        vocal. However, owning a dachshund will bring you so much enjoyment, fun
        and fulfillment. They have this fantastic way of bringing joy to their
        families every day!
      </Text>
      <Text fontSize='1.15rem' fontFamily='Duru Sans' className='my-3'>
        We are committed to matching our dachshunds with good, responsible and
        loving new owners. We strive to make the best match we can, setting each
        dog and adopter up for success. Our number one concern is for our
        dachshunds.
      </Text>
      <Text fontSize='1.15rem' fontFamily='Duru Sans'>
        For more information visit our{' '}
        <span onClick={() => setTabCategory('Information')}>
          <u>Adoption Information</u>
        </span>
        &nbsp;page. We currently adopt to the following states: Alabama,
        Connecticut, Delaware, DC, Florida, Georgia, Kentucky, Maine, Maryland,
        Massachusetts, New Hampshire, New Jersey, North Carolina, Ohio,
        Pennsylvania, Rhode Island, South Carolina, Tennessee, Vermont,
        Virginia, West Virginia.
      </Text>
    </Col>
    <Col xl={4} lg={12} className='px-0 mx-0'>
      <Image src={Pretzel} alt='LPDR' fluid />
    </Col>
  </Row>
);

const Adoption = () => {
  const { state } = useLocation() as any;
  const [tabCategory, setTabCategory] = useState('Main');

  useEffect(() => {
    if (state) setTabCategory(state);
  }, [state]);

  return (
    <Container>
      <TabContainer>
        {['Main', 'Application', 'Information', 'Fees', 'FAQ'].map(
          (tab: string, i: number) => (
            <Tab
              key={i}
              onClick={() => setTabCategory(tab)}
              active={tab === tabCategory}
            >
              {tab}
            </Tab>
          )
        )}
      </TabContainer>

      {tabCategory === 'Main' && <Adopt setTabCategory={setTabCategory} />}
      {tabCategory === 'Application' && <AdoptionApplication />}
      {tabCategory === 'Information' && <AdoptionInformation />}
      {tabCategory === 'Fees' && <AdoptionFees />}
      {tabCategory === 'FAQ' && <AdoptionFAQ />}
    </Container>
  );
};

export default Adoption;
