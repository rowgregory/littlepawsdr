import { useGetBoardMembersQuery } from '../redux/services/boardMemberApi';
import VerticalLogo from '../components/common/VerticalLogo';
import { LightHoneycomb, NoImgDog } from '../components/assets';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import GreenRotatingTransparentCircle from '../components/Loaders/GreenRotatingTransparentCircle';

const TeamMembers = () => {
  const { data, isLoading } = useGetBoardMembersQuery();
  const boardMembers = data?.boardMembers;

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full'>
          <div
            style={{
              backgroundImage: `url(${LightHoneycomb})`,
            }}
            className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
          >
            <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
              Little Paws Crew
            </h1>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
              <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
                We believe that dogs truly are man’s (and woman’s) best friend and that our
                beloved companions deserve the right to a soft bed, generous treats and
                unconditional love.
              </p>
              <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-12 md:col-span-5'>
                  <p className='mb-3 mt-2 text-lg font-Matter-Light w-full'>
                    We believe in rescue. We believe in the power of cooperation and teamwork to
                    make this happen. We believe in volunteers who can work together to help make a
                    difference in the life of three puppy mill dogs who have spent their lives in
                    cramped cages and now have a chance at a bright future thanks to the teamwork of
                    Little Paws Dachshund Rescue and Carolina Loving Hound Rescue.
                  </p>
                  <p className='mb-3 mt-2 text-lg font-Matter-Light w-full'>
                    We believe that two sweet puppies left behind at a veterinarian’s office deserve
                    a life full of toys and fun and snuggles. We believe Little Paws Dachshund
                    Rescue can help change the lives of these dogs, and many, many more in the
                    future.
                  </p>
                </div>
                <div className='col-span-12 md:col-span-5'>
                  <p className='mb-3 mt-2 text-lg font-Matter-Light w-full'>
                    Do you believe? Are you ready to help us achieve our mission? In the coming
                    weeks we will be putting out calls for volunteers for many roles within our
                    rescue. So many of you have reached out and asked how you can help! We are
                    touched by everyone’s generosity.
                  </p>
                  <p className='mb-3 mt-2 text-lg font-Matter-Light w-full'>
                    Right now, we are in need of monetary donations. Happy endings for our
                    dachshunds in need can only happen with your support. Please allow us to
                    continue to say “YES WE CAN” to those calls asking for assistance with a
                    dachshund left behind at an animal shelter, or a dog who has been neglected and
                    abused and deserves a warm bed and a kind hand to rub his or her tummy.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Join the Movement</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Your Contribution Can Change Lives
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
          <div className='grid grid-cols-12 gap-7 w-full mx-auto max-w-screen-xl px-3'>
            {boardMembers?.map(
              (user: any) =>
                (user?.isAdmin || user?.affiliation) &&
                user?.email !== 'it.little.paws@gmail.com' && (
                  <div key={user?._id} className='col-span-12 md:col-span-6 lg:col-span-4 w-full shadow-md flex items-center justify-center flex-col rounded-lg'>
                    <div
                      style={{ backgroundImage: `url(${user?.profileCardTheme})` }}
                      className='w-full h-64 mb-[200px]'
                    >
                      <div className='text-center pb-4 px-3 mt-20'>
                        <img
                          src={user?.image ?? user?.avatar ?? NoImgDog}
                          className='w-64 h-64 object-cover mx-auto p-3.5 rounded-full'
                          alt={`Board member - ${user?.name}`}
                        />
                        <p className='font-Matter-Bold text-2xl'>{user?.name}</p>
                        <p className='font-Matter-Regular text-lg'>{user?.affiliation ?? user?.volunteerTitle}</p>
                        <p className='font-Matter-Light'>{user?.email}</p>
                        <p className='font-Matter-Light text-sm'>{user?.location}</p>
                      </div>
                    </div>
                  </div>
                )
            ).reverse()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TeamMembers;
