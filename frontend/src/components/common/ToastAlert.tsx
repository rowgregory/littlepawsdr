import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import Checkmark from '../svg/Checkmark';

const GenericAlert = styled.div`
  background: #161b23;
  padding: 1.5rem 3rem;
`;

export const ToastAlert = (
  msg: string,
  onClose: () => void,
  type: string,
  img?: any
) => {
  return (
    <GenericAlert className='d-flex align-items-center'>
      <i
        onClick={onClose}
        className='fas fa-times'
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
        }}
      ></i>
      <Text color='#fff' marginRight='0.5rem'>
        {type === 'success' ? (
          <>
            {img ? (
              <Image
                src={img}
                alt='alert'
                width='50px'
                height='50px'
                style={{
                  objectFit: 'cover',
                  borderRadius: '25px',
                  marginRight: '0.5rem',
                }}
              />
            ) : (
              <i
                className='fa fa-check'
                aria-hidden='true'
                style={{ color: 'green', marginRight: '0.5rem' }}
              ></i>
            )}
          </>
        ) : (
          type === 'error' && (
            <i
              className='fa-solid fa-triangle-exclamation'
              style={{ color: 'red' }}
            ></i>
          )
        )}{' '}
        {msg}
      </Text>
      {img && <Checkmark />}
    </GenericAlert>
  );
};
