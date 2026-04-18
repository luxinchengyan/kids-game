# Technical Notes

- Stack: React + TypeScript, Vite
- Dev commands:
  - npm install
  - npm run dev
  - npm run build
  - npm run preview
- Decisions:
  - Use Web Speech API (SpeechSynthesis) as temporary TTS to avoid shipping audio assets.
  - Persist minimal state (score) in localStorage to keep implementation lightweight.
  - Keep dependencies minimal; add Framer Motion later if animations required.

