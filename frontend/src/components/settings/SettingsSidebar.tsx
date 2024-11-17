import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface SettingsSidebarProps {
  links: { textKey: string; linkKey: string; urlKey: string }[];
}

const SettingsSidebar: FC<SettingsSidebarProps> = ({ links }) => {
  const key = useParams()['*'];
  return (
    <div className='flex sm:flex-col mb-8 p-1 bg-[#fff] border border-gray-100 rounded-lg w-full font-Matter-Regular overflow-x-scroll sm:overflow-hidden'>
      {links.map((obj: any, i: number) => (
        <Link
          className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${
            obj.urlKey === key ? 'bg-teal-50 text-teal-400' : 'bg-[#fff] text-gray-800'
          }`}
          to={obj.linkKey}
          key={i}
        >
          {obj.textKey}
        </Link>
      ))}
    </div>
  );
};

export default SettingsSidebar;
