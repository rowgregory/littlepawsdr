import { useLocation } from 'react-router-dom';
import { usePasswordStrength } from '../../utils/hooks/usePasswordStrength';
import PasswordMeter, { PasswordRequirements } from '../PasswordMeter';
import { Text } from '../styles/Styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPasswordStrength } from '../../reducers/passwordReducer';

const PasswordValidationSection = ({
  show,
  setShow,
  inputs,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: any;
}) => {
  const { validations, strength } = usePasswordStrength(inputs);
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const passwordValidations = state.password.validations;
  const passwordStrength = state.password.strength;

  useEffect(() => {
    dispatch(setPasswordStrength(validations, strength));
  }, [dispatch, validations, strength]);

  const color =
    useLocation().pathname === '/settings/security' ? '#171919' : '#fff';
  return (
    <div className='mb-2'>
      <PasswordMeter strength={passwordStrength} />
      <Text
        color={color}
        cursor='pointer'
        fontSize='12px'
        onClick={() => setShow(!show)}
        className='d-flex align-items-center justify-content-between'
      >
        {show ? 'Hide ' : 'Show '}password requirements
        <i className={`fas fa-chevron-${show ? 'up' : 'down'} fa-sm`}></i>
      </Text>
      <PasswordRequirements validations={passwordValidations} open={show} />
    </div>
  );
};

export default PasswordValidationSection;
