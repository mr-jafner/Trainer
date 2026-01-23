// ============================================================
// CURRICULUM DATA — Git Version Control (v0)
// Focus: mental models, practical workflows, and rescue patterns
// Skip: deep internals, server-side hooks, submodules
// ============================================================

export const curriculum = {
  // ------------------------------------------------------------
  // CATEGORY 1: Foundations (DAG + pointers)
  // ------------------------------------------------------------
  foundations: {
    id: 'foundations',
    title: 'Foundations: The DAG & Pointers',
    description: 'Make the invisible graph visible (commits, branches, HEAD)',
    color: '#10b981', // emerald
    icon: '🧠',
    modules: [
      {
        id: 'dag-01',
        title: 'Git is a DAG (and branches are just labels)',
        type: 'conceptmap',
        why: "When Git feels like magic, it's usually because you can't see the graph. This mental model lets you predict what merge/rebase/reset will do before you do it.",
        pitfalls: [
          "Thinking a branch is a folder of files — it's just a name pointing at a commit",
          "Assuming commits are mutable — Git makes *new* commits; it doesn't edit old ones",
          "Confusing your local branch with origin/<branch> — they're separate pointers"
        ],
        content: {
          central: 'DAG mental model',
          description: 'Commits form a directed acyclic graph; names (branches/tags) point into it.',
          branches: [
            {
              id: 'commits',
              label: 'Commits (nodes)',
              color: '#22c55e',
              details: 'A commit is a snapshot + metadata + parent pointer(s). Parents create history; multiple parents create merge commits.',
              example: 'Try: git log --oneline --graph --decorate --all',
              children: ['Snapshot of files', 'Parents (history links)', 'Commit IDs are content-addressed']
            },
            {
              id: 'branches',
              label: 'Branches (labels)',
              color: '#3b82f6',
              details: 'A branch name is a movable pointer to a commit. New commits move the current branch forward.',
              example: 'Try: git show-ref --heads',
              children: ['main, feature/x, bugfix/y', 'Move when you commit', 'Cheap to create/delete']
            },
            {
              id: 'head',
              label: 'HEAD (you-are-here)',
              color: '#f59e0b',
              details: 'HEAD usually points to a branch name (symbolic ref). Detached HEAD points directly to a commit.',
              example: 'Try: cat .git/HEAD (don’t edit it)',
              children: ['Symbolic HEAD → refs/heads/main', 'Detached HEAD → commit', 'Switch/checkout moves HEAD']
            },
            {
              id: 'remotes',
              label: 'Remotes (tracking pointers)',
              color: '#a855f7',
              details: 'origin/main is your last fetched view of the remote branch. Fetch updates tracking refs; it does not change your working tree.',
              example: 'Try: git fetch --prune && git log --oneline --decorate --all --graph',
              children: ['origin/* updated by fetch', 'local branches updated by commit/reset', 'push moves remote (if allowed)']
            }
          ]
        }
      },
      {
        id: 'dag-02',
        title: 'What changes when you commit, switch, and detach HEAD',
        type: 'dataflow',
        why: "Most Git panic comes from not knowing which pointer moved. This flow makes it predictable: commit moves a branch; switch moves HEAD; rebase rewrites commits.",
        pitfalls: [
          "Committing in detached HEAD — you created commits that no branch points to (easy to lose, but reflog can rescue)",
          "Switching branches with uncommitted changes — can cause conflicts or accidental carry-over",
          "Assuming switch changes the remote — it only changes your local pointers + working tree"
        ],
        content: {
          description: 'Pointer moves: HEAD, current branch, and the DAG',
          nodes: [
            { id: 'wd', label: 'Working tree', type: 'boundary', x: 80, y: 140 },
            { id: 'index', label: 'Index (staging)', type: 'process', x: 250, y: 140 },
            { id: 'commit', label: 'Commit object', type: 'process', x: 430, y: 140 },
            { id: 'branch', label: 'Current branch ref', type: 'flow', x: 610, y: 140 },
            { id: 'head', label: 'HEAD', type: 'flow', x: 610, y: 250 },
            { id: 'switch', label: 'git switch', type: 'process', x: 430, y: 250 },
          ],
          edges: [
            { from: 'wd', to: 'index' },
            { from: 'index', to: 'commit' },
            { from: 'commit', to: 'branch' },
            { from: 'head', to: 'switch' },
            { from: 'switch', to: 'head' },
          ],
          reveals: {
            wd: 'You edit files here. Git sees changes as “working tree differs from HEAD”.',
            index: 'git add copies selected changes into the index (staging area).',
            commit: 'git commit creates a new commit from the index, with parent = current commit.',
            branch: 'After a commit, the current branch name moves to the new commit (it “advances”).',
            head: 'HEAD points at the current branch name (normally). Detached HEAD means HEAD points directly at a commit.',
            switch: 'git switch changes which branch HEAD points to and updates the working tree to match.'
          }
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 2: Workflows (local↔remote, branching, integrate)
  // ------------------------------------------------------------
  
  // ------------------------------------------------------------
  // CATEGORY 2: State Reading (diagnose before acting)
  // ------------------------------------------------------------
  stateReading: {
    id: 'state-reading',
    title: 'State Reading: Diagnose Before You Act',
    description: 'Learn to read Git’s “instrument panel” before touching the controls',
    color: '#a855f7', // purple
    icon: '🧭',
    modules: [
      {
        id: 'sr-01',
        title: 'The 3 outputs + 4 questions (your Git dashboard)',
        type: 'conceptmap',
        why: "Most Git messes start with a state misread. This module makes “where am I?” a reflex.",
        pitfalls: [
          "Typing commands to “see what happens” instead of reading state",
          "Assuming HEAD and the current branch are the same thing (detached HEAD surprise)",
          "Fixing before you’ve identified whether you’re staged / ahead / behind / diverged"
        ],
        content: {
          root: 'Read state first',
          branches: [
            {
              label: 'Your dashboard: 3 commands',
              details: 'These three outputs are enough to diagnose most situations.',
              children: [
                '`git status` → working tree + staging + ahead/behind summary',
                '`git branch -vv` → current branch + upstream tracking',
                '`git log --oneline --decorate --graph --all` → DAG + pointers (HEAD, branches, origin/*)'
              ]
            },
            {
              label: 'The four questions (always answer these)',
              details: 'If you can answer these, you’re allowed to act.',
              children: [
                '1) Where is **HEAD**?',
                '2) Which **branch pointer** will move if I commit?',
                '3) Is anything **staged**?',
                '4) How does **local compare to remote** (ahead/behind/diverged)?'
              ]
            },
            {
              label: 'Mini-invariants (Git laws)',
              details: 'Stability anchors when you’re stressed.',
              children: [
                'Branches are movable labels; commits are immutable snapshots.',
                'Most “lost work” is lost references, not lost data (reflog).',
                'Fetch is knowledge; push is social; pull is both (integration risk).'
              ]
            }
          ]
        }
      },
      {
        id: 'sr-02',
        title: 'State reading drills (output-only pattern recognition)',
        type: 'conceptmap',
        why: "Real skill is recognizing the situation before you type a fix. These drills are pure diagnosis.",
        content: {
          root: 'Given output → answer 4 questions',
          branches: [
            {
              label: 'Drill 1: Clean & aligned',
              details: '**Goal:** identify the baseline “boring is good” state.',
              example: '`status`: clean · `branch -vv`: [origin/main] · `log`: (HEAD -> main, origin/main)',
              children: [
                'HEAD → main',
                'Commit moves → main',
                'Staged? → no',
                'Local vs remote → aligned'
              ]
            },
            {
              label: 'Drill 2: Dirty working tree (not staged)',
              details: 'Changes exist only in the working directory.',
              example: '`status`: Changes not staged for commit',
              children: [
                'HEAD → current branch',
                'Commit moves → current branch (but would commit nothing unless staged/`-a`)',
                'Staged? → no',
                'Risk → switching branches may conflict'
              ]
            },
            {
              label: 'Drill 3: Staged but not committed',
              details: 'Index contains intent; commit will consume it.',
              example: '`status`: Changes to be committed',
              children: [
                'HEAD → current branch',
                'Commit moves → current branch',
                'Staged? → yes',
                'Working tree unchanged by commit'
              ]
            },
            {
              label: 'Drill 4: Ahead of remote',
              details: 'Commits exist locally only (laptop risk).',
              example: '`status`: ahead of origin/main by N commits',
              children: [
                'HEAD → local branch',
                'Commit moves → local branch',
                'Staged? → depends',
                'Local vs remote → ahead'
              ]
            },
            {
              label: 'Drill 5: Behind remote',
              details: 'Your local history view is stale; integrate before pushing.',
              example: '`status`: behind origin/main by N commits',
              children: [
                'HEAD → local branch',
                'Commit moves → local branch',
                'Staged? → depends',
                'Local vs remote → behind (don’t force-push blindly)'
              ]
            },
            {
              label: 'Drill 6: Diverged',
              details: 'Both sides have commits; you must integrate (merge or rebase).',
              example: '`branch -vv`: [origin/main: ahead X, behind Y]',
              children: [
                'HEAD → local branch',
                'Local vs remote → diverged',
                'Next safe step → `git fetch` + inspect graph',
                'Integration choice → merge vs rebase (team policy)'
              ]
            },
            {
              label: 'Drill 7: Detached HEAD',
              details: 'HEAD points to a commit, not a branch. New commits risk becoming unreachable.',
              example: '`status`: HEAD detached at <sha>',
              children: [
                'HEAD → commit (detached)',
                'Commit moves → nothing (unless you create a branch)',
                'Staged? → depends',
                'Rescue move → `git switch -c rescued-work`'
              ]
            },
            {
              label: 'Drill 8: Mixed state chaos',
              details: 'Staged + unstaged + behind is three problems. Don’t “pull and pray.”',
              example: '`status`: staged + unstaged + behind by 1',
              children: [
                'Count problems → 3',
                'First decision → what to do with local changes (stash/commit)',
                'Only then → integrate remote changes',
                'Then → continue feature work'
              ]
            }
          ]
        }
      }
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 3: Time Intuition (what moved?)
  // ------------------------------------------------------------
  timeIntuition: {
    id: 'time-intuition',
    title: 'Time Intuition: What Just Moved?',
    description: 'Turn Git commands into predictable boundary movements',
    color: '#f59e0b', // amber
    icon: '⏱️',
    modules: [
      {
        id: 'ti-01',
        title: 'The State Ledger (5 boundaries)',
        type: 'conceptmap',
        why: "If you can name what moved, Git stops feeling magical and starts feeling causal.",
        content: {
          root: 'Track boundary movement',
          branches: [
            {
              label: 'The 5 boundaries',
              details: 'We track only what matters for prediction.',
              children: [
                'Branch pointer(s)',
                'HEAD',
                'Index (staging)',
                'Working tree',
                'Remote refs (origin/*)'
              ]
            },
            {
              label: 'Ledger row format',
              details: 'For each command: mark ✔ (moves), ✘ (unchanged), ⚠ (depends).',
              children: [
                '`Command | Branch | HEAD | Index | Working | Remote`',
                '“Push is social”: remote moves, local doesn’t.',
                '“Fetch is knowledge”: remote-tracking updates, workspace doesn’t.'
              ]
            }
          ]
        }
      },
      {
        id: 'ti-02',
        title: 'Command ledger: the small set you actually need',
        type: 'conceptmap',
        why: "Most workflows and rescues reduce to these rows. Memorize movement, not syntax.",
        content: {
          root: 'Ledger rows',
          branches: [
            { label: '`git add`', details: '✘ branch · ✘ HEAD · ✔ index · ✘ working · ✘ remote', children: ['Moves intent into staging.'] },
            { label: '`git commit`', details: '✔ branch · ✔ HEAD · ✔ index · ✘ working · ✘ remote', children: ['Creates new commit; consumes staging.'] },
            { label: '`git reset --soft`', details: '✔ branch · ✔ HEAD · ✘ index · ✘ working · ✘ remote', children: ['Uncommit, keep staged.'] },
            { label: '`git reset --mixed`', details: '✔ branch · ✔ HEAD · ✔ index · ✘ working · ✘ remote', children: ['Uncommit + unstage, keep edits.'] },
            { label: '`git reset --hard`', details: '✔ branch · ✔ HEAD · ✔ index · ✔ working · ✘ remote', children: ['Rewrite workspace; reflog is your seatbelt.'] },
            { label: '`git switch`', details: '✘ branch · ✔ HEAD · ✔ index · ✔ working · ✘ remote', children: ['Changes viewpoint; workspace updates to match.'] },
            { label: '`git merge`', details: '✔ branch · ✔ HEAD · ✔ index · ✔ working · ✘ remote', children: ['Integrates histories; may conflict.'] },
            { label: '`git rebase`', details: '✔ branch · ✔ HEAD · ⚠ index · ⚠ working · ✘ remote', children: ['Rewrites commits; conflicts replay.'] },
            { label: '`git fetch`', details: '✘ branch · ✘ HEAD · ✘ index · ✘ working · ✔ remote-tracking', children: ['Updates knowledge safely.'] },
            { label: '`git push`', details: '✘ branch · ✘ HEAD · ✘ index · ✘ working · ✔ remote', children: ['Advances remote pointer; crosses social boundary.'] }
          ]
        }
      },
      {
        id: 'ti-03',
        title: 'Pause & Predict (the anti-panic loop)',
        type: 'conceptmap',
        why: "Prediction reduces mess-making. This becomes a required step before risky commands.",
        content: {
          root: 'Before you run a risky command…',
          branches: [
            {
              label: 'Step 1: Read state',
              details: 'Use the dashboard (Phase 1).',
              children: ['status', 'branch -vv', 'log graph']
            },
            {
              label: 'Step 2: Fill the ledger row',
              details: 'Mark what boundaries you expect to move.',
              children: ['branch', 'HEAD', 'index', 'working', 'remote']
            },
            {
              label: 'Step 3: Name the risk',
              details: 'What could be lost or surprise a collaborator?',
              children: ['Uncommitted edits', 'Unpushed commits', 'Shared history', 'Force-push']
            }
          ]
        }
      }
    ]
  },
workflows: {
    id: 'workflows',
    title: 'Workflows: From Working Tree to Remote',
    description: 'Flow mental models, branching strategies, merge vs rebase',
    color: '#3b82f6', // blue
    icon: '🧰',
    modules: [
      {
        id: 'pred-01',
        title: 'Prediction drills: Pause → Predict → Act',
        type: 'conceptmap',
        why: "This is the habit that prevents messes: predict boundary movement before you type anything scary.",
        content: {
          root: 'The Pause→Predict loop',
          branches: [
            { label: 'Pause', details: 'Run the dashboard commands first.', children: ['git status', 'git branch -vv', 'git log --oneline --decorate --graph --all'] },
            { label: 'Predict', details: 'Fill a ledger row: what moves?', children: ['Branch pointer?', 'HEAD?', 'Index?', 'Working tree?', 'Remote?'] },
            { label: 'Act', details: 'Only then run the command — and compare outcome to prediction.', children: ['If wrong → stop and re-read state', 'If conflict → resolve + continue/abort'] }
          ]
        }
      },

      {
        id: 'flow-01',
        title: 'Working directory → staging → local → remote',
        type: 'dataflow',
        why: "When something “didn’t get included” (or got included by accident), it’s almost always a stage-mismatch problem. This model makes that failure mode obvious.",
        pitfalls: [
          "Thinking git add “saves” work — it only stages (you still need commit)",
          "Thinking commit shares work — it only updates your local repo (you still need push)",
          "Pulling when you really meant fetch — pull also integrates and can create conflicts"
        ],
        content: {
          description: 'How changes move through Git’s common states',
          nodes: [
            { id: 'edit', label: 'Edit files', type: 'boundary', x: 70, y: 160 },
            { id: 'stage', label: 'Stage (git add)', type: 'process', x: 240, y: 160 },
            { id: 'commit', label: 'Commit (git commit)', type: 'process', x: 410, y: 160 },
            { id: 'fetch', label: 'Fetch (git fetch)', type: 'process', x: 410, y: 270 },
            { id: 'integrate', label: 'Integrate (merge/rebase)', type: 'process', x: 580, y: 270 },
            { id: 'push', label: 'Push (git push)', type: 'process', x: 580, y: 160 },
            { id: 'remote', label: 'Remote (origin)', type: 'boundary', x: 760, y: 160 },
          ],
          edges: [
            { from: 'edit', to: 'stage' },
            { from: 'stage', to: 'commit' },
            { from: 'commit', to: 'push' },
            { from: 'push', to: 'remote' },
            { from: 'remote', to: 'fetch' },
            { from: 'fetch', to: 'integrate' },
            { from: 'integrate', to: 'commit' },
          ],
          reveals: {
            edit: 'Exercise: make a small change in a scratch repo. Run git status often.',
            stage: 'Exercise: stage only part of a file (git add -p) and see what “staged” means.',
            commit: 'Exercise: make 2 commits that each do one thing. Read them with git show.',
            fetch: 'Exercise: fetch and compare main vs origin/main. Nothing in your working tree changes.',
            integrate: 'Exercise: create a tiny divergence and resolve via merge OR rebase. Observe the log graph.',
            push: 'Exercise: push a feature branch to origin and open a PR (or simulate with a bare repo).',
            remote: 'Remote is just another repo. origin/* is your local view of it.'
          }
        }
      },
      {
        id: 'branching-01',
        title: 'Branching strategies: when to branch, naming, and hygiene',
        type: 'conceptmap',
        why: "A branch strategy is just a coordination protocol. A good one reduces conflicts, review pain, and “who changed this?” archaeology.",
        pitfalls: [
          "Long-lived feature branches — drift + conflicts grow nonlinearly",
          "Meaningless names (test123) — future-you becomes a detective",
          "Treating main like a personal workspace — breaks teammate expectations"
        ],
        content: {
          central: 'Branching strategy',
          description: 'Choose rules that fit your team’s cadence and risk tolerance.',
          branches: [
            {
              id: 'when',
              label: 'When to branch',
              color: '#22c55e',
              details: 'Branch when work is not yet shippable, when it needs review, or when you need to isolate experiments.',
              example: 'Rule: one logical change-set per branch/PR.',
              children: ['Feature work', 'Bug fix', 'Experiment/spike', 'Release hotfix']
            },
            {
              id: 'naming',
              label: 'Naming conventions',
              color: '#3b82f6',
              details: 'Names should encode intent + scope. Keep them short but informative.',
              example: 'feature/login-timeout, bugfix/actuator-jitter, chore/deps-bump',
              children: ['prefix/type', 'ticket or noun', 'avoid spaces', 'lowercase + dashes']
            },
            {
              id: 'sync',
              label: 'Keeping branches healthy',
              color: '#f59e0b',
              details: 'Rebase/merge regularly onto updated main to reduce conflict bursts.',
              example: 'Daily: git fetch; git rebase origin/main (for unshared branches).',
              children: ['small PRs', 'delete after merge', 'avoid “mega-branches”']
            },
            {
              id: 'shared',
              label: 'Shared branches',
              color: '#a855f7',
              details: 'If multiple people work on a branch, avoid history-rewriting unless you coordinate explicitly.',
              example: 'Shared branch? Prefer merge commits or “rebase + force-with-lease” with coordination.',
              children: ['team integration branch', 'release branch', 'avoid surprise force-pushes']
            }
          ]
        }
      },
      {
        id: 'integrate-01',
        title: 'Merge vs rebase: choose based on consequences',
        type: 'conceptmap',
        why: "Merge and rebase both combine work, but they tell different stories and have different failure modes. Knowing the tradeoffs prevents the classic “why did my commits vanish?” panic.",
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          "Rebasing a branch others pulled — their history diverges and gets messy",
          "Merging constantly into a local feature branch — creates noisy history (sometimes fine!)",
          "Confusing “clean history” with “useful history” — pick the story your team needs"
        ],
        content: {
          central: 'Integrating changes',
          description: 'Same goal (combine work), different history shapes. Start by reading state (status/branch/log), then choose the history shape.',
          branches: [
            {
              id: 'merge',
              label: 'Merge',
              color: '#22c55e',
              details: 'Preserves history as it happened; may create a merge commit with two parents.',
              example: 'git merge main  (from your feature branch)',
              children: ['Keeps branch topology', 'Safe for shared branches', 'May add merge commits']
            },
            {
              id: 'rebase',
              label: 'Rebase',
              color: '#3b82f6',
              details: 'Replays commits onto a new base; rewrites commit IDs for the rebased commits.',
              example: 'git rebase origin/main',
              children: ['Linearizes history', 'Great for local work', 'Can be confusing when shared']
            },
            {
              id: 'rules',
              label: 'Rules of thumb',
              color: '#f59e0b',
              details: 'Default: rebase your local work before opening a PR; merge when integrating shared/approved work.',
              example: 'Local? Rebase. Shared? Merge or coordinate.',
              children: ['use --force-with-lease if rewriting remote', 'prefer squash merge for small PRs']
            }
          ]
        }
      },
      {
        id: 'integrate-02',
        title: 'Rebase flow (and how to survive conflicts)',
        type: 'dataflow',
        why: "Rebase feels scary because it’s interactive history surgery. This flow turns it into a checklist with escape hatches.",
        pitfalls: [
          "Rebasing without a clean working tree — stash or commit first",
          "Panic-editing during conflicts — follow the loop: resolve → add → continue",
          "Force-pushing without --force-with-lease — you can overwrite teammate work"
        ],
        content: {
          description: 'A predictable rebase loop: replay → resolve → continue',
          nodes: [
            { id: 'prep', label: 'Prep: status clean', type: 'process', x: 90, y: 170 },
            { id: 'fetch', label: 'Fetch upstream', type: 'process', x: 250, y: 170 },
            { id: 'rebase', label: 'Rebase', type: 'process', x: 410, y: 170 },
            { id: 'conflict', label: 'Conflict?', type: 'process', x: 570, y: 170 },
            { id: 'resolve', label: 'Resolve + add', type: 'process', x: 570, y: 270 },
            { id: 'continue', label: 'Continue', type: 'process', x: 730, y: 270 },
            { id: 'done', label: 'Done (push/PR)', type: 'boundary', x: 730, y: 170 },
          ],
          edges: [
            { from: 'prep', to: 'fetch' },
            { from: 'fetch', to: 'rebase' },
            { from: 'rebase', to: 'conflict' },
            { from: 'conflict', to: 'done' },
            { from: 'conflict', to: 'resolve' },
            { from: 'resolve', to: 'continue' },
            { from: 'continue', to: 'rebase' },
          ],
          reveals: {
            prep: 'Checklist: git status (clean), stash/commit if not clean.',
            fetch: 'git fetch --prune (updates origin/*).',
            rebase: 'git rebase origin/main (replays your commits onto the updated base).',
            conflict: 'If no conflicts, you’re done. If conflicts, Git pauses mid-replay.',
            resolve: 'Fix files, then: git add <resolved-files>. Use git status as your guide.',
            continue: 'git rebase --continue. To bail out: git rebase --abort.',
            done: 'If your branch is published and you rebased: git push --force-with-lease.'
          }
        }
      },
      {
        id: 'conflicts-01',
        title: 'Merge conflict resolution (calm, methodical, boring)',
        type: 'dataflow',
        why: "Conflicts are just Git saying: “I can’t safely guess your intent.” A steady process makes them predictable instead of traumatic.",
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          "Resolving the wrong side — always re-run tests and re-check the diff",
          "Forgetting to stage after resolving — Git won’t proceed until you add",
          "Trying to resolve huge conflicts at once — reduce scope by syncing earlier and making smaller PRs"
        ],
        content: {
          description: 'Conflict resolution loop: understand → edit → stage → finish Preflight: run status/branch/log and know whether you’re merging or rebasing before you touch anything.',
          nodes: [
            { id: 'trigger', label: 'Merge/Rebase hits conflict', type: 'boundary', x: 90, y: 170 },
            { id: 'inspect', label: 'Inspect markers + intent', type: 'process', x: 280, y: 170 },
            { id: 'edit', label: 'Edit to correct final state', type: 'process', x: 470, y: 170 },
            { id: 'stage', label: 'Stage resolved files', type: 'process', x: 660, y: 170 },
            { id: 'finish', label: 'Finish merge/rebase', type: 'process', x: 660, y: 280 },
            { id: 'verify', label: 'Build/test + log check', type: 'boundary', x: 470, y: 280 },
          ],
          edges: [
            { from: 'trigger', to: 'inspect' },
            { from: 'inspect', to: 'edit' },
            { from: 'edit', to: 'stage' },
            { from: 'stage', to: 'finish' },
            { from: 'finish', to: 'verify' },
            { from: 'verify', to: 'inspect' },
          ],
          reveals: {
            trigger: 'Git stops and tells you which files conflict. Start with git status.',
            inspect: 'Open conflicted files; identify which side is “ours” vs “theirs” (merge) or which commit is being replayed (rebase).',
            edit: 'Make the file look exactly how it should be. Remove conflict markers. Don’t guess—use context.',
            stage: 'git add <file>. This marks the conflict as resolved for that file.',
            finish: 'Merge: git commit (or auto-commit). Rebase: git rebase --continue.',
            verify: 'Run tests/build. Then check history: git log --graph --oneline --decorate -n 20.'
          }
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 3: Undo & Collaboration (fault trees + practice)
  // ------------------------------------------------------------
  rescue: {
    id: 'rescue',
    title: 'Undo & Collaboration',
    description: 'Reset vs revert, reflog rescue, PR workflows, and “I made a mess” fault trees',
    color: '#f59e0b', // amber
    icon: '🧯',
    modules: [
      {
        id: 'undo-01',
        title: 'Undo toolbox: restore, reset, revert, reflog',
        type: 'conceptmap',
        why: "Git gives you multiple ways to “undo,” because there are multiple things you might mean: undo a file edit, undo a commit, undo a shared change, or recover something you “lost.”",
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          "Using reset when you needed revert — you rewrote shared history",
          "Using hard reset casually — you discarded work you didn’t mean to discard",
          "Not checking reflog — the commit you “lost” is often still there"
        ],
        content: {
          central: 'Undo decisions',
          description: 'Pick the tool based on what you’re undoing and whether it’s shared. Preflight: run the instrument panel and decide whether history is shared before you undo.',
          branches: [
            {
              id: 'file',
              label: 'Undo file changes',
              color: '#22c55e',
              details: 'Working tree or staging mistakes are usually easy and safe to correct.',
              example: 'git restore <file>   |   git restore --staged <file>',
              children: ['discard working changes', 'unstage changes', 'use git diff / --staged to verify']
            },
            {
              id: 'commit-local',
              label: 'Undo local commits',
              color: '#3b82f6',
              details: 'If nobody else has your commits, you can move your branch pointer (reset) or rewrite with interactive rebase.',
              example: 'git reset --soft HEAD~1   (edit message / squash)',
              children: ['soft/mixed/hard reset', 'interactive rebase -i', 'avoid rewriting shared history']
            },
            {
              id: 'commit-shared',
              label: 'Undo shared commits',
              color: '#f59e0b',
              details: 'If it’s already pushed and others may have pulled, prefer revert: it creates a new commit that undoes changes.',
              example: 'git revert <bad-commit>',
              children: ['safe for shared history', 'keeps audit trail', 'may need conflict resolution']
            },
            {
              id: 'reflog',
              label: 'Rescue (reflog)',
              color: '#a855f7',
              details: 'Reflog records where HEAD and branches pointed recently. Use it to find “lost” commits after reset/rebase.',
              example: 'git reflog  →  git switch -c rescue <hash>',
              children: ['find pre-reset commit', 'create rescue branch', 'cherry-pick or reset to recover']
            }
          ]
        }
      },
      {
        id: 'mess-01',
        title: 'Fault trees: “I made a mess” (three classic disasters)',
        type: 'faulttree',
        why: "These are the repeat offenders. Learn them once, and future-you will stop Googling in a cold sweat.",
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          "Doing more Git operations while confused — stop, inspect, then act",
          "Skipping a safety snapshot — make a rescue branch before risky commands",
          "Force-pushing without understanding what you’re overwriting"
        ],
        content: {
          faults: [
            {
              fault: 'Committed to the wrong branch',
              icon: 'warning',
              causes: [
                {
                  cause: 'Commit is local (not pushed yet)',
                  detail: 'You committed on main (or another branch) by accident, but it’s only in your local repo.',
                  fix: 'Make a branch at the commit: git switch -c feature/oops. Then move main back: git switch main; git reset --hard origin/main (or the prior commit).'
                },
                {
                  cause: 'Commit is pushed (shared)',
                  detail: 'Others may have pulled it; rewriting history can cause pain.',
                  fix: 'Preferred: revert on the shared branch, then cherry-pick onto the correct branch. Or coordinate a force-with-lease push if your team explicitly allows it.'
                },
                {
                  cause: 'You also have uncommitted changes',
                  detail: 'Switching branches may carry changes or block the switch.',
                  fix: 'Stash or commit WIP first: git stash -u (or commit). Then do the branch surgery.'
                },
              ]
            },
            {
              fault: 'Need to undo a push (bad commit reached remote)',
              icon: 'error',
              causes: [
                {
                  cause: 'Safe undo: revert',
                  detail: 'You want to keep history intact and just negate the change.',
                  fix: 'git revert <bad-commit> (or revert a range). Push the new revert commit.'
                },
                {
                  cause: 'History rewrite allowed (rare, coordinated)',
                  detail: 'You want remote branch pointer to move back (remove commits). This rewrites history.',
                  fix: 'git reset --hard <good-commit>; git push --force-with-lease. Tell teammates to reset/rebase accordingly.'
                },
                {
                  cause: 'Bad commit contains secrets',
                  detail: 'Revert does not remove secrets from history; they remain in the repository history.',
                  fix: 'Rotate the secret immediately, then follow your org’s secret-removal playbook (history rewrite + remote cleanup).'
                },
              ]
            },
            {
              fault: 'Merge conflict explosion',
              icon: 'info',
              causes: [
                {
                  cause: 'Branch diverged too long',
                  detail: 'Lots of parallel edits to the same areas; Git can’t auto-merge.',
                  fix: 'Reduce scope: sync more frequently (daily rebase/merge onto main) and keep PRs smaller.'
                },
                {
                  cause: 'You’re not sure what “ours/theirs” means',
                  detail: 'In merges, ours/theirs refers to current branch vs the branch being merged in (can be counterintuitive).',
                  fix: 'Use git status + your merge/rebase context. Consider a visual diff tool. Always run tests after resolving.'
                },
                {
                  cause: 'You want to start over',
                  detail: 'Sometimes the fastest fix is to abort and retry in a cleaner state.',
                  fix: 'Merge: git merge --abort. Rebase: git rebase --abort. Then update main and try again.'
                },
              ]
            },
          ]
        }
      },
      {
        id: 'collab-01',
        title: 'Collaboration pattern: PR workflow that stays sane',
        type: 'dataflow',
        why: "Git is a coordination tool wearing a storage system as a trench coat. A predictable PR workflow turns “random conflict roulette” into an assembly line.",
        pitfalls: [
          "Pushing huge PRs — review quality drops and conflicts spike",
          "Reviewing without running code — you approve bugs and create rework",
          "Merging without syncing — you create avoidable conflicts in main"
        ],
        content: {
          description: 'A practical PR loop: branch → commit → sync → review → merge',
          nodes: [
            { id: 'branch', label: 'Create branch', type: 'process', x: 90, y: 170 },
            { id: 'commit', label: 'Small commits', type: 'process', x: 260, y: 170 },
            { id: 'sync', label: 'Sync with main', type: 'process', x: 430, y: 170 },
            { id: 'pr', label: 'Open PR', type: 'process', x: 600, y: 170 },
            { id: 'review', label: 'Review + CI', type: 'process', x: 600, y: 280 },
            { id: 'merge', label: 'Merge (squash/merge)', type: 'process', x: 770, y: 170 },
            { id: 'cleanup', label: 'Delete branch', type: 'boundary', x: 770, y: 280 },
          ],
          edges: [
            { from: 'branch', to: 'commit' },
            { from: 'commit', to: 'sync' },
            { from: 'sync', to: 'pr' },
            { from: 'pr', to: 'review' },
            { from: 'review', to: 'merge' },
            { from: 'merge', to: 'cleanup' },
            { from: 'review', to: 'commit' },
          ],
          reveals: {
            branch: 'git switch -c feature/short-name. Start from updated main.',
            commit: 'Keep commits focused. Use messages that explain intent (why), not just mechanics.',
            sync: 'Before PR merge: fetch, then rebase or merge from origin/main to reduce surprise conflicts.',
            pr: 'Describe what/why, include test notes, screenshots, and risk areas.',
            review: 'Reviewer: read diff + run code. Author: respond with commits (or fixups) and re-request review.',
            merge: 'Use your team’s policy: squash for tidy story, merge for preserving topology, rebase-merge for linear history.',
            cleanup: 'Delete branch after merge to reduce clutter. Keep tags/releases for long-lived references.'
          }
        }
      },

      {
        id: 'collab-02',
        title: 'Scenario: I rebased, but my coworker already pulled',
        type: 'faulttree',
        why: 'This is a social + technical failure mode: rebase rewrites commit IDs. If others pulled the old history, you need a coordination-friendly recovery.',
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          'Force-pushing without --force-with-lease — you may overwrite someone else’s new work.'
        ],
        content: {
          faults: [
            {
              fault: 'I rewrote branch history after someone pulled',
              icon: 'warning',
              causes: [
                {
                  cause: 'Branch is shared (others based work on it)',
                  detail: 'Preferred: avoid rewriting again. Either merge the old base back, or coordinate a clean reset with the team.',
                  mitigations: [
                    {
                      title: 'Option A (recommended): stop rewriting; merge to reconcile',
                      steps: [
                        'Pause→Predict: git status; git branch -vv; git log --oneline --decorate --graph --all',
                        'Tell the team: “I rebased <branch> at <time>; please do not push until we sync.”',
                        'If coworker has commits on old history, merge their branch into the rebased branch (or cherry-pick as needed).',
                        'Push normally (no force) once history is converged.'
                      ],
                      tradeoff: 'History may look messy, but teammates avoid painful rebase-on-rebase.'
                    },
                    {
                      title: 'Option B: coordinated force-push (only if team agrees)',
                      steps: [
                        'Freeze the branch: announce a short window where no one pushes.',
                        'Ask coworkers to create a safety branch of their current state: git switch -c rescue/<name>-<date>.',
                        'Force-push with lease: git push --force-with-lease.',
                        'Coworkers rebase/cherry-pick onto the new branch tip, then delete rescue branches once merged.'
                      ],
                      tradeoff: 'Clean history but higher coordination cost; easiest to get wrong under pressure.'
                    }
                  ]
                },
                {
                  cause: 'Branch is effectively private (nobody pulled / no one based work on it)',
                  detail: 'This is the safe zone for rebase. You can force-push with lease.',
                  mitigations: [
                    {
                      title: 'Force-push safely',
                      steps: [
                        'Pause→Predict (instrument panel).',
                        'git push --force-with-lease'
                      ],
                      tradeoff: 'Low risk if truly private; still prefer lease to avoid accidental overwrite.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        id: 'collab-03',
        title: 'Scenario: reviewer asks for a cleaner history / smaller PR',
        type: 'faulttree',
        why: 'The goal is reviewability. You can respond by splitting scope, squashing, or using interactive rebase — but choose based on team policy and whether the branch is shared.',
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          'Using interactive rebase on a shared branch — you break coworkers.'
        ],
        content: {
          faults: [
            {
              fault: 'PR is hard to review',
              icon: 'warning',
              causes: [
                {
                  cause: 'PR contains multiple unrelated changes',
                  detail: 'Split the work into two branches/PRs.',
                  mitigations: [
                    {
                      title: 'Split by moving commits',
                      steps: [
                        'Pause→Predict: inspect log graph and identify commit boundaries.',
                        'Create a new branch for the subset: git switch -c feature/part-b.',
                        'Move commits using cherry-pick (preferred) or interactive rebase.',
                        'Open separate PRs with clear scope.'
                      ],
                      tradeoff: 'More bookkeeping, but reviewers stop drowning.'
                    }
                  ]
                },
                {
                  cause: 'Commit history is noisy (fixups, WIP commits)',
                  detail: 'Clean it up if allowed: interactive rebase or squash.',
                  mitigations: [
                    {
                      title: 'Interactive rebase (private branch)',
                      steps: [
                        'Confirm branch is private or team allows rewrite.',
                        'git rebase -i origin/main (or main)',
                        'squash/fixup/reword as needed',
                        'Force-push with lease: git push --force-with-lease',
                        'Comment on PR: “History rewritten; please refresh and re-review.”'
                      ],
                      tradeoff: 'Cleaner story, but reviewers lose per-commit discussion anchors.'
                    },
                    {
                      title: 'Squash merge (policy-based)',
                      steps: [
                        'Leave commits as-is; rely on squash merge at the end.',
                        'Respond to reviewer by improving PR description + adding a summary commit message.'
                      ],
                      tradeoff: 'Least disruptive; preserves review anchors; final history becomes tidy.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        id: 'collab-04',
        title: 'Scenario: CI failed after merge to main',
        type: 'faulttree',
        why: 'In shared branches, the priority is restoring a green main quickly with minimal confusion: revert, fix-forward, or hotfix depending on blast radius.',
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          'Trying to “fix in place” directly on main — prefer a hotfix branch + PR for auditability.'
        ],
        content: {
          faults: [
            {
              fault: 'Main is broken',
              icon: 'warning',
              causes: [
                {
                  cause: 'Failure is clearly caused by the last merge (high confidence)',
                  detail: 'Revert the merge or offending commits to restore green, then reintroduce with a fix.',
                  mitigations: [
                    {
                      title: 'Revert to restore green',
                      steps: [
                        'Pause→Predict: confirm last merge commit and failing tests.',
                        'Create hotfix branch: git switch -c hotfix/restore-green origin/main',
                        'Revert: git revert <sha> (or revert merge with -m if needed)',
                        'Push + PR; merge quickly with review.',
                        'Follow-up PR: reapply the change with fixes.'
                      ],
                      tradeoff: 'Fast stability; additional follow-up work required.'
                    }
                  ]
                },
                {
                  cause: 'Failure cause is unclear (medium/low confidence)',
                  detail: 'Prefer fix-forward if you can isolate quickly; otherwise revert to reduce downtime.',
                  mitigations: [
                    {
                      title: 'Triage then choose revert vs fix-forward',
                      steps: [
                        'Freeze new merges temporarily.',
                        'Reproduce failure locally or in CI logs.',
                        'If fix is small and obvious: hotfix PR (fix-forward).',
                        'If not: revert first, then diagnose without pressure.'
                      ],
                      tradeoff: 'Balances speed and correctness; avoids long broken-main periods.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        id: 'pr-hygiene-01',
        title: 'PR hygiene: make review boring (in a good way)',
        type: 'conceptmap',
        why: 'Most collaboration pain is not Git — it is humans parsing diffs. PR hygiene reduces conflicts, review time, and accidental bugs.',
        pitfalls: [
          'Preflight (Phase 1): run `git status`, `git branch -vv`, `git log --oneline --decorate --graph --all`. Then use the State Ledger (Phase 2) to predict what will move. Press `r` for the command reference panel. If unsure, create a safety branch: `git switch -c rescue/<tag>`.',,,
          'Commit messages that say “fix stuff” — future you suffers',
          'Rewriting history without communicating — reviewers lose trust'
        ],
        content: {
          branches: [
            {
              label: 'Scope',
              details: 'One PR = one coherent change. Split unrelated work.',
              example: 'If you changed UI + refactor + build scripts, split into separate PRs.',
              children: [
                'Target reviewable diff size',
                'Prefer incremental PRs over one mega-PR'
              ]
            },
            {
              label: 'Commits',
              details: 'Commits are a narrative. Use them to explain intent.',
              example: '“Validate inputs before calling API” beats “bugfix”.',
              children: [
                'Small, meaningful commits',
                'Use fixup commits during work; squash or reword before merge if policy allows'
              ]
            },
            {
              label: 'PR description',
              details: 'Explain what/why/how tested + risk areas.',
              example: 'Include: summary, screenshots, test plan, rollout notes.',
              children: [
                'Call out risky files',
                'List manual test steps'
              ]
            },
            {
              label: 'Sync & merge policy',
              details: 'Know your team’s default (squash/merge/rebase-merge) and follow it.',
              example: 'If squash-merge is standard, don’t over-optimize commit history mid-review.',
              children: [
                'Avoid rebasing shared branches',
                'Use --force-with-lease if rewriting is allowed'
              ]
            },
            {
              label: 'Review etiquette',
              details: 'Review is a collaboration loop: clarify intent, reduce surprise, keep it civil.',
              example: 'Respond to comments with commits; summarize resolution; re-request review.',
              children: [
                'Reviewer: read diff + run code when feasible',
                'Author: acknowledge feedback; avoid “drive-by” force-pushes'
              ]
            }
          ]
        }
      },
    ]
  },
};
