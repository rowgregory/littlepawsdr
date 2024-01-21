import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  background: #e8e8e5;
  min-height: 100vh;

  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const InnerContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  svg * {
    transform-box: fill-box;
  }
`;

const StyledLink = styled(Link)`
  border: none !important;
  :hover {
    text-decoration: none;
  }
`;

const doorOpen = keyframes`
0% {
  transform: rotateY(0deg);
}
100% {
  transform: rotateY(-105deg);
}

`;

const DoorGroup = styled.g`
  transition: all 1s;
  transform-origin: left center;
  &.anim {
    animation: ${doorOpen} 1s ease-out forwards;
    transform: perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(-105deg);
  }
`;

const Selling = () => {
  const [windowClicked, setWindowClicked] = useState('');
  const [insideStore, setInsideStore] = useState(false);
  const [count, setCount] = useState(9);

  const history = useNavigate();

  useEffect(() => {
    let intervalId: any;

    if (windowClicked) {
      intervalId = setInterval(() => {
        setCount((prevCount: any) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(intervalId);
            return prevCount;
          }
        });
      }, 100);
    }

    if (count === 0) {
      if (windowClicked === 'welcome-wiener') {
        setInsideStore(true);
      } else if (windowClicked === 'ecard') {
        history('/admin/eCardList');
      } else {
        history('/admin/product/list');
      }
    }

    return () => clearInterval(intervalId);
  }, [count, windowClicked, history]);

  return (
    <Container>
      <InnerContainer>
        {insideStore ? (
          <svg viewBox='0 0 75 75' enableBackground='new 0 0 75 75'>
            <rect x='10' y='10' fill='#a8763e' width='55' height='75' />
            <text
              onClick={() => {
                setCount(9);
                setWindowClicked('');
                setInsideStore(false);
              }}
              x='11'
              y='12'
              fontFamily='Rust'
              fontSize='1'
              fill='#fff'
              style={{ cursor: 'pointer' }}
            >
              Back to storefront
            </text>
            <rect x='20' y='20' fill='#656b76' width='35' height='15' />
            <rect x='30' y='20' fill='#93999a' width='20' height='7' />
            <rect x='19.5' y='35' fill='#323232' width='36' height='1' rx='0.25' ry='0.25' />
            <rect x='20' y='36' fill='#fcbc03' width='35' height='1.5' rx='0.25' ry='0.25' />
            <rect x='25' y='36' fill='#f8e10b' width='30' height='0.5' rx='0.25' ry='0.25' />
            <rect x='19.5' y='37' fill='#323232' width='36' height='1' rx='0.25' ry='0.25' />
            <rect x='20' y='38' fill='#656b76' width='35' height='15' />

            <StyledLink to='/admin/welcome-wiener/dachshund/list'>
              <g>
                <rect
                  x='35'
                  y='22.25'
                  width='13'
                  height='13'
                  fill='#a1d51b'
                  stroke='#323232'
                  strokeWidth='1'
                />
                <text x='48' y='25' fontFamily='Rust' fontSize='2' fill='#fff'>
                  <tspan x='38.25' dy='1.2em'>
                    Welcome
                  </tspan>
                  <tspan x='39' dy='1.2em'>
                    Wiener
                  </tspan>
                  <tspan x='37.5' dy='1.2em'>
                    Dachshunds
                  </tspan>
                </text>
              </g>
            </StyledLink>
            <rect x='30' y='42' fill='#93999a' width='20' height='7' />
            <rect x='19.5' y='53' fill='#323232' width='36' height='1' rx='0.25' ry='0.25' />
            <rect x='10' y='70' fill='#924500' width='55' height='5' />
            <StyledLink to='/admin/welcome-wiener/product/list'>
              <g>
                <rect
                  x='30'
                  y='40.5'
                  width='13'
                  height='13'
                  fill='#57b7eb'
                  stroke='#323232'
                  strokeWidth='1'
                />
                <text x='48' y='43' fontFamily='Rust' fontSize='2' fill='#fff'>
                  <tspan x='33.5' dy='1.2em'>
                    Welcome
                  </tspan>
                  <tspan x='34.25' dy='1.2em'>
                    Wiener
                  </tspan>
                  <tspan x='33.5' dy='1.2em'>
                    Products
                  </tspan>
                </text>
              </g>
            </StyledLink>
          </svg>
        ) : (
          <svg viewBox='0 0 75 42' enableBackground='new 0 0 75 42'>
            <rect x='5' y='0' fill='#B0BEC5' width='66' height='2' />
            <rect x='5' y='2' width='66' height='8' fill='#fff' />
            <rect x='5' y='2.5' fill='#B0BEC5' width='2' height='1.5' />
            <rect x='5' y='4.7' fill='#B0BEC5' width='2' height='1.5' />
            <rect x='5' y='7' fill='#B0BEC5' width='2' height='1.5' />

            <rect x='69' y='2.5' fill='#B0BEC5' width='2' height='1.5' />
            <rect x='69' y='4.7' fill='#B0BEC5' width='2' height='1.5' />
            <rect x='69' y='7' fill='#B0BEC5' width='2' height='1.5' />
            <text
              x='37'
              y='5.75'
              fontFamily='Rust'
              fontSize='5'
              fill='#ccc'
              textAnchor='middle'
              alignmentBaseline='middle'
            >
              Little Paws Shop
            </text>

            <rect x='5' y='19' fill='#CFD8DC' width='66' height='19' />
            <rect x='5' y='38' fill='#B0BEC5' width='50' height='4' />
            <rect x='69' y='38' fill='#B0BEC5' width='2' height='4' />
            <rect x='55' y='23' fill='#37474F' width='14' height='19' />

            {/* Door */}

            <rect x='56' y='24' fill='#924500' width='12' height='14' />
            <rect x='56' y='38' fill='#a8763e' width='12' height='18' />
            <DoorGroup className={windowClicked !== '' ? 'anim' : ''}>
              <rect x='56' y='24' fill='#455A64' width='12' height='18' />
              <rect x='65' y='33' width='1.15' height='3.7' rx='0.5' ry='0.5' fill='#90A4AE' />
            </DoorGroup>
            <circle cx='8' cy='19' r='3' fill='#8fb91d' />
            <circle cx='14' cy='19' r='3' fill='#558B2F' />
            <circle cx='20' cy='19' r='3' fill='#8fb91d' />
            <circle cx='26' cy='19' r='3' fill='#558B2F' />
            <circle cx='32' cy='19' r='3' fill='#8fb91d' />
            <circle cx='38' cy='19' r='3' fill='#558B2F' />
            <circle cx='44' cy='19' r='3' fill='#8fb91d' />
            <circle cx='50' cy='19' r='3' fill='#558B2F' />
            <circle cx='56' cy='19' r='3' fill='#8fb91d' />
            <circle cx='62' cy='19' r='3' fill='#558B2F' />
            <circle cx='68' cy='19' r='3' fill='#8fb91d' />

            <rect x='5' y='9' fill='#B0BEC5' width='66' height='2' />
            <rect x='5' y='11' fill='#b7d72e' width='6' height='8' />
            <rect x='11' y='11' fill='#7CB342' width='6' height='8' />
            <rect x='17' y='11' fill='#b7d72e' width='6' height='8' />
            <rect x='23' y='11' fill='#7CB342' width='6' height='8' />
            <rect x='29' y='11' fill='#b7d72e' width='6' height='8' />
            <rect x='35' y='11' fill='#7CB342' width='6' height='8' />
            <rect x='41' y='11' fill='#b7d72e' width='6' height='8' />
            <rect x='47' y='11' fill='#7CB342' width='6' height='8' />
            <rect x='53' y='11' fill='#b7d72e' width='6' height='8' />
            <rect x='59' y='11' fill='#7CB342' width='6' height='8' />
            <rect x='65' y='11' fill='#b7d72e' width='6' height='8' />

            <g
              x='7'
              y='30'
              width='14'
              height='11'
              onClick={() => setWindowClicked('welcome-wiener')}
              style={{ cursor: 'pointer' }}
            >
              <rect x='7' y='24' fill='#E3F2FD' width='14' height='11' />
              <rect x='8' y='25' width='12' height='9' fill='#a8763e' />
              <polygon points='9,32.5 19,32.5 20,34 8,34' fill='#455A64' />
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' style={{ stopColor: 'rgba(157,253,255,1)', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: 'rgba(233,198,253,1)', stopOpacity: 1 }} />
              </linearGradient>
              <rect
                x='8'
                y='25'
                width='12'
                height={windowClicked === 'welcome-wiener' ? count : '9'}
                fill='url(#gradient)'
              />

              <text
                x='12.5'
                y='28.5'
                fontFamily='FontAwesome'
                fontSize='2'
                fill='#fff'
                visibility={windowClicked === 'welcome-wiener' && count <= 3 ? 'hidden' : 'visible'}
              >
                &#xf5d7;
              </text>
              <text
                visibility={windowClicked === 'welcome-wiener' && count <= 5 ? 'hidden' : 'visible'}
                x='14'
                y='30'
                fontFamily='Rust'
                fontSize='1.75'
                fill='#fff'
                textAnchor='middle'
                alignmentBaseline='middle'
              >
                Welcome Wieners
              </text>
            </g>

            <g onClick={() => setWindowClicked('ecard')} style={{ cursor: 'pointer' }}>
              <rect x='22' y='24' fill='#E3F2FD' width='14' height='11' />
              <rect x='23' y='25' width='12' height='9' fill='#a8763e' />
              <linearGradient id='gradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' style={{ stopColor: 'rgba(102,211,72,1)', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: 'rgba(235,216,43,1)', stopOpacity: 1 }} />
              </linearGradient>
              <rect
                x='23'
                y='25'
                width='12'
                height={windowClicked === 'ecard' ? count : '9'}
                fill='url(#gradient2)'
              />
              <text
                x='28'
                y='28.5'
                fontFamily='FontAwesome'
                fontSize='2'
                fill='#fff'
                visibility={windowClicked === 'ecard' && count <= 3 ? 'hidden' : 'visible'}
              >
                &#xf0e0;
              </text>
              <text
                visibility={windowClicked === 'ecard' && count <= 5 ? 'hidden' : 'visible'}
                x='29'
                y='30'
                fontFamily='Rust'
                fontSize='2'
                fill='#fff'
                textAnchor='middle'
                alignmentBaseline='middle'
              >
                Ecards
              </text>
            </g>

            <g onClick={() => setWindowClicked('product')} style={{ cursor: 'pointer' }}>
              <rect x='37' y='24' fill='#E3F2FD' width='14' height='11' />
              <rect x='38' y='25' width='12' height='9' fill='#a8763e' />
              <linearGradient id='gradient3' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' style={{ stopColor: 'rgba(253,98,134)', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: 'rgba(244,215,40)', stopOpacity: 1 }} />
              </linearGradient>
              <rect
                x='38'
                y='25'
                width='12'
                height={windowClicked === 'product' ? count : '9'}
                fill='url(#gradient3)'
              />
              <text
                x='43'
                y='28.5'
                fontFamily='FontAwesome'
                fontSize='2'
                fill='#fff'
                visibility={windowClicked === 'product' && count <= 3 ? 'hidden' : 'visible'}
              >
                &#xf466;
              </text>
              <text
                visibility={windowClicked === 'product' && count <= 5 ? 'hidden' : 'visible'}
                x='44'
                y='30'
                fontFamily='Rust'
                fontSize='2'
                fill='#fff'
                textAnchor='middle'
                alignmentBaseline='middle'
              >
                Products
              </text>
            </g>
          </svg>
        )}
      </InnerContainer>
    </Container>
  );
};

export default Selling;
