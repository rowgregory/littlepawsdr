import { memo, useEffect, useMemo, useState } from 'react';
import {
  Description,
  DetailsGrid,
  ImageContainer,
} from '../components/styles/AvailableDog/Styles';
import LeftArrow from '../components/svg/LeftArrow';
import { LoadingImg } from '../components/LoadingImg';
import { useDispatch, useSelector } from 'react-redux';
import { getWelcomeWienerDachshundDetails } from '../actions/welcomeWienerDachshundActions';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Text } from '../components/styles/Styles';
import DonationItem from '../components/welcome-wiener/DonationItem';
import CartDrawer from '../components/CartDrawer';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin-inline: auto;
  padding-inline: 8px;
  margin-top: 96px;
  margin-bottom: 128px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 16px;
    grid-template-columns: 55% 40%;
    max-width: 1200px;
  }
`;

const WelcomeWienerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [objectFit, setObjectFit] = useState(true);

  const loadingDetails = useSelector(
    (state: any) => state.welcomeWienerDachshundDetails.loading
  );
  const dachshund = useSelector(
    (state: any) => state.welcomeWienerDachshundDetails.dachshund
  );

  const memoizedDachshund = useMemo(() => dachshund, [dachshund]);

  useEffect(() => {
    dispatch(getWelcomeWienerDachshundDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <CartDrawer />
      <div>
        <LeftArrow text='Back' url='/welcome-wieners' />
        {loadingDetails ? (
          <div className='mt-3'>
            <LoadingImg w='100%' />
          </div>
        ) : (
          <ImageContainer className='mt-3'>
            <Image
              onClick={() => setObjectFit(!objectFit)}
              src={memoizedDachshund?.displayUrl}
              alt={`${memoizedDachshund?.name}`}
              style={{
                width: '100%',
                objectFit: objectFit ? 'cover' : 'contain',
                aspectRatio: '1/1',
              }}
            />
          </ImageContainer>
        )}
        <div className='d-flex flex-column mr-4 mt-4'>
          <Text fontSize='1.5rem' fontWeight='600' marginBottom='16px'>
            About {memoizedDachshund?.name}
          </Text>
          <Description>{memoizedDachshund?.bio}</Description>
          <Text fontSize='1.5rem' fontWeight='600' marginBottom='16px'>
            Details
          </Text>
          <DetailsGrid>
            {[{ key: 'Age', value: memoizedDachshund?.age }].map(
              (obj: any, i: number) => (
                <div className='d-flex flex-column' key={i}>
                  <Text fontWeight='400'>{obj.key}</Text>
                  <Text fontSize='0.875rem'>{obj.value}</Text>
                </div>
              )
            )}
          </DetailsGrid>
        </div>
      </div>
      <div>
        <Text fontSize='1.5rem' fontWeight='600' marginBottom='16px'>
          Donation Items for {memoizedDachshund?.name}
        </Text>
        {memoizedDachshund?.associatedProducts?.map((obj: any, i: number) => (
          <DonationItem item={obj} key={i} />
        ))}
      </div>
    </Container>
  );
};

export default memo(WelcomeWienerDetails);