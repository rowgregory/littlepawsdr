import styled, { keyframes } from 'styled-components';
import { Button, Card, Carousel, Image } from 'react-bootstrap';
import { FC } from 'react';

export const PageLayout = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const LayoutWrapper = styled.div`
  margin: 0 0.25rem;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 1rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin: 0 48px;
  }
`;

export const AdminPageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
    flex-direction: column;
  }
`;

export const ScrollTopBtn = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 90px;
  z-index: 2;
`;

export const PageHeader = styled.h4<{ fontSize?: string }>`
  font-family: 'Ubuntu', sans-serif;
  color: ${({ theme }) => theme.pageHeader};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '24px')};
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: left;
  }
`;

export const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.secondaryBg};
  border-radius: 0;
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  margin: 0 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0;
    padding: 1rem;
  }
`;

export const CardTitle = styled(Card.Title)`
  font-size: 1.15rem;
  margin: 0;
  color: ${({ theme }) => theme.card.text};
  font-weight: bold;
`;

export const StyledCarousel = styled(Carousel)`
  background: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 425px;
    height: 425px;
  }
`;

export const TableBody = styled.tbody`
  tr {
    cursor: normal;
    :nth-child(odd) {
      background: ${({ theme }) => theme.table.odd};
    }
    :nth-child(even) {
      background: ${({ theme }) => theme.table.even};
    }

    td {
      border: none;
      color: ${({ theme }) => theme.text};
      font-size: 1rem;
      vertical-align: inherit;
      cursor: normal;
      &.dashboard {
        padding: 1.5rem 0.75rem;

        @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
          padding: 1.5rem;
        }
      }
    }
  }
`;

export const StyledEditBtn = styled(Button)`
  background: transparent;
  border-radius: 50%;
  border: none;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: ${({ theme }) => theme.colors.primary};
  }
  :hover,
  :active,
  :focus {
    background: ${({ theme }) => theme.separator} !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

export const Path = styled.path`
  fill: ${({ theme }) => theme.text};
`;

export const SettingsTitleContainer = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.separator}`};
`;

interface TextProps {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  fontFamily?: string;
  textAlign?: string;
  background?: string;
  p?: string;
  fontStyle?: string;
  width?: string;
  letterSpacing?: string;
  textIndent?: string;
  border?: string;
  borderBottom?: string;
  lineHeight?: string;
}

export const Text = styled.div<TextProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '0.875rem')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : `Duru Sans`)};
  color: ${({ theme, color }) => (color ? color : theme.text)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : '')};
  padding: ${({ p }) => (p ? p : '')};
  background: ${({ background }) => (background ? background : '')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : '')};
  width: ${({ width }) => (width ? width : '')};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing ? letterSpacing : ''};
  text-indent: ${({ textIndent }) => (textIndent ? textIndent : '')};
  border: ${({ border }) => (border ? border : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '')};
`;

export const SettingsPageHeader = styled.h4`
  color: ${({ theme }) => theme.text};
  font-weight: normal;
  font-size: 1.5rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

export const StyledUloadedImg = styled(Image)`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

export const UpdateBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
`;

export const Shimmer = keyframes`
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const LoadingContainer = styled.div<{
  h: string;
  w: string;
  mw: string;
  borderRadius?: string;
}>`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  max-width: ${({ mw }) => (mw ? mw : '')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '')};
  border: none;
  position: relative;
  animation: ${Shimmer} 1500ms infinite;
  background-size: 400%;
  background-image: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.loading.one} 0%,
    ${theme.loading.one} 40%,
    ${theme.loading.two} 50%,
    ${theme.loading.two} 55%,
    ${theme.loading.one} 65%,
    ${theme.loading.one} 100%
  );`};
  aspect-ratio: 1/1;
`;

interface LoadingImmProps {
  h?: any;
  w?: any;
  mw?: any;
  borderRadius?: any;
}

export const LoadingImg: FC<LoadingImmProps> = ({ h, w, mw, borderRadius }) => {
  return <LoadingContainer h={h} w={w} mw={mw} borderRadius={borderRadius} />;
};

export const JumboAndWaveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Jumbo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  border-radius: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  background: ${({ theme }) => theme.colors.tertiary};
  margin: 0rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-radius: 1.25rem;
    padding: 3rem 3.7rem;
    margin: 2rem;
    flex-direction: column;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    flex-direction: column;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    flex-direction: row;
  }
`;

export const TitleAndIntroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-right: 3rem;
  }
`;

export const IntroText = styled.div`
  font-family: 'Duru Sans';
  font-size: 1rem;
  color: #fff;
  flex: 1;
  margin-bottom: 1.5rem;
`;
export const Title = styled.div`
  font-family: 'Duru Sans';
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: start;
  }
`;
