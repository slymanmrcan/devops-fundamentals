# Advanced Git

## 1. Stashing
Temporarily shelve (stash) changes you've made to your working copy so you can work on something else, and then come back and re-apply them later.

```bash
# Stash changes
git stash

# List stashes
git stash list

# Apply the latest stash
git stash pop
```

## 2. Reset vs Revert

### Reset
Moves the current branch pointer backward. **Dangerous** if commits are already pushed.
```bash
# Soft: Keeps changes in staging
git reset --soft HEAD~1

# Hard: Destroys changes
git reset --hard HEAD~1
```

### Revert
Creates a *new* commit that undoes the changes of a previous commit. Safe for public history.
```bash
git revert <commit-hash>
```

## 3. Rebase
Re-applying commits on top of another base tip. It creates a linear history.

```bash
# Switch to feature branch
git checkout feature
# Rebase onto main
git rebase main
```
> **Warning:** Never rebase public branches (like main) that others are working on.

## 4. Cherry Pick
Apply the changes introduced by some existing commits.
```bash
git cherry-pick <commit-hash>
```

## 5. Tags
Marking specific points in history as being important (e.g., releases).
```bash
# Create a tag
git tag v1.0.0

# Push tags
git push origin --tags
```
