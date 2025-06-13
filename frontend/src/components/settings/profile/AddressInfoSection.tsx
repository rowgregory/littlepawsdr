import { FC } from 'react';
import { MapPin } from 'lucide-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface AddressInfoSectionProps {
  inputs: any;
  errors: any;
  handleInput: (e: any) => void;
  isEditing: boolean;
  states: Array<{ value: string; text: string }>;
}

const AddressInfoSection: FC<AddressInfoSectionProps> = ({ inputs, errors, handleInput, isEditing, states }) => {
  // Check if any address field has content to determine if address is being filled
  const hasAnyAddressField = [inputs.address, inputs.city, inputs.state, inputs.zipPostalCode].some((field) => field && field.trim().length > 0);

  return (
    <div className='space-y-6 pt-6 border-t border-gray-100'>
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center'>
          <MapPin className='w-4 h-4 text-emerald-600' />
        </div>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Address Information</h3>
          <p className='text-sm text-gray-600 mt-1'>
            {hasAnyAddressField
              ? 'Complete all address fields to enable auction participation'
              : 'Optional - Required only for auction participation and physical item purchases'}
          </p>
        </div>
      </div>

      <div className='space-y-6 pl-11'>
        <FormInput
          label='Street Address'
          name='address'
          value={inputs.address}
          onChange={handleInput}
          disabled={!isEditing}
          placeholder='Enter your street address'
          error={errors.address}
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <FormInput
            label='City'
            name='city'
            value={inputs.city}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder='Enter city'
            error={errors.city}
          />

          <FormSelect
            label='State'
            name='state'
            value={inputs.state}
            onChange={handleInput}
            disabled={!isEditing}
            options={states}
            error={errors.state}
          />

          <FormInput
            label='ZIP Code'
            name='zipPostalCode'
            value={inputs.zipPostalCode}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder='Enter ZIP code'
            error={errors.zipPostalCode}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInfoSection;
