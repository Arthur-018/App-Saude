# saude-poa

Expo (React Native) app with web support, using expo-router and Supabase.

## Stack
- Expo ~54 (React Native 0.81, React 19)
- expo-router (file-based routing in `app/`)
- Supabase JS client (`lib/supabase.js`)
- TypeScript + JSX components

## Replit Setup
- Workflow `Start application`: `npx expo start --web --port 5000 --host lan` (serves Metro web on port 5000).
- Deployment: static — builds with `npx expo export -p web`, publishes `dist/`.

## Project Layout
- `app/` — routes (index, login, register, home, profile, consultas)
- `components/` — shared UI (Button, Input)
- `lib/supabase.js` — Supabase client
- `utils/` — helpers
- `assets/` — images & fonts
