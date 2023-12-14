import { useEffect } from 'react';
import LeftArrow from '../../components/svg/LeftArrow';
import {
  Container,
  FlexContainer,
  LoadingContainer,
} from '../../components/styles/AvailableDog/Styles';
import { getDachshundDetails } from '../../actions/dachshundsActions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingImg } from '../../components/LoadingImg';
import ImageAndName from '../../components/dachshund-details/ImageAndName';
import InfoSection from '../../components/dachshund-details/InfoSection';
import BottomInfo from '../../components/dachshund-details/BottomInfo';
import { useParams } from 'react-router-dom';

const DachshundDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as any;

  const state = useSelector((state: any) => state);
  const loading = state.dachshundDetails.loading;
  const dachshund = state.dachshundDetails.dachshund;

  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(getDachshundDetails(id));
  }, [id, dispatch]);

  const info = dachshund?.data[0];
  const dogStatusId = info?.relationships?.statuses?.data[0]?.id;

  const leftArrowText =
    dogStatusId === '17'
      ? 'dogs on hold'
      : dogStatusId === '3'
      ? 'successful adotions'
      : dogStatusId === '7'
      ? 'rainbow bridge'
      : dogStatusId === '15'
      ? 'sanctuary dogs'
      : 'available dogs';

  const leftArrowUrl =
    dogStatusId === '17'
      ? '/about/hold'
      : dogStatusId === '3'
      ? '/about/successful-adoptions'
      : dogStatusId === '7'
      ? '/about/rainbow-bridge'
      : dogStatusId === '15'
      ? '/about/sanctuary'
      : '/available';

  if (loading) {
    return (
      <Container className='w-100'>
        <LeftArrow text={`Back to ${leftArrowText}`} url={leftArrowUrl} />
        <FlexContainer>
          <LoadingContainer>
            <LoadingImg w='100%' />
          </LoadingContainer>
        </FlexContainer>
      </Container>
    );
  }

  return (
    <Container>
      <LeftArrow text={`Back to ${leftArrowText}`} url={leftArrowUrl} />
      <ImageAndName info={info} />
      <InfoSection info={info} />
      <BottomInfo />
    </Container>
  );
};

export default DachshundDetails;
