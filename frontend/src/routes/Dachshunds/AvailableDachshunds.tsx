import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/toolkitStore';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { BlackThread, NoImgDog } from '../../components/assets';

const checklist = [
  `Has been spayed or neutered.`,
  `Has had a full veterinary health check and core vaccinations.`,
  `Has been heartworm tested and treated, if necessary.`,
  `Is taking heartworm and flea and tick preventatives.`,
  `Has been microchipped.`,
  `And much more.`,
];

const AvailableDachshunds = () => {
  const isMounted = useRef(false);
  const dachshund = useSelector((state: RootState) => state.dachshund);

  const [getDachshunds] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  if (!isMounted.current) {
    getDachshunds({ status: 'Available' });
    isMounted.current = true;
  }

  return (
    <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20'>
      <div className='mx-auto w-full'>
        <div
          style={{ backgroundImage: `url(${BlackThread})` }}
          className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] border-[#9863a8] bg-teal-500'
        >
          <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
            Dachshunds to Rescue
          </h1>
        </div>
        <div className='max-w-screen-xl grid grid-cols-12 gap-5 mx-auto bg-white pb-40 px-[16px] md:px-10'>
          <div className='col-span-12 md:col-span-8 mt-20'>
            <p className='text-4xl font-Matter-Medium mb-4'>
              We are excited that you are interested in adding a dachshund or dachshund-mix to your
              family!
            </p>
            <p className='text-lg font-Matter-Light mb-4'>
              Here is a list of all the dogs we have available for adoption. We encourage you to
              read each dog’s bio thoroughly.  Each dog has different requirements and not all may
              fit your lifestyle.
            </p>
            <p className='text-lg font-Matter-Light mb-5'>
              Please complete an{' '}
              <span>
                <Link
                  className='text-teal-400 text-Font-Light underline text-lg hover:text-teal-600 duration-200'
                  to='/adopt'
                >
                  adoption application
                </Link>
              </span>{' '}
              for a dog whose needs you can meet, be it a securely fenced yard, a quiet home, a
              special diet, a medical need, on-going house training, on-going leash training, etc.
            </p>
            <p className='text-xl font-Matter-Medium mb-4'>
              When you adopt from LPDR, you are getting a dachshund who:
            </p>
            <div className='ml-3'>
              {checklist.map((text: string, i: number) => (
                <li
                  key={i}
                  className='mb-2 mx-auto text-lg font-Matter-Light marker:text-[#9863a8]'
                >
                  {text}
                </li>
              ))}
            </div>
          </div>
          <div className='col-span-12 md:col-span-4'>
            <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-16 bg-white'>
              <div>
                <p className='font-Matter-Medium text-2xl mb-4'>Get Involved</p>
                <p className='font-Matter-Light text-lg mb-5'>
                  Countless homeless dachshunds are relying on your support. Take action and create
                  a positive impact today.
                </p>
              </div>
              <Link
                to='/donate'
                className='w-full text-center rounded-md text-white bg-[#9863a8] font-Museo-Slab-700 py-3 text-2xl hover:no-underline hover:shadow-lg duration-200'
              >
                DONATE
              </Link>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full bg-slate-100 py-32 md:flex-row'>
          <p className='text-sm tracking-tight mr-6 font-Matter-Regular'>
            Our Online Applications are Powered by
          </p>
          <div className='flex justify-center flex-col items-center'>
            <div className='font-extrabold text-3xl text-[#04518d] leading-10 tracking-tighter md:pt-0'>
              RescueGroups.org
            </div>
            <p className='leading-3 tracking-tighter'>
              technology solutions animals can live with...
            </p>
          </div>
        </div>
        <div className='max-w-screen-xl mx-auto w-full grid grid-cols-12 gap-6 px-4 bg-white pt-24'>
          {dachshund?.dachshunds?.map((dachshund: any, i: number) => {
            return (
              <Link
                key={i}
                className='col-span-12 sm:col-span-6 lg:col-span-4 h-full shadow-md hover:no-underline'
                to={`/dachshunds/${dachshund?.id}`}
              >
                <img

                  className='aspect-square object-cover'
                  src={dachshund?.attributes?.photos[0]  ?? NoImgDog}
                  alt={`Hi, my name is ${dachshund?.attributes?.name}`}
                />

                <div className='d-flex flex-column justify-between h-[210px] p-3'>
                  <div className='py-3.5 border-b-2 border-slate-100 h-full mb-3'>
                    <h5 className='mb-1 text-center uppercase sm:text-xl md:text-2xl font-Matter-Medium'>
                      {dachshund?.attributes?.name}
                    </h5>
                    <p className='text-xs text-center font-Matter-Light'>
                      {dachshund?.attributes?.sex} {dachshund?.attributes?.ageGroup}{' '}
                      {dachshund?.attributes?.breedString}
                    </p>
                  </div>
                  <div className='text-teal-500 border-teal-500 text-lg duration-200 font-Matter-Medium w-fit mx-auto border-2 rounded-lg px-4 py-2.5 hover:bg-teal-500 hover:text-[#fff]'>
                    SEE MORE
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvailableDachshunds;
