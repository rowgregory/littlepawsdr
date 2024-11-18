import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Sidebar = ({ sidebarLinkArr }: any) => {
  const key = useParams()['*'];
  return (
    <div className='flex flex-col mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full flex font-Matter-Regular xl:flex-col overflow-x-scroll lg:overflow-x-hidden xl:overflow-hidden'>
        {sidebarLinkArr.map((obj: any, i: number) => (
          <Link
            className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${
              obj.key === key || obj.key2 === key
                ? 'bg-teal-50 text-teal-400'
                : 'bg-white text-gray-800'
            }`}
            to={obj.linkKey}
            key={i}
          >
            {obj.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
