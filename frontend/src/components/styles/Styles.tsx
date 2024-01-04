import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LegacyWallpaper from '../../components/assets/aqua_tile.jpg';

export const StyledCard = styled.div`
  border-radius: 0;
  margin: 0 0.25rem;
  box-shadow: 0 12px 35px 0 rgba(16, 39, 112, 0.07);
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
  textTransform?: string;
  position?: string;
  top?: string;
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
  text-transform: ${({ textTransform }) =>
    textTransform ? textTransform : ''};
  position: ${({ position }) => (position ? position : 'relative')};
  top: ${({ top }) => (top ? top : '')};
`;

interface FlexProps {
  fontSize?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  background?: string;
  width?: string;
  border?: string;
  height?: string;
  cursor?: string;
  maxWidth?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flex?: string;
  borderBottom?: string;
  borderTop?: string;
  color?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  borderRadius?: string;
}

export const Flex = styled.div<FlexProps>`
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : '0'};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0')};
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '0')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')};
  background: ${({ background }) => (background ? background : '')};
  width: ${({ width }) => (width ? width : '')};
  border: ${({ border }) => (border ? border : '')};
  height: ${({ height }) => (height ? height : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
  display: ${({ display }) => (display ? display : 'flex')};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : 'row'};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'flex-start')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
  flex: ${({ flex }) => (flex ? flex : '1 0 0')};
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? borderBottom : '1 0 0'};
  border-top: ${({ borderTop }) =>
    borderTop ? borderTop : ''};
  color: ${({ color }) => (color ? color : '')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '13px')};
  position: ${({ position }) => (position ? position : 'relative')};
  top: ${({ top }) => (top ? top : '')};
  right: ${({ right }) => (right ? right : '')};
  bottom: ${({ bottom }) => (bottom ? bottom : '')};
  left: ${({ left }) => (left ? left : '')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '')};
`;

export const UpdateBtn = styled.button`
  background: ${({ theme }) => theme.colors.quinary};
  border: 1px solid ${({ theme }) => theme.colors.quinary};
  margin-top: 32px;
  transition: 300ms;
  font-size: 16px;
  width: 100%;
  border-radius: 8px;
  color: #fff;
  padding: 8px 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: fit-content;
  }
  :hover {
    filter: brightness(1.1);
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
  border-radius: 0.76rem;
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
  padding: 8px;
  min-height: 100vh;
  background: url(${LegacyWallpaper});
`;

export const FormWrapper = styled.div`
  margin-inline: auto;
  padding: 32px;
  width: 100%;
  min-height: calc(100vh - 16px);
  border-radius: 0;
  &.register,
  &.login,
  &.forgot-password,
  &.reset-password {
    background: rgba(255, 255, 255, 0.32);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.57);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-radius: 0.4rem;
    max-width: 472px;
    min-height: fit-content;
  }
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
  color: #fff;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export const AccordionWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-inline: auto;
`;

export const GlassBtn = styled.button`
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.37);
  width: 100%;
  padding-block: 10px;
  border-radius: 0;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    outline: none;
    background: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0.37);
  }
`;
