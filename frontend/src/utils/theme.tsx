export const base = {
  breakpoints: [36, 48, 62, 75, 88, 100].map((n) => n + 'rem'),
};

export const colors = {
  night: {
    colors: {
      primary: '#179fcd',
      secondary: '#00acb5',
      tertiary: '#4B3F72',
      quaternary: '#1F2041',
      quinary: '#9b4dc8',
      senary: '#2c3748',
      red: '#ff1818',
      yellow: '#f8fe40',
      green04: '#3ea308',
      purple01: '#8688f3',
      pink: '#91a4fe',
    },
  },
  day: {
    colors: {
      primary: '#211e2f',
      secondary: '#22c2b7',
      tertiary: '#2c2a3b',
      quaternary: '#8BBF9F',
      quinary: '#9761aa',
      senary: '#9a82b1',
      red: '#c00',
      yellow: '#ffd811',
      green04: '#267e76',
      purple01: '#b98bbf',
      pink: '#dd3e76',
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
    border: '#d8dee3',
    secondaryBg: '#f7f7f7',
    input: {
      bg: '#fff',
      border: '#e0e5ea',
    },
    text: '#202020',
    text2: '#253746',
    inverseText: '#fff',
    inverse: '#111',
    white: '#fff',
    black: '#000',
    separator: '#ededed',
    header: {
      bg: '#211e2f',
      dropdown: {
        bg: '#E9EEF6',
        textcolor: '#202020',
        linkborder: '#C6CBD0',
        linkcolor: '#447DDA',
        linkbghover: "#D7E2F4",
        btnbg: '#fff',
        btntext: "#222222",
        btnbghover: '#D7E2F4',
        iconcolor: "#444746"
      },
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
        avatarbg: '#e3e6ea',
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
      bg: colors.day.colors.primary,
      text: '#918f98',
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
      bg: '#fff',
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
      bg: '#161b23',
      dropdown: {
        bg: '#282a2c',
        textcolor: '#dddddd',
        linkborder: '#8E918F',
        linkcolor: '#d9d9d9',
        linkbghover: '#31363C',
        btnbg: '#1c1c1c',
        btntext: "#D8D8D8",
        btnbghover: '#37383a',
        iconcolor: '#d9d9d9'
      },
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
        avatarbg: '#3a3b3c',
        avatarText: '#ededed',
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
    pageHeader: colors.night.colors.quaternary,
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
      text: '#918f98',
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
      bg: '#0e1117',
    },
    createBtn: {
      bg: '#080a11',
    },
  },
} as any;
