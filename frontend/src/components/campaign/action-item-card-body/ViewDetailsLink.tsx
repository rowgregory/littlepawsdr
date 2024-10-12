import { Link } from 'react-router-dom';

const ViewDetailsLink = ({ pathname, item, theme }: any) => (
  <Link
    to={`${pathname}/item/${item?._id}`}
    className={`h-10 w-full py-2.5 font-Matter-Medium flex items-center justify-center duration-200 border-[1px] ${theme?.border} rounded-md hover:no-underline hover:text-[#fff] hover:${theme?.darker}`}
  >
    View Details
  </Link>
);

export default ViewDetailsLink;
