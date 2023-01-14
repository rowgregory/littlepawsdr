import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LegacyWallpaper from '../../components/assets/aqua_tile.jpg';

export const StyledCard = styled.div`
  border-radius: 0;
  margin: 0 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0;
  }
`;

export const CardTitle = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2.8px;
  max-width: 680px;
  margin-inline: auto;
`;

export const Path = styled.path`
  fill: ${({ theme }) => theme.text};
`;

interface TextProps {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
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
  height?: string;
  cursor?: string;
  maxWidth?: string;
}

export const Text = styled.div<TextProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '13px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : `Roboto`)};
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
  height: ${({ height }) => (height ? height : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
`;

export const UpdateBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.quinary};
  border: 1px solid ${({ theme }) => theme.colors.quinary};
  margin-top: 32px;
  transition: 300ms;
  font-size: 13px;
  :hover {
    filter: brightness(0.9);
    background: ${({ theme }) => theme.colors.quinary};
    border: 1px solid ${({ theme }) => theme.colors.quinary};
  }
`;

export const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :hover,
  :active,
  :disabled,
  :focus,
  :focus-within {
    background: ${({ theme }) => theme.colors.secondary} !important;
    filter: brightness(0.9);
  }
  box-shadow: none !important;
  padding: 16px 24px;
  border-radius: 0.75rem;
  font-weight: 400;
  font-size: 16px;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  :hover {
    color: ${({ theme }) => theme.colors.secondary};
    filter: brightness(0.9);
  }
  text-align: center;
  font-weight: 400;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: ${({ theme }) => theme.input.bg};
  background: ${({ theme }) => theme.secondaryBg};
  padding-block: 145px;
  min-height: 100vh;
  background: url(${LegacyWallpaper});
`;

export const FormWrapper = styled.div`
  margin-inline: auto;
  padding: 32px;
  max-width: 472px;
  width: 100%;
  background: ${({ theme }) => (theme.mode === 'night' ? '#161b22' : '#fff')};
  border: 0.8px solid
    ${({ theme }) => (theme.mode === 'night' ? '#21262d' : '#ededed')};
  border-radius: 0.4rem;
`;

export const FormContainer = styled.div`
  max-width: 330px;
  width: 100%;
  margin-inline: auto;
  padding-block: 32px;
`;

export const CreateAccountContainer = styled.div`
  font-weight: 300;
  text-align: center;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.bg};
`;
