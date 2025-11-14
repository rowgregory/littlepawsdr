import { useCallback, useEffect, useRef, useState } from 'react';
import DeleteModal from '../../../components/DeleteModal';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../redux/services/userApi';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import useOutsideDetect from '../../../hooks/useOutsideDetect';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';
import Pagination from '../../../components/common/Pagination';
import useDeleteModal from '../../../hooks/useDeleteModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit2, MoreVertical, Search, Shield, Trash2, User, UsersIcon } from 'lucide-react';
import { setOpenUserDrawer } from '../../../redux/features/user/userSlice';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { setInputs } from '../../../redux/features/form/formSlice';

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
  const dispatch = useAppDispatch();

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
      setFilteredUsers(users?.filter((user: any) => user.email.toLowerCase().includes(text.toLowerCase())));
    }
  }, [users, text]);

  const closeActionMenu = useCallback(() => {
    setUserToBeEdited({ open: false, user: { _id: null } });
  }, []);

  useOutsideDetect(userMenuRef, closeActionMenu);

  return (
    <>
      <DeleteModal type='User' id={id} deleteDocument={deleteUser} loading={loadingDelete} hook={{ openModal, show, closeModal }} />

      {isLoading && <GreenRotatingTransparentCircle />}

      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg'>
              <UsersIcon className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='font-Matter-Medium text-charcoal text-2xl sm:text-3xl'>Users</h1>
              <p className='text-sm text-gray-500 font-Matter-Regular mt-0.5'>Manage user accounts and permissions</p>
            </div>
          </div>
          <div className='px-4 py-2 bg-blue-50 rounded-lg border border-blue-200'>
            <span className='text-sm font-Matter-Medium text-blue-700'>
              {users?.length} {users?.length === 1 ? 'User' : 'Users'}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className='relative'>
          <div className='relative max-w-md'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              onChange={(e: any) => setText(e.target.value)}
              className='w-full h-12 pl-12 pr-4 font-Matter-Regular border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-gray-400'
              placeholder='Search users by name or email...'
            />
          </div>
        </div>

        {/* Table Container */}
        <div className='bg-white border-2 border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
          {noUsers ? (
            <div className='flex flex-col justify-center items-center py-16 px-4'>
              <div className='rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 h-20 w-20 flex justify-center items-center mb-4 shadow-inner'>
                <Search className='w-10 h-10 text-gray-400' />
              </div>
              <h3 className='font-Matter-Medium text-lg text-gray-900 mb-2'>No users found</h3>
              <p className='font-Matter-Regular text-sm text-gray-500 text-center max-w-sm'>
                Try adjusting your search criteria or add new users to get started.
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <Pagination
                render={(startIndex: number, endIndex: number) => (
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200'>
                        <th className='px-6 py-4 text-left'>
                          <div className='flex items-center gap-2 text-sm font-Matter-Medium text-gray-700 uppercase tracking-wide'>
                            <User className='w-4 h-4' />
                            Name
                          </div>
                        </th>
                        <th className='px-6 py-4 text-left'>
                          <div className='text-sm font-Matter-Medium text-gray-700 uppercase tracking-wide'>Email</div>
                        </th>
                        <th onClick={() => sortAdmin()} className='px-6 py-4 text-left cursor-pointer group'>
                          <div className='flex items-center gap-2 text-sm font-Matter-Medium text-gray-700 uppercase tracking-wide hover:text-blue-600 transition-colors'>
                            <Shield className='w-4 h-4' />
                            Status
                            <svg
                              className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
                              />
                            </svg>
                          </div>
                        </th>
                        <th className='px-6 py-4 text-left'>
                          <div className='text-sm font-Matter-Medium text-gray-700 uppercase tracking-wide'>Created</div>
                        </th>
                        <th className='px-6 py-4 text-right'>
                          <div className='text-sm font-Matter-Medium text-gray-700 uppercase tracking-wide'>Actions</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredUsers?.slice(startIndex, endIndex)?.map((user: any, index: number) => (
                          <motion.tr
                            key={user?._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className='border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200 group'
                          >
                            <td className='px-6 py-4'>
                              <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-Matter-Medium shadow-md'>
                                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <span className='text-sm font-Matter-Medium text-gray-900 group-hover:text-blue-600 transition-colors'>
                                  {user?.name}
                                </span>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <span className='text-sm font-Matter-Regular text-gray-600'>{user?.email}</span>
                            </td>
                            <td className='px-6 py-4'>
                              {user?.isAdmin ? (
                                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-Matter-Medium bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm'>
                                  <Shield className='w-3.5 h-3.5' />
                                  Admin
                                </span>
                              ) : (
                                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-Matter-Medium bg-gray-50 text-gray-600 border border-gray-200'>
                                  <User className='w-3.5 h-3.5' />
                                  User
                                </span>
                              )}
                            </td>
                            <td className='px-6 py-4'>
                              <span className='text-sm font-Matter-Regular text-gray-600'>{formatDateWithTimezone(user?.createdAt)}</span>
                            </td>
                            <td className='px-6 py-4'>
                              <div className='flex justify-end relative'>
                                <AnimatePresence>
                                  {userToBeEdited.open && userToBeEdited.user?._id === user?._id && (
                                    <motion.div
                                      ref={userMenuRef}
                                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                      transition={{ duration: 0.15 }}
                                      className='absolute z-50 right-0 top-6 w-48 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden'
                                    >
                                      <button
                                        onClick={() => {
                                          dispatch(setInputs({ formName: 'userForm', data: user }));
                                          dispatch(setOpenUserDrawer());
                                        }}
                                        className='flex items-center gap-3 w-full px-4 py-3 text-sm font-Matter-Medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                                      >
                                        <Edit2 className='w-4 h-4' />
                                        Edit User
                                      </button>
                                      <button
                                        onClick={() => {
                                          setId(user?._id);
                                          openModal();
                                        }}
                                        className='flex items-center gap-3 w-full px-4 py-3 text-sm font-Matter-Medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-gray-100'
                                      >
                                        <Trash2 className='w-4 h-4' />
                                        Delete User
                                      </button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setUserToBeEdited({ open: !userToBeEdited.open, user })}
                                  className='p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-900'
                                >
                                  <MoreVertical className='w-5 h-5' />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                )}
                totalItems={users?.length}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
