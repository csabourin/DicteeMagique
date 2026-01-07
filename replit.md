# La Dictée Magique

## Overview
A retro-style French spelling game built with React and TypeScript. The app simulates a vintage "Dictée Magique" (Magic Dictation) device with a VFD-style display and membrane keyboard.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with PostCSS
- **Storage**: IndexedDB (via `idb` library)

## Project Structure
```
src/
├── components/       # React UI components
│   ├── ListManager.tsx
│   ├── MembraneButton.tsx
│   ├── MembraneKeyboard.tsx
│   ├── RetroShell.tsx
│   └── VFDDisplay.tsx
├── hooks/           # Custom React hooks
│   └── useGame.ts
├── lib/             # Utility libraries
│   ├── storage.ts   # IndexedDB storage utilities
│   └── tts.ts       # Text-to-speech utilities
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main application component
├── index.css        # Global styles
└── main.tsx         # Application entry point
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Deployment
Configured as a static site deployment. Build output goes to `dist/` directory.
