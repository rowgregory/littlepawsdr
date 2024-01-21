import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWelcomeWienerDachshundDetails } from '../actions/welcomeWienerDachshundActions';
import { useParams } from 'react-router-dom';
import { Flex, Text } from '../components/styles/Styles';
import DonationItem from '../components/welcome-wiener/DonationItem';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import JumpingRumpLoader from '../components/Loaders/JumpingRopLoader';
import { GoBackLink } from '../components/styles/admin/Styles';

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-inline: auto;
  margin-top: 16px;
  width: 100%;
  margin-top: 75px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DonationItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;



const WelcomeWienerProductSideBar = ({ data, loading }: { data: any; loading: boolean }) => {
  return (
    <Flex
      background='#333'
      width='100%'
      style={{ minHeight: 'calc(100vh - 480px)' }}
      justifyContent='start'
      flexDirection='column'
      flex='0'
      padding='24px 16px 75px'
    >
      {loading ? (
        <div style={{ minHeight: 'calc(100vh - 480px)' }} className='w-100 d-flex align-items-center'>
          <JumpingRumpLoader color='#e7ff46' />
        </div>
      ) : (
        <>
          <Text color='#e7ff46' fontSize='48px' fontWeight={800}>
            {data?.name}
          </Text>
          <Text fontWeight='400' fontSize='18px' color='#ccc' marginBottom='30px'>
            Age {data?.age}
          </Text>
          <Text color='#fff' fontSize='18px' fontWeight={500} marginBottom='42px' maxWidth='600px'>
            {data?.bio}
          </Text>
          <Text color='#6f6d6c' fontSize='30px' fontWeight={500} marginBottom='32px'>
            Ways to Make an Impact
          </Text>
          <DonationItemContainer>
            {data?.associatedProducts?.map((obj: any, i: number) => (
              <DonationItem item={obj} key={i} />
            ))}
          </DonationItemContainer>
        </>
      )}
    </Flex>
  );
};

const WelcomeWienerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state);
  const loading = state.welcomeWienerDachshundDetails.loading;
  const dachshund = state.welcomeWienerDachshundDetails.dachshund;

  useEffect(() => {
    dispatch(getWelcomeWienerDachshundDetails(id));
  }, [dispatch, id]);

  const reactImageGalleryDataShape = dachshund?.images?.map((image: string) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <Container>
      <Flex flexDirection='column' maxWidth='787px' marginLeft='auto' marginRight='auto' width='100%' marginBottom='75px'>
        <Flex className='px-2 flex-column'>
          <GoBackLink to='/welcome-wieners' text='Back to Welcome Wieners' />
          {loading ? (
            <JumpingRumpLoader color='#333' />
          ) : (
            <Flex alignItems='center' justifyContent='center' width='100%' border='1px solid #ededed' height='100%' >
              <ImageGallery
                items={reactImageGalleryDataShape ?? [{ original: '', thumbnail: '' }]}
                showIndex={true}
                showBullets={true}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      <WelcomeWienerProductSideBar data={dachshund} loading={loading} />
    </Container>
  );
};

export default WelcomeWienerDetails;
