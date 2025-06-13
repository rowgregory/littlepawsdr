interface AuthInputProps {
  label: string;
  icon: any;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export const AuthInput = ({ label, icon, name, type = 'text', value, onChange, error, placeholder }: AuthInputProps) => {
  return (
    <div>
      <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
        {icon}
        {label}
      </label>
      <input
        type={type ?? 'text'}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors'
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-amber-400'}
        `}
        placeholder={placeholder}
      />
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};
