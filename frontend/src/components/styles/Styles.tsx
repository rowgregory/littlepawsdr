import styled from 'styled-components';

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
  left?: string;
  paddingTop?: string;
  textDecoration?: string;
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
  left: ${({ left }) => (left ? left : '')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '')};
  text-decoration: ${({ textDecoration }) => (textDecoration ? textDecoration : '')};
`;

interface FlexProps {
  fontSize?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  padding?: string;
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
  gap?: number;
  flexWrap?: string;
  fontFamily?: string;
}

export const Flex = styled.div<FlexProps>`
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : '0'};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0')};
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '0')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
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
  gap: ${({ gap }) => gap ? gap : ''};
  flex-wrap: ${({ flexWrap }) => flexWrap ? flexWrap : ''};
  font-family: ${({ fontFamily }) => fontFamily ? fontFamily : ''};
`;