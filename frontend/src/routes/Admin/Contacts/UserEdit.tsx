import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  useGetUserQuery,
  useUpdateUserRoleMutation,
} from '../../../redux/services/userApi';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';
import { Link } from 'react-router-dom';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';

const UserEdit = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { data } = useGetUserQuery(userId);

  const [updateUserRole, { isLoading: loadingUpdate }] = useUpdateUserRoleMutation();

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    await updateUserRole({
      id: userId,
      isAdmin: e.target.checked,
    });
  };

  return (
    <div className='flex flex-col gap-y-6'>
      <Link
        to={`/admin/contacts/users`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to users</p>
      </Link>
      <form className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>User details</p>
            <div className='text-gray-900 text-sm font-Matter-Regular items-center whitespace-nowrap'>
              {data?.isAdmin ? (
                <p className='text-green-500 bg-green-50 px-1.5 py-0.5 rounded-3xl font-Matter-Regular w-fit text-sm'>
                  Admin
                </p>
              ) : (
                <p className='text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-3xl font-Matter-Regular w-fit text-sm'>
                  User
                </p>
              )}
            </div>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <p className='font-Matter-Medium text-sm mb-1'>Name</p>
                <p className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '>
                  {data?.name}
                </p>
              </div>
              <div className='flex flex-col'>
                <p className='font-Matter-Medium text-sm mb-1'>Email</p>
                <p className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '>
                  {data?.email}
                </p>
              </div>
              <div className='flex flex-col'>
                <p className='font-Matter-Medium text-sm mb-1'>Contact since</p>
                <p className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '>
                  {formatDateWithTimezone(data?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Admin privileges</p>
            <p className='font-Matter-Light text-sm tracking-wide'>
              Allow access to the dashboard
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                {loadingUpdate ? (
                  <TailwindSpinner />
                ) : (
                  <Form.Group className='d-flex align-items-center' controlId='isAdmin'>
                    <Form.Check
                      type='switch'
                      checked={data?.isAdmin || false}
                      onChange={handleUpdate}
                    ></Form.Check>
                  </Form.Group>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
