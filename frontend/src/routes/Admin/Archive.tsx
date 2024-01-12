import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getAnnualData } from '../../actions/archiveActions';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '../../components/styles/Styles';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import {
  ButtonArrowRight,
  DialogueCircle,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  LetterA,
  MainBtn03,
  PurpleGradient,
  SilverPawsImg,
  SilverPawsImg2,
} from '../../components/assets';
import {
  BestSeller,
  SpaceBox,
  TotalEcards,
  TotalProducts,
  TotalRevenue,
  TotalWelcomeWieners,
} from '../../components/dashboard/archive';

const Container = styled.div`
  background: url(${PurpleGradient}) no-repeat;
  background-size: cover;
  min-height: 100vh;
  background-attachment: fixed;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SilverPaws = styled(Image)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 50px;
  transform: scaleX(-1);
  cursor: pointer;
  @media screen and (min-width: 500px) {
    left: 0;
    width: 100px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    left: 270px;
  }
`;
const DialogueContainer = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: block;
    position: fixed;
  }
`;
const Dialogue = styled(Image)`
  position: fixed;
  bottom: 112px;
  height: 131px;
  width: 100px;
  @media screen and (min-width: 500px) {
    width: 175px;
    left: 70px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    left: 345px;
  }
`;
const DialogueText = styled.div`
  font-family: 'Hyperspace', sans-serif;
  position: fixed;
  color: #fff;
  width: 200px;
  font-weight: 400;
  font-size: 14px;
  bottom: 164px;
  @media screen and (min-width: 500px) {
    left: 87px;
    width: 147px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    left: 362px;
  }
`;
const TitleText = styled.div`
  color: #fff;
  font-size: 40px;
  text-align: center;
  font-family: 'Hyperspace-Bold', sans-serif;
  @media screen and (min-width: 500px) {
    font-size: 55px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 70px;
  }
`;
const LetterAImage = styled(Image)`
  width: 65px;
  @media screen and (min-width: 500px) {
    width: 90px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 113px;
  }
`;
const SrollUpArrow = styled(Image)`
  transform: rotate(-90deg);
  display: flex;
  margin-inline: auto;
  margin-bottom: 56px;
  cursor: pointer;
`;

const LoadingImage = styled(Image)`
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  position: absolute;
  @media screen and (min-width: 500px) {
    max-height: 600px;
    max-width: 600px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 650px;
    max-height: 650px;
  }
`;

const Archive = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  let loading = state.archiveYearlyData.loading;
  let annualData = state.archiveYearlyData.annualData;
  let error = state.archiveYearlyData.error;
  const [showDialogue, setShowDialogue] = useState(true);

  const archiveData = [
    {
      text: 'Ecard Revenue',
      total: annualData ? `$${annualData?.ecardYearlyTotal?.revenue}` : 0,
      icon: Icon1,
    },
    {
      text: 'Welcome Wiener Revenue',
      total: annualData ? `$${annualData?.welcomeWienerYearlyTotal?.revenue}` : 0,
      icon: Icon2,
    },
    {
      text: 'Product Revenue',
      total: annualData ? `$${annualData?.productYearlyTotal?.revenue}` : 0,
      icon: Icon3,
    },
    {
      text: 'Newsletter emails',
      total: annualData ? annualData?.newsLetterEmails : 0,
      icon: Icon4,
    },
    {
      text: 'New Users',
      total: annualData ? annualData?.users : 0,
      icon: Icon5,
    },
  ];

  useEffect(() => {
    dispatch(getAnnualData(2023));

    if (!error) {
      const closeDialogue = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowDialogue(false);
      };
      closeDialogue();
    }
  }, [dispatch, error]);

  return (
    <Container>
      {error ? (
        <>
          <LoadingImage src={MainBtn03} alt='control-fuel-icon' width='100%' />
          <Text
            marginLeft='125px'
            color='#fff'
            position='absolute'
            fontFamily={`'Hyperspace-Bold', sans-serif`}
            fontSize='16px'
          >
            Error, please try again
          </Text>
        </>
      ) : !annualData ? (
        <>
          <LoadingImage src={MainBtn03} alt='control-fuel-icon' width='100%' />
          <Text
            marginLeft='45px'
            color='#fff'
            position='absolute'
            fontFamily={`'Hyperspace-Bold', sans-serif`}
            fontSize='20px'
          >
            Loading...
          </Text>
        </>
      ) : (
        <>
          <Flex alignItems='center' justifyContent='center' marginTop='64px' marginBottom='256px'>
            <LetterAImage src={LetterA} />
            <TitleText>rchive</TitleText>
          </Flex>
          <SpaceBox
            data={archiveData}
            boxTitle='2023'
            archiveData
            className='breakdown'
          />
          <BestSeller data={annualData} />
          <TotalRevenue data={annualData} />
          <SpaceBox data={annualData?.ecardYearlyTotal?.products} boxTitle='Ecards' />
          <TotalEcards data={annualData} />
          <SpaceBox
            data={annualData?.welcomeWienerYearlyTotal?.products}
            boxTitle='Welcome Wieners'
          />
          <TotalWelcomeWieners data={annualData} />
          <SpaceBox data={annualData?.productYearlyTotal?.products} boxTitle='Products' />
          <TotalProducts data={annualData} />
          <Text
            marginBottom='384px'
            textAlign='center'
            color='#fff'
            fontFamily={`'Hyperspace-Bold', sans-serif`}
            fontSize='50px'
          >
            Cheers to a great year!
          </Text>
          <SrollUpArrow onClick={() => window.scrollTo(0, 0)} src={ButtonArrowRight} />
          {showDialogue && (
            <DialogueContainer>
              <Dialogue src={DialogueCircle} alt='dialogue-box' />
              <DialogueText>
                {loading
                  ? 'Be right with you'
                  : error
                    ? 'Oops! Something happend. Refresh the page.'
                    : `We've done some amazing things!`}
              </DialogueText>
            </DialogueContainer>
          )}
        </>
      )}
      <Flex position='relative'>
        <SilverPaws
          onClick={() => dispatch(openCloseDashboardModal(true))}
          src={loading ? SilverPawsImg : SilverPawsImg2}
          alt='Silver-Paws-Hello'
        />
      </Flex>
    </Container>
  );
};

export default Archive;
