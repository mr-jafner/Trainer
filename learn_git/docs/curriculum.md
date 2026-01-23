# Git Version Control — Curriculum (v0)

This platform is built around three ideas:
1) **Git is a DAG** of commits, and most “Git confusion” is pointer confusion.
2) Most practical work is just **moving changes through states** (working → staging → local → remote).
3) The fastest way to level up is to practice **small, contained disasters** and learn the rescue patterns.

---
## Cohesion rules (read once, use everywhere)

**Preflight mantra (Phase 1 → Phase 2 → Act):**
1) Read the instrument panel: `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`
2) Predict movement with the **State Ledger** (what moves: branch pointer / HEAD / index / working tree / remote)
3) Only then run the command. If unsure, create a safety branch: `git switch -c rescue/<tag>`

Tip: press **`r`** in the app to open the **command reference panel**.

---
---

## Category: Workflows — Working Tree to Remote

### 3) Working directory → staging → local → remote
- Goal: stage mismatch intuition (why something “didn’t get included”).
- Practice:
  - Stage partial hunks: `git add -p`
  - Compare diffs: `git diff` vs `git diff --staged`
  - Use fetch without integrating: `git fetch --prune`

### 4) Branching strategies: when to branch, naming, hygiene
- Goal: choose coordination rules that reduce conflicts and review pain.
- Practice:
  - Create a branch per change-set; delete after merge.

### 5) Merge vs rebase: choose based on consequences
- Goal: pick the history shape intentionally.
- Practice:
  - Make a small divergence and integrate once with merge, once with rebase. Compare logs.

### 6) Rebase flow (and how to survive conflicts)
- Goal: learn the rebase loop + escape hatches.
- Practice:
  - Rebase onto `origin/main`; if conflict: resolve → `git add` → `git rebase --continue`.
  - Bail out once on purpose: `git rebase --abort`.

### 7) Merge conflict resolution (calm, methodical, boring)
- Goal: learn the conflict loop and verify with tests.
- Practice:
  - Create a conflict intentionally in a toy repo, resolve, then run a test/build.

---

## Category: Undo & Collaboration

### 8) Undo toolbox: restore, reset, revert, reflog
- Goal: choose the right undo tool based on *what* you’re undoing and whether it’s shared.
- Practice:
  - “Lose” a commit with `reset --hard`, then recover via `reflog` into a rescue branch.

### 9) Fault trees: “I made a mess”
Includes:
- committed to wrong branch
- need to undo a push
- merge conflict explosion

### 10) Collaboration pattern: PR workflow that stays sane
- Goal: keep PRs small, sync before merge, and treat Git as coordination.
- Practice:
  - Simulate a remote using a bare repo: create branch → push → “review” → merge → cleanup.

---

## Local practice sandbox recipe

Create a safe playground:

```bash
mkdir git-sandbox && cd git-sandbox
git init
echo "hello" > a.txt
git add a.txt
git commit -m "init"
```

Optional “fake remote”:

```bash
cd ..
git clone --bare git-sandbox git-sandbox-remote.git
cd git-sandbox
git remote add origin ../git-sandbox-remote.git
git push -u origin main
```

Now you can practice push/pull/rewrites without harming real work.


---

## Category: State Reading (diagnose before acting)

**Goal:** Build a reflex for reading Git state before running commands.

**Dashboard outputs (always):**
- `git status`
- `git branch -vv`
- `git log --oneline --decorate --graph --all`

**Four questions (always):**
1. Where is **HEAD**?
2. Which **branch pointer** moves if I commit?
3. Is anything **staged**?
4. How does **local compare to remote** (ahead/behind/diverged)?

Includes output-only drills for clean / dirty / staged / ahead / behind / diverged / detached HEAD / mixed state.

---

## Category: Time Intuition (what just moved?)

**Goal:** Turn commands into predictable boundary movements using the **State Ledger**.

**Five boundaries:**
- Branch pointer(s)
- HEAD
- Index (staging)
- Working tree
- Remote refs (origin/*)

Includes ledger rows for `add`, `commit`, `reset` variants, `switch`, `merge`, `rebase`, `fetch`, `push`, plus a “Pause & Predict” habit loop.



## Category: Prediction Drills (Pause → Predict → Act)

- Goal: make every risky Git operation start with inspection + prediction, not vibes.
- Preflight: `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`.
- Then: fill the State Ledger (what boundaries will move?) before merge/rebase/reset/force-push.
- This is embedded into the high-risk modules and fault trees.


---

## Collaboration realism scenarios (new in v0.3)

These scenarios are designed to train *coordination under pressure* (not just commands):

1) **I rebased, but my coworker already pulled**
- Goal: choose the least disruptive recovery (merge-to-reconcile vs coordinated force-push).
- Core tool: communicate + inspect first (`status`, `branch -vv`, `log --graph`).

2) **Reviewer asks for cleaner history / smaller PR**
- Goal: improve reviewability via splitting scope, squash merge, or interactive rebase (policy-dependent).

3) **CI failed after merge to main**
- Goal: restore a green main fast with minimal confusion (revert vs fix-forward, hotfix branch + PR).

---

## PR hygiene mini-module (new in v0.3)

Make review boring (in a good way):
- Keep PR scope coherent.
- Use meaningful commits and messages.
- Write a PR description that includes *what/why/how tested* + risk areas.
- Follow team merge policy (squash/merge/rebase-merge).
- Communicate before rewriting history; if rewriting is allowed, use `--force-with-lease`.

## Parking lot (post‑v1 expansions)

Parked intentionally until after you’ve tested the build and used the material a few times:

- Interactive visualizers / “probe mode”
- Git internals (object DB), hooks, submodules
- Advanced CI/CD coupling
- History archaeology / bisect deep dives
- Teaching/authoring mode for others (instructor notes, cohorts)

## Release notes

- v0.5: Naming/order sweep + explicit parking lot.
