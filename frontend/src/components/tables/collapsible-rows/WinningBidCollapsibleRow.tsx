import { Check } from 'lucide-react';
import { Fragment, useState } from 'react';

const WinningBidCollapsibleRow = ({ openRows, bidder }: any) => {
  const [clipboard, setClipboard] = useState({
    loading: false,
    message: null,
  }) as any;

  const copyPaymentInvoiceLink = () => {
    setClipboard({ loading: true, message: null });
    const paymentInvoiceLink = `https://www.littlepawsdr.org/auction/winner/${bidder?._id}`;
    navigator.clipboard.writeText(paymentInvoiceLink).then(() => {
      setClipboard({ loading: false, message: 'Emails copied' });
      setTimeout(() => setClipboard({ loading: false, message: null }), 3000);
    });
  };

  const [copied, setCopied] = useState({ email: false, shippingAddress: false });

  const copyData = (email?: string, shippingAddress?: {}) => {
    let copiedText = '';
    if (email) {
      copiedText = email;
      setCopied({ email: true, shippingAddress: false });
    }
    if (shippingAddress) {
      const { address, city, state, zipPostalCode } = shippingAddress as any;
      copiedText += `${address}\n`;
      copiedText += `${city}, ${state}, USA ${zipPostalCode}`;
      setCopied({ email: false, shippingAddress: true });
    }
    navigator.clipboard.writeText(copiedText).then(async () =>
      setTimeout(() => {
        setCopied({ email: false, shippingAddress: false });
      }, 2000)
    );
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
                    {row.auctionItems?.map((item: any, index: number) => (
                      <div
                        key={item._id || index}
                        className='flex items-center justify-between py-2 border-b border-gray-200 last:border-none'
                      >
                        <div className='flex items-center'>
                          <img
                            src={item?.photos?.[0]?.url}
                            alt='Auction Item'
                            className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                          />
                          <div className='flex flex-col'>
                            <span className='font-Matter-Medium text-sm'>{item.name}</span>
                            <span className='font-Matter-Light text-xs'>ID: {item._id}</span>
                            <span className='font-Matter-Light text-xs'>
                              Shipping: ${item.shippingCosts?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className='flex flex-col items-end'>
                          <p className='font-Matter-Medium text-sm'>
                            ${item.soldPrice?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className='flex flex-col mt-4'>
                      <div className='font-Matter-Regular text-sm mb-1'>
                        Link to payment invoice
                      </div>
                      <button
                        onClick={copyPaymentInvoiceLink}
                        className='w-32 text-sm font-Matter-Regular px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-500 cursor-pointer duration-200
                          hover:bg-indigo-100 hover:text-indigo-600 focus:outline-none active:bg-indigo-100 active:text-indigo-600'
                      >
                        {clipboard.message ? (
                          <Check className='text-indigo-500 w-3 h-3' />
                        ) : (
                          'Click to Copy'
                        )}
                      </button>
                    </div>
                  </section>

                  <section className='grid col-span-6 gap-4'>
                    <div>
                      <p className='font-Matter-Medium mb-1.5'>Contact</p>
                      <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-zinc-50 mb-5'>
                        <p className='font-Matter-Regular text-sm'>{row.user?.email}</p>
                      </div>

                      <p className='font-Matter-Medium mb-1.5 text-zinc-800'>Shipping Address</p>
                      <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-zinc-50'>
                        <div className='flex flex-col'>
                          <p className='font-Matter-Regular text-sm'>
                            {row?.user?.shippingAddress?.address || row?.user?.addressRef?.address}
                          </p>
                          <p className='font-Matter-Regular text-sm'>{`${
                            row?.user?.shippingAddress?.city || row?.user?.addressRef?.city
                          }, ${
                            row?.user?.shippingAddress?.state || row?.user?.addressRef?.state
                          } USA ${
                            row?.user?.shippingAddress?.zipPostalCode ||
                            row?.user?.addressRef?.zipPostalCode
                          }`}</p>
                        </div>
                        <i
                          onClick={() =>
                            copyData('', row?.user?.shippingAddress || row?.user?.addressRef)
                          }
                          className={`${
                            copied.shippingAddress ? 'fas fa-check' : 'fa-regular fa-copy'
                          } fa-sm cursor-pointer`}
                        ></i>
                      </div>
                    </div>
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
