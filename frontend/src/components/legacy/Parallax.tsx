import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import OurLovablePals from './home/OurLovablePals';
import Donate, { DonateBtnContainer } from './home/Donate';
import Articles from './home/Articles';
import Events from './home/Events';
import Shop from './home/Shop';
import Mission from '../../components/home/Mission';

const Section = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  &.donate {
    align-items: center;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    align-items: center;
    justify-content: center;
  }
`;

const BG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`;

const DownArrow = () => {
  return (
    <svg
      style={{
        bottom: '0',
        right: '18% ',
        height: '100px',
        width: '50px',
      }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 25 25'
      width='30px'
      height='60px'
    >
      <path
        style={{ fill: '#fff', mixBlendMode: 'difference' }}
        d='m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z'
      />
    </svg>
  );
};

const SloganContainer = styled.div`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`;

const Slogan = styled.div`
  color: #fff;
  font-size: 2.5rem;
  margin-top: 7rem;
  font-family: 'Ubuntu', sans-serif;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 5rem;
    margin-top: 0;
  }
`;

const ScrollBtnContainer = styled.div`
  color: #fff;
  mix-blend-mode: difference;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 200px;
  height: 100px;
`;

const ScrollText = styled.div`
  transform: rotate(90deg);
  font-size: 1.5rem;
`;

const ArrowContainer = styled.div`
  position: absolute;
  left: 70px;
  bottom: 20px;
`;

const Parallax = () => {
  // if (typeof window !== 'undefined') {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.registerPlugin(ScrollTo);
  // }

  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   gsap.utils.toArray('section').forEach((section: any, i: number) => {
  //     section.bg = section.querySelector('.bg');

  //     section.bg.style.backgroundImage = `url(${section.bg.dataset.img})`;

  //     // Do the parallax effect on each section
  //     if (i) {
  //       section.bg.style.backgroundPosition = `50% ${
  //         -window.innerHeight / 2
  //       }px`;

  //       gsap.to(section.bg, {
  //         backgroundPosition: `50% ${window.innerHeight / 2}px`,
  //         ease: 'none',
  //         scrollTrigger: {
  //           trigger: section,
  //           scrub: true,
  //         },
  //       });
  //     }

  //     // the first image should be positioned against the top. Use px on the animating part to work with GSAP.
  //     else {
  //       section.bg.style.backgroundPosition = '50% 0px';

  //       gsap.to(section.bg, {
  //         backgroundPosition: `50% ${window.innerHeight / 2}px`,
  //         ease: 'none',
  //         scrollTrigger: {
  //           trigger: section,
  //           start: 'top top',
  //           end: 'bottom top',
  //           scrub: true,
  //         },
  //       });
  //     }
  //   });
  // }, [isMobile]);

  const panel = {
    one: 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643692143/dog-gabd78b127_1920.jpg',
    two: 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643732841/erda-estremera-JxLhcSQJjjY-unsplash.jpg',
    three:
      'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643738764/PNG_image-2B8122CA273D-1.png',
    four: 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643757166/PNG_image-702C7F100232-1.png',
    five: 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643828894/PNG_image-761A9AAFBC70-1.png',
    six: 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643914420/PNG_image-BE4F2B41FFA1-1.png',
    seven:
      'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643925968/PNG_image-21246D8499E3-1.png',
  };

  const donation = useRef() as any;
  const home = useRef() as any;
  const arrowOne = useRef() as any;

  const donate = useRef() as any;
  const arrowTwo = useRef() as any;
  const pals = useRef() as any;

  const lovablePals = useRef() as any;
  const arrowThree = useRef() as any;
  const mission = useRef() as any;

  const missionPage = useRef() as any;
  const arrowFour = useRef() as any;
  const articles = useRef() as any;

  const latestPage = useRef() as any;
  const arrowFive = useRef() as any;
  const events = useRef() as any;

  const eventsPage = useRef() as any;
  const arrowSix = useRef() as any;
  const products = useRef() as any;

  // useEffect(() => {
  //   const slideDownOne = gsap.to(arrowOne.current, {
  //     duration: 1,
  //     paused: true,
  //     ease: 'power1.inOut',
  //     y: 30,
  //   });
  //   const slideDownTwo = gsap.to(arrowTwo.current, {
  //     duration: 1,
  //     paused: true,
  //     ease: 'power1.inOut',
  //     y: 30,
  //   });
  //   const slideDownThree = gsap.to(arrowThree.current, {
  //     duration: 1,
  //     paused: true,
  //     ease: 'power1.inOut',
  //     y: 30,
  //   });
  //   const slideDownFour = gsap.to(arrowFour.current, {
  //     duration: 1,
  //     paused: true,
  //     ease: 'power1.inOut',
  //     y: 30,
  //   });

  //   home.current.addEventListener('mouseenter', () => slideDownOne.play());
  //   home.current.addEventListener('mouseleave', () => slideDownOne.reverse());

  //   donate.current.addEventListener('mouseenter', () => slideDownTwo.play());
  //   donate.current.addEventListener('mouseleave', () => slideDownTwo.reverse());

  //   lovablePals.current.addEventListener('mouseenter', () =>
  //     slideDownThree.play()
  //   );
  //   lovablePals.current.addEventListener('mouseleave', () =>
  //     slideDownThree.reverse()
  //   );
  //   missionPage.current.addEventListener('mouseenter', () =>
  //     slideDownFour.play()
  //   );
  //   missionPage.current.addEventListener('mouseleave', () =>
  //     slideDownFour.reverse()
  //   );
  // }, []);

  const handleScroll = (position: any) => {
    position.scrollIntoView({ behavior: 'smooth' });
    // gsap.to(window, {
    //   duration: 0,
    //   scrollTo: position,
    //   ease: 'power3.inOut',
    // });
  };

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth > 1000) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('load', resize);
    return () => window.removeEventListener('resize', resize);
  });

  return (
    <>
      {!isMobile && (
        <>
          <Section>
            <BG className='bg' data-img={panel.one}></BG>
            <div className='d-flex flex-column align-items-center'>
              <SloganContainer className='py-3 px-5'>
                <Slogan>Changing Lives Four Paws At A Time</Slogan>
              </SloganContainer>
              <DonateBtnContainer>
                <button>
                  <div>Sponsor A Sanctuary</div>
                </button>
              </DonateBtnContainer>
              <ScrollBtnContainer
                onClick={() => handleScroll(donation.current)}
                ref={home}
              >
                <ScrollText>Scroll</ScrollText>
                <ArrowContainer ref={arrowOne}>
                  <DownArrow />
                </ArrowContainer>
              </ScrollBtnContainer>
            </div>
          </Section>
          <Section className='donate' ref={donation}>
            <BG className='bg' data-img={panel.two}></BG>
            <Donate />
            <ScrollBtnContainer
              onClick={() => handleScroll(pals.current)}
              ref={donate}
            >
              <ScrollText>Scroll</ScrollText>
              <ArrowContainer ref={arrowTwo}>
                <DownArrow />
              </ArrowContainer>
            </ScrollBtnContainer>
          </Section>
          <Section className='lovable-pals' ref={pals}>
            <BG className='bg' data-img={panel.three}></BG>
            <OurLovablePals />
            <ScrollBtnContainer
              onClick={() => handleScroll(mission.current)}
              ref={lovablePals}
            >
              <ScrollText>Scroll</ScrollText>
              <ArrowContainer ref={arrowThree}>
                <DownArrow />
              </ArrowContainer>
            </ScrollBtnContainer>
          </Section>
          <Section ref={mission}>
            <BG className='bg' data-img={panel.four}></BG>
            <Mission />
            <ScrollBtnContainer
              onClick={() => handleScroll(articles.current)}
              ref={missionPage}
            >
              <ScrollText>Scroll</ScrollText>
              <ArrowContainer ref={arrowFour}>
                <DownArrow />
              </ArrowContainer>
            </ScrollBtnContainer>
          </Section>
          <Section ref={articles}>
            <BG className='bg' data-img={panel.five}></BG>
            <Articles />
            <ScrollBtnContainer
              onClick={() => handleScroll(events.current)}
              ref={latestPage}
            >
              <ScrollText>Scroll</ScrollText>
              <ArrowContainer ref={arrowFive}>
                <DownArrow />
              </ArrowContainer>
            </ScrollBtnContainer>
          </Section>
          <Section ref={events}>
            <BG className='bg' data-img={panel.six}></BG>
            <Events />
            <ScrollBtnContainer
              onClick={() => handleScroll(products.current)}
              ref={eventsPage}
            >
              <ScrollText>Scroll</ScrollText>
              <ArrowContainer ref={arrowSix}>
                <DownArrow />
              </ArrowContainer>
            </ScrollBtnContainer>
          </Section>
          <Section ref={products}>
            <BG className='bg' data-img={panel.seven}></BG>
            <Shop />
          </Section>
        </>
      )}
    </>
  );
};

export default Parallax;
