---
name: pr-with-screenshots
description: Use when opening a pull request that changes how something looks (a card, a page, CSS, layout). Takes before/after screenshots with Agent Browser, commits them, and opens the PR with the images embedded.
---

# Pull request with before/after screenshots

A reviewer should be able to see a visual change without checking out the branch.
You take the screenshots yourself, look at them, and fix anything that looks wrong
before you open the PR.

## 0. Check the tools

- `agent-browser --version`. If it fails, install it: `npm i -g agent-browser && agent-browser install`
  (the second command downloads Chrome once). The Agent Browser *skill* from Block 2 is only
  instructions; the CLI must also be installed.
- `gh auth status`. If not logged in, stop and ask the participant to run `gh auth login`.

## 1. Find out who and where

- GitHub username: `gh api user --jq .login`. The participant's folder is
  `participants/<username>/`. If it doesn't exist yet, copy `participants/_template/`.
- Upstream repo (the one the PR goes to): `gh repo view --json parent --jq '.parent.owner.login + "/" + .parent.name'`.
  If that's empty, this clone *is* the upstream: use `gh repo view --json nameWithOwner --jq .nameWithOwner`.

## 2. Before screenshot (do this BEFORE editing)

Start the dev server in the background: `npm run dev` (http://localhost:4321).
If the card is new, the "before" is the template card: use
`participants/_template/card.html` in the URL below.

```bash
mkdir -p participants/<username>/screenshots
agent-browser open http://localhost:4321/participants/<username>/card.html
agent-browser set viewport 360 240
agent-browser screenshot participants/<username>/screenshots/before.png
```

## 3. Make the change, then look at it

Edit only files in `participants/<username>/`. Then:

```bash
agent-browser open http://localhost:4321/participants/<username>/card.html
agent-browser set viewport 360 240
agent-browser screenshot participants/<username>/screenshots/after.png
```

Read `after.png` and check it against what the participant asked for. Text cut off,
unreadable contrast, overflow outside 360 × 240? Fix and take the screenshot again.
Also open http://localhost:4321/ and check the card looks right on the wall.
Run `agent-browser close` when done.

## 4. Commit, push, open the PR

```bash
git switch -c card/<username>          # if not already on a branch
git add participants/<username>
git commit -m "Card: <short description>"
git push -u origin HEAD
```

Embed the images using the **commit SHA** (branch links break after merge):

```
https://github.com/<fork-owner>/<repo>/raw/<sha>/participants/<username>/screenshots/before.png
https://github.com/<fork-owner>/<repo>/raw/<sha>/participants/<username>/screenshots/after.png
```

Fill in `.github/pull_request_template.md` with those URLs and open the PR against upstream:

```bash
gh pr create --repo <upstream> --title "Card: <username>" --body-file <filled-in-template>
```

Reply with the PR link and a one-line summary of what the screenshots show.
