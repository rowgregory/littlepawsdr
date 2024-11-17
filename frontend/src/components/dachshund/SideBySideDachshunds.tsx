import { Link } from 'react-router-dom';

const SideBySideDachshunds = ({ dachshunds }: { dachshunds: any }) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 mb-32'>
      {dachshunds
        ?.map((obj: any, i: number) => (
          <Link
            to={`/dachshunds/${obj?.id}`}
            key={i}
            className='h-[300px] md:h-[500px] w-full md:flex-1 rounded-2xl bg-cover no-repeat relative'
            style={{
              backgroundImage: `url(${obj?.attributes?.photos[1]})`,
              backgroundPositionY: '50%',
            }}
          >
            <div className='absolute inset-0 bg-black/40 rounded-2xl flex text-white justify-end items-end p-6 group'>
              <div className='flex flex-col items-end justify-end mt-2'>
                <div className='flex items-center gap-x-4'>
                  <div className='flex items-center truncate'>
                    <i className='fas fa-calendar text-teal-400 text-lg mr-2 h-7 w-7'></i>
                    <p className='font-QBook'>{obj?.attributes?.ageString}</p>
                  </div>
                  <div className='flex items-center'>
                    <i className='fas fa-weight text-teal-400 text-lg h-7 w-7'></i>
                    <p className='font-QBook'>{obj?.attributes?.sex}</p>
                  </div>
                </div>
                <h1 className='font-QBold text-xl truncate mt-4'>{obj?.attributes?.name}</h1>
                <p className='font-QLight mt-2 mb-1'>
                  {obj?.attributes?.descriptionText?.substring(0, 60)?.replace('&nbsp;', '')}...
                </p>
                <p className='font-QBold group-hover:text-teal-400'>Read More</p>
              </div>
            </div>
          </Link>
        ))
        .filter((_: any, i: number) => i < 2)
        .reverse()}
    </div>
  );
};

export default SideBySideDachshunds;
