import { useDispatch, useSelector } from 'react-redux';
import { openCartDrawer } from '../../actions/cartActions';
import {
  IsLiveIndicator,
  Name,
  Overlay,
  WelcomeWienerCardContainer,
  WienerThumbnail,
} from './styles';
import { useEffect, useRef, useState } from 'react';
import { LoadingImg } from '../LoadingImg';

const useImageVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const handleScroll = () => {
        if (imageRef.current) {
          const imageRect = imageRef.current.getBoundingClientRect();
          const { top, bottom } = imageRect;
          const viewportHeight = window.innerHeight;

          // Calculate the position of the image relative to the viewport
          const imageTop = top - viewportHeight / 2;
          const imageBottom = bottom - viewportHeight / 2;

          // Check if the image is in the middle of the viewport
          const isMiddleVisible = imageTop <= 0 && imageBottom >= 0;

          setIsVisible(isMiddleVisible);
        }
      };

      // Attach the scroll event listener to trigger the visibility check
      window.addEventListener('scroll', handleScroll);

      // Cleanup the event listener when the component unmounts
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return { isVisible, imageRef };
};

const WelcomeWienerCard = ({ dachshund, loading }: { dachshund: any; loading: boolean }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userLogin.userInfo);

  const { isVisible, imageRef } = useImageVisibility();

  return loading ? <LoadingImg w='100%' h='100%' maxw='462px' /> : (
    <div style={{ position: 'relative' }} ref={imageRef}>
      <IsLiveIndicator
        style={{
          display: dachshund?.isLive && userInfo?.isAdmin ? 'flex' : 'none',
        }}
      >
        <i className='fas fa-check'></i>
      </IsLiveIndicator>

      <WelcomeWienerCardContainer
        to={`/welcome-wiener/${dachshund?._id}`}
        onClick={() => dispatch(openCartDrawer(false))}
      >
        <WienerThumbnail
          src={dachshund?.displayUrl}
          className={`img ${isVisible ? 'visible' : ''}`}
          alt={`LPDR dachshund - ${dachshund?.name}`}
        />
        <Overlay className={`overlay ${isVisible ? 'visible' : ''}`}>
          <Name>{dachshund?.name}</Name>
        </Overlay>
      </WelcomeWienerCardContainer>
    </div>
  );
};

export default WelcomeWienerCard;
