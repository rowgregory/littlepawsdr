import { IAddress } from './address';
import { IBug } from './bug';

export interface YourHome {
  homeType: 'apartment' | 'house' | 'farm' | 'other';
  yardType: 'none' | 'small' | 'medium' | 'large';
  hasYardFence: boolean;
  hasOtherDogs: boolean;
  numberOfDogs: number;
  willingToTrain: boolean;
  childrenInHome: boolean;
  childAges: number[];
}

export interface DachshundPreferences {
  preferredSize: 'miniature' | 'standard' | 'no-preference';
  preferredCoat: ('smooth' | 'wirehaired' | 'longhaired')[];
  preferredAge: 'puppy' | 'young-adult' | 'adult' | 'senior' | 'no-preference';
  preferredTemperament: string[];
  trainingExperience: 'none' | 'basic' | 'advanced';
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  lastLoginTime: string;
  anonymousBidding: boolean;
  firstName: string;
  lastName: string;
  firstNameFirstInitial: string;
  lastNameFirstInitial: string;
  phone?: string;
  preferredContactMethod?: 'email' | 'phone' | 'sms';
  shippingAddress?: IAddress;
  addressRef?: IAddress;
  hasAddress: boolean;
  lastSeenChangelogVersion?: string;
  donations: any[];
  orders: any[];
  bids: any[];
  winningBids: any[];
  jobTitle: string;
  isPublic: boolean;
  workSchedule: 'home' | 'part-time' | 'full-time' | 'retired';
  yourHome?: YourHome;
  dachshundPreferences?: DachshundPreferences;
  profileGradient: string;
  instantBuys: any[];
  adoptionFees: any[];
  bugs: IBug[];
}
