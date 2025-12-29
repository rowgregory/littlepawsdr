import { useEffect, useState } from 'react';
import DeleteModal from '../../components/modals/DeleteModal';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/services/userApi';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import useDeleteModal from '../../hooks/useDeleteModal';
import { motion } from 'framer-motion';
import { Edit2, Search, Shield, Trash2, User } from 'lucide-react';
import { setOpenUserDrawer, setUsers } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/toolkitStore';
import { setInputs } from '../../redux/features/form/formSlice';

const Users = () => {
  const { data } = useGetUsersQuery();
  const users = data?.users;
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { openModal, show, closeModal } = useDeleteModal();
  const [filteredUsers, setFilteredUsers] = useState([]) as any;
  const [isSortedAsc, setIsSortedAsc] = useState(true);
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
    if (data?.users) {
      dispatch(setUsers(data.users));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (users) {
      setFilteredUsers(
        users?.filter(
          (user: any) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [users, searchTerm]);

  return (
    <>
      <DeleteModal
        type='User'
        id={id}
        deleteDocument={deleteUser}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border-b border-gray-200'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Users</h1>
            <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>{users?.length} total</p>
          </div>
        </div>
      </motion.div>

      <div className='min-h-dvh w-full bg-gray-50'>
        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6'>
          {/* Search and Filter */}
          <motion.div
            className='space-y-3 sm:space-y-0 sm:flex gap-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
              />
            </div>
          </motion.div>
          <div className='rounded-lg bg-white overflow-x-auto lg:overflow-x-hidden relative border border-gray-200 w-full'>
            <table className='w-full'>
              <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                <tr className='bg-gray-50'>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Name</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Email</div>
                  </th>
                  <th
                    onClick={() => sortAdmin()}
                    className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'
                  >
                    <div className='flex items-center gap-2 text-sm font-Matter-Medium text-gray-700 uppercase tracking-wide hover:text-teal-600 transition-colors cursor-pointer'>
                      Status
                    </div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Created</div>
                  </th>
                  <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                    <div className='text-sm flex flex-nowrap items-center gap-2'>Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {(filteredUsers?.length || 0) > 0 ? (
                  filteredUsers?.map((user: any, index: number) => (
                    <motion.tr
                      key={user?._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                    >
                      <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {user?.name}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {user?.email}
                        </p>
                      </td>

                      <td>
                        {user?.isAdmin ? (
                          <span className='py-0.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm px-2 text-sm flex items-center whitespace-nowrap w-fit rounded-2xl gap-x-1'>
                            <Shield className='w-3.5 h-3.5' />
                            Admin
                          </span>
                        ) : (
                          <span className='py-0.5 bg-gradient-to-r from-gray-50 to-gray-50 text-gray-700 border border-gray-200 shadow-sm px-2 text-sm flex items-center whitespace-nowrap w-fit rounded-full gap-x-1'>
                            <User className='w-3.5 h-3.5' />
                            User
                          </span>
                        )}
                      </td>

                      <td>
                        <p className='text-gray-900 text-sm font-medium items-center px-4 whitespace-nowrap'>
                          {formatDateWithTimezone(user?.createdAt)}
                        </p>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center justify-end gap-2'>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              dispatch(setInputs({ formName: 'userForm', data: user }));
                              dispatch(setOpenUserDrawer());
                            }}
                            className='p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                            title='Edit user'
                          >
                            <Edit2 className='w-4 h-4' />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setId(user?._id);
                              openModal();
                            }}
                            className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='Delete user'
                          >
                            <Trash2 className='w-4 h-4' />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='px-4 py-8 text-center'>
                      <p className='text-gray-500 text-sm'>No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
