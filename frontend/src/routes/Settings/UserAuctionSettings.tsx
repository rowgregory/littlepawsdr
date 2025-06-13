import { RootState, useAppSelector } from '../../redux/toolkitStore';
import Switch from '../../components/common/Switch';
import { useUpdateUserProfileMutation } from '../../redux/services/userApi';

const UserAuctionSettings = () => {
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const user = useAppSelector((state: RootState) => state.user);

  const handleUpdateUser = async (e: any) => {
    try {
      await updateUserProfile({
        _id: user?.user?._id,
        anonymousBidding: e.target.checked,
      }).unwrap();
    } catch {}
  };

  return (
    <div className='w-full mx-auto pb-2'>
      <div className='bg-[#fff] border-[1px] border-gray-200 rounded-xl p-3 md:p-8'>
        <div className='grid grid-cols-12 gap-8 items-center'>
          <div className=' col-span-9 lg:col-span-4'>
            <p className='text-lg font-Matter-Medium text-slate-900'>User settings</p>
            <p className='font-Matter-Light text-sm tracking-wid text-slate-900'>Hide your name from all donations and bids</p>
          </div>
          <div className='col-span-3 lg:col-span-8'>
            <form className='flex flex-col gap-3 items-end'>
              <Switch name='anonymousBidding' checked={user?.user?.anonymousBidding || false} onChange={handleUpdateUser}></Switch>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuctionSettings;
