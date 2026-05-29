# Frontend Structure

Current website working area:

```text
site/
  index.html            Home page layout and content.
  customize.html        Customization flow, wrist preview, and questionnaire screens.
  results.html          Recommendation result and order summary page.
  styles.css            Current complete visual system: colors, layout, responsive rules, components.
  app.js                Shared interaction logic, local state, icons, form flow, cart count.
  assets/
    hero-crystal-bracelets.png
    store-cover.png
    crystal-library.png
    bracelet-combinations.png
    wrist-sizing.png
    wrist-sample.jpg
```

Project documents:

```text
docs/
  prd/                 Product requirement documents.
  briefs/              Short project briefs and notes.
  qa/                  Local-only QA screenshots.
  frontend-structure.md
```

Local-only materials:

```text
assets/source/         Original shop and wrist reference images.
archive/snapshots/     Backup snapshots for restoration.
local-references/      Third-party reference material.
research/              Market and competitor references.
tmp/logs/              Local server logs.
```

For frontend changes, start with `site/styles.css` for visual changes, then adjust the three HTML files only when the layout or component structure needs to change. Keep `site/app.js` changes focused on behavior needed by the design.
