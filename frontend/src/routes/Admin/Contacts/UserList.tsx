import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import DeleteModal from '../../../components/DeleteModal';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../redux/services/userApi';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import useOutsideDetect from '../../../hooks/useOutsideDetect';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';
import Pagination from '../../../components/common/Pagination';
import useDeleteModal from '../../../hooks/useDeleteModal';

const UserList = () => {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [userToBeEdited, setUserToBeEdited] = useState({
    open: false,
    user: { _id: null },
  });

  const userMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const [filteredUsers, setFilteredUsers] = useState([]) as any;
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.users;
  const noUsers = users?.length === 0;

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const sortAdmin = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a.isAdmin === b.isAdmin) {
        // If isAdmin is the same, maintain the current order
        return 0;
      }
      if (isSortedAsc) {
        // Sort ascending if isAdmin is true
        return a.isAdmin ? -1 : 1;
      } else {
        // Sort descending if isAdmin is false
        return a.isAdmin ? 1 : -1;
      }
    });
    setFilteredUsers(sortedUsers);
    setIsSortedAsc(!isSortedAsc);
  };

  useEffect(() => {
    if (users) {
      setFilteredUsers(
        users?.filter((user: any) => user.email.toLowerCase().includes(text.toLowerCase()))
      );
    }
  }, [users, text]);

  const closeActionMenu = useCallback(() => {
    setUserToBeEdited({ open: false, user: { _id: null } });
  }, []);

  useOutsideDetect(userMenuRef, closeActionMenu);

  return (
    <Fragment>
      <DeleteModal
        type='User'
        id={id}
        deleteDocument={deleteUser}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className='font-Matter-Medium text-charcoal text-2xl mb-3.5'>
        Users<span className='ml-1 text-sm'>(&nbsp;{users?.length}&nbsp;)</span>
      </div>
      <div className='grid grid-cols-12 h-10 justify-between'>
        <div className='col-span-7 md:col-span-6 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px] '>
          <MagnifyingGlass />
          <input
            onChange={(e: any) => setText(e.target.value)}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>

      <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
        {noUsers ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2'>No users</div>
          </div>
        ) : (
          <div className='rounded-lg bg-white overflow-x-hidden relative'>
            <Pagination
              render={(startIndex: number, endIndex: number) => (
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>
                          Name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Email</div>
                      </th>
                      <th
                        onClick={() => sortAdmin()}
                        className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'
                      >
                        <div className='text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                          Status
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          Date & Time
                        </div>
                      </th>
                      <th>
                        <div className='flex flex-nowrap items-center gap-2'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers?.slice(startIndex, endIndex)?.map((user: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                        key={user?._id}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <span className='text-sm font-Matter-Regular truncate'>
                              {user?.name}
                            </span>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {user?.email}
                          </p>
                        </td>
                        <td>
                          <div className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {user?.isAdmin ? (
                              <p className='text-green-500 bg-green-50 px-1.5 py-0.5 rounded-3xl font-Matter-Regular w-fit text-sm'>
                                Admin
                              </p>
                            ) : (
                              <p className='text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-3xl font-Matter-Regular w-fit text-sm'>
                                User
                              </p>
                            )}
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {formatDateWithTimezone(user?.createdAt)}
                          </p>
                        </td>
                        <td>
                          <div className='relative'>
                            {userToBeEdited.open && userToBeEdited.user?._id === user?._id && (
                              <div
                                ref={userMenuRef}
                                className='flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit border bg-white -top-12 right-24 rounded-xl '
                              >
                                <Link
                                  to={`/admin/contacts/users/${userToBeEdited?.user?._id}`}
                                  state={{
                                    user: userToBeEdited.user,
                                    isEditMode: true,
                                  }}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => {
                                    setId(user?._id);
                                    openModal();
                                  }}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                            <div
                              onClick={() => setUserToBeEdited({ open: true, user })}
                              className='m-0 w-full border-0 p-0 items-center px-4 relative flex justify-center'
                            >
                              <button className='flex h-7 cursor-pointer items-center justify-center rounded p-2 hover:bg-gray-300 text-gray-900'>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              totalItems={users?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserList;
