# doLauncher website

Website for doLauncher, maintained separately from the proprietary Android application.
The Android repository must remain private. Do not copy Android source, signing
material, APKs, AABs or local configuration into this website repository.

A static HTML/CSS page with plain feature descriptions and alternating text/screenshot sections. No application JavaScript, theme controls, simulations, animation, storage or analytics. The public page does not link to the proprietary Android source.

## Google Play availability

The app has not been published yet. The header and footer show an inactive “Google Play — coming soon” notice instead of linking visitors to a missing store listing.

Once Play Console confirms the package and the listing is publicly available, replace those notices with a normal link to:

```text
https://play.google.com/store/apps/details?id=com.dostudio.launcher
```

Also remove “Not yet available on Google Play” and update the availability test. Do not add a purchase price, store badge implying availability, public APK download, or release date before those details are confirmed.

## Run and build

```sh
npm ci
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

```sh
npm run build       # creates dist/
npm run preview     # serves the production site
npx playwright install chromium
npm test            # builds, then tests the production site
```

For an existing browser: `CHROMIUM_PATH=/usr/bin/chromium-browser npm test`.

Deploy `dist/` to a static host. Relative asset paths work under a subdirectory, including GitHub Pages. Vite injects its development reload client in dev mode; the production build has no scripts.

## Privacy policy and GitHub Pages

- Policy source: `PRIVACY_POLICY.md`. Its release snapshot in the private Android
  project must have identical content.
- `npm run build` first renders the policy to `public/privacy/index.html` using
  the dependency-free build-time script, then Vite copies it and its local CSS/fonts
  into `dist/privacy/`. Do not edit the ignored generated HTML.
- Public policy URL: `https://helixolle.github.io/doLauncher-website/privacy/`.
  The owner approved making this website repository public and deploying it on
  25 November 2026. Anonymous HTTPS requests to the policy, CSS and fonts were
  verified to return HTTP 200 and match the tested build. HTTPS is enforced.
- `tests/privacy.spec.ts` checks all policy text, contact details, accessibility,
  mobile layouts, no script/cookie/external request requirements, and project-subdirectory paths.
- `.github/workflows/github-pages.yml` is manually dispatched only. A source push
  alone does not deploy. It builds this repository only and uploads **only `dist/`**.
- Before first publication, the owner must approve making this repository public,
  including its existing Git history and current website assets. Do not change
  the visibility of `helixolle/doLauncher`.
- After approval: push the reviewed website files to `main`, configure Pages with
  GitHub Actions as its source, dispatch **Deploy website to GitHub Pages**, wait
  for success, and verify the exact public policy URL without a signed-in session.
- The page adds no analytics, advertising or tracking. GitHub Pages itself logs
  visitor IP addresses for security; this is disclosed in the policy.
- The policy distinguishes the original build 1 permission prompt from the
  contextual step-counter permission flow introduced in build 2.

## Screenshots

Thirteen PNGs are rendered from actual Android Compose components with sample data. They are not ADB/device captures. The page contains fourteen figures because the closed Home/folder image is reused for comparison.

| Feature | States shown |
| --- | --- |
| Home | Light and dark themes |
| Floating folders | Closed and open |
| Pull-down search | Empty, `ca`, `camera` |
| Tasks | One and two completed routine tasks |
| Task reminders | Notify me off, Notify me on, default snooze settings |
| Notes | Plain text and Markdown markers |

Tasks uses the real screen and ViewModel backed by an isolated in-memory database, with different completion fixtures. Folder opening is performed through the real UI before capture. The reminder editor is the actual Android bottom sheet, composited over Tasks from its dialog window; the settings image uses the actual Notes & tasks screen. Notification permission is granted only in the Robolectric fixture. These are settings screenshots, not captures of a delivered system notification. Search uses explicit result fixtures, not the installed-app/contact providers. Home is dimmed and displaced behind empty Search and Notes using the app's backdrop rules.

The current images follow the `release/play-preparation` launcher code (`com.dostudio.launcher`). `public/branding/doLauncher-icon.png` is an unmodified copy of the app's `branding/doLauncher-play-512.png`; the visible product name remains doLauncher.

Search and Notes include a labeled **illustrative keyboard**, not a captured Android IME or a keyboard supplied by doLauncher. The app viewport is measured above that fixture. Android system bars are omitted. Clock/date and agenda times use capture time; no personal data is read.

Regenerate from the repository root:

```sh
DO_LAUNCHER_WEBSITE_CAPTURES="$PWD/../doLauncher-website/public/screenshots" \
  ./gradlew :app:testDebugUnitTest --tests '*WebsitePreviewCaptureTest' --rerun-tasks --console=plain
```

The capture test is skipped without the environment variable. It draws the actual laid-out views with Robolectric's native Canvas and makes no production app changes or device installations.

To replace an image with a device capture, use a connected test device with sample data:

```sh
adb devices -l
adb -s DEVICE_SERIAL exec-out screencap -p > ../doLauncher-website/public/screenshots/home-light.png
```

Leave the real keyboard open for Search/Notes. Update the captions, alt text and provenance note when replacing illustrated-keyboard renders. Match the current 411×891 crop or update the image dimensions/aspect ratio. Do not change the user's default launcher or expose personal data to obtain screenshots.

## Editing

- Content and image sequences: `index.html`.
- Layout and typography: `src/style.css`. All website text uses self-hosted Geist with sans-serif fallbacks; font licensing is in `public/fonts/OFL.txt`.
- Feature descriptions follow the actual launcher. Agenda dates default to silent; optional per-task notifications provide Done and snooze actions. Snooze defaults to 10 minutes and supports 5/10/15/30/60 minutes. Notification delivery is inexact and subject to permission and battery restrictions. Routine resets apply to lists, and step counting is a visible-launcher preview rather than continuous background tracking.
- Tests cover JavaScript-disabled rendering, image loading, desktop alternating/mobile stacked layouts, absence of widgets/scripts, screenshot sequences, unchanged OS-theme behavior and automated accessibility checks.
