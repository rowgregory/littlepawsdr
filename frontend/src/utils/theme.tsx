import DuobleBubbleNight from '../components/assets/double-bubble-dark.png';
import DuobleBubbleDay from '../components/assets/double-bubble.png';
import TrianglesDay from '../components/assets/triangles-day.png';
import TrianglesNight from '../components/assets/triangles-night.png';

export const base = {
  breakpoints: [36, 48, 62, 75, 88, 100].map((n) => n + 'rem'),
};

export const colors = {
  night: {
    colors: {
      primary: '#19647E',
      secondary: '#119DA4',
      tertiary: '#4B3F72',
      quaternary: '#FFC857',
      quinary: '#1F2041',
      senary: '#2c3748',
      // primary: '#77b300',
      // secondary: '#26a9df',
      red: '#ff1818',
      // orange: '#FE8B02',
      // yellow: '#fee440',
      // yellow02: '#feea91',
      // green: '#384929',
      // green02: '#BEF992',
      // green03: '#a5fe91',
      green04: '#3ea308',
      // green05: '#5b7507',
      // green06: '#3ea308',
      // blue: '#294849',
      // blue02: '#5FB9B0',
      // blue03: '#5FB9B0',
      // blue04: '#40A4FF',
      // blue05: '#072475',
      // blue06: '#617BE3',
      purple01: '#1F2041',
      // purple02: '#413D65',
      // purple03: '#2B1F31',
      // purple04: '#91a4fe',
      // purple05: '#A117F2',
      // pink: '#f15bb5',
      // pink02: '#750724',
      // brown: '#493a29',
      // brown02: '#DF5D26',
      // tan: '#293349',
      // whiteSmoke: '',
      // grey: '#373b44',
      // grey02: '',
      // grey03: '',
      // grey04: '',
    },
  },
  day: {
    colors: {
      primary: '#59344F',
      secondary: '#857E7B',
      tertiary: '#8BBF9F',
      quaternary: '#8BBF9F',
      quinary: '#F5E0B7',
      senary: '#9a82b1',
      // primary: '#9a82b1',
      // secondary: '#22c2b7',
      red: '#ff0011',
      // orange: '#e1732f',
      // yellow: '#9a82b1',
      // yellow02: '#cce616',
      // yellow03: '#fded58',
      // green: '#60caa7',
      // green02: '#7cc221',
      // green03: '#64af79',
      green04: '#267e76',
      // green05: '',
      // green06: '#078d3b',
      // blue: '#3a4c59',
      // blue02: '#22c2b7',
      // blue03: '#405a79',
      // blue04: '#075b75',
      // blue05: '',
      // blue06: '#1C6DD0',
      purple01: '#b98bbf',
      // purple02: '#593a4c',
      // purple03: '#6621c2',
      // purple04: '#b282e5',
      // purple05: '#a8b9f1',
      // pink: '#dd3e76',
      // brown: '#594739',
      // brown02: '',
      // tan: '#bfb596',
      // whiteSmoke: '#efeef1',
      // grey: '#ededed',
      // grey02: '#646160',
      // grey03: '#5d6561',
      // grey04: '#4c5250',
    },
  },
};

