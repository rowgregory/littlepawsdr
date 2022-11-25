import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { STATES } from '../../utils/states';

export const Group = styled(Form.Group)`
  position: relative;
`;
export const Input = styled(Form.Control)<{
  error: any;
  greyout?: any;
  t?: any;
}>`
  border: 1px solid ${({ theme }) => theme.input.border};
  padding: 19px 5px 5px 0px !important;
  font-size: 13px;
  border: ${({ error }) => (error ? '1px solid #d42825' : '')} !important;
  text-indent: ${({ t }) => (t === 'date' ? '9px' : '18px')};
  :focus,
  :not(:placeholder-shown) {
    & ~ .label {
      transform: translateY(-12px) scale(0.7);
    }
  }

  :not(:placeholder-shown) ~ .label {
    color: #808097;
    background: #fff;
  }

  :focus {
    & ~ .label {
      color: ${({ theme, error }) =>
        error ? '#d42825' : theme.colors.secondary} !important;
      background: #fff;
    }
  }
`;
export const Select = styled(Form.Control)<{
  error: any;
}>`
  padding: 19px 5px 5px 0px !important;
  font-size: 13px;
  border: ${({ error, theme }) =>
    error ? '1px solid #d42825' : `1px solid ${theme.input.border}`} !important;
  text-indent: ${({ t }) => (t === 'date' ? '9px' : '18px')};
  width: 100%;
  :focus,
  :not(:placeholder-shown) {
    & ~ .label {
      transform: translateY(-12px) scale(0.7);
    }
  }

  :not(:placeholder-shown) ~ .label {
    color: #808097;
    background: #fff;
  }

  :focus {
    & ~ .label {
      color: ${({ theme, error }) =>
        error ? '#d42825' : theme.colors.secondary} !important;
      background: #fff;
    }
    box-shadow: none !important;
    outline: none !important;
  }
`;

export const TextArea = styled.textarea<{ error: any }>`
  padding: 19px 5px 5px 0px !important;
  font-size: 13px;
  border: ${({ error }) => (error ? '1px solid #d42825' : '')} !important;
  width: 100%;
  :focus,
  :not(:placeholder-shown) {
    & ~ .label {
      transform: translateY(-10px) scale(0.7);
    }
  }

  :not(:placeholder-shown) ~ .label {
    color: #808097;
    background: #fff;
  }

  :focus {
    & ~ .label {
      color: ${({ theme, error }) =>
        error ? '#d42825' : theme.colors.secondary} !important;
      background: #fff;
    }

    box-shadow: none !important;
    outline: none !important;
  }
`;
export const Label = styled(Form.Label)<{ error: any }>`
  color: ${({ error }) => (error ? '#d42825' : '#929495')} !important;
  left: 18px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 16px;
  font-size: 12px;
  font-weight: 300;
`;

const JumpingInput = ({
  name,
  label,
  value,
  handleInputChange,
  type,
  isSelect,
  error,
  blur,
  showPassword,
  setShowPassword,
  disabled,
  isTextArea,
  autocomplete,
}: any) => {
  const todaysDate = new Date().toISOString().split('T')[0];
  return (
    <Group>
      {isSelect ? (
        <Select
          error={error}
          placeholder=' '
          name='state'
          value={value}
          as='select'
          onChange={(e: any) => handleInputChange(e)}
          onBlur={() => {
            blur && blur();
          }}
        >
          {STATES.map((obj, i) => (
            <option key={i} value={obj.value}>
              {obj.text}
            </option>
          ))}
        </Select>
      ) : isTextArea ? (
        <TextArea
          error={error}
          rows={10}
          name={name}
          value={value}
          placeholder=' '
          onChange={(e: any) => handleInputChange(e)}
        />
      ) : (
        <>
          <Input
            autoComplete={autocomplete ? 'off' : 'on'}
            t={type}
            min={type === 'date' ? todaysDate : ''}
            placeholder=' '
            // greyout={disabled?.toString()}
            disabled={disabled}
            error={error}
            name={name}
            type={type}
            value={value}
            onChange={(e: any) => handleInputChange(e)}
            onBlur={() => {
              blur && blur();
            }}
            minLength={type === 'password' ? 9 : ''}
          />
          {(name === 'password' ||
            name === 'confirmPassword' ||
            name === 'oldPassword' ||
            name === 'newPassword' ||
            name === 'confirmNewPassword') && (
            <div style={{ position: 'relative' }}>
              <i
                onClick={() =>
                  setShowPassword((sp: any) => ({
                    ...sp,
                    [name]: !showPassword,
                  }))
                }
                className={`fas fa-eye${!showPassword ? '-slash' : ''}`}
                style={{ position: 'absolute', right: '10px', top: '-30px' }}
              ></i>
            </div>
          )}
        </>
      )}
      <Label error={error} className='label'>
        {error ? error : label}
      </Label>
    </Group>
  );
};

export default JumpingInput;
