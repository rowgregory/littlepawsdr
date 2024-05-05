import { Fragment, useCallback, useRef, useState } from 'react';
import DeleteModal, { useDeleteModal } from '../../../components/DeleteModal';
import { Link } from 'react-router-dom';
import {
  useDeleteWelcomeWienerMutation,
  useGetWelcomeWienersQuery,
  useToggleLiveMutation,
} from '../../../redux/services/welcomeWienerApi';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import useOutsideDetect from '../../../utils/useOutsideDetect';
import Pagination from '../../../components/common/Pagination';

const WelcomeWienerDachshundList = () => {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [welcomeWienerToBeEdited, setWelcomeWienerToBeEdited] = useState({
    open: false,
    wiener: { _id: null },
  });

  const welcomeWienerMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const [deleteWelcomeWiener, { isLoading: loadingDelete }] = useDeleteWelcomeWienerMutation();

  const [toggleLive] = useToggleLiveMutation();

  const { data, isLoading } = useGetWelcomeWienersQuery();
  const welcomeWieners = data?.welcomeWieners;
  const noWelcomeWieners = welcomeWieners?.length === 0;

  const filteredWelcomeWienerDachshunds = welcomeWieners?.filter((dachshund: any) =>
    dachshund?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const closeActionMenu = useCallback(() => {
    setWelcomeWienerToBeEdited({ open: false, wiener: { _id: null } });
  }, []);

  useOutsideDetect(welcomeWienerMenuRef, closeActionMenu);

  return (
    <Fragment>
      <DeleteModal
        type='Welcome Wiener'
        id={id}
        deleteDocument={deleteWelcomeWiener}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className='font-Matter-Medium text-2xl mb-3.5'>Wieners</div>
      <div className='grid grid-cols-12 gap-3.5'>
        <div className='col-span-12 sm:col-span-5 flex items-center font-Matter-Light border border-grey-200 rounded-lg bg-white py-2 px-[16px] '>
          <MagnifyingGlass />
          <input
            onChange={(e: any) => setText(e.target.value)}
            className='w-full h-full focus:outline-0 rounded-lg ml-2'
            placeholder='Search'
          />
        </div>
        <Link
          to={`/admin/virtual-store/welcome-wieners/create`}
          className='col-span-12 sm:col-span-4 sm:col-start-9 whitespace-nowrap duration-200 hover:no-underline text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500'
          state={{ isEditMode: false }}
        >
          Add wiener
        </Link>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
        {noWelcomeWieners ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-lg bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2 text-center'>You have no welcome wieners</div>
            <Link
              className='px-4 text-center duration-200 font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:no-underline hover:bg-blue-500 h-10 flex items-center justify-center'
              to='/admin/virtual-store/welcome-wieners/create'
              state={{ isEditMode: false }}
            >
              Add wiener
            </Link>
          </div>
        ) : (
          <div className='rounded-lg bg-white overflow-x-hidden relative'>
            <Pagination
              render={(startIndex: number, endIndex: number) => (
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 flex flex-nowrap items-center gap-2'>
                          Name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Age</div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
                      </th>
                      <th>
                        <div className='flex flex-nowrap items-center gap-2'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWelcomeWienerDachshunds
                      ?.slice(startIndex, endIndex)
                      ?.map((wiener: any) => (
                        <tr
                          className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                          key={wiener._id}
                        >
                          <td>
                            <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                              <div className='max-w-[15rem]'>
                                <span className='text-sm font-Matter-Regular truncate'>
                                  {wiener?.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                              {wiener.age}
                            </p>
                          </td>
                          <td>
                            <div onClick={() => toggleLive({ id: wiener?._id })} className='px-4'>
                              <p
                                className={`cursor-pointer text-gray-900 text-sm font-Matter-Regular items-center whitespace-nowrap border-2 rounded-3xl px-2 py-1 w-fit ${wiener?.isLive
                                    ? 'text-green-700 bg-green-50 border-green-500'
                                    : 'text-gray-700 bg-gray-50 border-gray-700'
                                  }`}
                              >
                                {wiener.isLive ? 'Online' : 'Offline'}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className=''>
                              {welcomeWienerToBeEdited.open &&
                                welcomeWienerToBeEdited.wiener._id === wiener._id && (
                                  <div
                                    ref={welcomeWienerMenuRef}
                                    className='flex flex-col justify-center shadow-lg p-1.5 absolute z-[5000] w-28 h-fit border bg-white -top-9 right-24 rounded-lg'
                                  >
                                    <Link
                                      to={`/admin/virtual-store/welcome-wieners/${welcomeWienerToBeEdited?.wiener._id}`}
                                      state={{
                                        wiener: welcomeWienerToBeEdited.wiener,
                                        isEditMode: true,
                                      }}
                                      className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      to={`/welcome-wieners/${welcomeWienerToBeEdited?.wiener._id}`}
                                      className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                    >
                                      View
                                    </Link>
                                    <button
                                      onClick={() => {
                                        setId(wiener._id);
                                        openModal();
                                      }}
                                      className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              <div
                                onClick={() => setWelcomeWienerToBeEdited({ open: true, wiener })}
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
              totalItems={welcomeWieners?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default WelcomeWienerDachshundList;
