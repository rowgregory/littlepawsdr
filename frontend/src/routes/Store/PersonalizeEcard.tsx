import { useEffect } from 'react';
import { useGetEcardQuery } from '../../redux/services/ecardApi';
import { useNavigate, useParams } from 'react-router-dom';
import VerticalLogo from '../../components/common/VerticalLogo';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import validatePersonalizeEcardForm from '../../validations/validatePersonalizeEcardForm';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { motion } from 'framer-motion';

const PersonalizeEcard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetEcardQuery(id);
  const { ecardForm } = useFormSelector();
  const dispatch = useAppDispatch();
  const { handleInput } = createFormActions('ecardForm', dispatch);
  const inputs = ecardForm?.inputs;
  const errors = ecardForm?.errors;

  useEffect(() => {
    const ecard = data?.ecard;

    if (ecard) {
      dispatch(
        setInputs({
          formName: 'ecardForm',
          data: {
            ecardName: ecard?.name || '',
            senderName: '',
            email: '',
            message: '',
            recipientsFullName: '',
            recipientsEmail: '',
            dateToSend: new Date().toISOString().slice(0, 16),
            sendNow: 'send-now',
            image: ecard.image || '',
            price: ecard.price || 0,
          },
        })
      );
    }
  }, [dispatch, data]);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePersonalizeEcardForm(inputs, setInputs)) return;

    const cartItem = {
      itemType: 'ecard',
      itemId: id,
      itemName: inputs?.ecardName,
      itemImage: inputs?.image,
      quantity: 1,
      price: inputs?.price,
      shippingPrice: 0,
      message: inputs?.message,
      dateToSend: inputs?.dateToSend,
      sendNow: inputs?.sendNow,
      recipientsEmail: inputs?.recipientsEmail,
      recipientsFullName: inputs?.recipientsFullName,
    };

    dispatch(addToCart({ item: cartItem }));
    dispatch(toggleCartDrawer(true));
    navigate('/store');
  };

  return (
    <>
      <VerticalLogo />
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 py-12'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-12'
          >
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-3'>
              Personalize Your
              <span className='block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Ecard
              </span>
            </h1>
            <p className='text-gray-600 text-lg'>Make it special with your personal touch</p>
          </motion.div>

          {/* Main Content - Two Columns */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='bg-white rounded-lg border border-gray-200 p-8 h-fit'
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Send Details</h2>

              <form onSubmit={handleAddToCart} className='space-y-6'>
                {/* Send Timing Options */}
                <div className='space-y-3'>
                  <label className='block text-sm font-semibold text-gray-900'>When to send?</label>
                  <div className='grid grid-cols-2 gap-3'>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type='button'
                      onClick={() =>
                        dispatch(
                          setInputs({ formName: 'ecardForm', data: { sendNow: 'send-now' } })
                        )
                      }
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        inputs?.sendNow === 'send-now'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className='font-semibold text-sm text-gray-900'>Send Now</p>
                      <p className='text-xs text-gray-600'>Immediately</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type='button'
                      onClick={() =>
                        dispatch(
                          setInputs({ formName: 'ecardForm', data: { sendNow: 'send-later' } })
                        )
                      }
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        inputs?.sendNow === 'send-later'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className='font-semibold text-sm text-gray-900'>Schedule</p>
                      <p className='text-xs text-gray-600'>Specific time</p>
                    </motion.button>
                  </div>
                </div>

                {/* Date picker for scheduled sending */}
                {inputs?.sendNow === 'send-later' && (
                  <div>
                    <label className='block text-sm font-semibold text-gray-900 mb-2'>
                      Send Date & Time
                    </label>
                    <input
                      type='datetime-local'
                      name='dateToSend'
                      value={inputs?.dateToSend || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        errors?.dateToSend ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors?.dateToSend && (
                      <p className='text-red-600 text-xs mt-1'>{errors.dateToSend}</p>
                    )}
                  </div>
                )}

                {/* Recipient Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Recipient Email
                  </label>
                  <input
                    type='email'
                    name='recipientsEmail'
                    value={inputs?.recipientsEmail || ''}
                    onChange={handleInput}
                    placeholder='friend@example.com'
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors?.recipientsEmail ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors?.recipientsEmail && (
                    <p className='text-red-600 text-xs mt-1'>{errors.recipientsEmail}</p>
                  )}
                </div>

                {/* Recipient Name */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Recipient Full Name
                  </label>
                  <input
                    type='text'
                    name='recipientsFullName'
                    value={inputs?.recipientsFullName || ''}
                    onChange={handleInput}
                    placeholder={`Friend's name`}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors?.recipientsFullName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors?.recipientsFullName && (
                    <p className='text-red-600 text-xs mt-1'>{errors.recipientsFullName}</p>
                  )}
                </div>

                {/* Personal Message */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Personal Message
                  </label>
                  <textarea
                    name='message'
                    value={inputs?.message || ''}
                    onChange={handleInput}
                    rows={4}
                    placeholder='Write a heartfelt message...'
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                      errors?.message ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors?.message && <p className='text-red-600 text-xs mt-1'>{errors.message}</p>}
                </div>

                {/* Sender Name */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    name='senderName'
                    value={inputs?.senderName || ''}
                    onChange={handleInput}
                    placeholder='Your name'
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors?.senderName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors?.senderName && (
                    <p className='text-red-600 text-xs mt-1'>{errors.senderName}</p>
                  )}
                </div>

                {/* Sender Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Your Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={inputs?.email || ''}
                    onChange={handleInput}
                    placeholder='your@email.com'
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors?.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors?.email && <p className='text-red-600 text-xs mt-1'>{errors.email}</p>}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all'
                >
                  Add to Cart
                </motion.button>
              </form>
            </motion.div>

            {/* Right Column - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className='space-y-6'
            >
              {/* Preview Title */}
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>Preview</h2>
                <p className='text-gray-600 text-sm mt-1'>See how your ecard will look</p>
              </div>

              {/* Main Preview Card */}
              <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg'>
                <div className='aspect-square bg-gray-100 overflow-hidden'>
                  <img
                    src={inputs?.image}
                    alt={inputs?.ecardName}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Preview Content */}
                <div className='p-6 space-y-4'>
                  <div>
                    <p className='text-xs text-gray-600 uppercase font-semibold'>Ecard</p>
                    <p className='text-lg font-bold text-gray-900'>{inputs?.ecardName}</p>
                  </div>

                  <div className='bg-purple-50 rounded-lg p-4 space-y-3'>
                    <div>
                      <p className='text-xs text-gray-600 uppercase font-semibold mb-1'>To</p>
                      <p className='text-gray-900 font-medium'>
                        {inputs?.recipientsFullName || 'Recipient Name'}
                      </p>
                    </div>

                    {inputs?.message && (
                      <div className='border-t border-purple-200 pt-3'>
                        <p className='text-xs text-gray-600 uppercase font-semibold mb-2'>
                          Message
                        </p>
                        <p className='text-sm text-gray-700 italic'>{inputs?.message}</p>
                      </div>
                    )}

                    {inputs?.senderName && (
                      <div className='border-t border-purple-200 pt-3'>
                        <p className='text-xs text-gray-600 uppercase font-semibold mb-1'>From</p>
                        <p className='text-gray-900 font-medium'>{inputs?.senderName}</p>
                      </div>
                    )}
                  </div>

                  {/* Send Details */}
                  <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>Will be sent:</span>
                      <span className='text-sm font-semibold text-gray-900'>
                        {inputs?.sendNow === 'send-now'
                          ? 'Immediately'
                          : new Date(inputs?.dateToSend).toLocaleDateString()}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>To:</span>
                      <span className='text-sm font-semibold text-gray-900'>
                        {inputs?.recipientsEmail || 'email@example.com'}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='border-t border-gray-200 pt-4'>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-600 font-medium'>Price</span>
                      <span className='text-2xl font-bold text-gray-900'>
                        ${inputs?.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalizeEcard;
