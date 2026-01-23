// ============================================================
// APP CONFIGURATION
// Customize these values for your learning platform
// ============================================================

export const config = {
  // App identity
  title: 'Git Version Control',
  subtitle: 'Build a reliable mental model for branching, merging, and rescue',

  // localStorage key - use unique name per project to avoid conflicts
  storageKey: 'learning-git-v0-progress',

  // Theme colors (Tailwind classes)
  theme: {
    primary: 'bg-slate-900',
    secondary: 'bg-slate-800',
    accent: 'bg-emerald-600',
    accentHover: 'hover:bg-emerald-700',
  },

  features: {
    reference: true,
    quickReview: true,
    notes: true,
    export: true,
    print: true,
  },
};

// ============================================================
// REFERENCE DATA (optional)
// Command reference panel + quick mental-model reminders
// ============================================================

export const referenceData = {
  sections: [
    {
      id: 'mental-model',
      title: 'Mental Model (30-second refresh)',
      content: [
        { term: 'Commit', definition: 'A snapshot node in the DAG (directed acyclic graph). Immutable once created.' },
        { term: 'Branch', definition: 'Just a movable label pointing to a commit (e.g., main → abc123).' },
        { term: 'HEAD', definition: 'Your “where am I?” pointer. Usually points to a branch name; detached HEAD points directly to a commit.' },
        { term: 'Remote-tracking branch', definition: 'Your last-known view of a remote branch (e.g., origin/main). Updated by fetch/pull.' },
      ]
    },
    {
      id: 'everyday',
      title: 'Everyday flow',
      content: [
        { term: 'git status', definition: 'What changed? What is staged? Where is HEAD?' },
        { term: 'git add <path>', definition: 'Stage changes (working directory → index).' },
        { term: 'git commit -m "msg"', definition: 'Create a new commit from the index (index → local DAG).' },
        { term: 'git fetch --prune', definition: 'Update remote-tracking branches without touching your working tree.' },
        { term: 'git pull --rebase', definition: 'Fetch + rebase your local commits on top of the updated upstream.' },
        { term: 'git push', definition: 'Upload your local branch commits to the remote.' },
      ]
    },
    {
      id: 'branching',
      title: 'Branching & navigation',
      content: [
        { term: 'git switch <branch>', definition: 'Move HEAD to an existing branch (preferred over checkout for most cases).' },
        { term: 'git switch -c <new>', definition: 'Create and switch to a new branch.' },
        { term: 'git log --oneline --graph --decorate --all', definition: 'The “make the DAG visible” command.' },
        { term: 'git diff', definition: 'See changes (unstaged by default). Use --staged for index vs HEAD.' },
      ]
    },
    {
      id: 'merge-rebase',
      title: 'Merge vs rebase',
      content: [
        { term: 'git merge <branch>', definition: 'Combine histories by creating a merge commit (keeps branch topology).' },
        { term: 'git rebase <upstream>', definition: 'Replay commits onto a new base (rewrites commit IDs).' },
        { term: 'Rule of thumb', definition: 'Rebase your *local, unshared* work. Merge when integrating shared work or when history clarity matters.' },
      ]
    },
    {
      id: 'undo',
      title: 'Undo & rescue',
      content: [
        { term: 'git restore <path>', definition: 'Discard working-tree changes for a file (safe, focused).' },
        { term: 'git restore --staged <path>', definition: 'Unstage (move from index back to working tree).' },
        { term: 'git reset --soft <commit>', definition: 'Move branch pointer back; keep index+working tree (redo commit message or squash).' },
        { term: 'git reset --mixed <commit>', definition: 'Move branch back; keep working tree, unstage changes.' },
        { term: 'git reset --hard <commit>', definition: 'Move branch back; discard index+working tree changes (dangerous).' },
        { term: 'git revert <commit>', definition: 'Create a new commit that undoes changes (safe for shared history).' },
        { term: 'git reflog', definition: 'Your black box flight recorder. Find “lost” commits and recover them.' },
      ]
    },
    {
      id: 'collab',
      title: 'Collaboration patterns',
      content: [
        { term: 'Feature branch + PR', definition: 'Work on a branch, open a PR, review, then merge (often via squash merge).' },
        { term: 'Sync', definition: 'Before you push or open a PR: fetch, then rebase/merge onto the latest main.' },
        { term: 'Small PRs', definition: 'Easier review, fewer conflicts, faster merges.' },
      ]
    },
  ],
};
