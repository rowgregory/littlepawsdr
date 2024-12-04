interface FooterLink {
  linkKey: string;
  textKey: string;
}

interface FooterButton {
  linkKey: string;
  textKey: string;
}

interface FooterLocation {
  icon: string;
  textKey: string;
}

interface FooterSection {
  title: string;
  type: 'link' | 'button' | 'location';
  data: FooterLink[] | FooterButton[] | FooterLocation[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Quick Links',
    type: 'link',
    data: [
      {
        linkKey: '/dachshunds',
        textKey: 'Available Dachshunds',
      },
      {
        linkKey: '/adopt',
        textKey: 'Adoption Application',
      },
      {
        linkKey: '/volunteer/volunteer-application',
        textKey: 'Volunteer Application',
      },
      {
        linkKey: '/dachshunds/surrender',
        textKey: 'Surrender',
      },
    ],
  },
  {
    title: 'Support Links',
    type: 'button',
    data: [
      {
        linkKey: 'https://www.privacypolicies.com/live/c37902bc-11cd-430e-a925-2b82ce905c88',
        textKey: 'Privacy Policy',
      },
      {
        linkKey:
          'https://www.termsandconditionsgenerator.com/live.php?token=K9R7fXZjABJKZhIWlXr43oY6qca6jjVn',
        textKey: 'Terms & Conditions',
      },
      {
        linkKey: 'https://oag.ca.gov/privacy/ccpa',
        textKey: 'California Consumer Privacy Act',
      },
      {
        linkKey: '/return-policy',
        textKey: 'Return Policy',
      },
    ],
  },
  {
    title: 'Locations',
    type: 'location',
    data: [
      {
        icon: 'fas fa-map-pin',
        textKey: 'P.O. Box 108, Brookfield, CT 06804',
      },
      {
        icon: 'fas fa-envelope',
        textKey: 'lpdr@littlepawsdr.org',
      },
      {
        icon: 'fas fa-clock',
        textKey: '24/7',
      },
      {
        icon: 'fas fa-dog',
        textKey: 'Rescue with love',
      },
    ],
  },
];

export { footerSections };
