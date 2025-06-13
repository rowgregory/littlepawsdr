import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className='px-6 py-4 border-b border-gray-200 bg-gray-50'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        {description && <p className='mt-1 text-sm text-gray-600'>{description}</p>}
      </div>
      <div className='px-6 py-6'>{children}</div>
    </div>
  );
};

export default FormSection;
