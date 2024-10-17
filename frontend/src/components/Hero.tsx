import { Fragment } from 'react';
import useVideo from '../utils/hooks/useVideo';
import TailwindSpinner from './Loaders/TailwindSpinner';
import { HomeDog } from './assets';

const Hero = ({ src, title, link, photographer }: any) => {
  const { loading, videoRef } = useVideo();
  const showVideo = src?.includes('mp4') ? true : false;

  return (
    <div className={`relative w-full ${showVideo ? 'h-[300px] md:h-[450px]' : 'h-[150px] md:h-[300px]'}  `}>
      {showVideo ? (
        <Fragment>
          <div
            className={`${
              !loading ? 'hidden' : 'block'
            } spinner absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <TailwindSpinner color='fill-slate-900' wAndH='w-10 h-10' />
          </div>
          <video
            ref={videoRef}
            className='fade-in block w-full h-full object-cover absolute top-0 left-0 z-0'
            autoPlay
            muted
            loop
            playsInline
            preload='auto'
          >
            <source src={src} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </Fragment>
      ) : (
        <img
          src={src || HomeDog}
          alt='Little Paws Dachshund Rescue Hero'
          className='fade-in block w-full h-full object-cover absolute top-0 left-0 z-0'
        ></img>
      )}
      <div className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex-col w-full h-full flex items-center justify-center bg-[#1c1c1c]/60'>
        <div className='max-w-screen-lg'>
          <h1 className='text-center scale-in text-4xl md:text-6xl text-white font-bold uppercase'>
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
