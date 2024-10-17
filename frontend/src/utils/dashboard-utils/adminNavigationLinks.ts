import { AdminNavigationLinkProps } from "../../types/admin-navigation-types";

const adminNavigationLinks = (link: any): AdminNavigationLinkProps['link'][] => [
  {
    active: link.dashboard,
    linkKey: '/admin',
    icon: 'fa-solid fa-gauge-high',
    textKey: 'Dashboard',
  },
  {
    active: link.campaigns,
    linkKey: '/admin/campaigns',
    icon: 'fa-solid fa-gavel',
    textKey: 'Campaigns',
  },
  {
    active: link.orders,
    linkKey: '/admin/customer-orders/orders',
    icon: 'fa-solid fa-cube',
    textKey: 'Orders',
  },
  {
    active: link.oneTimeDonations,
    linkKey: '/admin/one-time-donations',
    icon: 'fa-solid fa-circle-dollar-to-slot',
    textKey: 'Donations',
  },
  {
    active: link.store,
    linkKey: '/admin/store/ecards',
    icon: 'fa-solid fa-store',
    textKey: 'Store',
  },
  {
    active: link.adoptionApplication,
    linkKey: '/admin/adoption-application/fees',
    icon: 'fa-solid fa-hand-holding-dollar',
    textKey: 'Adoption Application',
  },
  {
    active: link.people,
    linkKey: '/admin/contacts/users',
    icon: 'fa-solid fa-people-group',
    textKey: 'Contacts',
  },
  {
    active: link.logout,
    linkKey: null,
    isLogout: true,
    icon: 'fa-solid fa-power-off',
    textKey: 'Logout',
  },
];


export default adminNavigationLinks;
