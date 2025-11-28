# Backend Architecture & Deployment Plan
# 백엔드 아키텍처 및 배포 계획

## 1. Backend Strategy: Nest.js vs Supabase
## 1. 백엔드 전략: Nest.js 대 Supabase

You requested a backend implementation using either Nest.js or Supabase. Here is a comparison to help you decide.
Nest.js 또는 Supabase를 사용한 백엔드 구현을 요청하셨습니다. 결정을 돕기 위한 비교입니다.

### Option A: Supabase (Recommended for Speed & "One Week" Scope)
### 옵션 A: Supabase (속도 및 "One Week" 범위에 권장)
- **What it is**: A Backend-as-a-Service (BaaS) providing Auth, Database (Postgres), Realtime, and Storage instantly.
- **정의**: 인증, 데이터베이스(Postgres), 실시간, 스토리지를 즉시 제공하는 BaaS(Backend-as-a-Service).
- **Pros**:
    - Extremely fast setup (Login/Auth done in minutes).
    - Built-in Realtime (perfect for "Hot Topics" or "Chat").
    - No need to manage a separate backend server container.
- **장점**:
    - 매우 빠른 설정 (로그인/인증이 몇 분 만에 완료).
    - 내장된 실시간 기능 ("핫토픽"이나 "채팅"에 완벽).
    - 별도의 백엔드 서버 컨테이너를 관리할 필요 없음.
- **Cons**: Less control over custom backend logic compared to a full server.
- **단점**: 전체 서버에 비해 사용자 정의 백엔드 로직에 대한 제어력이 낮음.

### Option B: Nest.js (Recommended for Learning & Enterprise Scale)
### 옵션 B: Nest.js (학습 및 엔터프라이즈 규모에 권장)
- **What it is**: A progressive Node.js framework for building efficient, scalable server-side applications.
- **정의**: 효율적이고 확장 가능한 서버 측 애플리케이션을 구축하기 위한 진보적인 Node.js 프레임워크.
- **Pros**:
    - Full control over architecture (Microservices, etc.).
    - Great integration with Kubernetes (separate pod).
    - Industry standard for large Node.js backends.
- **장점**:
    - 아키텍처에 대한 완전한 제어 (마이크로서비스 등).
    - Kubernetes와의 훌륭한 통합 (별도 파드).
    - 대규모 Node.js 백엔드를 위한 업계 표준.
- **Cons**: Higher complexity. Requires setting up TypeORM/Prisma, Auth Guards, JWT strategy manually.
- **단점**: 더 높은 복잡성. TypeORM/Prisma, Auth Guards, JWT 전략을 수동으로 설정해야 함.

> **Recommendation**: Since you specifically asked for **Kubernetes** and **Linux Server Deployment**, **Nest.js** is the better choice to demonstrate a full "DevOps" pipeline (Frontend Container + Backend Container + DB Container).
> **추천**: **Kubernetes**와 **Linux 서버 배포**를 구체적으로 요청하셨으므로, 전체 "DevOps" 파이프라인(프론트엔드 컨테이너 + 백엔드 컨테이너 + DB 컨테이너)을 시연하기에는 **Nest.js**가 더 나은 선택입니다.

---

## 2. Post-Login Features
## 2. 로그인 후 기능 구현

Once login is established (via Nest.js Auth), we can implement:
로그인이 구축되면(Nest.js Auth를 통해) 다음을 구현할 수 있습니다.

1.  **User Dashboard (사용자 대시보드)**:
    - View login history and active sessions.
    - 로그인 기록 및 활성 세션 보기.
    - Update profile (Avatar, Bio).
    - 프로필 업데이트 (아바타, 소개).
2.  **Personalized News (개인화된 뉴스)**:
    - "Bookmark" news items.
    - 뉴스 항목 "북마크".
    - Recommended news based on reading history (ClickLog).
    - 읽기 기록(ClickLog)을 기반으로 한 추천 뉴스.
3.  **Private Inquiry System (비공개 문의 시스템)**:
    - Already planned: Users post private questions, Admins answer.
    - 이미 계획됨: 사용자가 비공개 질문 등록, 관리자가 답변.
4.  **Role-Based Access Control (RBAC)**:
    - Admin-only pages for analytics (Hot Topics management).
    - 분석을 위한 관리자 전용 페이지 (핫토픽 관리).

---

## 3. Deployment Strategy: Windows Dev to Linux Prod
## 3. 배포 전략: Windows 개발에서 Linux 운영까지

This flow demonstrates a professional CI/CD and deployment pipeline.
이 흐름은 전문적인 CI/CD 및 배포 파이프라인을 보여줍니다.

### Step 1: Development (Windows)
### 1단계: 개발 (Windows)
- Develop Next.js (Frontend) and Nest.js (Backend) locally.
- Next.js(프론트엔드)와 Nest.js(백엔드)를 로컬에서 개발.
- Use `docker-compose.dev.yml` to run Postgres and services together.
- `docker-compose.dev.yml`을 사용하여 Postgres와 서비스를 함께 실행.

### Step 2: Containerization
### 2단계: 컨테이너화
- Create `Dockerfile` for Next.js.
- Next.js용 `Dockerfile` 생성.
- Create `Dockerfile` for Nest.js.
- Nest.js용 `Dockerfile` 생성.
- Build images: `docker build -t my-web .`
- 이미지 빌드: `docker build -t my-web .`

### Step 3: Registry (Transfer to Linux)
### 3단계: 레지스트리 (Linux로 전송)
- **Option A (Easiest)**: Push to Docker Hub (`docker push user/repo`).
- **옵션 A (가장 쉬움)**: Docker Hub에 푸시 (`docker push user/repo`).
- **Option B (Manual)**: Save image to tar (`docker save -o image.tar my-web`) and SCP to Linux server.
- **옵션 B (수동)**: 이미지를 tar로 저장(`docker save -o image.tar my-web`)하고 Linux 서버로 SCP 전송.

### Step 4: Linux Server Setup
### 4단계: Linux 서버 설정
- Install Docker & Kubernetes (K3s or Minikube).
- Docker 및 Kubernetes 설치 (K3s 또는 Minikube).
- **Port 80/443**: Use **Nginx Ingress Controller** or **Traefik**.
- **포트 80/443**: **Nginx Ingress Controller** 또는 **Traefik** 사용.
    - It listens on ports 80/443 and routes traffic:
    - 80/443 포트에서 수신 대기하고 트래픽 라우팅:
        - `example.com` -> Next.js Service
        - `api.example.com` -> Nest.js Service

### Step 5: Kubernetes Deployment
### 5단계: Kubernetes 배포
- Write K8s manifests (`deployment.yaml`, `service.yaml`, `ingress.yaml`).
- K8s 매니페스트 작성 (`deployment.yaml`, `service.yaml`, `ingress.yaml`).
- Apply on Linux: `kubectl apply -f k8s/`.
- Linux에 적용: `kubectl apply -f k8s/`.

---

## Next Steps / 다음 단계

1.  **Confirm Choice**: Shall we proceed with **Nest.js** for the backend?
2.  **선택 확인**: 백엔드로 **Nest.js**를 진행하시겠습니까?
3.  **Setup Nest.js**: I will initialize a new Nest.js project within a `backend` folder.
4.  **Nest.js 설정**: `backend` 폴더 내에 새 Nest.js 프로젝트를 초기화하겠습니다.
5.  **Fix News Page**: I will check the CSS visibility issue immediately.
6.  **뉴스 페이지 수정**: 뉴스 페이지 가시성 문제를 즉시 확인하겠습니다.
