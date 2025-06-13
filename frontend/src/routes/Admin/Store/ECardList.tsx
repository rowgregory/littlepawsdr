import { useCallback, useRef, useState } from 'react';
import DeleteModal from '../../../components/DeleteModal';
import { useDeleteEcardMutation, useGetEcardsQuery } from '../../../redux/services/ecardApi';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import useOutsideDetect from '../../../hooks/useOutsideDetect';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import Pagination from '../../../components/common/Pagination';
import useDeleteModal from '../../../hooks/useDeleteModal';
import { setOpenEcardCreateDrawer, setOpenEcardUpdateDrawer } from '../../../redux/features/ecard/ecardSlice';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { setInputs } from '../../../redux/features/form/formSlice';

const ECardList = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [ecardToBeEdited, setEcardToBeEdited] = useState({
    open: false,
    ecard: { _id: null },
  });
  const ecardMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const [deleteEcard, { isLoading: loadingDelete }] = useDeleteEcardMutation();
  const { data, isLoading } = useGetEcardsQuery();
  const ecards = data?.ecards;
  const noEcards = ecards?.length === 0;

  let filteredEcards = ecards?.filter((eCard: any) => eCard?.category?.toLowerCase().includes(text.toLowerCase()));

  const closeActionMenu = useCallback(() => {
    setEcardToBeEdited({ open: false, ecard: { _id: null } });
  }, []);

  useOutsideDetect(ecardMenuRef, closeActionMenu);

  return (
    <>
      <DeleteModal type='Ecard' id={id} deleteDocument={deleteEcard} loading={loadingDelete} hook={{ openModal, show, closeModal }} />
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className='font-Matter-Medium text-2xl mb-3.5'>Ecards</div>
      <div className='grid grid-cols-12 gap-3.5'>
        <div className='col-span-12 sm:col-span-7 md:col-span-6 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px]'>
          <MagnifyingGlass />
          <input onChange={(e: any) => setText(e.target.value)} className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
        <button
          onClick={() => {
            dispatch(setOpenEcardCreateDrawer());
            dispatch(setInputs({ formName: 'ecardForm', data: {} }));
          }}
          className='col-span-12 sm:col-span-4 sm:col-start-9 whitespace-nowrap duration-200 text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500 hover:no-underline'
        >
          Add ecard
        </button>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
        {noEcards ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-lg bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2'>No ecards</div>
            <button
              onClick={() => {
                dispatch(setOpenEcardCreateDrawer());
                dispatch(setInputs({ formName: 'ecardForm', data: {} }));
              }}
              className='px-4 text-center duration-200 font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:no-underline hover:bg-blue-500 h-10 flex items-center justify-center'
            >
              Add ecard
            </button>
          </div>
        ) : (
          <div className='rounded-lg bg-white overflow-x-hidden relative'>
            <Pagination
              render={(startIndex: number, endIndex: number) => (
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>Item name</div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Price</div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Category</div>
                      </th>
                      <th>
                        <div className='flex flex-nowrap items-center gap-2'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEcards?.slice(startIndex, endIndex)?.map((ecard: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                        key={ecard?._id}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>{ecard?.name}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>{ecard?.price}</p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>{ecard?.category}</p>
                        </td>
                        <td>
                          <div className='relative'>
                            {ecardToBeEdited.open && ecardToBeEdited.ecard?._id === ecard?._id && (
                              <div
                                ref={ecardMenuRef}
                                className='flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit border bg-white -top-[57px] right-28 rounded-lg'
                              >
                                <button
                                  onClick={() => dispatch(setOpenEcardUpdateDrawer({ ecard }))}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setId(ecard?._id);
                                    openModal();
                                  }}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                            <div
                              onClick={() => setEcardToBeEdited({ open: true, ecard })}
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
              totalItems={ecards?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default ECardList;
