import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from 'styled-components';
import { SMData } from '../../utils/sociaMediaData';

const SMContianer = styled.div`
  width: 100%;
  height: 30px;
  background: ${({ theme }) => theme.smcontainer.bg};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.25rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0 48px;
  }
`;

const SMIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  transition: 300ms;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.smcontainer.hoverBg};
    color: #000;
  }
`;

const SocialMediaNavbar = () => {
  return (
    <SMContianer>
      {SMData().map((obj: any, i: number) => (
        <OverlayTrigger
          key={i}
          trigger={['hover', 'focus']}
          placement='bottom'
          overlay={
            <Popover className='p-2' id='popover-positioned-bottom'>
              {obj.popTag}
            </Popover>
          }
        >
          <SMIconContainer
            onClick={() =>
              obj.linkKey
                ? window.open(obj.linkKey, '_blank')
                : window.scrollTo(0, document.body.scrollHeight)
            }
          >
            <i className={obj.className} style={obj.color}></i>
          </SMIconContainer>
        </OverlayTrigger>
      ))}
    </SMContianer>
  );
};

export default SocialMediaNavbar;
