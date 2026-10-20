/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFF8F2', ivory: '#F8EFE7', blush: '#F6D9D8', rose: '#C98291',
        peach: '#F3C7B7', lavender: '#DDD5E8', ink: '#4A3532', muted: '#86716F'
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 16px 42px rgba(83, 60, 56, .11), 0 2px 7px rgba(83, 60, 56, .08)',
        float: '0 28px 80px rgba(97, 58, 69, .16)',
      },
    },
  },
  plugins: [],
};
