interface AuthSelectProps {
  label: string;
  icon: any;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: string[];
}

export const AuthSelect = ({ label, icon, name, value, onChange, error, options }: AuthSelectProps) => {
  return (
    <div>
      <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
        {icon}
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors',
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-amber-400'}`}
      >
        <option value=''>Select a security question</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};