export const themes = {
  light: {
    ...base,
    ...colors.day,
    mode: 'day',
    adminNav: {
      bg: '#231332',
    },
    bg: '#fff',
    // bg: '#f6f6f6',
    border: '#d8dee3',
    secondaryBg: '#f6f8fa',
    tertiary: '#e4dbee',
    input: {
      bg: '#fafbfc',
      // bg: '#eaedf2',
      border: '#e0e5ea',
    },
    text: '#383a42',
    text2: '#253746',
    inverseText: '#fff',
    inverse: '#111',
    white: '#fff',
    black: '#000',
    separator: '#ededed',
    header: {
      // bg: '#3f505d',
      bg: '#3a2949',
      // bg: '#004f69',
      // bg: '#268fb4',
      // bg: '#fff',
      button: '#fff',
      subNav: {
        bg: '#3a2949',
        linkText: '#fff',
      },
      link: {
        bg: '#9a82b1',
        text: '#fff',
        hoverText: '#9a82b1',
        avatarHover: '#22c2b7',
        avatarbg: '#1c1028',
        avatarText: '#333',
        underline: '#9a82b1',
        dropDown: {
          bg: '#fff',
          active: '#2f114b',
          text: '#333',
          hoverText: '#fff',
        },
      },
      cartItemAmount: '#22c2b7',
      donationCard: {
        bg: 'transparent',
        border: '#5b338f',
      },
      donationBG: '#1a1122',
      donationBtn: {
        bg: 'transparent',
        text: '#fff',
        border: '#5b338f',
      },
      cart: '#b5bbbf',
      cartHover: '#fff',
    },
    smcontainer: {
      bg: '#22c2b7',
      hoverBg: '#14746d',
    },
    banner: {
      slogan: {
        // bg: colors.day.colors.grey03,
        bg: '#327287',
      },
    },
    card: {
      bg: ' #fff',
      text: '#333',
    },
    pageHeader: '#593a4c',
    footer: {
      border: colors.day.colors.primary,
      links: '#fff',
      donateBtn: {
        bg: colors.day.colors.secondary,
        text: '',
        hover: {
          text: '#fff',
          bg: colors.day.colors.tertiary,
        },
      },
      subscribeBtn: colors.day.colors.primary,
      subFooterBg: colors.day.colors.quaternary,
      bg: colors.day.colors.quinary,
    },
    home: {
      missionText: '#392b4a',
      missionTitle1: '#90e6de',
      missionTitle2: '#72cec6',
      missionTitle3: '#24c2b6',
    },
    formControlInput: {
      text: '#595959',
      boxShadow: '#9a82b1',
      border: '#9a82b1',
    },
    table: {
      even: '#f9fafc',
      odd: '#fff',
    },
    settings: {
      sidebar: {
        border: '#eaedef',
      },
    },
    checkmark: {
      bg: colors.day.colors.green04,
    },
    link: {
      hoverBG: '#f3f4f6',
    },
    dachshundCardBgImg: DuobleBubbleDay,
    eventsBg: TrianglesDay,
    cart: {
      productDetails: {
        price: '#ad5552',
        addToCartBtn: {
          bg: '#228636',
        },
      },
    },
    loading: {
      one: '#eee',
      two: '#ddd',
    },
    overlay: {
      content: '',
      bg: '#3a2949',
    },
    createBtn: {
      bg: colors.day.colors.primary,
    },
  },
  dark: {
    ...base,
    ...colors.night,
    mode: 'night',
    adminNav: {
      bg: '#060709',
    },
    bg: '#0e1117',
    border: '#5f6e7e',
    secondaryBg: '#161b23',
    terciary: '',
    input: {
      bg: '#080a11',
      border: '#2b3138',
    },
    text: '#c3ccd4',
    text2: '#d8e0e7',
    inverseText: '#000',
    inverse: '#fff',
    white: '#fff',
    black: '#000',
    separator: '#101315',
    header: {
      bg: '#0e1117',
      button: colors.night.colors.secondary,
      subNav: {
        bg: '',
        linkText: '#fff',
      },
      link: {
        bg: '#161b23',
        text: '#cfcfcf',
        hoverText: '#161b23',
        avatarHover: '#36b1dc',
        avatarbg: '#84ed71',
        avatarText: '#090d10',
        underline: colors.night.colors.primary,
        dropDown: {
          bg: '#21262c',
          active: '#36b1dc',
          text: '#fff',
        },
      },
      cartItemAmount: '#36b1dc',
      donationCard: {
        bg: '#0e1117',
        border: '#2b3138',
      },
      donationBG: '#090d10',
      donationBtn: {
        bg: 'transparent',
        text: '',
        border: '#2b3138',
      },
      cart: '#a5fe91',
      cartHover: '',
    },
    smcontainer: {
      bg: '#119DA4',
      hoverBg: '#0e6c71',
    },
    banner: {
      slogan: {
        bg: '#161b23',
      },
    },
    card: {
      bg: ' #161b23',
      text: '#a7afb7',
    },
    pageHeader: '#a5fe91',
    footer: {
      border: '#9932cc',
      links: '#76b200',
      donateBtn: {
        bg: '',
        text: '#fff',
        hover: {
          text: '#ccc',
          bg: '#7a29a2',
        },
      },
      subscribeBtn: '',
      subFooterBg: '#0e1117',
      bg: '',
    },
    home: {
      missionText: '#ccc',
      missionTitle1: '#DF00FE',
      missionTitle2: '#BE00FE',
      missionTitle3: '#A117F2',
    },
    formControlInput: {
      text: '#dddddd',
      boxShadow: '#0c2d6b',
      border: '#388bfd',
    },
    table: {
      even: '#0e1117',
      odd: '#080a11',
    },
    settings: {
      sidebar: {
        border: '#21272c',
      },
    },
    checkmark: {
      bg: '#77b300',
    },
    link: {
      hoverBG: '#161b23',
    },
    dachshundCardBgImg: DuobleBubbleNight,
    eventsBg: TrianglesNight,
    cart: {
      productDetails: {
        price: colors.night.colors.red,
        addToCartBtn: {
          bg: colors.night.colors.green04,
        },
      },
    },
    loading: {
      one: '#161b23',
      two: '#10131a',
    },
    overlay: {
      bg: '#161b23',
    },
    createBtn: {
      bg: '#080a11',
    },
  },
} as any;
