# Zero-2-Hero Code Mastery

> **From zero → hero.**
> One repo. One learning path. Real lessons. Real exercises. No fluff.
> Created and maintained by **Saniul (SANIUL-blackdragon)** — for myself, for anyone who wants to actually learn how to code.

---

## Table of contents

1. [Quick snapshot — what's in this repo right now](#quick-snapshot---whats-in-this-repo-right-now)
2. [Why this repo exists (short)](#why-this-repo-exists-short)
3. [Folder-by-folder (exact current structure + purpose)](#folder-by-folder-exact-current-structure--purpose)
4. [How to view locally (fast) & via GitHub Pages](#how-to-view-locally-fast--via-github-pages)
5. [Linking examples (copy/paste) — precise for this repo](#linking-examples-copypaste---precise-for-this-repo)
6. [How to add lessons, exercises, assets — step-by-step](#how-to-add-lessons-exercises-assets---step-by-step)
7. [Exercise & lesson templates (exact)](#exercise--lesson-templates-exact)
8. [Solutions policy — keep learners honest](#solutions-policy---keep-learners-honest)
9. [File naming & organization rules (recommended)](#file-naming--organization-rules-recommended)
10. [Quick contributor flow (minimal)](#quick-contributor-flow-minimal)
11. [License & contact](#license--contact)
12. [Appendix — useful snippets you can paste now](#appendix---useful-snippets-you-can-paste-now)

---

## Quick snapshot — what's in this repo right now

This README reflects the file listing you provided. Current files and folders (exact):

```
index.html
LICENSE
README.md

ai-ml-neuralnet/
  ai-ml-complete-guide.html
  draft.html
  linear-algebra.html
  phase-1.html
  phase-1.txt
  linear-algebra/1-2.html

c/
  c-programming-complete.html

cpp/
  cpp-complete-guide.html
  html-master-BITEZ.html
  module-1.html

css/
  css-complete-guide.html

html/              (currently empty / ready to be populated)

images/
  indexBanner.webp

js/
  javascript-master-BITEZ.html

py/
  python-mastery-guide.html
```

---

## Why this repo exists (short)

Because the internet is messy. You shouldn't have to hop through ten sites to learn the basics and still not get exercises. This repo stitches together:

* **Lessons** (clear, practical, progressive)
* **Exercises** (multi-level, acceptance criteria)
* **Mini projects** (portfolio-worthy)
* **Capstones** (apply everything)

Short: this is a learning *system*, not a link dump.

---

## Folder-by-folder (exact current structure + purpose)

Use this as your source-of-truth for where to add stuff.

### `index.html`

Your landing page / table of contents. Keep this tidy and updated. Learners should reach everything from here.

### `LICENSE`

Contains the license (custom — non-commercial use only). See the `LICENSE` file in the repo root for full terms.

### `ai-ml-neuralnet/`

Master space for AI / ML / Neural Net material.

* `ai-ml-complete-guide.html` — main AI/ML landing page.
* `linear-algebra.html` + `linear-algebra/1-2.html` — linear algebra lessons.
* `phase-1.*` and `draft.html` — planning + drafts in-progress.

**Recommended additions:**
`ai-ml-neuralnet/exercises/`, `ai-ml-neuralnet/projects/`, and `ai-ml-neuralnet/assets/` for datasets/images.

### `c/`

* `c-programming-complete.html` — C guide. Add `/exercises/` and `/projects/` as you expand.

### `cpp/`

* `cpp-complete-guide.html`, `module-1.html` — C++ lessons.
* **Note:** `html-master-BITEZ.html` looks like it belongs in `/html/`. Consider moving it.

### `css/`

* `css-complete-guide.html` — CSS target page. Add exercises (flexbox/grid projects).

### `html/`

* Empty in listing — this should be your most fleshed-out folder (you said HTML is the most complete). Move `html-master-BITEZ.html` here if it’s HTML material. Populate with `lessons/`, `exercises/`, `projects/`.

### `images/`

* `indexBanner.webp` — store all images here; use descriptive filenames and include `alt` in HTML.

### `js/`

* `javascript-master-BITEZ.html` — JS lessons. Add DOM & mini-project files next to it.

### `py/`

* `python-mastery-guide.html` — Python material. Add notebook-like pages or small runnable examples.

---

## How to view locally (fast) & via GitHub Pages

### Locally (quick)

1. Clone:

```bash
git clone https://github.com/SANIUL-blackdragon/Zero-2-Hero-Code-Mastery.git
cd Zero-2-Hero-Code-Mastery
```

2. Open `index.html` in your browser (double-click or `File → Open`). Chrome recommended.

### Local development (optional, better)

* With Python built-in server:

```bash
python -m http.server 8000
# open http://localhost:8000
```

* Or use VS Code + Live Server for auto-reload.

### GitHub Pages (publish)

1. On GitHub, go to **Settings → Pages**.
2. Select branch: `main` (or `gh-pages`) and folder: `/root` (or `/docs` if you move site files).
3. Save — site becomes available at:

```
https://SANIUL-blackdragon.github.io/Zero-2-Hero-Code-Mastery/
```

Use relative links so pages work locally and on Pages.

---

## Linking examples (copy/paste) — precise for this repo

Use **relative links**. They work locally and on Pages.

### From `index.html` to topic pages

```html
<!-- AI / ML -->
<a href="ai-ml-neuralnet/ai-ml-complete-guide.html">AI / ML — Complete Guide</a>

<!-- Python -->
<a href="py/python-mastery-guide.html">Python — Mastery Guide</a>

<!-- JavaScript -->
<a href="js/javascript-master-BITEZ.html">JavaScript — Master BITEZ</a>

<!-- CSS -->
<a href="css/css-complete-guide.html">CSS — Complete Guide</a>

<!-- C++ -->
<a href="cpp/cpp-complete-guide.html">C++ — Complete Guide</a>

<!-- C -->
<a href="c/c-programming-complete.html">C — Complete Guide</a>
```

### Linking nested pages

If you are in `ai-ml-neuralnet/linear-algebra/1-2.html` and want to go home:

```html
<a href="../../index.html">Home</a>
```

### Link between nearby files

From `ai-ml-neuralnet/linear-algebra.html` to the nested page:

```html
<a href="linear-algebra/1-2.html">Linear Algebra — Part 1-2</a>
```

**Rule of thumb:** prefer relative paths, avoid hard-coded GitHub Pages URLs unless necessary.

---

## How to add lessons, exercises, assets — step-by-step

1. Pick the correct folder (e.g., `html/lessons/`, `ai-ml-neuralnet/exercises/level-1/`).
2. Create a clear filename: `01-intro.html`, `ex-01.md`.
3. Lesson structure: title → summary → objectives → examples → link to exercises.
4. Exercise structure: problem statement → hints → acceptance criteria (see templates below).
5. Add images to `/images` and reference them with `images/filename.ext`.
6. Add an entry to `index.html` so students can find your new lesson.
7. Commit with a clear message: `feat(html): add forms lesson and 3 exercises`.
8. Push and open a PR if you want review.

---

## Exercise & lesson templates (exact — copy/paste)

### Lesson (Markdown / HTML)

````markdown
# Lesson — [Short Title]

**Summary:** One-two lines.

**Learning objectives**
- Objective 1
- Objective 2

**Examples**
```html
<!-- example snippet -->
````

**Try it / Exercises**

* [Exercise 1](../exercises/level-1/ex-01.md)

````

### Exercise (Markdown)
```markdown
# Exercise — [Short title]

**Difficulty:** Beginner | Intermediate | Advanced  
**Topic:** HTML / CSS / JS / Python / C++ / AI-ML

## Task
What to build and which files to create.

## Hints
1. Hint one
2. Hint two

## Acceptance criteria
- Page contains an `<h1>` with the exact text "Hello, Zero-2-Hero!"
- Include at least one `<p>` with three sentences.

## Optional: Expected output
````

Put exercises under `/exercises/level-x/` inside the relevant topic folder.

---

## Solutions policy — keep learners honest

Do **not** include full solutions in the same exercise file.

Options:

* Place solutions in `/solutions/<topic>/ex-01-solution.html`. Keep them out of main learning flow.
* Or use a separate `solutions` branch if you want to hide answers from casual viewers of `main`.

Hints are OK inside exercise files. Full solutions go elsewhere.

---

## File naming & organization rules (recommended)

* Filenames: `kebab-case` (e.g., `01-intro.html`, `ex-01.md`).
* One lesson per file. One exercise per file. One project per folder.
* Keep assets in `/images` and `/data` with descriptive names and include `alt` tags for accessibility.
* Keep index/landing page updated with new content links.

---

## Quick contributor flow (minimal)

1. Fork → `git checkout -b feat/<topic>-<short>` → add content → commit → push.
2. Open Pull Request to `main`. In the PR description list file paths and how to review.
3. Keep PRs small: one lesson + related exercises per PR is ideal.

---

## License & contact

**Full terms:** see the `LICENSE` file in the repo root.

**Key summary (short):**

* This repository uses a custom license authored by **MD. SANIUL ISLAM ALIF** (2025).
* You may **use, copy, modify, merge, publish, distribute, and adapt** the Resources **only for non-commercial purposes**.
* **Commercial use is prohibited** — including selling, sublicensing, or directly monetizing the materials themselves.
* The Resources are provided **"as is"** without warranty.
* By using or contributing, you agree to these terms.

**Contact / contributions:**
MD. Saniul Islam Alif — `mdalifsaniul@gmail.com`
If you want to contribute: submit a pull request or email first if you prefer.

---