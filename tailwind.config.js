/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'retro-orange': '#D35400',
                'retro-dark': '#2C3E50',
                'vfd-bg': '#002010',
                'vfd-on': '#33FF00',
                'vfd-off': '#004400',
            },
            fontFamily: {
                'digital': ['Courier New', 'monospace'], // Fallback for digital
            }
        },
    },
    plugins: [],
}
