import { FC, useRef } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import { Upload } from 'lucide-react';

interface IDragAndDropUploader {
  formName: string;
}

const DragAndDropUploader: FC<IDragAndDropUploader> = ({ formName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state: RootState) => state.form[formName]);
  const formActions = createFormActions(formName, dispatch);

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          formActions.handleFileDrop(e);
        }}
        onClick={() => inputRef?.current?.click()}
        className='w-full h-auto max-w-96 aspect-video rounded-md border-dashed border-2 border-gray-200 bg-white flex flex-col items-center justify-center cursor-pointer'
      >
        {formState?.inputs?.imageUrl ? (
          <img src={formState?.inputs?.imageUrl} alt='Uploaded' className='w-full h-full aspect-video object-cover' />
        ) : (
          <>
            <Upload className='w-3.5 h-3.5 mb-1.5 text-[#333]' />
            <p className='text-sm rubik-regular text-[#333]'>Drag & Drop or Click</p>
          </>
        )}
      </div>
      <input id='imageUrl' name='imageUrl' ref={inputRef} type='file' className='hidden' accept='image/*' onChange={formActions.handleFileChange} />
    </>
  );
};

export default DragAndDropUploader;
