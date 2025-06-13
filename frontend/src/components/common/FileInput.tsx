import { ChangeEvent, FC, ReactNode } from 'react';

interface FileInputProps {
  id: string;
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

const FileInput: FC<FileInputProps> = ({ id, label, onChange, multiple }) => {
  return (
    <div className='flex flex-col'>
      <input name='photos' multiple={multiple ?? false} type='file' id={id} onChange={onChange} className='hidden' />
      <label htmlFor={id} className='cursor-pointer'>
        {label}
      </label>
    </div>
  );
};

export default FileInput;
