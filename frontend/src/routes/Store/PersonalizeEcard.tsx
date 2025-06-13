import { Fragment, useEffect } from 'react';
import { useGetEcardQuery } from '../../redux/services/ecardApi';
import { useNavigate, useParams } from 'react-router-dom';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import validatePersonalizeEcardForm from '../../validations/validatePersonalizeEcardForm';
import { formatDateForEstTimezone } from '../../utils/dateFunctions';

const PersonalizeEcard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetEcardQuery(id);
  const { ecardForm } = useAppSelector((state: RootState) => state.form);
  const dispatch = useAppDispatch();
  const { handleInput, setErrors } = createFormActions('ecardForm', dispatch);

  useEffect(() => {
    const ecard = data?.ecard;

    const storedData = localStorage.getItem('ecardPreviewData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      dispatch(
        setInputs({
          formName: 'ecardForm',
          data: {
            ecardName: parsed.ecardName || '',
            senderName: parsed.senderName || '',
            email: parsed.email || '',
            message: parsed.message || '',
            recipientsFullName: parsed.recipientsFullName || '',
            recipientsEmail: parsed.recipientsEmail || '',
            dateToSend: parsed.dateToSend || '',
            sendNow: parsed.sendNow || 'send-now',
            image: parsed.image || '',
            price: parsed.price || 0,
          },
        })
      );
    } else if (ecard) {
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
            dateToSend: formatDateForEstTimezone(new Date().toLocaleString(), 13, 0),
            sendNow: 'send-now',
            image: ecard.image || '',
            price: ecard.price || 0,
          },
        })
      );
    }
  }, [dispatch, data]);

  const personalizeCallback = (e: any) => {
    e.preventDefault();

    const isValid = validatePersonalizeEcardForm(ecardForm?.inputs, setErrors);
    if (!isValid) return;

    localStorage.setItem('ecardPreviewData', JSON.stringify(ecardForm?.inputs));
    navigate(`/store/ecards/${id}/preview`);
  };

  return (
    <Fragment>
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] pb-20 w-full'>
        <div className='mx-auto w-full max-w-2xl px-4'>
          {/* Header Section */}
          <div className='text-center pt-12 pb-8'>
            <h1 className='text-5xl font-black text-gray-900 mb-3 tracking-tight'>
              Personalize Your
              <span className='block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Ecard</span>
            </h1>
            <p className='text-gray-600 text-lg'>Make it special with your personal touch</p>
          </div>

          {/* Ecard Preview Card */}
          <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8 hover:shadow-2xl transition-all duration-300'>
            <div className='flex flex-col md:flex-row gap-6 items-center'>
              <div className='relative group'>
                <img
                  className='h-48 w-60 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300'
                  src={ecardForm?.inputs?.image}
                  alt={ecardForm?.inputs?.name}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
              <div className='flex-1 text-center md:text-left'>
                <div className='mb-6'>
                  <p className='text-gray-500 text-sm font-medium uppercase tracking-wide mb-2'>Selected Ecard</p>
                  <h2 className='text-2xl font-bold text-gray-900 mb-3'>{ecardForm?.inputs?.name}</h2>
                  <div className='inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    Ready to personalize
                  </div>
                </div>
                <Link
                  to='/store'
                  className='inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group'
                >
                  <i className='fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200'></i>
                  Choose different ecard
                </Link>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8'>
            <div className='mb-8'>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>Send Details</h3>
              <p className='text-gray-600'>Fill in the details to personalize your ecard</p>
            </div>

            <form onSubmit={personalizeCallback} className='space-y-6'>
              {/* Send Timing Options */}
              <div className='space-y-4'>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>When to send?</label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <button
                    type='button'
                    onClick={() => dispatch(setInputs({ formName: 'ecardForm', data: { sendNow: 'send-now' } }))}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                      ecardForm?.inputs?.sendNow === 'send-now'
                        ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-100'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          ecardForm?.inputs?.sendNow === 'send-now' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                        }`}
                      >
                        {ecardForm?.inputs?.sendNow === 'send-now' && <div className='w-2 h-2 bg-white rounded-full m-auto mt-0.5'></div>}
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900'>Send Now</p>
                        <p className='text-sm text-gray-500'>Deliver immediately</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type='button'
                    onClick={() => dispatch(setInputs({ formName: 'ecardForm', data: { sendNow: 'send-later' } }))}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                      ecardForm?.inputs?.sendNow === 'send-later'
                        ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-100'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          ecardForm?.inputs?.sendNow === 'send-later' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                        }`}
                      >
                        {ecardForm?.inputs?.sendNow === 'send-later' && <div className='w-2 h-2 bg-white rounded-full m-auto mt-0.5'></div>}
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900'>Schedule</p>
                        <p className='text-sm text-gray-500'>Send at specific time</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date picker for scheduled sending */}
              {ecardForm?.inputs?.sendNow === 'send-later' && (
                <div className='bg-gray-50 rounded-2xl p-6 border border-gray-100'>
                  <label className='block text-sm font-semibold text-gray-900 mb-3'>
                    <i className='fas fa-calendar-alt text-purple-500 mr-2'></i>
                    When to send?
                  </label>
                  <input
                    type='datetime-local'
                    name='dateToSend'
                    value={ecardForm?.inputs?.dateToSend || ''}
                    onChange={handleInput}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                  />
                  {ecardForm?.errors?.dateToSend && (
                    <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                      <i className='fas fa-exclamation-circle'></i>
                      {ecardForm?.errors?.dateToSend}
                    </p>
                  )}
                </div>
              )}

              {/* Recipient Email */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  <i className='fas fa-envelope text-purple-500 mr-2'></i>
                  Recipients Email
                </label>
                <input
                  type='email'
                  name='recipientsEmail'
                  value={ecardForm?.inputs?.recipientsEmail || ''}
                  onChange={handleInput}
                  placeholder='friend@example.com'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                />
                {ecardForm?.errors?.recipientsEmail && (
                  <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                    <i className='fas fa-exclamation-circle'></i>
                    {ecardForm?.errors?.recipientsEmail}
                  </p>
                )}
              </div>

              {/* Recipient Name */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  <i className='fas fa-user text-purple-500 mr-2'></i>
                  Recipient Full Name
                </label>
                <input
                  type='text'
                  name='recipientsFullName'
                  value={ecardForm?.inputs?.recipientsFullName || ''}
                  onChange={handleInput}
                  placeholder={`Your friend's name`}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                />
                {ecardForm?.errors?.recipientName && (
                  <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                    <i className='fas fa-exclamation-circle'></i>
                    {ecardForm?.errors?.recipientName}
                  </p>
                )}
              </div>

              {/* Personal Message */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  <i className='fas fa-heart text-purple-500 mr-2'></i>
                  Personal Message
                </label>
                <textarea
                  name='message'
                  value={ecardForm?.inputs?.message || ''}
                  onChange={handleInput}
                  rows={4}
                  placeholder='Write a heartfelt message...'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none'
                />
                {ecardForm?.errors?.message && (
                  <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                    <i className='fas fa-exclamation-circle'></i>
                    {ecardForm?.errors?.message}
                  </p>
                )}
              </div>

              {/* Sender Name */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  <i className='fas fa-signature text-purple-500 mr-2'></i>
                  Your Name
                </label>
                <input
                  type='text'
                  name='senderName'
                  value={ecardForm?.inputs?.senderName || ''}
                  onChange={handleInput}
                  placeholder='Your name'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                />
                {ecardForm?.errors?.senderName && (
                  <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                    <i className='fas fa-exclamation-circle'></i>
                    {ecardForm?.errors?.senderName}
                  </p>
                )}
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  <i className='fas fa-signature text-purple-500 mr-2'></i>
                  Your Email
                </label>
                <input
                  type='text'
                  name='email'
                  value={ecardForm?.inputs?.email || ''}
                  onChange={handleInput}
                  placeholder='Your email'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                />
                {ecardForm?.errors?.email && (
                  <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                    <i className='fas fa-exclamation-circle'></i>
                    {ecardForm?.errors?.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className='pt-6'>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-1 flex items-center justify-center gap-3'
                >
                  <i className='fas fa-paper-plane'></i>
                  Preview Ecard
                  <i className='fas fa-arrow-right'></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalizeEcard;
