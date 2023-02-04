import { Image } from 'react-bootstrap';
import styled, { css, keyframes } from 'styled-components';

export const BorderTransformJulie = keyframes`
  0%,
  100% {
    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  }
  14% {
    border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
  }
  28% {
    border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
  }
  42% {
    border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
  }
  56% {
    border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
  }
  70% {
    border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
  }
  84% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
  }
`;
export const BorderTransformTina = keyframes`
  0%, 100% {
  border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
  }
  34% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
  }
`;
export const BorderTransformBeth = keyframes`
0%, 100% {
  border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
} 
34% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%
}
67% {
    border-radius: 63% 37% 68% 32% / 30% 63% 37% 70%;
  }
`;

export const BorderTransformNadine = keyframes`
0%, 100% {
  border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
} 
34% {
    border-radius: 70% 40% 50% 50% / 40% 40% 70% 70%
}
67% {
    border-radius: 73% 47% 48% 42% / 40% 73% 37% 70%;
  }
`;
export const BorderTransformErika = keyframes`
0%, 100% {
  border-radius: 73% 47% 48% 42% / 40% 73% 37% 70%;
} 
34% {
  border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
}
67% {
    border-radius: 70% 40% 50% 50% / 40% 40% 70% 70% 
}
`;
export const BorderTransformCathy = keyframes`
0%, 100% {
  border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
} 
34% {
  border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
}
67% {
  border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;  
}
`;
export const BorderTransformCarol = keyframes`
0%, 100% {
  border-radius:54% 46% 38% 62% / 49% 70% 30% 51%;
} 
34% {
  border-radius:  50% 50% 34% 66% / 56% 68% 32% 44%;
}
67% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
  }
`;

export const BlobWrap = styled.div<{ img: any; name?: any }>`
  position: relative;
  width: 100%;
  display: block;
  z-index: 1;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  .blob {
    position: relative;
    width: 100%;
    display: block;
    text-align: center;
    font-weight: 700;
    letter-spacing: 3px;
    font-size: 22px;
    line-height: 1.7;
    color: #eeeff3;
    transform: translate3d(0, 0, 35px) perspective(100px);
  }
  .blob:before {
    content: '';
    position: absolute;
    background-image: ${({ img }) => (img ? `url(${img})` : '')};
    background-size: ${({ name }) =>
      name === 'Tina Millar' || name === 'Nadine Peacock' ? '267px' : '200px'};
    background-repeat: no-repeat;
    object-fit: cover;
    width: 200px;
    height: 200px;
    z-index: -1;
    display: block;
    border: 4px solid #fff;
    transform: translate(30%, -77%);
    animation: ${({ name }) =>
      name === 'Julie Johnson'
        ? css`
            ${BorderTransformJulie} 6s linear infinite
          `
        : name === 'Tina Millar'
        ? css`
            ${BorderTransformTina} 6s linear infinite
          `
        : name === 'Nadine Peacock'
        ? css`
            ${BorderTransformBeth} 6s linear infinite
          `
        : name === 'Beth Mittleman'
        ? css`
            ${BorderTransformNadine} 6s linear infinite
          `
        : name === 'Erika Abrams'
        ? css`
            ${BorderTransformErika} 6s linear infinite
          `
        : name === 'Cathy Neustadt'
        ? css`
            ${BorderTransformCathy} 6s linear infinite
          `
        : css`
            ${BorderTransformErika} 6s linear infinite
          `};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    .blob:before {
      transform: translate(15%, -71%);
      width: 250px;
      height: 250px;
      background-size: ${({ name }) =>
        name === 'Tina Millar' || name === 'Nadine Peacock'
          ? '317px'
          : '250px'};
    }
  }
`;

export const Card3DWrap = styled.div`
  background-color: transparent;
  border: 1px solid #f1f1f1;
  perspective: 1000px;
  border: 0 !important;
  border-radius: 0px;
  width: 100%;
  height: 500px;
  margin-inline: 8px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 600px;
    height: 380px;
    background: none;
    border-radius: 16px;
  }
`;

export const Inner = styled.div`
  z-index: 2;
  -webkit-transform: translateY(-50%) translateZ(100px) scale(0.94);
  transform: translateY(-50%) translateZ(100px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  -webkit-backface-visibility: hidden;
  visibility: visible;
  backface-visibility: hidden;

  &.affiliation {
    @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      display: flex;
      justify-content: center;
      height: 100%;
      align-items: flex-end;
      font-size: 18px;
      font-weight: bold;
      padding: 0 0 48px 0;
    }
  }
`;

export const ProfileCardImg = styled(Image)`
  width: 100%;
  height: 240px;
  border-radius: 16px 16px 0 0;
  object-fit: cover;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 220px;
    height: 380px;
    border-radius: 16px 0 0 16px;
  }
`;

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h6 {
    text-align: center;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;

    h6 {
      align-self: center;
    }
  }
`;

export const Name = styled.div`
  margin-top: 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #4a4848;
  width: 100%;
  line-height: 30px;
  transition: transform 300ms 300ms ease, opacity 300ms 300ms ease;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-top: 50px;
    margin-left: 90px;
    max-width: 134px;
    text-align: left;
  }
`;

export const Right = styled.div`
  margin-top: 50px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-top: 96px;
  }
`;

export const Email = styled.div`
  margin-top: 10px;
  margin-inline: auto;
  font-size: 15px;
  font-weight: 400;
  color: #4a4848;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-top: 20px;
    margin-left: 90px;
  }
`;

export const Location = styled.div`
  margin-top: 10px;
  margin-inline: auto;
  font-size: 13px;
  font-weight: 400;
  color: #4a4848;
  height: 100%;
  margin-bottom: 30px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-top: 20px;
    margin-left: 90px;
  }
`;

export const Affiliation = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 17px;
    font-weight: 600;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 200px;
  }
`;
