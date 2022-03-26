import styled, { keyframes } from 'styled-components';
import { Button, Card, Carousel, Image } from 'react-bootstrap';

export const PageLayout = styled.div`
  width: 100%;
  max-width: 1837px;
  margin: 0 auto;
  padding: 2rem 0;
  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 4rem 0;
  }
`;
export const AdminPageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 3rem 0;
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
`;

export const CardTitle = styled(Card.Title)`
  font-size: 1.25rem;
  font-family: 'Duru Sans';
  margin: 0;
  padding-bottom: 0.25rem;
  color: ${({ theme }) => theme.card.text};
  font-weight: bold;
`;

export const StyledCarousel = styled(Carousel)`
  background: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
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
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  :hover {
    background: ${({ theme }) => theme.colors.primary};
    filter: brightness(1.1);
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
  bold?: string;
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
}

export const Text = styled.div<TextProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-family: ${({ fontFamily }) =>
    fontFamily ? fontFamily : `'Libre Franklin', sans-serif`};
  color: ${({ theme, color }) => (color ? color : theme.text)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : '')};
  padding: ${({ p }) => (p ? p : '')};
  background: ${({ background }) => (background ? background : '')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : '')};
  width: ${({ width }) => (width ? width : '')};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing ? letterSpacing : ''};
  text-indent: ${({ textIndent }) => (textIndent ? textIndent : '')};
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

const LoadingContainer = styled.div<{ h: string; w: string }>`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
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
`;

export const LoadingImg = ({ h, w }: any) => {
  return <LoadingContainer h={h} w={w} />;
};
