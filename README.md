# doLauncher website

Website for [doLauncher](https://github.com/helixolle/doLauncher), maintained in this separate repository. No public hosting or deployment is configured.

A static HTML/CSS page with plain feature descriptions and alternating text/screenshot sections. No application JavaScript, theme controls, simulations, animation, storage or analytics. The only links are ordinary navigation/source links.

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

## Screenshots

Ten PNGs are rendered from actual Android Compose components with sample data. They are not ADB/device captures. The page contains eleven figures because the closed Home/folder image is reused for comparison.

| Feature | States shown |
| --- | --- |
| Home | Light and dark themes |
| Floating folders | Closed and open |
| Pull-down search | Empty, `ca`, `camera` |
| Tasks | One and two completed routine tasks |
| Notes | Plain text and Markdown markers |

Tasks uses the real screen and ViewModel backed by an isolated in-memory database, with different completion fixtures. Folder opening is performed through the real UI before capture. Search uses explicit result fixtures, not the installed-app/contact providers. Home is dimmed and displaced behind empty Search and Notes using the app's backdrop rules.

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
- Feature descriptions follow the actual launcher. Task dates are agenda-only, routine resets apply to lists, and step counting is a visible-launcher preview rather than continuous background tracking.
- Tests cover JavaScript-disabled rendering, image loading, desktop alternating/mobile stacked layouts, absence of widgets/scripts, screenshot sequences, unchanged OS-theme behavior and automated accessibility checks.
