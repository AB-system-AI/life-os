# Build and release

## Web

Install Node.js 24+ and npm 11+, then run `npm install`, `npm run build`, and serve `dist/` with a static web host. `npm run preview` serves the bundle locally. No public deployment or release artifacts have been produced. There is no PWA manifest/service worker, CSP/header configuration, or automated deployment config yet.

## Windows desktop

No Tauri configuration, signing, installer, or build has been created. Rust/Cargo are present, but the WebView2 and Windows build prerequisites were not verified.

## Mobile

No Expo project, application icons, native permissions configuration, Android package, or iOS project is present. Android SDK environment variables were not detected; iOS release builds require macOS/Xcode. Do not infer platform readiness from the web app build.
