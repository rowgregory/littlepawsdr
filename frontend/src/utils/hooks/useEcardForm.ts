import { useEffect, useState } from "react";
import { formatDateForCalendar } from "../dateFunctions";

const useECardForm = (state: any) => {
    const [errors, setErrors] = useState({}) as any;
    const [inputs, setInputs] = useState({
      name: '',
      email: '',
      recipientsFullName: '',
      recipientsEmail: '',
      dateToSend: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      message: '',
    });
  
    useEffect(() => {
      if (state?.ecard) {
        setInputs((prev: any) => ({
          ...prev,
          name: state?.ecard?.name,
          email: state?.ecard?.email,
          recipientsFullName: state?.ecard?.recipientsFullName,
          recipientsEmail: state?.ecard?.recipientsEmail,
          dateToSend: formatDateForCalendar(state?.dateToSend),
          message: state?.ecard?.message,
        }));
      }
    }, [state]);
  
    const validate = () => {
      const errors = {} as any;
      if (!inputs.name.trim()) {
        errors.name = 'Your name is required';
      }
      if (!inputs.email.trim()) {
        errors.email = 'Your email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
        errors.email = 'Invalid email address';
      }
      if (!inputs.recipientsFullName.trim()) {
        errors.recipientsFullName = "Recipient's full name is required";
      }
      if (!inputs.recipientsEmail.trim()) {
        errors.recipientsEmail = "Recipient's email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(inputs.recipientsEmail)) {
        errors.recipientsEmail = 'Invalid email address';
      }
      if (!inputs.dateToSend.trim()) {
        errors.dateToSend = 'Date to send is required';
      }
      if (!inputs.message.trim()) {
        errors.message = 'Message is required';
      }
  
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleInput = (e: any) => {
      e.persist();
  
      setInputs((inputs) => ({
        ...inputs,
        [e.target.name]: e.target.value,
      }));
    };
  
    return { handleInput, inputs, validate, errors };
  };

  export default useECardForm