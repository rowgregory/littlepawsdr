import { FC } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: any;
  name: string; // Add name to pass it correctly to the input
}

const Switch: FC<SwitchProps> = ({ checked, onChange, name }) => {
  return (
    <label className='flex items-center cursor-pointer'>
      <div className={`relative inline-block w-12 h-6 rounded-full transition-all ${checked ? 'bg-teal-400' : 'bg-gray-300'}`}>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={onChange} // Correctly bind the onChange to input
          className='absolute opacity-0 w-0 h-0' // Hide the checkbox input visually
        />
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  );
};

export default Switch;
