import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const AdminTextarea = ({ label, id, className, ...rest }: TextareaProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='font-Matter-Medium'>
        {label}
      </label>
      <div className='border rounded-lg w-full p-2 px-3 py-2'>
        <textarea
          id={id}
          className={`font-Matter-Light placeholder:text-sm w-full border-0 focus:outline-none ${className || ''}`}
          {...rest}
        ></textarea>
      </div>
    </div>
  );
};

export default AdminTextarea;
