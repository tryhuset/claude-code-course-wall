# Course wall: your first pull request with screenshots

Part of the TRY **Claude Code** course. Everyone gets one card on a shared wall.
You change your card with Claude Code, Claude checks the result in a real browser,
and you hand the change over with **before and after screenshots**: as a pull request
if you have GitHub, or as a local review page if you don't. We go through them
together at the end.

The point: for frontend work, Claude doesn't have to guess whether the change looks
right. With **Agent Browser** it opens the page, takes a screenshot, looks at it and
fixes what's wrong, then hands the reviewer pictures instead of a wall of CSS diff.

## Before the course

- Node.js 20 or newer.
- Recommended: a GitHub account with [`gh`](https://cli.github.com/) installed and logged
  in (`gh auth login`). **Not required**: without it you do the same exercise and end
  with a local review page instead of a PR.
- The Agent Browser CLI: `npm i -g agent-browser && agent-browser install`.
  The Block 2 skill only teaches Claude how to use it; the CLI is a separate install.
  (If it's missing, the `pr-with-screenshots` skill tells Claude to install it.)

## Three ways in

| You have | Get the repo | You end with |
| --- | --- | --- |
| GitHub account + `gh` | `gh repo fork <ORG>/claude-code-course-wall --clone` | a pull request |
| github.com, but no account | `git clone https://github.com/<ORG>/claude-code-course-wall` | a local review page |
| github.com blocked | in Claude Code: `go to try.no/cc/wall and follow the instructions` | a local review page |

## The exercise (about 15 minutes)

1. **Get the repo** (one of the three ways above), then:

   ```bash
   cd claude-code-course-wall
   claude
   ```

2. **Ask Claude to make your card.** Say what you want, in your own words. For example:

   > Create my card on the wall. Make it look like a 1970s concert poster, with my name
   > and the first thing I'll use Claude Code for.

3. **Ask for screenshots and a PR.**

   > Check it in the browser with Agent Browser, fix anything that looks off, then open
   > a PR with before and after screenshots.

   The repo includes a `pr-with-screenshots` skill, so Claude knows the steps:
   screenshot before, change, screenshot after, *look at it*, fix, commit, then hand it
   over. If `gh` isn't logged in, it switches to **local mode** by itself and writes
   `participants/<name>/review.html` instead of opening a PR.

4. **Look at the result yourself.** With GitHub: `gh pr view --web`. Local mode: open
   http://localhost:4321/participants/&lt;name&gt;/review.html. Do the images show what you
   asked for?

5. **Try one more change.** Ask for something visual, like a different colour
   scheme or layout, and watch Claude verify it before updating the PR.

## How the wall works

```
participants/
  _template/card.html          ← copy this to start
  <your-username>/
    card.html                  ← your card: HTML + CSS, 360 × 240 px
    screenshots/before.png     ← taken by Claude
    screenshots/after.png
    review.html                ← local mode only: the "PR" without GitHub
```

- `npm run dev` serves the wall at http://localhost:4321 (no dependencies to install).
- Each card is shown in a sandboxed iframe: no scripts, and your CSS can't break
  anyone else's card.
- Merging to `main` publishes the wall to GitHub Pages (`.github/workflows/pages.yml`).

## For instructors

- Create the repo as **public** under the course org, enable Pages
  (Settings → Pages → Source: GitHub Actions), and replace `<ORG>` above.
- Review on the projector at the end of the block: 2–3 real PRs, plus at least one
  local `review.html` from someone without GitHub, to show it's the same habit. Merge
  the PRs and the wall updates live.
- Keep the zip at `try.no/cc/wall` in sync with this repo (see `agent-site/README.md`
  in the course repo).
- Nothing blocks a PR automatically. The screenshots are a habit we teach, not a gate.
