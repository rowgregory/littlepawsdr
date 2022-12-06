import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConfirmationOfOldPassword,
  updateUserProfile,
} from '../../actions/userActions';
import JumpingInput from '../../components/common/JumpingInput';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../../components/Message';
import PasswordMeter from '../../components/PasswordMeter';
import { SettingsTitleContainer } from '../../components/styles/profile/Styles';
import { Text } from '../../components/styles/Styles';
import Checkmark from '../../components/svg/Checkmark';
import {
  USER_OLD_PASSWORD_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConstants';

const useSecurityForm = (cb: any, values: any) => {
  const [inputs, setInputs] = useState(values);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { inputs, handleInput, onSubmit, setInputs };
};

const Settings = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  }) as any;
  const [checkmark, setCheckmark] = useState(false);
  const [message, setMessage] = useState('');

  const {
    userLogin: { userInfo },
    userPassword: {
      loading: loadingPasswordConfirmation,
      error: errorPasswordConfirmation,
      success: passwordConfirmation,
    },
    userUpdateProfile: { loading: loadingUpdateProfile, success },
  } = useSelector((state: any) => state);

  const securityFormCallback = () => {
    if (passwordConfirmation) {
      if (inputs?.newPassword === inputs?.confirmNewPassword) {
        if (strength === 4) {
          dispatch(
            updateUserProfile({
              id: userInfo._id,
              newPassword: inputs?.newPassword,
            })
          );
        } else {
          setMessage('Password not strong enough');
        }
      } else {
        setMessage('Passwords do not match');
      }
    } else {
      dispatch(getConfirmationOfOldPassword(userInfo._id, inputs?.oldPassword));
    }
  };

  const values = useMemo(
    () => ({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }),
    []
  );

  const { inputs, handleInput, onSubmit, setInputs } = useSecurityForm(
    securityFormCallback,
    values
  );

  const validations = [
    inputs?.newPassword?.length >= 9 ? 1 : 0,
    inputs?.newPassword?.search(/[A-Z]/) > -1 ? 1 : 0,
    inputs?.newPassword?.search(/[0-9]/) > -1 ? 1 : 0,
    inputs?.newPassword?.search(/[~`!-@#$%^ &*()_+={}|:;"',.?]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    if (success) {
      setCheckmark(true);
      setInputs(values);
      setMessage('');
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch({ type: USER_OLD_PASSWORD_RESET });
    } else if (passwordConfirmation) {
      setShowPassword((sp: any) => ({ ...sp, oldPassword: false }));
    }
  }, [dispatch, passwordConfirmation, setInputs, success, values]);

  useEffect(() => {
    dispatch({ type: USER_OLD_PASSWORD_RESET });
  }, [dispatch]);

  return (
    <div className='w-100'>
      {(loadingPasswordConfirmation || loadingUpdateProfile) && (
        <HexagonLoader />
      )}
      <Row>
        <Col md={12} className='pr-0'>
          <SettingsTitleContainer className='d-flex justify-content-between align-items-center'>
            <Text fontSize='1.5rem'>Change password</Text>
          </SettingsTitleContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={12} className='pr-4 pl-0'>
          <Form onSubmit={onSubmit} className='pl-3 mt-4'>
            {(errorPasswordConfirmation || message) && (
              <Message variant='danger'>
                {errorPasswordConfirmation?.message || message}
              </Message>
            )}
            {checkmark && <Message variant='success'>Password updated</Message>}
            <div style={{ position: 'relative' }}>
              <JumpingInput
                name='oldPassword'
                label='Current password'
                value={inputs.oldPassword || ''}
                handleInputChange={handleInput}
                type={showPassword.oldPassword ? 'text' : 'password'}
                isSelect={false}
                error={''}
                blur={() => {}}
                showPassword={showPassword.oldPassword}
                setShowPassword={setShowPassword}
                disabled={passwordConfirmation}
              />
              {passwordConfirmation && (
                <div
                  style={{ position: 'absolute', top: '10px', right: '0px' }}
                >
                  <Checkmark />
                </div>
              )}
            </div>
            {passwordConfirmation && (
              <>
                <JumpingInput
                  name='newPassword'
                  label='New password'
                  value={inputs.newPassword || ''}
                  handleInputChange={handleInput}
                  type={showPassword.newPassword ? 'text' : 'password'}
                  isSelect={false}
                  error={''}
                  blur={() => {}}
                  showPassword={showPassword.newPassword}
                  setShowPassword={setShowPassword}
                />
                <PasswordMeter validations={validations} strength={strength} />

                <JumpingInput
                  name='confirmNewPassword'
                  label='Confirm new password'
                  value={inputs.confirmNewPassword || ''}
                  handleInputChange={handleInput}
                  type={showPassword.confirmNewPassword ? 'text' : 'password'}
                  isSelect={false}
                  error={''}
                  blur={() => {}}
                  showPassword={showPassword.confirmNewPassword}
                  setShowPassword={setShowPassword}
                />
              </>
            )}
            <Button
              variant='success'
              type='submit'
              disabled={inputs?.oldPassword === ''}
            >
              {passwordConfirmation
                ? 'Update'
                : loadingPasswordConfirmation
                ? 'Confirming...'
                : loadingUpdateProfile
                ? 'Updating...'
                : 'Confirm'}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
