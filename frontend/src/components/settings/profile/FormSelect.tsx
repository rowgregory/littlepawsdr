import { FC } from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  disabled: boolean;
  required?: boolean;
  error?: string;
  options: Array<{ value: string; text: string }>;
  className?: string;
}

const FormSelect: FC<FormSelectProps> = ({ label, name, value, onChange, disabled, required = false, error, options, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className='block text-sm font-semibold text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 ${
          error ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
        }`}
      >
        <option value=''>Select {label}</option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && (
        <p className='text-red-500 text-sm mt-1 flex items-center'>
          <span className='w-4 h-4 mr-1'>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
