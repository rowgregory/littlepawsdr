import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AdminInput = ({ label, id, className, ...rest }: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className='font-Matter-Medium'>
        {label}
      </label>
      <input id={id} className={`font-Matter-Light focus:outline-none border px-3 py-2 rounded-lg w-full ${className || ''}`} {...rest} />
    </div>
  );
};

export default AdminInput;
