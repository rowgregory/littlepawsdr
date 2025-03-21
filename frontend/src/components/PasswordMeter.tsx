import styled from 'styled-components';
import { Accordion } from './styles/place-order/Styles';
import { useLocation } from 'react-router-dom';

const Strength = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 10px;
  width: 100%;

  .bar {
    margin-right: 5px;
    height: 100%;
    width: 25%;
    transition: box-shadow 500ms;
    box-shadow: ${({ theme }) => `inset 0px 20px ${theme.card.bg}`};
  }
  .bar-show {
    box-shadow: none;
  }
  .bar-1 {
    background: ${({ theme }) =>
      theme.mode === 'day'
        ? 'linear-gradient(to right, red, orangered)'
        : 'linear-gradient(to right, #0347fe, #3e04a4)'};
  }
  .bar-2 {
    background: ${({ theme }) =>
      theme.mode === 'day'
        ? 'linear-gradient(to right, orangered, yellow)'
        : 'linear-gradient(to right, #3e04a4, #8600b0)'};
  }
  .bar-3 {
    background: ${({ theme }) =>
      theme.mode === 'day'
        ? 'linear-gradient(to right, yellow, yellowgreen)'
        : 'linear-gradient(to right, #8600b0, #a7194c)'};
  }
  .bar-4 {
    background: ${({ theme }) =>
      theme.mode === 'day'
        ? 'linear-gradient(to right, yellowgreen, green)'
        : 'linear-gradient(to right, #a7194c, #fe2812)'};
  }
  .bar:last-child {
    margin-right: 0;
  }
`;

export const PasswordRequirements = ({ validations, open }: any) => {
  const color = useLocation().pathname === '/settings/security' ? '#171919' : '#fff';
  return (
    <Accordion toggle={open} maxheight='110px' style={{ padding: '0 0.5rem' }}>
      <div className='flex items-start flex-col'>
        <p className='text-sm' style={{ color }}>
          {validations[0] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must be at least 9 characters
        </p>
        <p className='text-sm' style={{ color }}>
          {validations[1] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain a capital letter
        </p>
        <p className='text-sm' style={{ color }}>
          {validations[2] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain a number
        </p>
        <p className='text-sm' style={{ color }}>
          {validations[3] ? (
            <i className='fas fa-check' style={{ color: '#77b300' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain one symbol ~`!-@#$%^ &*()_+={}|:;"',.?
        </p>
      </div>
    </Accordion>
  );
};

const PasswordMeter = (strength: any) => {
  return (
    <>
      <Strength>
        <span
          style={{ border: strength > 0 ? '' : '1px solid #f6f8fa' }}
          className={strength > 0 ? 'bar bar-1 bar-show' : 'bar bar-1 bar'}
        ></span>
        <span
          style={{ border: strength > 1 ? '' : '1px solid #f6f8fa' }}
          className={strength > 1 ? 'bar bar-2 bar-show' : 'bar bar-2 bar'}
        ></span>
        <span
          style={{ border: strength > 2 ? '' : '1px solid #f6f8fa' }}
          className={strength > 2 ? 'bar bar-3 bar-show' : 'bar bar-3 bar'}
        ></span>
        <span
          style={{ border: strength > 3 ? '' : '1px solid #f6f8fa' }}
          className={strength > 3 ? 'bar bar-4 bar-show' : 'bar bar-4 bar'}
        ></span>
      </Strength>
    </>
  );
};

export default PasswordMeter;
