# Git Fundamentals - Basic

## 1. What is Git?
Git is a distributed version control system that tracks changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development.

## 2. Configuration
Before you start, configure your user information for all your local repositories.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Check your configuration:
```bash
git config --list
```

## 3. Initialization
Initialize a new Git repository in your project folder.

```bash
mkdir my-project
cd my-project
git init
```

## 4. The Three States
Git has three main states that your files can reside in:
1. **Modified**: You have changed the file but have not committed it to your database yet.
2. **Staged**: You have marked a modified file in its current version to go into your next commit snapshot.
3. **Committed**: The data is safely stored in your local database.

## 5. Basic Commands

### Checking Status
See which files are staged, modified, or untracked.
```bash
git status
```

### Adding Files (Staging)
Add files to the staging area.
```bash
# Add a specific file
git add filename.txt

# Add all files in the current directory
git add .
```

### Committing
Record changes to the repository.
```bash
git commit -m "Initial commit"
```

### Viewing History
Show the commit history.
```bash
git log

# Compact view
git log --oneline
```

### Diff
See changes that are not yet staged.
```bash
git diff
```
