import { Fragment, useState } from 'react';
import AwesomeIcon from '../../common/AwesomeIcon';
import { checkIcon } from '../../../icons';

const WinningBidCollapsibleRow = ({ openRows, bidder }: any) => {
  const [clipboard, setClipboard] = useState({
    loading: false,
    message: null,
  }) as any;

  const copyPaymentInvoiceLink = () => {
    setClipboard({ loading: true, message: null });
    const paymentInvoiceLink = `https://www.littlepawsdr.org/auction-items/winner/${bidder?._id}`;
    navigator.clipboard.writeText(paymentInvoiceLink).then(async () => {
      setClipboard({ loading: false, message: 'Emails copied' });
      setTimeout(() => setClipboard({ loading: false, message: null }), 3000);
    });
  };

  return (
    <Fragment>
      {openRows?.rows.map(
        (row: any) =>
          row.id === bidder._id && (
            <tr key={row.id} className='shadow-[inset_0_4px_6px_-4px_rgba(0,0,0,0.2)]'>
              <td colSpan={8}>
                <div className='grid grid-cols-12 px-4 py-4 gap-8'>
                  <section className='col-span-6'>
                    <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                    <div className='flex items-center justify-between py-1.5'>
                      <div className='flex items-center'>
                        <img
                          src={row.auctionItem?.photos[0]?.url}
                          alt='Auction Item'
                          className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                        />
                        <div className='flex flex-col'>
                          <span className='font-Matter-Medium text-sm'>
                            {row.auctionItem?.name}
                          </span>
                          <span className='font-Matter-Light text-xs'>
                            Auction Item Id: {row.auctionItem?._id}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-x-3'>
                        <div
                          className={`${
                            row?.auctionItemPaymentStatus === 'Paid'
                              ? 'text-emerald-500 bg-emerald-100'
                              : 'text-orange-500 bg-orange-100'
                          } py-1.5 px-3 my-3 text-sm w-fit rounded-full font-Matter-Regular text-center`}
                        >
                          {row.auctionItemPaymentStatus}
                        </div>
                        <p className='font-Matter-Medium text-sm'>${row.totalPrice?.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                      <div className='font-Matter-Regular text-sm mb-1'>
                        Link to payment invoice
                      </div>
                      <button
                        onClick={() => copyPaymentInvoiceLink()}
                        className='w-32 text-sm font-Matter-Regular px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-500 cursor-pointer duration-200
                        hover:bg-indigo-100 hover:text-indigo-600 focus:outline-none active:bg-indigo-100 active:text-indigo-600'
                      >
                        {clipboard.message ? (
                          <AwesomeIcon icon={checkIcon} className='text-indigo-500 w-3 h-3' />
                        ) : (
                          'Click to Copy'
                        )}
                      </button>
                    </div>
                  </section>
                  <section className='grid col-span-6 gap-4'>
                    <div>
                      <p className='font-Matter-Medium mb-1.5'>Contact</p>
                      <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                        <p className='font-Matter-Regular text-sm'>{row.user?.email}</p>
                      </div>
                    </div>
                    {row.user?.shippingAddress && (
                      <div>
                        <p className='font-Matter-Medium mb-1.5'>Shipping Address</p>
                        <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                          <div className='flex flex-col'>
                            <p className='font-Matter-Regular text-sm'>
                              {row.user?.shippingAddress?.address}
                            </p>
                            <p className='font-Matter-Regular text-sm'>{`${row.user?.shippingAddress?.city}, ${row.user?.shippingAddress?.state} USA ${row.user?.shippingAddress?.zipPostalCode}`}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                </div>
              </td>
            </tr>
          )
      )}
    </Fragment>
  );
};

export default WinningBidCollapsibleRow;
