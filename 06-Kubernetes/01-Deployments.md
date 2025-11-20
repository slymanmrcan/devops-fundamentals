# Kubernetes Deployments: The Standard for Stateless Apps

## 1. Introduction
A **Deployment** is the standard Kubernetes object used to manage stateless applications. It provides declarative updates for Pods and ReplicaSets.

You describe a *desired state* in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

### Why not just use Pods?
- **Pods are ephemeral**: If a node dies, the Pod dies.
- **ReplicaSets** ensure a number of pods are running, but don't handle updates (rolling out new versions).
- **Deployments** manage ReplicaSets to handle rollouts and rollbacks.

---

## 2. Internal Mechanics: How it Works
When you create a Deployment, the following chain of events occurs:

1.  **Deployment Created**: You submit the YAML to the API Server.
2.  **Controller Manager**: The Deployment Controller notices the new object.
3.  **ReplicaSet Creation**: The Deployment creates a **ReplicaSet** (RS) with a specific hash label (e.g., `pod-template-hash`).
4.  **Pod Creation**: The ReplicaSet creates the desired number of **Pods**.

### The Reconcile Loop
Kubernetes is always "reconciling" (comparing Desired vs. Current state).
- **Desired**: "I want 3 replicas of Nginx v1.14"
- **Current**: "I have 0 replicas"
- **Action**: Create 3 Pods.

When you update an image (v1.14 -> v1.15):
1.  Deployment creates a **NEW** ReplicaSet for v1.15.
2.  It scales **UP** the new RS and scales **DOWN** the old RS gradually (RollingUpdate).

---

## 3. YAML Breakdown
A production-grade Deployment YAML.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
  labels:
    app: backend
    tier: api
spec:
  replicas: 3
  revisionHistoryLimit: 10 # Keep 10 old ReplicaSets for rollback
  selector:
    matchLabels:
      app: backend # MUST match template.metadata.labels
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1 # Max pods down during update
      maxSurge: 1       # Max extra pods during update
  template: # The Pod Template
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: api-container
        image: my-registry/backend:v2.0.1
        ports:
        - containerPort: 8080
        resources: # ALWAYS define resources
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe: # Restart if dead
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        readinessProbe: # Remove from Service endpoints if not ready
          httpGet:
            path: /ready
            port: 8080
```

### Key Fields
- **`spec.selector`**: Determines which Pods this Deployment manages. **Immutable** after creation.
- **`spec.strategy`**: Controls how updates happen (Critical for zero-downtime).
- **`spec.template`**: The blueprint for the Pods. Any change here triggers a rollout.

---

## 4. Deployment Strategies

### A. Rolling Update (Default & Recommended)
Replaces old pods with new ones gradually.
- **Best for**: Stateless apps, zero-downtime requirements.
- **Pros**: No downtime.
- **Cons**: App must support running two versions simultaneously during rollout.

### B. Recreate
Kills ALL old pods, then starts ALL new pods.
- **Best for**: Dev environments, or apps that cannot run multiple versions at once (e.g., database schema conflicts).
- **Pros**: Simple, clean state.
- **Cons**: **Downtime** exists between kill and start.

### C. Canary (Advanced)
Releasing a new version to a small subset of users before full rollout.
- **Native K8s**: Not strictly a "strategy" field, but achieved by creating **two Deployments** (one `stable`, one `canary`) behind the **same Service**.
- **Automated**: Tools like **Argo Rollouts** or **Flagger** provide true traffic-splitting canary deployments.

---

## 5. Scaling

### Manual Scaling
Imperative command (good for emergencies):
```bash
kubectl scale deployment/backend-api --replicas=5
```

### Horizontal Pod Autoscaler (HPA)
The production way. Scales based on CPU/Memory metrics.
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70 # Scale up if avg CPU > 70%
```

---

## 6. Troubleshooting & Operations

### Common Commands

| Action | Command |
| :--- | :--- |
| **Check Status** | `kubectl rollout status deployment/my-app` |
| **View History** | `kubectl rollout history deployment/my-app` |
| **Undo Rollout** | `kubectl rollout undo deployment/my-app` |
| **To Specific Ver**| `kubectl rollout undo deployment/my-app --to-revision=2` |
| **Restart Pods** | `kubectl rollout restart deployment/my-app` (Useful for config updates) |

### Debugging "Pending" or "CrashLoopBackOff"
1.  **Describe Deployment**: Check for controller errors (e.g., quota exceeded).
    ```bash
    kubectl describe deployment my-app
    ```
2.  **Describe Pod**: Check events (scheduling errors, image pull errors).
    ```bash
    kubectl describe pod my-app-xyz
    ```
3.  **Logs**: Check application logs.
    ```bash
    kubectl logs my-app-xyz --previous # Check why it crashed
    ```

---

## 7. Real DevOps Use-Cases

### Use-Case 1: Zero-Downtime Config Update
**Scenario**: You need to update an environment variable or `ConfigMap`.
**Solution**:
1. Update the ConfigMap.
2. Pods don't automatically reload.
3. Run `kubectl rollout restart deployment/my-app`.
4. K8s performs a RollingUpdate, creating new pods with the new config.

### Use-Case 2: Handling Traffic Spikes
**Scenario**: Black Friday traffic.
**Solution**:
- **Pre-scaling**: Manually scale up before the event if HPA reaction time is too slow.
- **HPA**: Ensure HPA `maxReplicas` is high enough.

### Use-Case 3: The "Bad Image" Rollback
**Scenario**: You deployed `v2.0` but it has a critical bug.
**Action**:
```bash
kubectl rollout undo deployment/backend-api
```
**Result**: K8s immediately stops scaling up the new ReplicaSet and scales back up the old (stable) ReplicaSet.
