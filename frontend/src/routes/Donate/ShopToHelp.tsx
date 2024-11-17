import { Fragment } from 'react';
import shopToHelpData from '../../components/data/donate/shop-to-help-data';
import PageBanner from '../../components/common/PageBanner';
import { ShopToHelpImg } from '../../components/assets';

const ShopToHelp = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={ShopToHelpImg} title='Shop To Help' />
      <div className='px-3'>
        <div className='mx-auto w-100 py-12 max-w-screen-xl'>
          <h1 className='text-center text-[40px] mb-4 font-Matter-Medium text-teal-400'>
            You can also shop to help
          </h1>
          <p className='font-Matter-Regular text-center mb-10 text-[22px]'>
            These companies offer amazing products and services while supporting our mission to
            rescue <br />
            and care for dachshunds in need at Little Paws Dachshund Rescue.
          </p>
          <div className='grid grid-cols-12 gap-y-12 xs:gap-4 md:gap-12'>
            {shopToHelpData.map((obj: any, i: number) => (
              <button
                onClick={() => window.open(obj.linkKey, '_blank')}
                key={i}
                className='col-span-12 xs:col-span-6 md:col-span-4 flex justify-start flex-col border-[1px] border-gray-200'
              >
                <div className='bg-gray-100 md:h-80 aspect-square md:aspect-auto flex items-center justify-center w-full p-2.5'>
                  <img
                    src={obj.img}
                    alt='Little Paws Shop to Help'
                    className='object-cover w-full max-w-64'
                  />
                </div>
                <div className='p-6 flex flex-col gap-y-5'>
                  <p className='text-left text-xl font-Matter-Regular'>{obj.textKey}</p>
                  <p className='text-left text-[22px] font-Matter-Medium'>
                    Take a Look <i className='fas fa-arrow-right text-teal-400'></i>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopToHelp;
