import { Fragment, useCallback, useRef, useState } from 'react';
import DeleteModal from '../../../components/DeleteModal';
import {
  useDeleteNewsletterEmailMutation,
  useGetNewsletterEmailsQuery,
} from '../../../redux/services/newsletterEmailApi';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import Pagination from '../../../components/common/Pagination';
import useOutsideDetect from '../../../hooks/useOutsideDetect';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';
import useDeleteModal from '../../../hooks/useDeleteModal';

const NewsletterEmailList = () => {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [clipboard, setClipboard] = useState({
    loading: false,
    message: null,
  }) as any;
  const [emailToBeEdited, setEmailToBeEdited] = useState({
    open: false,
    email: { _id: null },
  });

  const newsletterEmailMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const { data, isLoading } = useGetNewsletterEmailsQuery();
  const newsletterEmails = data?.newsletterEmails;
  const noNewsletterEmails = newsletterEmails?.length === 0;

  const [deleteNewsletterEmail, { isLoading: loadingDelete }] = useDeleteNewsletterEmailMutation();

  const copyEmails = () => {
    setClipboard({ loading: true, message: null });
    const emails = data?.newsletterEmails?.map((obj: any) => obj.newsletterEmail).join(',');
    navigator.clipboard.writeText(emails).then(async () => {
      setClipboard({ loading: false, message: 'Emails copied' });
      setTimeout(() => setClipboard({ loading: false, message: null }), 3000);
    });
  };

  const filteredEmails = data?.newsletterEmails?.filter((email: any) =>
    email.newsletterEmail.toLowerCase().includes(text.toLowerCase())
  );

  const closeActionMenu = useCallback(() => {
    setEmailToBeEdited({ open: false, email: { _id: null } });
  }, []);

  useOutsideDetect(newsletterEmailMenuRef, closeActionMenu);

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <DeleteModal
        type='Newsletter email'
        id={id}
        deleteDocument={deleteNewsletterEmail}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      <div className='font-Matter-Medium text-charcoal text-2xl mb-3.5'>
        Newsletter Emails
        <span className='ml-1 text-sm'>(&nbsp;{newsletterEmails?.length}&nbsp;)</span>
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
        <button
          onClick={copyEmails}
          className='col-span-4 col-start-9 md:col-span-2 duration-200 md:col-start-11 hover:no-underline text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500'
        >
          <i className='fa-regular fa-sm fa-clipboard text-white mr-2'></i>
          {clipboard.message ?? `Copy${clipboard.loading ? 'ing' : ''} Emails`}
        </button>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
        {noNewsletterEmails ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='rounded-lg bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2'>No newsletter emails</div>
          </div>
        ) : (
          <div className='rounded-lg bg-white overflow-x-scroll sm:overflow-x-hidden relative'>
            <Pagination
              render={(startIndex: number, endIndex: number) => (
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                          Email
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
                    {filteredEmails?.slice(startIndex, endIndex).map((email: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                        key={email?.newsletterEmail}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <span className='text-sm font-Matter-Regular truncate'>
                              {email?.newsletterEmail}
                            </span>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {formatDateWithTimezone(email?.createdAt)}
                          </p>
                        </td>
                        <td>
                          <div className='relative'>
                            {emailToBeEdited.open && emailToBeEdited.email?._id === email?._id && (
                              <div
                                ref={newsletterEmailMenuRef}
                                className='flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit border bg-white -top-5 right-24 rounded-lg '
                              >
                                <button
                                  onClick={() => {
                                    setId(email?._id);
                                    openModal();
                                  }}
                                  className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                            <div
                              onClick={() => setEmailToBeEdited({ open: true, email })}
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
              totalItems={filteredEmails?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NewsletterEmailList;
