/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand tokens, from tlc84-site-reference.md. Named for what they
        // are used for, not their hue, so usage stays readable in JSX.
        cream: '#FFFAF1', // page background
        forest: '#17371A', // primary: buttons, headings, nav
        moss: '#3F7652', // accents, badges, secondary actions
        sage: '#D4E9CF', // section tint backgrounds
        mist: '#E1E7E3', // card fills, borders
        ink: '#052812', // deep green body text on light backgrounds
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Figtree"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -16px rgba(5, 40, 18, 0.25)',
        card: '0 6px 20px -10px rgba(5, 40, 18, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
