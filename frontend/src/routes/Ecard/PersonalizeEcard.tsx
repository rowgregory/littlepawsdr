import { Fragment, useEffect, useState } from 'react';
import { useGetEcardQuery } from '../../redux/services/ecardApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Link } from 'react-router-dom';
import {
  formatDateForCalandar,
  formatDateForEstTimezone,
} from '../../utils/hooks/useAuctionSettingsForm';

const useECardForm = (state: any) => {
  const [errors, setErrors] = useState({}) as any;
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    recipientsFullName: '',
    recipientsEmail: '',
    dateToSend: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    message: '',
  });

  useEffect(() => {
    if (state?.ecard) {
      setInputs((prev: any) => ({
        ...prev,
        name: state?.ecard?.name,
        email: state?.ecard?.email,
        recipientsFullName: state?.ecard?.recipientsFullName,
        recipientsEmail: state?.ecard?.recipientsEmail,
        dateToSend: formatDateForCalandar(state?.dateToSend),
        message: state?.ecard?.message,
      }));
    }
  }, [state]);

  const validate = () => {
    const errors = {} as any;
    if (!inputs.name.trim()) {
      errors.name = 'Your name is required';
    }
    if (!inputs.email.trim()) {
      errors.email = 'Your email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
      errors.email = 'Invalid email address';
    }
    if (!inputs.recipientsFullName.trim()) {
      errors.recipientsFullName = "Recipient's full name is required";
    }
    if (!inputs.recipientsEmail.trim()) {
      errors.recipientsEmail = "Recipient's email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(inputs.recipientsEmail)) {
      errors.recipientsEmail = 'Invalid email address';
    }
    if (!inputs.dateToSend.trim()) {
      errors.dateToSend = 'Date to send is required';
    }
    if (!inputs.message.trim()) {
      errors.message = 'Message is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInput = (e: any) => {
    e.persist();

    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return { handleInput, inputs, validate, errors };
};

const PersonalizeEcard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const [sendNow, setSendNow] = useState(state?.ecard?.sendNow ?? 'send-now');

  let { data, isLoading } = useGetEcardQuery(id);
  const ecard = data?.ecard;

  const personalizeCallback = (e: any) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      navigate(
        {
          pathname: `/ecards/personalize/${ecard?._id}/preview`,
        },
        {
          state: {
            ecard,
            ...inputs,
            sendNow,
            ...{
              dateToSend: new Date(
                formatDateForEstTimezone(inputs.dateToSend, 13, 0)
              ).toISOString(),
            },
          },
        }
      );
    }
  };

  const { inputs, handleInput, validate, errors } = useECardForm(state);

  if (isLoading) return <GreenRotatingTransparentCircle />;

  const date = new Date();
  const tomorrowDate = new Date(date);
  tomorrowDate.setDate(date.getDate() + 1);

  const tomorrowInNewYork = tomorrowDate.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  const tomorrow = formatDateForCalandar(new Date(tomorrowInNewYork));

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full max-w-screen-sm px-[16px] md:px-0'>
          <h1 className='text-4xl font-Matter-Bold pt-10 pb-6 text-[#313436]'>Personalize ecard</h1>
          <div className='bg-gray-100 flex p-7 rounded-lg'>
            <img className='object-contain h-48 w-60 mr-3' src={ecard?.image} alt={ecard?.name} />
            <div className='flex flex-col justify-between'>
              <div>
                <p className='text-lg font-Matter-Light mb-2.5'>You have chosen this ecard:</p>
                <p className='text-2xl font-Matter-Bold text-[#313436]'>{ecard?.name}</p>
              </div>
              <Link to='/ecards' className='text-blue-800 underline'>
                Pick another ecard
              </Link>
            </div>
          </div>
          <h3 className='text-xl font-Matter-Bold text-[#313436] my-8'>Send this ecard</h3>
          <div className='grid grid-cols-12 gap-7 w-full mx-auto'>
            <form className='col-span-12 flex flex-col'>
              <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex flex-col w-full'>
                  <label className='font-Matter-Medium text-sm mb-1' htmlFor='name'>
                    Your name*
                  </label>
                  <input
                    className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
                    id='name'
                    name='name'
                    onChange={handleInput}
                    type='text'
                    alt='Your name'
                    aria-label='Your name'
                    value={inputs.name || ''}
                  />
                  <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.name}</p>
                </div>
                <div className='flex flex-col w-full'>
                  <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
                    Your email*
                  </label>
                  <input
                    className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
                    id='email'
                    name='email'
                    onChange={handleInput}
                    type='email'
                    alt='Your email'
                    aria-label='Your email'
                    value={inputs.email || ''}
                  />
                  <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.email}</p>
                </div>
              </div>
              <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex flex-col w-full'>
                  <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
                    Recipeints full name*
                  </label>
                  <input
                    className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
                    id='recipientsFullName'
                    name='recipientsFullName'
                    onChange={handleInput}
                    type='text'
                    alt='Recipeints full name'
                    aria-label='Recipeints full name'
                    value={inputs.recipientsFullName || ''}
                  />
                  <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>
                    {errors?.recipientsFullName}
                  </p>
                </div>
                <div className='flex flex-col w-full'>
                  <label className='font-Matter-Medium text-sm mb-1' htmlFor='password'>
                    Recipients email*
                  </label>
                  <input
                    className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
                    id='recipientsEmail'
                    name='recipientsEmail'
                    onChange={handleInput}
                    type='email'
                    alt='Recipients email'
                    aria-label='Recipients email'
                    value={inputs.recipientsEmail || ''}
                  />
                  <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>
                    {errors?.recipientsEmail}
                  </p>
                </div>
              </div>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='bio'>
                Message*
              </label>
              <textarea
                className='user-input border-[1px] border-gray-300 rounded-md w-full py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
                id='message'
                name='message'
                rows={4}
                value={inputs.message || ''}
                onChange={handleInput}
                aria-label='Enter message'
              ></textarea>
              <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.message}</p>
              <label htmlFor='sendNow' className='font-Matter-Light'>
                <input
                  name='sendNow'
                  type='radio'
                  value='send-now'
                  onChange={(e: any) => setSendNow(e.target.value)}
                  className='mr-2 personalize-ecard'
                  checked={sendNow === 'send-now'}


                />
                Send my ecard right now
              </label>
              <label htmlFor='sendNow' className='font-Matter-Light'>
                <input
                  name='sendNow'
                  type='radio'
                  value='send-later'
                  onChange={(e: any) => setSendNow(e.target.value)}
                  className='mr-2 personalize-ecard'
                  checked={sendNow === 'send-later'}
                />
                Send my ecard later
              </label>
              {sendNow === 'send-later' && (
                <div className='flex flex-col'>
                  <label className='font-Matter-Medium text-sm mb-1'>Date to send</label>
                  <input
                    className='ecard-calandar user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none '
                    name='dateToSend'
                    id='dateToSend'
                    onChange={handleInput}
                    type='date'
                    alt='Date to send'
                    aria-label='Date to send'
                    value={inputs.dateToSend || ''}
                    min={tomorrow}
                  />
                  <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>
                    {errors?.dateToSend}
                  </p>
                </div>
              )}
              <button
                onClick={personalizeCallback}
                className='mt-4 bg-teal-400 rounded-md text-white px-4 py-2.5 font-Matter-Medium duration-200 hover:bg-teal-500 hover:shadow-lg hover:no-underline text-center'
              >
                Preview ecard
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalizeEcard;
