# Course wall

Practice repo for the TRY Claude Code course. Each participant has one card on a
shared wall and changes it through a pull request.

## Rules

- Only edit files inside `participants/<your-name>/` (your GitHub username, or a short
  name you pick if you don't use GitHub). Never edit another
  participant's folder, `index.html`, `wall.*`, `scripts/` or `.github/` in a card PR.
- A card is `card.html`: plain HTML + CSS, shown at exactly 360 × 240 px. Scripts are
  blocked on the wall (sandboxed iframe), so don't add JavaScript.
- Keep images small (under 300 KB). No external fonts or trackers.

## Verifying visual changes

Any change that affects how something looks must be checked in a real browser before
it's called done. Use Agent Browser (`agent-browser`) against `npm run dev`
(http://localhost:4321). Screenshot the card, look at the screenshot, and fix what's
wrong. Every visual change includes before/after screenshots; see the
`pr-with-screenshots` skill. Without GitHub (no `gh`, not logged in, or github.com
blocked), the same skill writes a local `participants/<name>/review.html` instead of a PR.
Don't try to fix GitHub access mid-exercise; local mode is a full alternative.
