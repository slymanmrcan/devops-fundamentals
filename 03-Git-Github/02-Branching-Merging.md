# Branching & Merging

## 1. What is a Branch?
A branch represents an independent line of development. The default branch is usually called `main` or `master`.

## 2. Managing Branches

### List Branches
```bash
git branch
```

### Create a Branch
```bash
git branch feature-login
```

### Switch to a Branch
```bash
git checkout feature-login
# OR (newer command)
git switch feature-login
```

### Create and Switch in One Command
```bash
git checkout -b feature-login
```

### Delete a Branch
```bash
git branch -d feature-login
```

## 3. Merging
Merging is the way you combine the work of different branches together.

1. Switch to the branch you want to merge *into* (usually `main`).
   ```bash
   git checkout main
   ```
2. Merge the feature branch.
   ```bash
   git merge feature-login
   ```

## 4. Merge Conflicts
Conflicts happen when you merge branches that have competing commits, and Git needs your help to decide which changes to incorporate.

1. Git will mark the file as conflicted.
2. Open the file and look for conflict markers:
   ```text
   <<<<<<< HEAD
   code in main
   =======
   code in feature-login
   >>>>>>> feature-login
   ```
3. Edit the file to resolve the conflict (remove markers and keep the correct code).
4. Add the resolved file.
   ```bash
   git add filename.txt
   ```
5. Commit the merge.
   ```bash
   git commit -m "Resolved merge conflict"
   ```
