interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
  online: boolean;
  token: string;
  confirmed: boolean;
  lastLoginTime: string;
  onlineStatus: string;
  theme: string;
  anonymousBidding: boolean;
  firstName: string;
  lastName: string;
  firstNameFirstInitial: string;
  lastNameFirstInitial: string;
  shippingAddress?: ShippingAddress;
}

interface UserStatePayload {
  loading: boolean;
  error: null;
  success: boolean;
  message: string | null;
  users: [];
  newsletterEmails: [];
  user: User | null;
  type: string;
  bids: [];
  auctionDonations: [];
  donations: [];
  instantBuys: [];
  orders: [] | null;
  winningBids: [] | null;
  adoptionApplicationFees: [] | null;
  hasShippingAddress: boolean;
}

export type { User, ShippingAddress, UserStatePayload };
