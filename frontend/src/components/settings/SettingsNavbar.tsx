import { useParams } from 'react-router-dom';
import { navbarLinks } from '../data/settings-data';
import { Link } from 'react-router-dom';

const SettingsNavbar = () => {
  const key = useParams()['*'];
  return (
    <div className='mb-8 p-1 bg-white border border-gray-100 rounded-xl w-full flex font-Matter-Regular overflow-x-scroll sm:overflow-x-hidden'>
      {navbarLinks.map((obj: any, i: number) => (
        <Link
          className={`py-2.5 px-4 rounded-xl hover:no-underline hover:text-teal-500 whitespace-nowrap ${
            obj.linkKey === key || key?.includes(obj.urlKey)
              ? 'bg-teal-50 text-teal-500'
              : 'bg-white text-gray-800'
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

export default SettingsNavbar;
