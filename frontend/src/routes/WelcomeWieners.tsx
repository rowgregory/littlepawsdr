import { useEffect } from 'react';
import {
  Container,
  TopSection,
  WelcomeWienerGrid,
} from '../components/welcome-wiener/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../components/styles/Styles';
import { LoadingImg } from '../components/LoadingImg';
import WelcomeWienerCard from '../components/welcome-wiener/WelcomeWienerCard';
import { listWelcomeWienerDachshunds } from '../actions/welcomeWienerDachshundActions';
import styled from 'styled-components';

const FirstLetter = styled.div`
  max-width: 680px;
  font-size: 16px;
  color: #333;
  font-weight: 300;
  &:first-letter {
    font-size: 30px;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const WelcomeWieners = () => {
  const dispatch = useDispatch();
  const {
    welcomeWienerDachshundList: { loading, dachshundList },
  } = useSelector((state: any) => state);
  const userInfo = useSelector((state: any) => state.userLogin.userInfo);

  useEffect(() => {
    dispatch(listWelcomeWienerDachshunds());
  }, [dispatch]);

  return (
    <Container>
      <TopSection>
        <h4 className='mb-4 mt-5 d-flex justify-content-center font-weight-bold'>
          Welcome Wieners
        </h4>
        <FirstLetter className='mb-3 mt-4 mx-auto'>
          Welcome Wieners is a new donation option that provides a unique way
          for dog lovers to help rescue dogs. This program allows animal lovers
          to donate towards specific dogs that are not yet ready for adoption.
          With Welcome Wieners, individuals can contribute towards the medical
          care, food, and other necessities that dogs require before they can be
          adopted by loving families.
        </FirstLetter>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
          One of the most remarkable features of Welcome Wieners is that it
          allows donors to choose an item that they would like to contribute
          towards for a specific dog. This option ensures that the money donated
          goes towards the needs of the dog for which it is intended. Some of
          the items donors can choose to contribute towards include food, a warm
          bed, medication, toys, and other necessities that these dogs require.
          This way, donors can feel confident that their contribution is making
          a real difference in the lives of dogs.
        </Text>
        <Text
          maxWidth='680px'
          className='mb-3 mt-4 mx-auto'
          fontSize='16px'
          fontWeight='600'
          textAlign='center'
        >
          Welcome Wieners donors can easily explore donation options by simply
          clicking on a dachshund image below.
        </Text>
      </TopSection>
      <WelcomeWienerGrid>
        {dachshundList?.length === 0 ? (
          <FirstLetter className='mb-3 mt-4 mx-auto'>
            Great news! We will be adding Welcome Wieners shortly, where you can
            learn all about the wonderful world of our dachshunds. From their
            history to their unique personalities and physical traits, we will
            have it all covered. Stay tuned for this exciting addition, and get
            ready to fall in love with these adorable pups even more!
          </FirstLetter>
        ) : loading ? (
          [1, 2, 3].map((_: any, i: number) => (
            <LoadingImg w='100%' h='100%' key={i} />
          ))
        ) : (
          dachshundList?.map(
            (dachshund: any) =>
              (dachshund?.isLive || userInfo?.isAdmin) && (
                <WelcomeWienerCard key={dachshund?._id} dachshund={dachshund} />
              )
          )
        )}
      </WelcomeWienerGrid>
    </Container>
  );
};

export default WelcomeWieners;
