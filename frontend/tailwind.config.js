const dataColors = Array.from({ length: 18 }, (_, i) => `bg-data${i + 1}`);
const bgColors = Array.from({ length: 20 }, (_, i) => `bg-bg${i + 1}`);
const bgSourceColors = Array.from({ length: 20 }, (_, i) => `bg-source${i + 1}`);
const textWithBgColors = Array.from({ length: 20 }, (_, i) => `text-bg${i + 1}`);
const minHeights = Array.from({ length: 500 }, (_, i) => `min-h-[${i + 'px'}]`);
const safeList = [...dataColors, ...bgColors, ...textWithBgColors, ...minHeights, ...bgSourceColors];

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: safeList,
  theme: {
    screens: {
      md: '648px',
      lg: '1256px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.25rem',
        lg: '1.25rem',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      white: 'white',
      black: 'black',
      transparent: 'transparent',
      primary1: 'var(--primary1)',
      primary2: 'var(--primary2)',
      primary3: 'var(--primary3)',
      primary4: 'var(--primary4)',
      primary5: 'var(--primary5)',
      bg_canvas: 'var(--bg_canvas)',
      bg1: 'var(--bg1)',
      bg2: 'var(--bg2)',
      bg3: 'var(--bg3)',
      disabled: 'var(--disabled)',
      line: 'var(--line)',
      text1: 'var(--text1)',
      text2: 'var(--text2)',
      text3: 'var(--text3)',
      text1_inverse: 'var(--text1_inverse)',
      hover1: 'var(--hover1)',
      pressed1: 'var(--pressed1)',
      selected1: 'var(--selected1)',
      fail1: 'var(--fail1)',
      fail2: 'var(--fail2)',
      success1: 'var(--success1)',
      success2: 'var(--success2)',
      elevation1: 'var(--elevation1)',
      elevation2: 'var(--elevation2)',
      elevation3: 'var(--elevation3)',
      doc1: 'var(--doc1)',
      doc1bg: 'var(--doc1bg)',
      doc2: 'var(--doc2)',
      doc2bg: 'var(--doc2bg)',
      doc3: 'var(--doc3)',
      doc3bg: 'var(--doc3bg)',
      doc4: 'var(--doc4)',
      doc4bg: 'var(--doc4bg)',
      doc5: 'var(--doc5)',
      doc5bg: 'var(--doc5bg)',
      doc6: 'var(--doc6)',
      doc6bg: 'var(--doc6bg)',
      doc7: 'var(--doc7)',
      doc7bg: 'var(--doc7bg)',
      doc8: 'var(--doc8)',
      doc8bg: 'var(--doc8bg)',
      'elevation-navigation': 'var(--elevation-navigation)',
    },
    keyframes: {
      hide: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideInX: {
        from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        to: { transform: 'translateX(0)' },
      },
      slideInY: {
        from: { transform: 'translateY(calc(100% + var(--viewport-padding)))' },
        to: { transform: 'translateY(0)' },
      },
      swipeToastX: {
        from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
        to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
      },
      swipeToastY: {
        from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
        to: { transform: 'translateY(calc(100% + var(--viewport-padding)))' },
      },
    },
    animation: {
      hide: 'hide 100ms ease-in',
      'slide-in-y': 'slideInY 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-in-x': 'slideInX 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      'swipe-toast-x': 'swipeToastX 100ms east-out',
      'swipe-toast-y': 'swipeToastY 100ms ease-out',
    },
    extend: {
      flexBasis: {
        'calc-full-minus-162': 'calc(100% - 162px)',
      },
      width: {
        'tz-divider': 'calc(100% + 60px)',
      },
      gridTemplateColumns: {
        'request-auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
        'request-auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
        'file-upload-items': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      transitionProperty: {
        'margin-left': 'margin-left',
      },
      backgroundImage: {
        'linear-gradient1': 'linear-gradient(180deg, #2C363F 37.5%, #000 137.5%)',
        'linear-gradient2': 'linear-gradient(180deg, #3F444D 0%, #010101 100%))',
      },
      boxShadow: {
        elevation1: 'var(--elevation1)',
        elevation2: 'var(--elevation2)',
        elevation3: 'var(--elevation3)',
        elevation4: 'var(--elevation4)',
        'elevation-navigation': 'var(--elevation-navigation)',
      },
      dropShadow: {
        card: ['0px 2px 4px rgba(0, 0, 0, 0.08)', '0px 0px 2px rgba(0, 0, 0, 0.08)'],
      },
    },
  },
  plugins: [],
};
