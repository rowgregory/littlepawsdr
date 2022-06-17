import React, { FC, useEffect, useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import styled from 'styled-components';
import AdoptionApplication from './AdoptionApplication';
import AdoptionFAQ from './AdoptionFAQ';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import Pretzel from '../../components/assets/pretzel-1.jpg';
import { useLocation } from 'react-router-dom';

export const Container = styled.div`
  margin: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin: 0 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin: 0 48px;
  }
`;

const AdoptContainer = styled.div`
  margin: 0 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin: 0;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 94vw;
  margin: 1rem 0;

  overflow-x: scroll !important;
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.div<{ active: boolean }>`
  padding: 1rem 1.75rem;
  width: max-content;
  white-space: nowrap;
  text-align: center;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.smcontainer.bg : theme.secondaryBg};
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  cursor: pointer;
  transition: 300ms;
  background: ${({ theme, active }) =>
    active ? theme.smcontainer.bg : theme.secondaryBg};
  color: ${({ theme, active }) => (active ? '#fff' : theme.text)};
  :hover {
    background: ${({ theme, active }) =>
      active ? theme.smcontainer.hoverBg : theme.input.border};
  }
`;

export const MainText = styled.div`
  font-size: 0.8rem;
  font-family: 'Duru Sans';
  color: ${({ theme }) => theme.card.text};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 1.15rem;
  }
`;

const Adopt: FC<{ setTabCategory: (tabCategory: string) => void }> = ({
  setTabCategory,
}) => (
  <AdoptContainer>
    <Col xl={8} lg={12} className='d-flex flex-column mx-0 pl-0 pr-3 mb-4'>
      <MainText>
        Adopting is a big decision. You are taking into your home a dog that is
        intelligent, loyal, fun loving, full of love, and more than likely very
        vocal. However, owning a dachshund will bring you so much enjoyment, fun
        and fulfillment. They have this fantastic way of bringing joy to their
        families every day!
      </MainText>
      <MainText className='my-3'>
        We are committed to matching our dachshunds with good, responsible and
        loving new owners. We strive to make the best match we can, setting each
        dog and adopter up for success. Our number one concern is for our
        dachshunds.
      </MainText>
      <MainText>
        For more information visit our{' '}
        <span onClick={() => setTabCategory('Information')}>
          <u>Adoption Information</u>
        </span>
        &nbsp;page. We currently adopt to the following states: Alabama,
        Connecticut, Delaware, DC, Florida, Georgia, Kentucky, Maine, Maryland,
        Massachusetts, New Hampshire, New Jersey, North Carolina, Ohio,
        Pennsylvania, Rhode Island, South Carolina, Tennessee, Vermont,
        Virginia, West Virginia.
      </MainText>
    </Col>
    <Col xl={4} lg={12} className='px-0'>
      <Image src={Pretzel} alt='LPDR' fluid />
    </Col>
  </AdoptContainer>
);

const Adoption = () => {
  const { state } = useLocation() as any;
  const [tabCategory, setTabCategory] = useState('Main');
  useEffect(() => {
    if (state)
      setTabCategory(
        state === 'Adopt' ? 'Main' : state === 'Fees' ? 'Fees' : state
      );
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
      {tabCategory === 'Information' && (
        <AdoptionInformation setTabCategory={setTabCategory} />
      )}
      {tabCategory === 'Fees' && <AdoptionFees />}
      {tabCategory === 'FAQ' && <AdoptionFAQ />}
    </Container>
  );
};

export default Adoption;
