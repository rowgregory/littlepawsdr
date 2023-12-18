import { useState, useEffect } from 'react';

export const usePasswordStrength = ({ password, newPassword }: any) => {
  const [validations, setValidations] = useState<number[]>([]);
  const [strength, setStrength] = useState<number>(0);

  useEffect(() => {
    const newValidations = [
      (password ?? newPassword).length >= 9 ? 1 : 0,
      (password ?? newPassword).search(/[A-Z]/) > -1 ? 1 : 0,
      (password ?? newPassword).search(/[0-9]/) > -1 ? 1 : 0,
      (password ?? newPassword).search(/[~`!-@#$%^&*()_+={}|:;"',.?]/) > -1
        ? 1
        : 0,
    ];

    setValidations(newValidations);
    const newStrength = newValidations.reduce((acc, cur) => acc + cur, 0);
    setStrength(newStrength);
  }, [password, newPassword]);

  return { validations, strength };
};
