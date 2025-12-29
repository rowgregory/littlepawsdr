import { Home, Bone, Heart, Gavel, ShoppingBag, DollarSign, Handshake } from 'lucide-react';
import { IAuction } from '../../types/entities/auction';

interface NavigationLink {
  title: string;
  icon: React.ReactNode;
  link?: string;
  links?: Array<{
    linkKey: string;
    linkText: string;
  }>;
}

export interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  user: { _id?: string; firstName?: string; lastName?: string; isAdmin?: boolean } | null;
  auction: { status?: 'DRAFT' | 'ACTIVE' } | null;
  auctionLinkKey: string;
  pathname: string;
}

export const navigationLinks = (auction: IAuction): NavigationLink[] => [
  {
    title: 'Home',
    icon: <Home className='w-4 h-4' />,
    link: '/',
  },
  {
    title: 'Dachshunds',
    icon: <Bone className='w-4 h-4' />,
    links: [
      { linkKey: '/dachshunds', linkText: 'Available' },
      { linkKey: '/dachshunds/hold', linkText: 'Not Available For Adoption Yet' },
      { linkKey: '/dachshunds/surrender', linkText: 'Surrender to Us' },
    ],
  },
  {
    title: 'Adopt',
    icon: <Heart className='w-4 h-4' />,
    links: [
      { linkKey: '/adopt', linkText: 'Application' },
      { linkKey: '/adopt/info', linkText: 'Information' },
      { linkKey: '/adopt/fees', linkText: 'Fees' },
      { linkKey: '/adopt/senior', linkText: 'Adopt a Senior' },
      { linkKey: '/adopt/faq', linkText: 'FAQ' },
    ],
  },
  {
    title: 'Auctions',
    icon: <Gavel className='w-4 h-4' />,
    link: auction?.status === 'ACTIVE' ? `/auctions/${auction?.customAuctionLink}` : '/auctions',
  },
  {
    title: 'Merch & Ecards',
    icon: <ShoppingBag className='w-4 h-4' />,
    link: '/store',
  },
  {
    title: 'Donate',
    icon: <DollarSign className='w-4 h-4' />,
    links: [
      { linkKey: '/donate', linkText: 'One-Time/Monthly' },
      { linkKey: '/donate/welcome-wieners', linkText: 'Welcome Wieners' },
      { linkKey: '/donate/shop-to-help', linkText: 'Shop To Help' },
      { linkKey: '/donate/feed-a-foster', linkText: 'Feed a Foster' },
    ],
  },
  {
    title: 'Volunteer',
    icon: <Handshake className='w-4 h-4' />,
    links: [
      { linkKey: '/volunteer/volunteer-application', linkText: 'Volunteer Application' },
      { linkKey: '/volunteer/foster-application', linkText: 'Foster Application' },
      { linkKey: '/volunteer/transport-application', linkText: 'Transport Application' },
    ],
  },
];
