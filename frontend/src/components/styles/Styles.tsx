import styled from 'styled-components';
import { Button, Card, Image } from 'react-bootstrap';

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

export const CardTitle = styled.div`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  text-transform: uppercase;
  font-family: Montseratt, sans-serif;
  letter-spacing: 2.8px;
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
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : `Oswald`)};
  /* font-family: ${({ fontFamily }) =>
    fontFamily ? fontFamily : `Montserrat, sans-serif`}; */
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

export const StyledUloadedImg = styled(Image)<{ show?: any }>`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  transition: 300ms;
  filter: ${({ show }) => (show === 'true' ? 'brightness(1.3)' : '')};
  :hover {
    filter: brightness(1.3);
  }
`;

export const UpdateBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
`;

export const JumboAndWaveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Jumbo = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1.5rem 1rem; */
  border-radius: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  /* background: ${({ theme }) => theme.colors.tertiary}; */
  margin: 0rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-radius: 1.25rem;
    /* padding: 3rem 3.7rem; */
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
  font-size: 1rem;
  flex: 1;
  margin-bottom: 1.5rem;
`;

export const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: start;
  }
`;
