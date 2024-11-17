const SHIPPING_ADDRESS_FIELDS = ['address', 'city', 'state', 'zipPostalCode'];

const CAMPAIGN_DETAILS_FIELDS = {
  title: '',
  subtitle: '',
  goal: 0,
  themeColor: {
    light: '',
    dark: '',
    darker: '',
    text: '',
    text2: '',
    gradient: '',
    border: '',
    border2: '',
    xlight: '',
    fill: '',
  },
  coverPhoto: '',
  coverPhotoName: '',
  maintainAspectRatio: false,
  story: '',
};

const ADOPTION_APPLICATION_STEP_TWO_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'state',
  'bypassCode',
];

export { SHIPPING_ADDRESS_FIELDS, CAMPAIGN_DETAILS_FIELDS, ADOPTION_APPLICATION_STEP_TWO_FIELDS };
