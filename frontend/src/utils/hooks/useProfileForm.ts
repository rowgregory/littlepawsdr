import { useEffect, useState } from 'react';

export const sectionLoadingStates = {
  photo: false,
  theme: false,
  details: false,
};

export const validateProfileForm = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const isFirstNameValid = firstName.trim() !== '';
  const isLastNameValid = lastName.trim() !== '';

  return isFirstNameValid && isLastNameValid;
};

const useProfileForm = (data?: any) => {
  const values = {
    firstName: '',
    lastName: '',
    avatar: '',
    volunteerTitle: '',
    profileCardTheme: '',
    location: '',
    bio: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        firstName: data?.firstName,
        lastName: data?.lastName,
        avatar: data?.avatar,
        volunteerTitle: data?.volunteerTitle,
        profileCardTheme: data?.profileCardTheme,
        location: data?.location,
        bio: data?.bio,
      }));
    }

    return () => {
      setInputs(() => ({
        firstName: '',
        lastName: '',
        avatar: '',
        volunteerTitle: '',
        profileCardTheme: '',
        location: '',
        bio: '',
      }));
    };
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return { inputs, handleInput, setInputs };
};

export default useProfileForm;
