import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.footer.bg};
  border-top: ${({ theme }) => `3px solid ${theme.smcontainer.bg}`};
  padding: 16px;
  position: relative;
`;

export const TopFooter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  display: flex;
  align-items: start;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 72px 0;
    align-items: center;
    flex-direction: row;
  }
`;
export const LogoImage = styled(Image)`
  margin-left: -25px;
  max-width: 220px;
  width: 100%;
  margin-bottom: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-bottom: 0;
  }
`;
export const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: grid;
    max-width: 1000px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export const LinkSection = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-bottom: 0;
  }
`;

export const LinkCategory = styled.div`
  color: #fff;
  margin-bottom: 8px;
  margin-top: 20px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-top: 0;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.footer.text};
  transition: 300ms;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  line-height: 1.9230769231;
  font-size: 12px;
`;

export const StyledExternalLink = styled.div`
  color: ${({ theme }) => theme.footer.text};
  transition: 300ms;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  line-height: 1.9230769231;
  font-size: 12px;
`;
export const StyledInternalLink = styled(Link)`
  color: ${({ theme }) => theme.footer.text};
  transition: 300ms;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  line-height: 1.9230769231;
  font-size: 12px;
`;

export const StyledText = styled.div`
  color: ${({ theme }) => theme.footer.text};
  line-height: 1.9230769231;
  font-size: 12px;
`;

export const BottomFooter = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  width: 100%;
  align-items: center;
  text-align: center;
  /* flex-direction: column;
  margin-top: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    align-items: center;
  } */
`;

export const Signature = styled.div`
  color: ${({ theme }) => theme.footer.text};
  transition: 300ms;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
  line-height: 1.9230769231;
`;

export const LegalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Developed = styled.div`
  width: 100%;
  transition: 300ms;
  color: #918f98;
  font-size: 11px;
  cursor: pointer;
  margin-top: 28px;
  display: flex;
  justify-content: center;
  :hover {
    color: #fff;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    /* margin-right: 100px; */
    margin-top: 0px;
  }
`;

export const Photographer = styled.div`
  position: absolute;
  top: -22px;
  right: 10px;
  color: #dfdfdf;
  font-size: 10px;
  z-index: 20;
  cursor: pointer;
`;
