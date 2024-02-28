/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      laptop: { max: '1450px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      '>3xl': { min: '1920px' },
      '>2xl': { min: '1536px' },
      '>xl': { min: '1280px' },
      '>sm': { min: '640px' },
    },
    extend: {
      spacing: {
        15: '60px',
        25: '100px',
        header: '46px',
        33: '132px',
      },
      colors: {
        primary: '#fe7300',
        'primary-100': '#ffe3cc',
        'primary-500': '#ffb980',
        danger: '#d92b2f',
        success: '#00b400',
        'ent-primary': '#2c7ef8',
        'ent-link': '#0053d1',
      },
      width: {
        68: '272px',
        73.5: '294px',
        76: '304px',
        82: '328px',
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33.333333%',
        '1/2': '50%',
        '3/4': '75%',
      },

      height: {
        header: '46px',
      },
      lineHeight: {
        unset: '0',
      },
      textColor: {
        dark: 'var(--ifm-font-color-base)',
        normal: '#40485b',
        muted: '#8c92a4',
        disabled: '#c9c9c9',
        link: {
          primary: '#2C7EF8', // 默认超链接。页面内此类超链接不宜过多，以免造成视觉焦点混乱。
          secondary: '#2E405E', // 用于不需要突出的超链接
          tertiary: '#909AAA', // 用于附加文本中的超链接，如面包屑、版权栏等。
          hover: '#0053D1',
          'tertiary-hover': '#0053D1',
          active: '#0053D1',
          'tertiary-active': '#0053D1',
        },
      },
      fontFamily: {
        AlimamaShuHeiTi: ['Alimama ShuHeiTi', '-apple-system', 'BlinkMacSystemFont'],
      },
      backgroundColor: {
        dark: 'var(--ifm-background-color)',
        light: '#f8f8f8',
        scroll: '#c1c1c1',
        'scroll-hover': '#999',
        'mobile-header': '#303643',
      },
      borderColor: {
        dark: 'var(--ifm-toc-border-color)',
        normal: '#dce3e8',
        light: '#e3e9ed',
      },
    },
  },
  important: true,
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  variants: {
    extend: {
      undeline: ['active'],
      backgroundColor: ['active'],
    }
  }
};
