import Mission from '../components/home/Mission';
import Banner from '../components/home/Banner';
import OurLovablePals from '../components/home/OurLovablePals';
import WaveSection from '../components/home/WaveSection';
import { Fragment, useState } from 'react';
import { AquaTile, Arches } from '../components/assets';
import { useCreateNewsletterEmailMutation } from '../redux/services/newsletterEmailApi';
import TailwindSpinner from '../components/Loaders/TailwindSpinner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();

  const handleSubmit = async () => {
    await createNewsletterEmail({ email })
      .unwrap()
      .then(() => {
        navigate(`/donate`);
      })
      .catch((err: any) => console.error('CREATE_NEWSLETTER_ERROR: ', err.message));
  };

  return (
    <Fragment>
      <Banner />
      <div className='w-full mt-24 mx-auto mb-0'>
        <OurLovablePals />
        <Mission />
        <WaveSection />
        <div className='py-20 flex flex-col items-center justify-center bg-teal-200 bg-repeat' style={{ backgroundImage: `url(${Arches})` }}>
          <p className='text-4xl font-Matter-Medium text-white mb-3'>Stay Connected</p>
          <div className='flex items-center flex-col md:flex-row'>
            <input
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder='Email*'
              className='w-[230px] text-lg placeholder:text-white bg-transparent border-2 border-white px-10 py-6 focus:outline-none text-white md:mr-3 mb-3.5 md:mb-0'
            />
            <button
              onClick={handleSubmit}
              className={`duration-200 font-Matter-Medium bg-transparent text-[#fff] w-[230px] h-[76px] bg-repeat flex items-center justify-center text-2xl tracking-wide hover:tracking-widest`}
              style={{ backgroundImage: `url(${AquaTile})` }}
            >
              {isLoading ? <TailwindSpinner color='fill-[#fff]' /> : 'SIGN UP'}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
