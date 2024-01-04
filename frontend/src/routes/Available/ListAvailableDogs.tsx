import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dachshund from '../../components/Dachshund';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { useLocation } from 'react-router-dom';
import { getAvailableDogs } from '../../actions/dachshundsActions';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
  margin-top: 75px;
`;
const InnerContainer = styled.div`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
  padding-inline: 16px;
`;

const OnlineAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.secondaryBg};
  padding: 128px 0;
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
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  line-height: 12px;
  letter-spacing: -1px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-gap: 16px;
  width: 100%;
  grid-template-columns: 1fr;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  margin-inline: auto;
  padding: 16px;
  flex-direction: column;
  margin-top: 56px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ListAvailableDogs = () => {
  const location = useLocation() as any;
  const myRef = useRef() as any;
  const dispatch = useDispatch()

  const state = useSelector((state: any) => state);
  const dachshunds = state.dachshunds.dachshunds;
  const loading = state.dachshunds.loading;

  useEffect(() => {
    dispatch(getAvailableDogs())
    if (location?.state?.scrollTo === 'dachshunds') {
      setTimeout(() => window.scrollTo(0, myRef.current.offsetTop), 0);
    }
  }, [dispatch, location]);

  return (
    <Container>
      <InnerContainer>
        <h4 className='mb-4 mt-5 d-flex justify-content-center font-weight-bold'>
          Dachshunds to Rescue
        </h4>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          We are excited that you are interested in adding a dachshund or
          dachshund-mix to your family! Here is a list of all the dogs we have
          available for adoption. We encourage you to read each dog’s bio
          thoroughly.  Each dog has different requirements and not all may fit
          your lifestyle.  Please complete an adoption application for a dog
          whose needs you can meet, be it a securely fenced yard, a quiet home,
          a special diet, a medical need, on-going house training, on-going
          leash training, etc.
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          When you adopt from LPDR, you are getting a dachshund who:
        </Text>
        <div>
          {[
            `Has been spayed or neutered.`,
            `Has had a full veterinary health check and core vaccinations.`,
            `Has been heartworm tested and treated, if necessary.`,
            `Is taking heartworm and flea and tick preventatives.`,
            `Has been microchipped.`,
            `And much more.`,
          ].map((text, i) => (
            <Text key={i} maxWidth='680px' className='mb-4 mx-auto'>
              <li style={{ fontSize: '16px' }}>{text}</li>
            </Text>
          ))}
        </div>
      </InnerContainer>
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
        ref={myRef}
        className='w-100 mx-auto d-flex justify-content-between mt-3 px-3'
        style={{ maxWidth: '980px' }}
      >
        <LeftArrow
          text='Home'
          url='/'
          text2='Contact Us'
          url2='about/contact-us'
        />
        <RightArrow text='Sponsor a Sanctuary' url='/about/sanctuary' />
      </div>
      <CardContainer>
        {dachshunds?.data?.map((dachshund: any) => (
          <Dachshund key={dachshund?.id} dachshund={dachshund} loading={loading} />
        ))}
      </CardContainer>
    </Container>
  );
};

export default ListAvailableDogs;
