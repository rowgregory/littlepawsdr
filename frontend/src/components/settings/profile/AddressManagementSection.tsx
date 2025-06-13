import { FC, useState } from 'react';
import { MapPin, Trash2, AlertTriangle } from 'lucide-react';

interface AddressManagementSectionProps {
  hasAddress: boolean;
  addressData: any;
  onRemoveAddress: () => void;
  isLoading: boolean;
}

const AddressManagementSection: FC<AddressManagementSectionProps> = ({ hasAddress, addressData, onRemoveAddress, isLoading }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleRemoveClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    onRemoveAddress();
    setShowConfirmDialog(false);
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
  };

  if (!hasAddress || !addressData) {
    return null;
  }

  return (
    <div className='space-y-6 pt-6 border-t border-gray-100'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center'>
            <MapPin className='w-4 h-4 text-red-600' />
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>Address Management</h3>
            <p className='text-sm text-gray-600 mt-1'>Remove your saved address if no longer needed</p>
          </div>
        </div>
      </div>

      <div className='pl-11'>
        {/* Current Address Display */}
        <div className='bg-gray-50 rounded-xl p-6 mb-4'>
          <h4 className='font-medium text-gray-900 mb-3'>Current Address:</h4>
          <div className='text-sm text-gray-700 space-y-1'>
            <p>{addressData.address}</p>
            <p>
              {addressData.city}, {addressData.state} {addressData.zipPostalCode}
            </p>
            {addressData.country && <p>{addressData.country}</p>}
          </div>
        </div>

        {/* Remove Address Button */}
        {!showConfirmDialog ? (
          <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
            <div className='flex items-start space-x-3'>
              <AlertTriangle className='w-5 h-5 text-red-600 mt-0.5 flex-shrink-0' />
              <div className='flex-1'>
                <h4 className='text-sm font-medium text-red-800 mb-1'>Remove Address</h4>
                <p className='text-sm text-red-700 mb-3'>
                  Removing your address will prevent you from participating in auctions until you add a new one.
                </p>
                <button
                  type='button'
                  onClick={handleRemoveClick}
                  disabled={isLoading}
                  className='inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Trash2 className='w-4 h-4' />
                  <span>Remove Address</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation Dialog */
          <div className='bg-red-50 border border-red-200 rounded-xl p-6'>
            <div className='flex items-start space-x-3'>
              <AlertTriangle className='w-6 h-6 text-red-600 flex-shrink-0' />
              <div className='flex-1'>
                <h4 className='text-lg font-medium text-red-800 mb-2'>Confirm Address Removal</h4>
                <p className='text-sm text-red-700 mb-4'>
                  Are you sure you want to remove your address? This action cannot be undone and you'll need to re-enter your address to participate
                  in future auctions.
                </p>
                <div className='flex space-x-3'>
                  <button
                    type='button'
                    onClick={handleConfirmRemove}
                    disabled={isLoading}
                    className='inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isLoading ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin'></div>
                        <span>Removing...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className='w-4 h-4' />
                        <span>Yes, Remove Address</span>
                      </>
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={handleCancelRemove}
                    disabled={isLoading}
                    className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors duration-200'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManagementSection;
