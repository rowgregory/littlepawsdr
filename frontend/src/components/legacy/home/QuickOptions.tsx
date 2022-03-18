import React from 'react';
import { useHistory } from 'react-router';
import styled, { useTheme } from 'styled-components';

const HoverButton = styled.span<{
  isDay: boolean;
  btnText?: any;
}>`
  &.donateOption {
    border: ${({ theme, isDay }) =>
      `3px solid ${theme.banner.quickOptions.donate}`};
  }
  &.fosterOption {
    border: ${({ theme, isDay }) =>
      `3px solid ${theme.banner.quickOptions.foster}`};
  }
  &.volunteerOption {
    border: ${({ theme, isDay }) =>
      `3px solid ${theme.banner.quickOptions.volunteer}`};
  }
  padding: 0;
  border-radius: 0;
  height: 75px;
  width: 100px;
  color: #fff;
  font-weight: bold;
  border: none;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
  &.grow_box {
    :hover,
    :active {
      letter-spacing: 5px;
    }
    &:after {
      transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transform: scale(0, 0);
    }
    &:hover {
      :after {
        transform: scale(1, 1);
      }
    }
    &:after {
      content: '';
      background: ${({ theme, isDay, btnText }) =>
        isDay && btnText === 'donate'
          ? '#4ca185'
          : isDay && btnText === 'foster'
          ? '#528b63'
          : isDay && btnText === 'volunteer'
          ? '#1c5c56'
          : ''};
      position: absolute;
      z-index: -1;
      padding: 0.85em 0.75em;
      display: block;
    }
  }
`;

const QuickOptions = () => {
  const history = useHistory();
  const theme = useTheme() as any;

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '20px',
        }}
      >
        <HoverButton
          btnText='donate'
          isDay={theme.mode === 'day'}
          className='donateOption grow_box'
        >
          DONATE
        </HoverButton>

        <HoverButton
          btnText='foster'
          isDay={theme.mode === 'day'}
          onClick={() => {
            history.push('/volunteer/foster-application');
          }}
          className='fosterOption grow_box'
        >
          FOSTER
        </HoverButton>
        <HoverButton
          btnText='volunteer'
          isDay={theme.mode === 'day'}
          onClick={() => {}}
          className='volunteerOption grow_box'
        >
          VOLUNTEER
        </HoverButton>
      </div>
    </>
  );
};

export default QuickOptions;
