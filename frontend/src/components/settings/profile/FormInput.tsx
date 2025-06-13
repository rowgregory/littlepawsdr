import { FC } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: any) => void;
  disabled: boolean;
  placeholder: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  disabled,
  placeholder,
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className='block text-sm font-semibold text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 ${
          error ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />
      {error && (
        <p className='text-red-500 text-sm mt-1 flex items-center'>
          <span className='w-4 h-4 mr-1'>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
