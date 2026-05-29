# Frontend Structure

Current redesign working area:

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
  qa-home-desktop.png   Current desktop visual reference.
  qa-home-mobile.png    Current mobile visual reference.
  qa-customize-wrist.png
  qa-results-birth.png
```

Backup snapshot before redesign:

```text
backups/frontend-style-20260529-before-redesign/
```

The backup includes the current HTML, CSS, JS, assets, and QA screenshots. For the next frontend redesign, start with `styles.css` for visual changes, then adjust the three HTML files only when the layout or component structure needs to change. Keep `app.js` changes focused on behavior needed by the new design.
