import { ChangeEvent, FC, ReactNode } from 'react';

interface FileInputProps {
  id: string;
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ id, label, onChange }) => {
  return (
    <div className='flex flex-col'>
      <input type='file' id={id} onChange={onChange} className='hidden' />
      <label htmlFor={id} className='cursor-pointer'>
        {label}
      </label>
    </div>
  );
};

export default FileInput;
