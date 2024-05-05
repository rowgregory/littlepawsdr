import { Fragment, useCallback, useRef, useState } from 'react';
import DeleteModal, { useDeleteModal } from '../../../components/DeleteModal';
import { Link } from 'react-router-dom';
import {
  useDeleteEducationTipMutation,
  useGetEducationTipsQuery,
} from '../../../redux/services/educationTipApi';
import useOutsideDetect from '../../../utils/useOutsideDetect';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import Pagination from '../../../components/common/Pagination';

const EducationTipList = () => {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [tipToBeEdited, setTipToBeEdited] = useState({
    open: false,
    tip: { _id: null },
  });

  const tipMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const [deleteEducationTip, { isLoading: loadingDelete }] = useDeleteEducationTipMutation();

  const { data, isLoading } = useGetEducationTipsQuery();
  const tips = data?.educationTips;
  const noTips = tips?.length === 0;

  const filteredEducationTips = tips?.filter((tip: any) =>
    tip?.title.toLowerCase().includes(text.toLowerCase())
  );

  const closeActionMenu = useCallback(
    () => setTipToBeEdited({ open: false, tip: { _id: null } }),
    []
  );

  useOutsideDetect(tipMenuRef, closeActionMenu);

  return (
    <Fragment>
      <DeleteModal
        type='Education Tip'
        id={id}
        deleteDocument={deleteEducationTip}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className='font-Matter-Medium text-2xl mb-3.5'>Education Tips</div>
      <div className='grid grid-cols-12 gap-3.5'>
        <div className='col-span-12 sm:col-span-7 md:col-span-6 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px]'>
          <MagnifyingGlass />
          <input
            onChange={(e: any) => setText(e.target.value)}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
        <Link
          to='/admin/misc/education-tips/create'
          className='col-span-12 sm:col-span-4 sm:col-start-9 whitespace-nowrap duration-200 hover:no-underline text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500'
          state={{ isEditMode: false }}
        >
          Add education tip
        </Link>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
        {noTips ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-lg bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2'>No education tips</div>
            <Link
              className=' px-4 w-fit text-center duration-200 font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:no-underline hover:bg-blue-500 h-10 flex items-center justify-center'
              to='/admin/misc/education-tips/create'
              state={{ isEditMode: false }}
            >
              Add education tip
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
                        <div className=' text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>
                          Title
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>
                          External link
                        </div>
                      </th>
                      <th>
                        <div className='flex flex-nowrap items-center gap-2'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEducationTips?.slice(startIndex, endIndex)?.map((tip: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                        key={tip?._id}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>
                                {tip?.title}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {`${tip?.externalLink?.length > 30
                                ? `${tip?.externalLink?.substring(0, 30)}...`
                                : tip?.externalLink
                              }`}
                          </p>
                        </td>
                        <td>
                          <div className='relative'>
                            {tipToBeEdited.open && tipToBeEdited.tip?._id === tip?._id && (
                              <div
                                ref={tipMenuRef}
                                className='flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit border bg-white -top-[57px] right-40 rounded-lg'
                              >
                                <Link
                                  to={`/admin/misc/education-tips/${tipToBeEdited?.tip?._id}`}
                                  state={{
                                    tip: tipToBeEdited.tip,
                                    isEditMode: true,
                                  }}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Edit
                                </Link>
                                <Link
                                  to='/education'
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  View
                                </Link>
                                <button
                                  onClick={() => {
                                    setId(tip?._id);
                                    openModal();
                                  }}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                            <div
                              onClick={() => setTipToBeEdited({ open: true, tip })}
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
              totalItems={tips?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EducationTipList;
