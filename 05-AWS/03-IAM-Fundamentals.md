# AWS IAM – Identity and Access Management

## 1. What It Solves
Before Cloud: You had physical keys, VPNs, and LDAP servers.
**With IAM:** You manage **Authentication** (Who are you?) and **Authorization** (What can you do?) for AWS resources. It is the "Security Gatekeeper" of AWS.

## 2. Architecture & Key Components

### Architecture
*   **Global Service:** IAM is global. Users/Roles created in IAM are available in all regions immediately.
*   **Root Account:** The first identity created. Has unlimited power. **Lock it away.**

### Key Components
1.  **Users:** Real people (e.g., `alice`, `bob`) or service accounts. Have long-term credentials (password or Access Keys).
2.  **Groups:** Collections of users (e.g., `Developers`, `Admins`). Apply permissions to the group, not the user.
3.  **Roles:** Temporary identities. Used by:
    *   AWS Services (EC2, Lambda).
    *   Cross-account access.
    *   Federated users (Google/Okta login).
4.  **Policies:** JSON documents defining permissions.
    *   **Managed Policies:** Created by AWS (e.g., `AdministratorAccess`).
    *   **Inline Policies:** Embedded directly into a user/role (Avoid if possible).

## 3. Real Deployment Patterns

### Pattern A: EC2 Instance Profile
*   **Goal:** Allow an App on EC2 to upload files to S3 without hardcoding keys.
*   **Setup:** Create an IAM Role with `S3FullAccess`. Attach it to the EC2 instance. The AWS SDK on the instance automatically retrieves temporary credentials.

### Pattern B: Cross-Account Access
*   **Goal:** Dev account needs to read data from Prod account S3 bucket.
*   **Setup:**
    1.  Prod Account creates a Role (`DevAccessRole`) trusting the Dev Account ID.
    2.  Dev Account User assumes `DevAccessRole`.

### Pattern C: Identity Federation (SSO)
*   **Goal:** Employees log in with corporate Active Directory (AD).
*   **Setup:** Use AWS IAM Identity Center (formerly SSO) to map AD groups to IAM Roles.

## 4. Security Best Practices
1.  **Lock Root:** Delete root access keys. Enable MFA. Use it only for billing/account setup.
2.  **Least Privilege:** Grant only the permissions needed (e.g., `S3ReadOnly`, not `S3FullAccess`).
3.  **MFA (Multi-Factor Auth):** Enforce MFA for all human users.
4.  **Rotate Credentials:** Rotate access keys every 90 days.
5.  **Use Roles, Not Keys:** Prefer IAM Roles for applications over long-term Access Keys.

## 5. Cost Optimization
*   **IAM is Free:** You are not charged for Users, Groups, Roles, or Policies.
*   **Indirect Costs:** You pay for the resources (EC2, S3) that IAM users create.

## 6. Infrastructure as Code (Terraform)

```hcl
# 1. Create a User
resource "aws_iam_user" "dev_user" {
  name = "jdoe"
}

# 2. Create a Policy (Least Privilege)
resource "aws_iam_policy" "s3_read_only" {
  name        = "S3ReadOnlyPolicy"
  description = "Allows read-only access to specific bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:GetObject", "s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-app-bucket/*"]
      },
    ]
  })
}

# 3. Attach Policy to User
resource "aws_iam_user_policy_attachment" "attach" {
  user       = aws_iam_user.dev_user.name
  policy_arn = aws_iam_policy.s3_read_only.arn
}
```

## 7. AWS CLI Examples

| Action | Command |
| :--- | :--- |
| **Create User** | `aws iam create-user --user-name jdoe` |
| **Create Access Key** | `aws iam create-access-key --user-name jdoe` |
| **List Users** | `aws iam list-users` |
| **Get Current ID** | `aws sts get-caller-identity` (Who am I?) |
| **Attach Policy** | `aws iam attach-user-policy --user-name jdoe --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess` |

## 8. Common Exam Questions (SAA-C03 / DVA-C02)

**Q1: An application on EC2 needs to access DynamoDB. What is the most secure way to handle credentials?**
*   A) Save Access Keys in `~/.aws/credentials`.
*   B) Hardcode keys in the application code.
*   C) Create an IAM Role and attach it to the EC2 instance. ✅
*   D) Save keys in a private S3 bucket.
*   *Reason: Roles provide temporary credentials that rotate automatically. Never store long-term keys on instances.*

**Q2: You want to grant a user access to S3 but deny access to a specific bucket folder. How does IAM evaluate this?**
*   A) Allow overrides Deny.
*   B) Deny overrides Allow. ✅
*   C) The most recent policy wins.
*   D) It depends on the group.
*   *Reason: An explicit DENY always trumps an ALLOW.*

**Q3: Which IAM entity is best suited for an external consultant who needs temporary access to your AWS account?**
*   A) IAM User
*   B) IAM Group
*   C) IAM Role ✅
*   D) Root User
*   *Reason: Roles are for temporary access. You can give the consultant a role to assume.*
