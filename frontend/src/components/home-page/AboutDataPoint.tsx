import { Check } from 'lucide-react';

const AboutDataPoint = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center gap-3'>
      <span
        className='w-5 h-5 shrink-0 flex items-center justify-center bg-primary-light dark:bg-primary-dark'
        aria-hidden='true'
      >
        <Check className='w-3 h-3 text-bg-light dark:text-bg-dark' />
      </span>
      <p className='text-sm text-muted-light dark:text-muted-dark'>{text}</p>
    </div>
  );
};

export default AboutDataPoint;
