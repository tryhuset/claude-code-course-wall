---
name: pr-with-screenshots
description: Use when opening a pull request or sharing a change that affects how something looks (a card, a page, CSS, layout). Takes before/after screenshots with Agent Browser, checks them, then opens a GitHub PR with the images, or, without GitHub, writes a local review page with the same content.
---

# A visual change, with before/after screenshots

A reviewer should be able to see a visual change without checking out the branch.
You take the screenshots yourself, look at them, and fix anything that looks wrong
before you hand the change over.

There are two ways to hand it over. Both start with the same steps 0–3.

- **GitHub mode**: `gh` is installed and logged in → open a real pull request (step 4a).
- **Local mode**: no `gh`, not logged in, no GitHub account, or github.com blocked →
  write a local review page (step 4b). This is not a lesser version: same screenshots,
  same check, it just stays on this machine. Tell the participant which mode you're in.

## 0. Check the tools and pick the mode

- `agent-browser --version`. If it fails, install it: `npm i -g agent-browser && agent-browser install`
  (the second command downloads Chrome once). The Agent Browser *skill* from Block 2 is only
  instructions; the CLI must also be installed.
- `gh auth status`. Logged in → GitHub mode. Anything else → local mode. Don't try to fix
  GitHub access in the middle of the exercise.
- `git rev-parse --is-inside-work-tree`. If this isn't a git repo (e.g. it came from the zip),
  run `git init -q && git add -A && git commit -qm "Start"` so the change gets its own commit.
  If `git` itself is missing, skip every git step below; the review page still works.

## 1. Find out who and where

- **Name**: in GitHub mode, the GitHub username (`gh api user --jq .login`). In local mode, ask
  the participant for a short name (lowercase, letters, digits and dashes, e.g. `kari-n`).
- Their folder is `participants/<name>/`. If it doesn't exist yet, copy `participants/_template/`.
- GitHub mode only, the upstream repo the PR goes to:
  `gh repo view --json parent --jq '.parent.owner.login + "/" + .parent.name'`.
  If that's empty, this clone *is* the upstream: `gh repo view --json nameWithOwner --jq .nameWithOwner`.

## 2. Before screenshot (do this BEFORE editing)

Start the dev server in the background: `npm run dev` (http://localhost:4321).
If the card is new, the "before" is the template card: use
`participants/_template/card.html` in the URL below.

```bash
mkdir -p participants/<name>/screenshots
agent-browser open http://localhost:4321/participants/<name>/card.html
agent-browser set viewport 360 240
agent-browser screenshot participants/<name>/screenshots/before.png
```

## 3. Make the change, then look at it

Edit only files in `participants/<name>/`. Then:

```bash
agent-browser open http://localhost:4321/participants/<name>/card.html
agent-browser set viewport 360 240
agent-browser screenshot participants/<name>/screenshots/after.png
```

Read `after.png` and check it against what the participant asked for. Text cut off,
unreadable contrast, overflow outside 360 × 240? Fix and take the screenshot again.
Also open http://localhost:4321/ and check the card looks right on the wall.
Note what you checked and anything you fixed; it goes into the PR or review page.

## 4a. GitHub mode: commit, push, open the PR

```bash
git switch -c card/<name>          # if not already on a branch
git add participants/<name>
git commit -m "Card: <short description>"
git push -u origin HEAD
```

Embed the images using the **commit SHA** (branch links break after merge):

```
https://github.com/<fork-owner>/<repo>/raw/<sha>/participants/<name>/screenshots/before.png
https://github.com/<fork-owner>/<repo>/raw/<sha>/participants/<name>/screenshots/after.png
```

Fill in `.github/pull_request_template.md` with those URLs and open the PR against upstream:

```bash
gh pr create --repo <upstream> --title "Card: <name>" --body-file <filled-in-template>
```

Reply with the PR link and a one-line summary of what the screenshots show.

## 4b. Local mode: write the review page

1. Copy `participants/_template/review.html` to `participants/<name>/review.html` and fill in
   every `{{…}}` placeholder: the name, what changed (one or two sentences), and what you
   checked or fixed after looking at the screenshot. The screenshots are linked by relative
   path, so leave those `<img>` tags as they are.
2. Commit it like a PR would be (skip if there's no git):

   ```bash
   git switch -c card/<name>
   git add participants/<name>
   git commit -m "Card: <short description>"
   ```
3. Open http://localhost:4321/participants/<name>/review.html with Agent Browser, take a
   screenshot of it, and check that both images show up.
4. Tell the participant to open that URL in their own browser. It's what they'll show when
   we review together. `git show --stat` is the "diff" view if anyone asks.

Run `agent-browser close` when done.
