import { FC } from 'react';
import { Edit3, User } from 'lucide-react';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ firstName, lastName, email, isEditing, onToggleEdit }) => {
  return (
    <>
      {/* Hero Header */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
        <div className='relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-12'>
          <div className='relative z-10'>
            <div className='flex items-center space-x-6'>
              <div className='w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20'>
                <User className='w-8 h-8 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-white tracking-tight'>{`${firstName || 'First'} ${lastName || 'Last'}`}</h1>
                <p className='text-slate-300 mt-2'>{email || 'Email not provided'}</p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32'></div>
        </div>
      </div>

      {/* Form Header */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-200'>
        <div className='px-8 py-6 border-b border-gray-200'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>Profile Information</h2>
              <p className='text-gray-600 mt-1'>Manage your personal and contact information</p>
            </div>
            <button
              onClick={onToggleEdit}
              className='inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
            >
              <Edit3 className='w-4 h-4' />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
