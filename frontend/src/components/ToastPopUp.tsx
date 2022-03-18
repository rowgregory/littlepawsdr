import React, { FC } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { Text } from '../components/styles/Styles';

const ToastMessage = styled(Toast)`
  width: 200px;
  background: ${({ theme }) => theme.bg};
  border: none;
  border-radius: 0;
  max-width: 450px;
  padding: 1rem;
  box-shadow: 0 0 100px rgba(0, 0, 0, 1);
  @media screen and (min-width: 400px) {
    padding: 2rem 3rem !important;
    width: 500px;
  }
`;

const ToastHeader = styled(Toast.Header)`
  background: ${({ theme }) => theme.bg};
  border: none;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const ToastBody = styled(Toast.Body)`
  color: ${({ theme }) => theme.text};
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

// const AvatarInitials = styled.div`
//   height: 30px;
//   width: 30px;
//   background: #212121;
//   border-radius: 15px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: #fff;
// `;

const StyledLink = styled(Link)`
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.colors.blue04};
  color: ${({ theme }) => theme.white};
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  :hover {
    color: ${({ theme }) => theme.white};
    filter: brightness(0.9);
    text-decoration: none;
  }
`;

interface ToastPopUpProps {
  userInfo: any;
  message: string;
  setMessage: Function;
  itemAddedToCart?: boolean;
  setItemAddedToCart: Function;
}

const ToastPopUp: FC<ToastPopUpProps> = ({
  userInfo,
  message,
  setMessage,
  itemAddedToCart,
  setItemAddedToCart,
}) => {
  const dispatch = useDispatch();
  // const firstNameInitial = userInfo && userInfo.name[0].trim();
  // const lastNameInitial =
  //   userInfo && userInfo.name.split(' ')[1]
  //     ? userInfo.name.split(' ')[1][0].toUpperCase().trim()
  //     : '';

  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      {message !== '' && (
        <ToastMessage
          style={{
            position: 'fixed',
            top: 50,
            right: 77,
            zIndex: 30,
          }}
          // className={
          //   message === "Profile updated successfully" ||
          //   message === "Password Updated!" ||
          //   message === "Cart Updated!"
          //     ? "bg-success"
          //     : message === `You haven't changed anything!`
          //     ? "bg-info"
          //     : "bg-danger"
          // }
          animation
          show={true}
          autohide
          delay={3500}
          onClose={() => {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            setMessage('');
          }}
        >
          <ToastHeader>
            <div className='w-100 d-flex justify-content-end'>
              <Button
                className='bg-transparent border-0 p-0 mb-3'
                onClick={() => {
                  setItemAddedToCart(false);
                }}
              >
                <i style={{ color: '#000' }} className='fas fa-times'></i>
              </Button>
            </div>
            <div className='d-flex justify-content-between w-100'>
              <Text bold='bold'>{message}</Text>
              <Text bold='bold'>
                $
                {cartItems
                  .reduce(
                    (acc: any, item: any) => acc + item.qty * item.price,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </div>
          </ToastHeader>
          <ToastBody>
            <div className='d-flex flex-column w-100'>
              {itemAddedToCart && (
                <StyledLink to='/cart'>Cart Details</StyledLink>
              )}
            </div>
            {/* <AvatarInitials>
              {firstNameInitial}
              {lastNameInitial}
            </AvatarInitials> */}
          </ToastBody>
        </ToastMessage>
      )}
    </>
  );
};

export default ToastPopUp;
