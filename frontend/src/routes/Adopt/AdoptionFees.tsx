import { Fragment } from 'react';
import AdoptFeesHigh from '../../components/assets/adopt-fees-high.jpeg';
import adoptionFeeData from '../../components/data/adopt/adoption-fees-data';
import PageBanner from '../../components/common/PageBanner';
import { Fees } from '../../components/assets';

const AdoptionFees = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={Fees} title='Adoption Fees' />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        <h1 className='font-Matter-Bold text-4xl text-teal-400 text-center mb-24'>
          Affordable Adoption: Comprehensive Vetting Costs for All Dachshund Breeds and Mixes
        </h1>
        <div className='grid grid-cols-12 gap-y-10 md:gap-10 items-center mb-24 w-full'>
          <img
            src={AdoptFeesHigh}
            alt='Adoption Fee Information'
            className='col-span-12 md:col-span-7 aspect-square object-cover w-full'
          />
          <div className='col-span-12 md:col-span-5 flex flex-col gap-y-5'>
            <h2 className='font-Matter-Medium text-3xl text-center text-zinc-700'>
              Adopt with Confidence: Comprehensive Vetting for Every Dachshund
            </h2>
            <p className='font-Matter-Light text-xl text-center'>
              Whether purebred or mixed, enjoy peace of mind with our all-inclusive vetting fees!
            </p>
          </div>
        </div>
        <h3 className='text-3xl font-Matter-Medium text-zinc-700 text-center mb-10'>
          Regardless of whether you adopt a purebred or mixed Dachshund, vetting costs remain the
          same.
        </h3>
        <p className='text-lg font-Matter-Light'>
          Adopting a fully vetted dog costs significantly less than buying one and covering the
          vetting expenses yourself. The Adoption Fee for each of our adoptable dogs can be found in
          their biography. Find each dog&quot;s biography by clicking on Dachshunds then Available
          in our Menu dropdown list found on our home page. In addition to the Adoption Fee the cost
          of a Health Certificate is also the responsibility of the adopter. A health certificate is
          required by law when a dog is adopted and must travel over state lines. The cost depends
          upon what the veterinarian charges LPDR.
        </p>
        <div className='w-full h-[1px] bg-gray-200 my-20'></div>
        <div className='grid grid-cols-12'>
          <span className='col-span-2 md:col-span-1 w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-teal-400 flex items-center justify-center'>
            <i className='fas fa-check text-teal-400 fa-xl'></i>
          </span>
          <div className='col-span-10 md:col-span-11'>
            <h3 className='text-zinc-700 font-Matter-Medium text-3xl mb-6'>
              All adoption fees include:
            </h3>
            <ul className='flex flex-col gap-y-5'>
              {adoptionFeeData.map((data: string, i: number) => (
                <li key={i} className='text-lg font-Matter-Light'>
                  {data}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdoptionFees;
