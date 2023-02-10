import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.footer.bg};
  border-top: ${({ theme }) => `3px solid ${theme.smcontainer.bg}`};
  padding: 1rem;
`;

export const TopFooter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[4]};
  margin: 0 96px;
  display: flex;
  align-items: start;
  padding: 32px 0 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 72px 0;
    align-items: center;
    flex-direction: row;
  }
`;
export const LogoImage = styled(Image)`
  margin-left: -25px;
  max-width: 270px;
  width: 100%;
  margin-right: 64px;
  object-fit: cover;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-right: 64px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-right: 96px;
  }
`;
export const LinkWrapper = styled.div`
  width: 100%;
  margin: 32px 0;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: grid;
    grid-template-columns: 0.75fr 0.6fr 1.5fr;
  }
`;
export const LinkSection = styled.div`
  margin-bottom: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-bottom: 0;
  }
`;

export const LinkCategory = styled.div`
  color: #fff;
  margin-bottom: 8px;
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
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    align-items: center;
  }
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
  transition: 300ms;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: #ccc;
  }
  margin-top: 48px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-top: 0px;
  }
`;
