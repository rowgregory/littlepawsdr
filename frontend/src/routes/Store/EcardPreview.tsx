import { useDispatch } from 'react-redux';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import VerticalLogo from '../../components/common/VerticalLogo';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDateForEstTimezone } from '../../utils/dateFunctions';
import { useEffect, useState } from 'react';

const EcardPreview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [ecardData, setEcardData] = useState(null) as any;

  useEffect(() => {
    const storedData = localStorage.getItem('ecardPreviewData');
    if (storedData) {
      setEcardData(JSON.parse(storedData));
    }
  }, []);

  const addEcardToCart = () => {
    const ecardCartItem = {
      productImage: ecardData?.image,
      productName: ecardData?.ecardName,
      quantity: 1,
      isEcard: true,
      recipientsFullName: ecardData?.recipientsFullName,
      recipientsEmail: ecardData?.recipientsEmail,
      dateToSend: formatDateForEstTimezone(ecardData?.dateToSend, 13, 0),
      message: ecardData?.message,
      isPhysicalProduct: false,
      price: ecardData?.price,
      subtotal: ecardData?.price,
      totalPrice: ecardData?.price,
      category: ecardData?.category,
      ecardId: ecardData?._id,
      sendNow: ecardData?.sendNow,
      name: ecardData?.senderName,
      email: ecardData?.email,
      shippingPrice: 0,
    };

    dispatch(addToCart({ item: ecardCartItem }));
    dispatch(toggleCartDrawer(true));
  };

  const formatReadableDateTime = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  return (
    <>
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full bg-gradient-to-br from-gray-50 to-white'>
        <div className='mx-auto w-full max-w-4xl px-4 flex flex-col'>
          {/* Header Section */}
          <div className='text-center pt-12 pb-8'>
            <h1 className='text-5xl font-black text-gray-900 mb-4 tracking-tight'>
              Preview Your
              <span className='block bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent'>Ecard</span>
            </h1>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed'>
              Take a final look at your personalized ecard before adding it to your cart. Everything looks perfect? Let's make someone's day special!
            </p>
          </div>

          {/* Ecard Preview Card */}
          <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12 hover:shadow-3xl transition-all duration-300'>
            {/* Mock Email Interface */}
            <div className='bg-gray-50 rounded-2xl p-6 border border-gray-200'>
              {/* Email Header */}
              <div className='flex items-center gap-4 mb-6 pb-4 border-b border-gray-200'>
                <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center'>
                  <i className='fas fa-envelope text-white text-lg'></i>
                </div>
                <div className='flex-1'>
                  <p className='font-semibold text-gray-900 text-lg'>You've received an ecard from {ecardData?.name || 'Your Friend'}</p>
                  <p className='text-gray-500 text-sm'>
                    To: {ecardData?.recipientsFullName || 'Recipient'} &lt;{ecardData?.recipientsEmail || 'recipient@email.com'}&gt;
                  </p>
                </div>
              </div>

              {/* Ecard Content */}
              <div className='text-center'>
                <div className='relative inline-block mb-6'>
                  <img
                    src={ecardData?.image}
                    alt={ecardData?.name}
                    className='rounded-2xl shadow-lg max-w-full h-auto hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-20'></div>
                </div>

                {ecardData?.message && (
                  <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-lg mx-auto'>
                    <p className='text-gray-800 text-lg leading-relaxed italic'>"{ecardData?.message}"</p>
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                      <p className='text-gray-600 font-medium'>With love, {ecardData?.name || 'Your Friend'} 💝</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8'>
            <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
              <i className='fas fa-paper-plane text-green-500'></i>
              Delivery Details
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Timing */}
              <div className='bg-gray-50 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <i className='fas fa-clock text-green-500 text-lg'></i>
                  <h4 className='font-semibold text-gray-900'>Delivery Time</h4>
                </div>
                <p className='text-gray-700'>
                  {ecardData?.sendNow === 'send-now' ? (
                    <span className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                      Sending instantly
                    </span>
                  ) : (
                    <span className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                      Scheduled for {formatReadableDateTime(ecardData?.dateToSend)}
                    </span>
                  )}
                </p>
              </div>

              {/* Recipient */}
              <div className='bg-gray-50 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <i className='fas fa-user text-green-500 text-lg'></i>
                  <h4 className='font-semibold text-gray-900'>Recipient</h4>
                </div>
                <div className='space-y-1'>
                  <p className='font-medium text-gray-900'>{ecardData?.recipientsFullName || 'Recipient Name'}</p>
                  <p className='text-gray-600 text-sm'>{ecardData?.recipientsEmail || 'recipient@email.com'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto w-full'>
            <button
              onClick={addEcardToCart}
              className='flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25 hover:-translate-y-1 flex items-center justify-center gap-3'
            >
              <i className='fas fa-shopping-cart'></i>
              Add to Cart
              <span className='bg-white/20 px-2 py-1 rounded-full text-sm'>${ecardData?.price || '0.00'}</span>
            </button>
          </div>

          {/* Edit Link */}
          <div className='text-center mt-6'>
            <Link
              to={{ pathname: `/store/ecards/${params.id}` }}
              className='inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200 group'
            >
              <i className='fas fa-edit group-hover:rotate-12 transition-transform duration-200'></i>
              Make changes to your ecard
            </Link>
          </div>

          {/* Price Summary */}
          {ecardData?.price && (
            <div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 mt-8 border border-green-100'>
              <div className='flex items-center justify-between max-w-sm mx-auto'>
                <span className='text-gray-700 font-medium'>Ecard Price:</span>
                <span className='text-2xl font-bold text-green-600'>${ecardData?.price}</span>
              </div>
              <p className='text-center text-gray-600 text-sm mt-2'>Free delivery • No shipping costs</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EcardPreview;
