import Hero from '../components/Hero';
import EducationHigh from '../components/assets/education-high.jpg';
import EducationLow from '../components/assets/education-low.jpg';
import LeftArrow from '../components/svg/LeftArrow';
import RightArrow from '../components/svg/RightArrow';
import NoEducation from '../components/svg/NoEducation';
import { useGetEducationTipsQuery } from '../redux/services/educationTipApi';
import GreenRotatingTransparentCircle from '../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment } from 'react';

const Education = () => {
  const { data, isLoading } = useGetEducationTipsQuery();
  const educationTips = data?.educationTips;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <Fragment>
      <Hero
        low={EducationLow}
        high={EducationHigh}
        title='Education Tips'
        link='https://www.pexels.com/photo/photograph-of-a-black-and-brown-dachshund-14111197/'
        photographer='Alfo Medeiros'
      />
      <div className='max-w-screen-[980px] w-full mx-auto mb-16 px-3'>
        <div className='w-100 d-flex justify-content-between mt-3 mb-16'>
          <LeftArrow text='Home' url='/' text2='Blog' url2='/blog' />
          <RightArrow text='About Us' url='/team-members' />
        </div>
        <p className='mb-12 mt-14 text-xl font-Matter-Medium text-center'>
          Dachshund information of all kinds
        </p>
        {educationTips?.length === 0 ? (
          <div className='flex flex-col items-center'>
            <div className='mb-4'>
              <NoEducation />
            </div>
            <p className='font-Matter-Light'>
              Sorry, no education tips available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className='grid gap-6 grid-cols-1 flex-col justify-items-center md:grid-cols-3 md:items-center'>
            {educationTips?.map((obj: any, i: number) => (
              <div
                className='mb-5 w-72 rounded-none my-1 col-span-1 shadow-lg md:m:0'
                key={i}
                onClick={() => window.open(obj.externalLink, '_blank')}
              >
                <img src={obj.image} alt='Card background' className='object-cover aspect-square' />

                <div className='px-4 py-3'>
                  <p className='font-Matter-Medium uppercase tracking-wide max-w-2xl mx-auto'>
                    {obj.title}
                  </p>
                  <p className='cursor-pointer'>Read</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Education;
