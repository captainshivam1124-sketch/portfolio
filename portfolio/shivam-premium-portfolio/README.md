# Shivam Jha — Premium Portfolio

Static HTML/CSS/JavaScript portfolio for Shivam Jha — Junior Frontend Developer & UI/UX Designer.

## Run locally
Open the folder in VS Code and serve it with any static server (for example VS Code Live Server). No Node build or npm install is required for the main portfolio.

## Main production files
- `index.html` — portfolio homepage
- `style.css` — main visual system and responsive layout
- `script.js` — navigation, project showcase, GSAP/ScrollTrigger/Lenis integration, cursor and fallbacks
- `assets/` — profile and resume assets
- `project-pages/` — six connected project pages
- `brief/` — client discovery / project brief form
- `ora-vfx/` — standalone ORA VFX project package
- `archive/` — legacy source retained for reference only

## Netlify
This is a static deployment. No build command is required for the main site.

1. Extract the ZIP.
2. In Netlify, choose **Add new project → Deploy manually**.
3. Drag the `shivam-premium-portfolio` folder into the deploy dropzone.
4. Open the generated `*.netlify.app` URL.
5. For the client brief, enable Netlify Form detection in the site's Forms settings if it is disabled, then redeploy after enabling it.

## Important QA note
The project passed static path/link checks and in-memory runtime tests. Third-party CDN availability and live Netlify form receipt were not directly testable from the build sandbox, so those are the only external verification items that should be checked once on the deployed URL.
