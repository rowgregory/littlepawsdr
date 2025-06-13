import { Link } from 'react-router-dom';
import { useState } from 'react';
import BackgroundImage from '../components/assets/404-bg.png';
import SilverPawsSad from '../components/assets/silver-paws-sad.png';
import SilverPawsHello from '../components/assets/archive-kitty.png';
import WindowBottomTileLeft from '../components/assets/window_bottom_tile_left.png';
import GreenCircleBtn from '../components/assets/green_circle_btn.png';
import BlueBackBtn from '../components/assets/blue_back_btn.png';
import Pole from '../components/assets/pole.png';
import WindowPiece from '../components/assets/window_top_tile_right_piece.png';

const PageNotFound = () => {
  const [helloSilverPaws, setHelloSilverPaws] = useState(false);

  return (
    <div
      className='fixed inset-0 flex justify-center items-center bg-no-repeat bg-cover'
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className='relative flex flex-col items-center justify-center h-full flex-none'>
        {/* OOPS! Text */}
        <div
          className='
            absolute text-white font-bold 
            text-[14px] -left-[85px] -top-[54px]
            sm:text-[20px] sm:-left-[113px] sm:-top-[70px]
            md:text-[35px] md:-left-[242px] md:-top-[137px]
            lg:text-[42px] lg:-left-[278px] lg:-top-[156px]
            font-[Hyperspace-Bold]
          '
        >
          OOPS!
        </div>

        {/* 404 Text */}
        <div
          className='
            absolute text-white font-bold 
            text-[91px]
            sm:text-[119px]
            md:text-[260px]
            lg:text-[300px] lg:leading-[252px]
            font-[Hyperspace-Bold]
          '
        >
          404
        </div>

        {/* Silver Paws Image */}
        <img
          onClick={() => setHelloSilverPaws(true)}
          src={helloSilverPaws ? SilverPawsHello : SilverPawsSad}
          alt='404 Error'
          className='
            absolute cursor-pointer max-h-[60px] mr-[16.5px] mt-[16px] scale-x-[-1] object-cover z-10 justify-self-center
            sm:max-h-[76px] sm:mr-[24px] sm:mt-[24px]
            md:max-h-[174px] md:mr-[50px] md:mt-[50px]
            lg:max-h-[200px] lg:mr-[60px] lg:mt-[50px]
          '
        />

        {/* Window Tile Left */}
        <img
          src={WindowBottomTileLeft}
          alt='Window Tile Left'
          className='
            absolute px-4 max-w-[298px] top-0
            sm:max-w-[380px] sm:top-[-3px]
            md:max-w-[700px] md:top-[10px]
            lg:max-w-[800px] lg:top-[10px]
          '
        />

        {/* Back Button Left */}
        <Link to='/' className='relative cursor-pointer'>
          <div>
            <img
              src={GreenCircleBtn}
              alt='Green Circle'
              className={`
                absolute max-w-[47px] top-[49px] left-[-134px] 
                ${helloSilverPaws ? 'animate-rotateGreenCircle' : ''}
                sm:max-w-[54px] sm:top-[65px] sm:left-[-172px]
                md:max-w-[80px] md:top-[65px] md:left-[-400px]
                lg:top-[74px] lg:left-[-450px]
              `}
            />
            <img
              src={BlueBackBtn}
              alt='Blue Back Button'
              className='
                absolute animate-moveArrow max-w-[25px] top-[61px] left-[-125px]
                sm:max-w-[33px] sm:top-[75px] sm:left-[-164px]
                md:max-w-[44px] md:top-[83px] md:left-[-386px]
                lg:top-[92px] lg:left-[-435px]
              '
            />
          </div>
        </Link>

        {/* Pole Image */}
        <img
          src={Pole}
          alt='Pole'
          className='
            absolute left-[128px] top-[-124px] h-[169px]
            sm:left-[168px] sm:top-[-140px] sm:h-[196px]
            md:left-[323px] md:top-[-227px] md:h-[349px]
            lg:left-[371px] lg:top-[-262px] lg:h-[400px]
          '
        />

        {/* Window Piece Image */}
        <img
          src={WindowPiece}
          alt='Window Piece'
          className='
            absolute left-[94.5px] top-[-139px] w-[37px]
            sm:left-[131px] sm:top-[-156px] sm:w-[41px]
            md:left-[263px] md:top-[-254px] md:w-[68px]
            lg:left-[290px] lg:top-[-297px] lg:w-[89px]
          '
        />

        {/* Back Button Right */}
        <Link to='/' className='relative cursor-pointer'>
          <div>
            <img
              src={GreenCircleBtn}
              alt='Green Circle 2'
              className={`
                absolute max-w-[47px] top-[-105px] left-[76px]
                ${helloSilverPaws ? 'animate-rotateGreenCircle' : ''}
                sm:max-w-[54px] sm:top-[-117px] sm:left-[108px]
                md:max-w-[80px] md:top-[-188px] md:left-[231px]
                lg:max-w-[80px] lg:top-[-215px] lg:left-[261px]
              `}
            />
            <img
              src={BlueBackBtn}
              alt='Blue Back Button 2'
              className='
                absolute animate-moveArrow max-w-[25px] top-[-94px] left-[85px]
                sm:max-w-[33px] sm:top-[-106px] sm:left-[117px]
                md:max-w-[44px] md:top-[-169px] md:left-[246px]
                lg:top-[-196px] lg:left-[277px]
              '
            />
          </div>
        </Link>
      </div>

      <a
        href='https://icons8.com/illustrations/author/GrbQqWBEhaDS'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-0 right-0 text-[10px] mix-blend-hard-light'
      >
        Illustration by Liam Moore
      </a>
    </div>
  );
};

export default PageNotFound;
