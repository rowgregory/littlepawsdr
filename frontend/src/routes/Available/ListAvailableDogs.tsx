import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import Dachshund from '../../components/Dachshund';
import Message from '../../components/Message';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
`;

const OnlineAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f7f7f7;
  padding: 128px 0;
  margin-bottom: 96px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: row;
  }
`;

const RGContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const RGName = styled.div`
  font-family: 'Biryani', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: #04518d;
  line-height: 38px;
  letter-spacing: -3px;
  padding-top: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-top: 0;
  }
`;
const RGName2 = styled.div`
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  line-height: 12px;
  letter-spacing: -1px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  width: 100%;
  grid-template-columns: 1fr;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin-inline: auto;
  padding: 16px;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ListAvailableDogs = () => {
  const dispatch = useDispatch();

  const availableDachshunds = useSelector((state: any) => state.dachshunds);
  const { loading, error, dachshunds } = availableDachshunds;

  localStorage.setItem(
    'dachshunds',
    dachshunds === undefined ? JSON.stringify([]) : JSON.stringify(dachshunds)
  );

  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);

  return (
    <Container>
      {loading && <HexagonLoader />}
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Adoptable Dachshunds
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
          We are excited that you are interested in adding a dachshund or
          dachshund-mix to your family! Here you can find a list of all dogs
          that are available for adoption. Some of our dogs are not posted to
          the website, so even if you do not find the dog you are looking for
          please feel free to submit an application and we can look for that
          perfect dog for you!
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
          When you adopt from LPDR, you are getting a dachshund who:
        </Text>
        <div>
          {[
            `Has been spayed or neutered`,
            `Had a full veterinary health check and vaccinations`,
            `Has been Heartworm tested and treated if necessary`,
            `Has been microchipped`,
          ].map((text, i) => (
            <Text key={i} maxWidth='680px' className='mb-3 mt-4 mx-auto'>
              <li style={{ fontSize: '15px' }}>{text}</li>
            </Text>
          ))}
        </div>
      </div>
      <OnlineAppContainer>
        <Text
          fontSize='0.875rem'
          letterSpacing='-0.5px'
          marginRight='1.5rem'
          fontWeight='400'
        >
          Our Online Applications are Powered by
        </Text>
        <RGContainer>
          <RGName>RescueGroups.org</RGName>
          <RGName2>technology solutions animals can live with...</RGName2>
        </RGContainer>
      </OnlineAppContainer>
      <div
        className='w-100 mx-auto d-flex justify-content-between mt-3 px-3'
        style={{ maxWidth: '75rem' }}
      >
        <LeftArrow text='To Home' url='/' />
        <RightArrow text='Sponsor a Sanctuary' url='/about/sanctuary' />
      </div>
      {error && (
        <div className='mx-auto w-50'>
          <Message variant='danger'>{error}</Message>
        </div>
      )}
      <CardContainer>
        {dachshunds?.data?.map((dachshund: any) => (
          <Dachshund key={dachshund?.id} dachshund={dachshund} />
        ))}
      </CardContainer>
    </Container>
  );
};

export default ListAvailableDogs;
