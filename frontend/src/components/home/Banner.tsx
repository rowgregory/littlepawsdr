import { Link } from 'react-router-dom';
import Video from '../../components/videos/landing-high.mp4';
import useVideo from '../../utils/hooks/useVideo';
import { QuickOptionContainerDesktop, QuickOptionContainerMobile } from '../styles/banner-styles';
import { quickOptionArrData } from '../data/home-page';
import WaveSVG from '../svg/WaveSVG';

const Banner = () => {
  const { videoRef } = useVideo();
  return (
    <>
      <div className='reltive h-screen'>
        <video
          ref={videoRef}
          className='block w-screen h-screen object-cover'
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
        >
          <source src={Video} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <QuickOptionContainerDesktop>
          {quickOptionArrData.map((obj: any, i: number) => (
            <Link to={obj.linkKey} key={i}>
              <p className='text-white mb-1.5 text-xs font-Matter-Bold'>{obj.textKey_1}</p>
              <p className='text-white text-3xl'>{obj.textKey_2}</p>
            </Link>
          ))}
        </QuickOptionContainerDesktop>
      </div>
      <QuickOptionContainerMobile>
        {quickOptionArrData.map((obj: any, i: number) => (
          <Link to={obj.linkKey} key={i}>
            <p className='text-white mb-1.5 text-xs font-Matter-Bold'>{obj.textKey_1}</p>
            <p className='text-white text-3xl'>{obj.textKey_2}</p>
          </Link>
        ))}
      </QuickOptionContainerMobile>
      <WaveSVG />
      <p
        className='flex justify-end mr-1 mt-1 text-[9px] cursor-pointer'
        onClick={() => window.open('https://mixkit.co/@rubenvelasco/', '_blank')}
      >
        Video by Ruben Velasco
      </p>
    </>
  );
};

export default Banner;
