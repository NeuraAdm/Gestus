/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:          '#1B6688',
          'primary-hover':  '#14506A',
          'primary-soft':   '#EBF5F9',
          secondary:        '#2C8DBA',
          'secondary-hover':'#226E94',
          accent:           '#378548',
          'accent-hover':   '#2B6A38',
          bg:               '#FFFFFF',
          'bg-alt':         '#F2F7FA',
          border:           '#C5D9E3',
          text:             '#1A2B31',
          'text-sec':       '#536870',
          success:          '#2F7D3B',
          warning:          '#B5740A',
          error:            '#C23434',
        },
      },
      fontFamily: {
        sans: ['"Arial Narrow"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};
