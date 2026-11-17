# Nkube coming soon site

The site uses Parcel, Pico CSS, and Markdown. Its content is in `src/content/home.md`; the level-two headings identify the sections used by the layout. Edit the text beneath each heading to update the page. The fenced code block under `example` supplies both the terminal display and the copy button.

```sh
npm install
npm start
```

Run `npm run build` to generate the static site in `dist/`. The project and its commands are still experimental; the terminal is an illustration of the intended workflow, not an installation guide.

## GitHub Pages

In the repository settings under **Pages > Build and deployment**, set the source to **GitHub Actions**. The Pages workflow builds and deploys changes pushed to `main`; it can also be started manually from the Actions tab. The default site URL is `https://nkube-fx.github.io/nkube-site/`.
