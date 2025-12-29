import { Types } from 'mongoose';
import { auctionInitialState } from './auciton';

export const initialUserState = {
  _id: '',
  auctions: [] as (typeof auctionInitialState)[],
  orders: [] as Types.ObjectId[],
  addressRef: null as Types.ObjectId | null,

  name: '',
  email: '',
  password: '',
  isAdmin: false,

  shippingAddress: {
    name: '',
    address: '',
    city: '',
    state: '',
    zipPostalCode: '',
    country: '',
  },

  lastLoginTime: '',
  resetPasswordToken: '',
  resetPasswordExpires: null as Date | null,
  firstNameFirstInitial: '',
  lastNameFirstInitial: '',
  firstName: '',
  lastName: '',
  securityQuestion: '',
  securityAnswer: '',
  anonymousBidding: false,
  hasAddress: false,
  conversionSource: null as
    | 'organic_signup'
    | 'live_auction_modal'
    | 'auction_item'
    | 'auction_item_card'
    | 'header_banner'
    | 'auction_header'
    | 'auction_item_header'
    | 'donation_confirmation_modal'
    | null,
  lastSeenChangelogVersion: '0.0.0',

  // Professional Info
  jobTitle: '',
  workSchedule: '' as 'home' | 'part-time' | 'full-time' | 'retired' | '',

  isPublic: false,
  profileGradient: 'from-gray-500 to-gray-700',

  // Dog/Pet Experience
  yourHome: {
    homeType: '' as 'apartment' | 'house' | 'farm' | 'other' | '',
    yardType: '' as 'none' | 'small' | 'medium' | 'large' | '',
    hasYardFence: false,
    hasOtherDogs: false,
    numberOfDogs: 0,
    willingToTrain: true,
    childrenInHome: false,
    childAges: [] as number[],
  },

  // Dachshund Preferences
  dachshundPreferences: {
    preferredSize: '' as 'miniature' | 'standard' | 'no-preference' | '',
    preferredAge: '' as 'puppy' | 'young-adult' | 'adult' | 'senior' | 'no-preference' | '',
    preferredCoat: [] as ('smooth' | 'wirehaired' | 'longhaired')[],
    preferredTemperament: [] as string[],
    trainingExperience: false,
  },

  createdAt: null as Date | null,
  updatedAt: null as Date | null,
};
