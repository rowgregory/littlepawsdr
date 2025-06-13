import { InputHTMLAttributes } from 'react';

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AdminCurrencyInput = ({ label, id, className, ...rest }: CurrencyInputProps) => {
  return (
    <div>
      <label htmlFor={id} className='font-Matter-Medium'>
        {label}
      </label>
      <div className='flex items-center border rounded-lg px-3 py-2'>
        <span className='mr-2'>$</span>
        <input id={id} className={`border-0 p-0 focus:outline-0 w-full ${className || ''}`} {...rest} />
      </div>
    </div>
  );
};

export default AdminCurrencyInput;
