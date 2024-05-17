import SponsorHigh from '../../components/assets/sanctuary.jpg';
import ReactPlayer from 'react-player';
import Sanctuary1 from '../../components//videos/sanctuary-1.mp4';
import { Link } from 'react-router-dom';

// const OneTimeOrMonthly = () => (
//   <form
//     action='https://www.paypal.com/donate'
//     method='post'
//     target='_top'
//     className='w-full h-20 bg-[#9863a8] text-white text-xl font-Matter-Bold tracking-wide flex items-center justify-center whitespace-nowrap'
//   >
//     <input type='hidden' name='hosted_button_id' value='C4SMAYNF4L948' id='donate' />
//     <button className='flex items-enter'>
//       MONTHLY <span className='hidden sm:block text-white text-xl'>&nbsp;DONATION</span>
//     </button>
//   </form>
// );

const SponsorSanctuary = () => {

  return (
    <div className='mt-[65px] max-w-[2000px] mx-auto'>
      <div
        style={{ backgroundImage: `url(${SponsorHigh})` }}
        className='h-48 md:h-80 bg-cover bg-no-repeat flex items-center object-contain mx-auto'
      >
        <div className='max-w-screen-xl w-full mx-auto px-3'>
          <h1 className='text-4xl md:text-6xl font-Matter-Medium text-[#fff]'>Sponsor a dachshund</h1>
        </div>
      </div>
      <div className='w-full h-1.5 bg-teal-500'></div>
      <p className='z-10 font-Matter-Light text-[10px] text-right mt-[-20px] text-[#fff] mix-blend-difference'>
        Photo by Hannes Netzell
      </p>
      <div className='min-h-[calc(100vh-957px)] grid grid-cols-12 gap-6 md:flex-row max-w-screen-xl w-full mx-auto mb-24 px-3'>
        <div className='col-span-12 lg:col-span-8 gap-8'>
          <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
            In addition to our adoptable dogs, we have sanctuary foster dogs. These special dogs are not able to be adopted due to medical or behavioral circumstances,
            and will remain in LPDR’s care for the remainder of their lives.
          </p>
          <p className='mb-3 mt-2 text-lg font-Matter-Light text-balance w-full md:w-2/3'>
            Many of our sanctuary fosters are in their senior years and require a little extra care.
            Some require monthly medication, while others need monthly supplies of diapers or more
            frequent visits to the vet.
          </p>
        </div>
        <div className='w-full col-start-3 h-fit relative col-span-8 mt-[0px] md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:-mt-36'>
          <ReactPlayer
            url={Sanctuary1}
            playsinline
            controls={false}
            playing={true}
            volume={5}
            muted={true}
            loop={true}
            width='100%'
            height='100%'
            config={{
              file: {
                attributes: {
                  style: { width: '100%', height: '100%', objectFit: 'cover', maxWidth: '400px' },
                },
              },
            }}
          />
          <Link to='/donate' state={{ cameFromSanctuary: true }} className='bg-teal-300 text-white font-Museo-Slab-700 rounded-lg text-2xl flex items-center justify-center px-5 py-3.5 absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hover:no-underline hover:bg-teal-400 duration-200'>SPONSOR</Link>
        </div>
      </div>
    </div>
  )
};

export default SponsorSanctuary;
