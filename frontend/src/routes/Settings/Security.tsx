import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  getConfirmationOfOldPassword,
  updateUserProfile,
} from '../../actions/userActions';
import HorizontalLoader from '../../components/HorizontalLoader';
import Message from '../../components/Message';
import PasswordMeter from '../../components/PasswordMeter';
import {
  SettingsPageHeader,
  SettingsTitleContainer,
  Text,
} from '../../components/styles/Styles';
import Checkmark from '../../components/svg/Checkmark';
import {
  USER_OLD_PASSWORD_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConstants';
import { isCapsLock } from '../../utils/capsLock';

const ConfirmBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
`;

const Settings = ({ history }: any) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [checkmark, setCheckmark] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [capsLockOn, setCapsLocksOn] = useState(false);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userPassword = useSelector((state: any) => state.userPassword);
  const {
    loading: loadingPasswordConfirmation,
    error: errorPasswordConfirmation,
    user: passwordConfirmation,
  } = userPassword;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { loading: loadingUpdateProfile, success } = userUpdateProfile;

  const validations = [
    newPassword.length >= 5 ? 1 : 0,
    newPassword.search(/[A-Z]/) > -1 ? 1 : 0,
    newPassword.search(/[0-9]/) > -1 ? 1 : 0,
    newPassword.search(/[$&+,:;=?@#]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (passwordConfirmation === true) {
      if (newPassword === confirmNewPassword) {
        if (strength === 4) {
          dispatch(
            updateUserProfile({
              id: userInfo._id,
              newPassword,
            })
          );
          setNewPassword('');
          setConfirmNewPassword('');
        } else {
          setShowMessage(true);
          setMessage('Password not strong enough');
        }
      } else {
        setShowMessage(true);
        setMessage('Your new passwords did not match');
      }
    } else {
      dispatch(getConfirmationOfOldPassword(userInfo._id, oldPassword));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else if (success) {
      setCheckmark(true);
      setOldPassword('');
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch({ type: USER_OLD_PASSWORD_RESET });
    } else {
      dispatch({ type: USER_OLD_PASSWORD_RESET });

      document.addEventListener('keypress', e => {
        const result = isCapsLock(e);
        setCapsLocksOn(result);
      });
    }
  }, [dispatch, history, success, userInfo]);

  return (
    <div className='w-100'>
      {errorPasswordConfirmation && (
        <Message variant='danger'>{errorPasswordConfirmation}</Message>
      )}
      {message !== '' && (
        <Message
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          variant='danger'
        >
          {message}
        </Message>
      )}
      <Row>
        <Col md={12}>
          <SettingsTitleContainer className='d-flex justify-content-between align-items-center'>
            <SettingsPageHeader>
              {capsLockOn ? (
                <>
                  Change password
                  <Text fontSize='14px' color='red' className='ml-2'>
                    (Caps Lock is on)
                  </Text>
                </>
              ) : (
                'Change password'
              )}
            </SettingsPageHeader>
            {checkmark && pathname === '/settings/security' && <Checkmark />}
          </SettingsTitleContainer>
        </Col>
      </Row>
      {(loadingPasswordConfirmation || loadingUpdateProfile) && (
        <HorizontalLoader />
      )}
      <Row>
        <Col lg={8} md={12} className='pr-4 pl-0'>
          <Form onSubmit={submitHandler} className='pl-3 mt-4'>
            <div style={{ position: 'relative' }}>
              <Form.Group controlId='oldPassword'>
                <Form.Label>Old password</Form.Label>
                <Form.Control
                  disabled={passwordConfirmation === true}
                  type='password'
                  value={oldPassword || ''}
                  onChange={(e: any) => setOldPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {passwordConfirmation === true && (
                <i
                  className='fas fa-check'
                  style={{
                    color: 'green',
                    position: 'absolute',
                    top: '39px',
                    right: '8px',
                  }}
                ></i>
              )}
            </div>
            {passwordConfirmation === true && (
              <>
                <Form.Group controlId='newPassword'>
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type='password'
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmNewPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={confirmNewPassword}
                    onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </>
            )}
            <ConfirmBtn type='submit' disabled={oldPassword === ''}>
              {passwordConfirmation === true ? 'Update' : 'Confirm'}
            </ConfirmBtn>
          </Form>
        </Col>
      </Row>
      {passwordConfirmation === true && (
        <Row>
          <Col lg={8} md={12} className='pr-4 my-3'>
            <PasswordMeter validations={validations} strength={strength} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Settings;
