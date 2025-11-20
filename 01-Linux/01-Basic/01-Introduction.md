# Linux – Fundamentals for DevOps Engineers

## Overview
Linux is the open-source operating system kernel that powers the vast majority of the world's servers, supercomputers, and cloud infrastructure. For a DevOps engineer, Linux is not just an OS; it is the universal runtime environment for automation, containerization, and orchestration.

## Why It Matters in DevOps
*   **Infrastructure as Code (IaC):** Most IaC tools (Terraform, Ansible) and CI/CD pipelines run on Linux agents.
*   **Containerization:** Docker and Kubernetes are native to Linux. Understanding cgroups and namespaces is essential for debugging containers.
*   **Server Stability:** Linux offers superior uptime, resource management, and security compared to consumer OSs.
*   **Cloud Dominance:** AWS, Azure, and GCP environments are predominantly Linux-based.

## Core Concepts

### 1. The Kernel
The core interface between hardware and software. It manages CPU, memory, and peripheral devices.
*   **User Space:** Where applications and user processes run.
*   **Kernel Space:** Where the core OS functions operate with full privileges.

### 2. The Shell
The command-line interface (CLI) that interprets user commands.
*   **Bash (Bourne Again SHell):** The standard for most distributions.
*   **Zsh:** Popular for interactive use (default on macOS).
*   **Stdin/Stdout/Stderr:** The three standard streams for input, output, and error logging.

### 3. Filesystem Hierarchy Standard (FHS)
Linux treats everything as a file.
*   `/`: Root directory.
*   `/bin` & `/usr/bin`: Essential user binaries (ls, cp, cat).
*   `/etc`: Configuration files.
*   `/var`: Variable data (logs, spool files).
*   `/home`: User home directories.
*   `/proc` & `/sys`: Virtual filesystems representing system state.

### 4. Permissions & Ownership
Security model based on Read (r), Write (w), and Execute (x) for Owner (u), Group (g), and Others (o).

### 5. Process Management
Every running program is a process with a unique Process ID (PID).
*   **Daemon:** Background process (service).
*   **Zombie:** A dead process waiting for its parent to read its exit status.

## Essential Commands

### File Operations
| Command | Description | Example |
| :--- | :--- | :--- |
| `ls` | List directory contents | `ls -lah` (list all, human-readable, hidden) |
| `cd` | Change directory | `cd /var/log` |
| `cp` | Copy files/folders | `cp -r src/ dest/` |
| `mv` | Move or rename | `mv app.conf app.conf.bak` |
| `rm` | Remove files | `rm -rf /tmp/cache` (Use with caution) |
| `touch` | Create empty file or update timestamp | `touch lockfile` |
| `mkdir` | Create directory | `mkdir -p /app/logs` (Create parents if needed) |

### Text Processing & Search
| Command | Description | Example |
| :--- | :--- | :--- |
| `grep` | Search text using patterns | `grep "ERROR" server.log` |
| `cat` | Display file content | `cat config.json` |
| `tail` | View end of file | `tail -f access.log` (Follow live updates) |
| `head` | View start of file | `head -n 20 data.csv` |
| `find` | Search for files | `find /var -name "*.log" -size +10M` |
| `sed` | Stream editor (replace text) | `sed -i 's/DEBUG/INFO/g' app.conf` |
| `awk` | Text processing language | `awk '{print $1}' access.log` (Print 1st column) |

### System Performance & Info
| Command | Description | Example |
| :--- | :--- | :--- |
| `top` / `htop` | Real-time process view | `htop` |
| `ps` | Snapshot of processes | `ps aux | grep nginx` |
| `df` | Disk space usage | `df -h` |
| `du` | Directory space usage | `du -sh /var/lib/docker` |
| `free` | Memory usage | `free -m` |
| `uname` | System information | `uname -a` |

### Networking
| Command | Description | Example |
| :--- | :--- | :--- |
| `curl` | Transfer data (HTTP requests) | `curl -I https://google.com` |
| `wget` | Download files | `wget https://example.com/file.zip` |
| `netstat` / `ss` | Network statistics | `ss -tulpn` (Show listening ports) |
| `ping` | Check connectivity | `ping -c 4 8.8.8.8` |
| `ip` | IP configuration | `ip addr show` |

### Permissions
| Command | Description | Example |
| :--- | :--- | :--- |
| `chmod` | Change mode (permissions) | `chmod +x script.sh` or `chmod 755 file` |
| `chown` | Change owner | `chown user:group file` |
| `sudo` | Execute as superuser | `sudo apt update` |

## Real-World Scenarios

### Scenario 1: Debugging a Crash
**Problem:** Application crashed, need to find why.
**Action:**
1.  Check service status: `systemctl status myapp`
2.  Check logs: `tail -n 100 /var/log/myapp/error.log`
3.  Search for exceptions: `grep -i "exception" /var/log/syslog`

### Scenario 2: Disk Space Alert
**Problem:** Server disk is 98% full.
**Action:**
1.  Check overall usage: `df -h`
2.  Find largest directories: `du -h --max-depth=1 /var | sort -hr`
3.  Clean up logs or unused docker images: `docker system prune -a`

### Scenario 3: Port Conflict
**Problem:** Nginx fails to start because port 80 is in use.
**Action:**
1.  Identify process on port 80: `sudo ss -tulpn | grep :80`
2.  Kill the conflicting process: `kill -9 <PID>`
3.  Restart Nginx: `sudo systemctl start nginx`

## Best Practices
1.  **Least Privilege:** Never run applications as `root`. Create dedicated service users.
2.  **Immutable Infrastructure:** Avoid patching live servers; replace them with new images.
3.  **Script Everything:** If you run a command twice, write a script.
4.  **Log Rotation:** Ensure `logrotate` is configured to prevent logs from filling the disk.
5.  **SSH Keys:** Disable password authentication; use SSH keys for access.

## Common Mistakes
*   **`chmod 777`:** Giving full permissions to everyone is a massive security risk.
*   **`rm -rf /`:** Accidentally running this (or on a variable that resolves to root) destroys the OS.
*   **Editing on Prod:** modifying configuration files directly on production servers instead of via configuration management (Ansible/Chef).
*   **Ignoring Exit Codes:** Assuming a script worked without checking `$?`.

## Mini Labs

### Lab 1: Log Analysis Pipeline
**Goal:** Extract all 404 errors from a log file and count unique IPs.
```bash
# 1. Create a dummy log file
echo "192.168.1.1 - GET /index.html 200" > access.log
echo "192.168.1.2 - GET /admin 403" >> access.log
echo "192.168.1.1 - GET /missing 404" >> access.log
echo "192.168.1.3 - GET /old-page 404" >> access.log

# 2. Filter 404s, extract IP (1st column), sort, and count unique
grep " 404" access.log | awk '{print $1}' | sort | uniq -c
```

### Lab 2: Process Management
**Goal:** Start a background process, find it, and kill it.
```bash
# 1. Start a sleep process in background
sleep 1000 &

# 2. Find the PID
ps aux | grep sleep

# 3. Kill the process (replace <PID> with actual ID)
# kill <PID>
# Verify it's gone
jobs
```

### Lab 3: File Permissions
**Goal:** Create a script that only the owner can execute.
```bash
# 1. Create script
echo 'echo "Hello Secure World"' > secure.sh

# 2. Remove all permissions
chmod 000 secure.sh

# 3. Add read/execute for owner only
chmod 500 secure.sh

# 4. Verify
ls -l secure.sh
./secure.sh
```
