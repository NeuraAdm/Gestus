/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:           '#0E6B96',
          'primary-hover':   '#0A567A',
          'primary-soft':    '#E6F4FA',
          secondary:         '#1D9BD1',
          'secondary-hover': '#157AAB',
          accent:            '#22A35A',
          'accent-hover':    '#1A8247',
          'accent-soft':     '#E8F7EE',
          bg:                '#FFFFFF',
          'bg-alt':          '#F1F7FA',
          'bg-deep':         '#0A4A6B',
          border:            '#C9DDE7',
          text:              '#0F2027',
          'text-sec':        '#4E6570',
          success:           '#22A35A',
          warning:           '#C07800',
          error:             '#C23333',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0E6B96 0%, #1D9BD1 100%)',
        'gradient-navbar':  'linear-gradient(135deg, #0E6B96 0%, #0A4A6B 100%)',
        'gradient-footer':  'linear-gradient(160deg, #0A4A6B 0%, #0E6B96 100%)',
        'gradient-accent':  'linear-gradient(135deg, #22A35A 0%, #1D9BD1 100%)',
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
