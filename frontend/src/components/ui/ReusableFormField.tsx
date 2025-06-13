interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
  value: string | number;
  onChange: (e: any) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  min?: string;
  max?: string;
  step?: string;
  options?: Option[];
  help?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  rows = 3,
  min,
  max,
  step,
  options = [],
  help,
  prefix,
  suffix,
  className = '',
}) => {
  const baseInputClasses = `
    block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
    focus:border-transparent transition-all duration-200
    ${error ? 'border-red-300 focus:ring-red-500' : ''}
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
    ${prefix ? 'pl-8' : ''}
    ${suffix ? 'pr-8' : ''}
  `;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseInputClasses}
        />
      );
    }

    if (type === 'select') {
      return (
        <select id={id} name={name} value={value} onChange={onChange} required={required} disabled={disabled} className={baseInputClasses}>
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <div className='relative'>
        {prefix && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <span className='text-gray-500 text-sm'>{prefix}</span>
          </div>
        )}

        {renderInput()}

        {suffix && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <span className='text-gray-500 text-sm'>{suffix}</span>
          </div>
        )}
      </div>

      {help && !error && <p className='text-sm text-gray-500'>{help}</p>}

      {error && (
        <p className='text-sm text-red-600 flex items-center'>
          <i className='fas fa-exclamation-circle mr-1'></i>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
