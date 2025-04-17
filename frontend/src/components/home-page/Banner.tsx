import { Link } from 'react-router-dom';
import useVideo from '../../hooks/useVideo';
import { LandingVideo } from '../assets/videos';

const Banner = () => {
  const { videoRef } = useVideo();
  return (
    <div className='w-full relative -mt-14'>
      <video
        ref={videoRef}
        className='w-full h-[600px] sm:h-[850px] fade-in block object-cover z-0'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
      >
        <source src={LandingVideo} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className='pt-14 absolute z-0 top-0 left-0 flex-col w-full h-[600px] sm:h-[850px] flex justify-center bg-[#1c1c1c]/30'>
        <div className='max-w-screen-2xl w-full mx-auto px-3 xl:px-0 flex flex-col gap-5'>
          <h1 className='hidden sm:block mb-5 slide-down text-white font-QLight'>
            Your compassion can turn their world around. By supporting us, <br />
            you help abandoned animals find the love and care they deserve.
          </h1>
          <p className='scale-in w-fit text-white text-3xl sm:text-4xl lg:text-6xl tracking-wider font-QBold leading-10'>
            Help Abandoned Animals <br /> Find a Loving Home
          </p>
          <Link
            to='/adopt'
            className='slide-up bg-teal-400 text-white py-4 px-9 rounded-lg font-QBold w-fit hover:shadow-lg hover:bg-teal-500 duration-300'
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
