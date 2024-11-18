import { magnifyingGlassIcon } from '../../icons';
import AwesomeIcon from '../common/AwesomeIcon';

const EmptyTable = ({ text }: { text: string }) => {
  return (
    <div className='flex justify-center'>
      <div className='max-w-sm p-12 flex items-center flex-col'>
        <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
          <AwesomeIcon icon={magnifyingGlassIcon} className='w-4 h-4 text-gray-300' />
        </div>
        <div className='font-Matter-Regular my-2'>{text}</div>
      </div>
    </div>
  );
};

export default EmptyTable;
