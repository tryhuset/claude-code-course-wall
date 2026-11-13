# Course wall: your first pull request with screenshots

Part of the TRY **Claude Code** course. Everyone gets one card on a shared wall.
You change your card with Claude Code, Claude checks the result in a real browser,
and you open a pull request that includes **before and after screenshots**. We
go through the PRs together at the end.

The point: for frontend work, Claude doesn't have to guess whether the change looks
right. With **Agent Browser** it opens the page, takes a screenshot, looks at it and
fixes what's wrong, then hands the reviewer pictures instead of a wall of CSS diff.

## Before the course

- A GitHub account, with [`gh`](https://cli.github.com/) installed and logged in (`gh auth login`).
- Node.js 20 or newer.
- The Agent Browser CLI: `npm i -g agent-browser && agent-browser install`.
  The Block 2 skill only teaches Claude how to use it; the CLI is a separate install.
  (If it's missing, the `pr-with-screenshots` skill tells Claude to install it.)

> On a locked-down work laptop, check that you can reach github.com and push to a
> personal fork. If not, pair with someone who can.

## The exercise (about 15 minutes)

1. **Fork and clone**

   ```bash
   gh repo fork <ORG>/claude-code-course-wall --clone
   cd claude-code-course-wall
   claude
   ```

2. **Ask Claude to make your card.** Say what you want, in your own words. For example:

   > Create my card on the wall. Use my GitHub username for the folder. Make it look
   > like a 1970s concert poster, with my name and the first thing I'll use Claude Code for.

3. **Ask for screenshots and a PR.**

   > Check it in the browser with Agent Browser, fix anything that looks off, then open
   > a PR with before and after screenshots.

   The repo includes a `pr-with-screenshots` skill, so Claude knows the steps:
   screenshot before, change, screenshot after, *look at it*, fix, commit, PR.

4. **Open the PR in your browser** (`gh pr view --web`) and check that the images show up.

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
```

- `npm run dev` serves the wall at http://localhost:4321 (no dependencies to install).
- Each card is shown in a sandboxed iframe: no scripts, and your CSS can't break
  anyone else's card.
- Merging to `main` publishes the wall to GitHub Pages (`.github/workflows/pages.yml`).

## For instructors

- Create the repo as **public** under the course org, enable Pages
  (Settings → Pages → Source: GitHub Actions), and replace `<ORG>` above.
- Review PRs on the projector at the end of the block: open a few, look at the
  screenshots together, and merge. The wall updates live.
- Nothing blocks a PR automatically. The screenshots are a habit we teach, not a gate.
