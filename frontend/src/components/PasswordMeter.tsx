import React from 'react';
// import styled from 'styled-components';
import { Text } from '../components/styles/Styles';

// const Strength = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   height: 20px;
//   width: 100%;

//   .bar {
//     margin-right: 5px;
//     height: 100%;
//     width: 25%;
//     transition: box-shadow 500ms;
//     box-shadow: ${({ theme }) => `inset 0px 20px ${theme.card.bg}`};
//   }
//   .bar-show {
//     box-shadow: none;
//   }
//   .bar-1 {
//     background: ${({ theme }) =>
//       theme.mode === 'day'
//         ? 'linear-gradient(to right, red, orangered)'
//         : 'linear-gradient(to right, #0347fe, #3e04a4)'};
//   }
//   .bar-2 {
//     background: ${({ theme }) =>
//       theme.mode === 'day'
//         ? 'linear-gradient(to right, orangered, yellow)'
//         : 'linear-gradient(to right, #3e04a4, #8600b0)'};
//   }
//   .bar-3 {
//     background: ${({ theme }) =>
//       theme.mode === 'day'
//         ? 'linear-gradient(to right, yellow, yellowgreen)'
//         : 'linear-gradient(to right, #8600b0, #a7194c)'};
//   }
//   .bar-4 {
//     background: ${({ theme }) =>
//       theme.mode === 'day'
//         ? 'linear-gradient(to right, yellowgreen, green)'
//         : 'linear-gradient(to right, #a7194c, #fe2812)'};
//   }
//   .bar:last-child {
//     margin-right: 0;
//   }
// `;

const PasswordMeter = ({ validations, strength }: any) => {
  return (
    <>
      {/* <Strength>
        <span
          className={strength > 0 ? 'bar bar-1 bar-show' : 'bar bar-1 bar'}
        ></span>
        <span
          className={strength > 1 ? 'bar bar-2 bar-show' : 'bar bar-2 bar'}
        ></span>
        <span
          className={strength > 2 ? 'bar bar-3 bar-show' : 'bar bar-3 bar'}
        ></span>
        <span
          className={strength > 3 ? 'bar bar-4 bar-show' : 'bar bar-4 bar'}
        ></span>
      </Strength> */}
      <div className='d-flex align-items-start flex-column'>
        <Text fontSize='0.875rem'>
          {validations[0] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must be at least 5 characters
        </Text>
        <Text fontSize='0.875rem'>
          {' '}
          {validations[1] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain a capital letter
        </Text>
        <Text fontSize='0.875rem'>
          {' '}
          {validations[2] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain a number
        </Text>
        <Text fontSize='0.875rem'>
          {' '}
          {validations[3] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain one of !$&+,:;=?@#
        </Text>
      </div>
    </>
  );
};

export default PasswordMeter;
