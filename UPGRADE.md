# Theme maintenance

This site uses [al-folio v1.2](https://github.com/alshedivat/al-folio/releases/tag/v1.2),
release commit `b95d6d61a1b0663529094b1b5f4fbe8aa41f8a04` (August 9, 2026).
Its theme runtime is `al_folio_core` 1.0.15. All al-folio plugin versions are pinned
in `Gemfile`, and `Gemfile.lock` records the resolved dependencies.

## What changed in this migration

- Replaced the October 2024 copies of theme layouts, includes, Sass, JavaScript,
  icon fonts, and plugins with the official v1 packages.
- Preserved the biography, publications, profile photograph, teaching files,
  existing content collections, page URLs, and site identity.
- Moved email and social links from `_config.yml` into `_data/socials.yml`.
- Moved the homepage's disabled announcements and latest-posts settings into
  `_pages/about.md`, as required by the new theme.
- Kept four local overrides, all based on the new core theme:
  `_layouts/about.liquid` preserves the "Selected publications" heading;
  `_layouts/bib.liquid` displays volume/issue/pages and uses HTTPS arXiv links.
  `assets/css/main.scss` applies UW Spirit Purple (`#4b2e83`) and the accessible
  dark-mode Accent Lavender (`#c5b4e3`), and keeps the desktop navbar visible
  when the Bootstrap compatibility layer is enabled.
  `_includes/plugins/al_search_assets.liquid` excludes news and projects from the
  search menu; `_config.yml` disables post results with `posts_in_search: false`.
  `.al-folio-overrides.yml` records their reviewed upstream versions and checksums.
- Enabled the official Bootstrap compatibility package for existing page markup.
  This compatibility layer is supported through v1.2 and should be reviewed before
  adopting v1.3.
- Applied the v1.2 theme fixes and plugin updates. Optional email protection,
  interactive notebooks, and right-to-left features keep their upstream defaults.
  Disabled the retired public repository trophies service and replaced the Plotly
  demo's retired Stamen basemap with Carto.
- Removed the inherited Medium and Google Blog demo feeds from `external_sources`.
  The local blog content remains in the repository.
- Updated the deployment workflow to install Node dependencies and ImageMagick.
  Publishing still builds `main` and deploys the generated site to `gh-pages`.

## Build and preview

Use Ruby 3.3, Node 20, ImageMagick, and Python with `nbconvert`, matching the
deployment workflow. Install the Bundler version recorded in `Gemfile.lock`.

```sh
bundle install
npm ci
JEKYLL_ENV=production bundle exec jekyll build
bundle exec jekyll serve
```

The local site is at `http://localhost:4000/`. Its production `baseurl` is empty.
Docker is also supported with `docker compose up --build` on port 8080.

## Apply a future theme update

1. Read the [upstream release notes](https://github.com/alshedivat/al-folio/releases).
2. Work on a branch. Update the exact plugin pins in `Gemfile` to the versions
   recommended by that release, and make any documented `_config.yml` changes.
   Running `bundle update` alone does not change exact version pins.
3. Run `bundle install` and review the resulting `Gemfile.lock` changes.
4. Run the migration and override checks:

   ```sh
   bundle exec al-folio upgrade audit
   bundle exec al-folio upgrade overrides audit
   bundle exec al-folio upgrade report
   ```

5. If an override is stale, compare it with the new upstream file using
   `bundle exec al-folio upgrade overrides diff PATH`. Merge the upstream changes,
   then record that review with `bundle exec al-folio upgrade overrides accept PATH`.
6. Build and inspect the homepage, Research page, teaching page, mobile navigation,
   dark mode, and publication search before publishing.

Keep personal content and site configuration when upgrading; do not replace them
with the template's sample content. The official
[migration documentation](https://github.com/alshedivat/al-folio/blob/v1.2/docs/INSTALL.md#upgrading-from-a-previous-version)
describes the package-based architecture.
