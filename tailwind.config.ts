import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      none: '0px',
      sm: '4px',
      DEFAULT: '4px',
      md: '4px',
      lg: '4px',
      xl: '4px',
      '2xl': '4px',
      '3xl': '4px',
      full: '4px',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1f2937',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

