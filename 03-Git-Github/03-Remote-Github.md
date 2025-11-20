# Remote Repositories & GitHub

## 1. Working with Remotes

### Cloning a Repository
Download a repository from a remote server (like GitHub).
```bash
git clone https://github.com/username/repo.git
```

### Adding a Remote
Link a local repository to a remote one.
```bash
git remote add origin https://github.com/username/repo.git
```

### Verifying Remotes
```bash
git remote -v
```

## 2. Syncing Changes

### Push
Upload your local branch commits to the remote repository.
```bash
git push -u origin main
```

### Pull
Fetch and merge changes from the remote to your local branch.
```bash
git pull origin main
```

### Fetch
Download objects and refs from another repository (doesn't merge automatically).
```bash
git fetch origin
```

## 3. GitHub Workflow

### Forking
Creating a copy of someone else's repository under your GitHub account.

### Pull Requests (PR)
Proposing changes to a repository.
1. Fork the repo.
2. Clone your fork.
3. Create a feature branch.
4. Make changes and commit.
5. Push to your fork.
6. Open a Pull Request on the original repository on GitHub.

### .gitignore
A file that specifies intentionally untracked files that Git should ignore (e.g., build artifacts, logs, secrets).
```text
# .gitignore example
node_modules/
.env
*.log
```
