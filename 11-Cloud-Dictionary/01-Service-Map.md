# Bulut Hizmetleri Sözlüğü (Cloud Service Map)

Farklı bulut sağlayıcıları, aynı teknolojiye farklı pazarlama isimleri verirler. Bu rehber, bu karmaşayı çözmek için bir "Rosetta Taşı" görevi görür.

## 1. Hesaplama (Compute)

| Jenerik Kavram | Açıklama | AWS | Azure | Google Cloud (GCP) | Oracle (OCI) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Virtual Server** | Sanal Sunucu (VM) | **EC2** (Elastic Compute Cloud) | **Virtual Machine** | **Compute Engine** | **Compute Instance** |
| **Serverless** | Sunucusuz Fonksiyon | **Lambda** | **Azure Functions** | **Cloud Functions** | **OCI Functions** |
| **Container Runner** | Yönetilen Konteyner Çalıştırma | **Fargate** / App Runner | **Container Instances** (ACI) | **Cloud Run** | **Container Instances** |
| **Kubernetes** | Yönetilen K8s Kümesi | **EKS** (Elastic K8s Service) | **AKS** (Azure K8s Service) | **GKE** (Google K8s Engine) | **OKE** (Oracle K8s Engine) |
| **Auto Scaling** | Otomatik Ölçeklendirme | **Auto Scaling** | **Virtual Machine Scale Sets** | **Instance Groups** | **Instance Pools** |

## 2. Depolama (Storage)

| Jenerik Kavram | Açıklama | AWS | Azure | Google Cloud (GCP) | Oracle (OCI) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Object Storage** | Sınırsız Dosya Depolama | **S3** (Simple Storage Service) | **Blob Storage** | **Cloud Storage** | **Object Storage** |
| **Block Storage** | Sanal Disk (VM Diski) | **EBS** (Elastic Block Store) | **Disk Storage** | **Persistent Disk** | **Block Volume** |
| **File Storage** | Paylaşımlı Dosya Sistemi (NFS) | **EFS** (Elastic File System) | **Azure Files** | **Filestore** | **File Storage** |
| **Archive** | Soğuk/Ucuz Depolama | **S3 Glacier** | **Archive Storage** | **Archive Storage** | **Archive Storage** |

## 3. Veritabanı (Database)

| Jenerik Kavram | Açıklama | AWS | Azure | Google Cloud (GCP) | Oracle (OCI) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RDBMS** | İlişkisel Veritabanı (SQL) | **RDS** | **SQL Database** | **Cloud SQL** | **Autonomous Database** |
| **NoSQL** | Doküman/Key-Value DB | **DynamoDB** | **Cosmos DB** | **Firestore** / Bigtable | **NoSQL Database** |
| **Caching** | Bellek İçi Önbellek (Redis) | **ElastiCache** | **Cache for Redis** | **Memorystore** | **Cache** |
| **Migration** | Veritabanı Taşıma | **DMS** (Database Migration Svc) | **Database Migration Svc** | **Database Migration Svc** | **Data Integration** |

## 4. Ağ (Networking)

| Jenerik Kavram | Açıklama | AWS | Azure | Google Cloud (GCP) | Oracle (OCI) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Virtual Network** | İzole Sanal Ağ | **VPC** (Virtual Private Cloud) | **VNet** (Virtual Network) | **VPC** | **VCN** (Virtual Cloud Network) |
| **Load Balancer** | Yük Dengeleyici | **ELB** (Elastic Load Balancing) | **Load Balancer** | **Cloud Load Balancing** | **Load Balancer** |
| **DNS** | Alan Adı Yönetimi | **Route 53** | **Azure DNS** | **Cloud DNS** | **DNS** |
| **CDN** | İçerik Dağıtım Ağı | **CloudFront** | **Azure CDN** | **Cloud CDN** | **OCI CDN** |
| **Dedicated Line** | Özel Fiziksel Hat | **Direct Connect** | **ExpressRoute** | **Cloud Interconnect** | **FastConnect** |

## 5. DevOps & Araçlar

| Jenerik Kavram | Açıklama | AWS | Azure | Google Cloud (GCP) | Oracle (OCI) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IaC** | Altyapı Kodlama | **CloudFormation** | **ARM Templates** / Bicep | **Deployment Manager** | **Resource Manager** |
| **Git Repo** | Kod Depolama | **CodeCommit** | **Azure Repos** | **Cloud Source Repos** | **DevOps Code Repos** |
| **CI/CD** | Sürekli Entegrasyon | **CodePipeline** | **Azure Pipelines** | **Cloud Build** | **DevOps Build** |
| **Container Registry**| Docker İmaj Deposu | **ECR** | **ACR** | **Artifact Registry** | **OCIR** |

## 6. Güvenlik (Security)

| Jenerik Kavram | Açıklama | AWS | Azure | Google Cloud (GCP) | Oracle (OCI) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Identity** | Kimlik Yönetimi | **IAM** | **Entra ID** (Eski AD) | **Cloud IAM** | **IAM** |
| **Secrets** | Şifre Saklama | **Secrets Manager** | **Key Vault** | **Secret Manager** | **Vault** |
| **WAF** | Web Güvenlik Duvarı | **WAF** | **Web App Firewall** | **Cloud Armor** | **WAF** |
| **DDoS Protection** | Saldırı Koruma | **Shield** | **DDoS Protection** | **Cloud Armor** | **DDoS Protection** |
