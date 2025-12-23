# 📚 Cấu Trúc Dự Án Debate Arena

## 🎯 Tổng Quan

**Debate Arena** là một ứng dụng web cho phép người dùng tạo và tham gia các cuộc tranh luận trực tuyến theo thời gian thực. Dự án được xây dựng với kiến trúc **Full-Stack**:

- **Frontend**: React + TypeScript (Port 3001)
- **Backend**: NestJS + TypeScript (Port 3000)
- **Database**: MySQL
- **Real-time**: Socket.IO

---

## 📁 Cấu Trúc Thư Mục

```
debate-arena/
├── frontend/          # React Frontend Application
├── backend/           # NestJS Backend API
└── PROJECT_STRUCTURE.md
```

---

## 🎨 Frontend (`/frontend`)

### Công Nghệ
- **React 19** với TypeScript
- **React Router** cho routing
- **Axios** cho HTTP requests
- **Socket.IO Client** cho real-time
- **Tailwind CSS** + Custom CSS
- **Framer Motion** cho animations

### Cấu Trúc Chi Tiết

```
frontend/src/
├── App.tsx                    # Main app component với routing
├── index.tsx                  # Entry point, setup providers
│
├── pages/                     # Các trang chính
│   ├── Home.jsx              # Trang chủ - danh sách rooms
│   ├── Login.jsx             # Đăng nhập
│   ├── Register.jsx          # Đăng ký
│   ├── Profile.jsx           # Hồ sơ người dùng
│   ├── CreateRoom.jsx        # Tạo phòng debate
│   ├── JoinRoom.jsx          # Tham gia phòng
│   ├── RoomLobby.jsx         # Phòng chờ trước khi debate
│   ├── DebateRoom.jsx        # Màn hình debate chính
│   └── ResultScreen.tsx      # Màn hình kết quả
│
├── components/                # React Components
│   ├── layout/               # Layout components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── PageWrapper.tsx  # Wrapper cho pages
│   │
│   ├── ui/                   # UI Components (33 files)
│   │   ├── Button.tsx       # Button component
│   │   ├── Card.tsx         # Card component
│   │   ├── Modal.tsx        # Modal dialog
│   │   ├── Input.tsx        # Input field
│   │   ├── Spinner.tsx      # Loading spinner
│   │   ├── Toast.tsx        # Toast notification
│   │   ├── Timer.jsx        # Debate timer
│   │   ├── VotingPanel.jsx  # Voting interface
│   │   ├── DebaterPanel.jsx # Debater info panel
│   │   ├── TurnIndicator.jsx # Turn indicator
│   │   ├── RaiseHand.tsx    # Raise hand component
│   │   ├── RaisedHandsList.tsx # Questions list
│   │   ├── PageLoader.tsx   # Full screen loader
│   │   ├── LoadingButton.tsx # Button với loading state
│   │   └── RoomCardSkeleton.tsx # Skeleton loader
│   │
│   ├── auth/                 # Auth components
│   │   └── AuthLayout.jsx   # Layout cho auth pages
│   │
│   └── templates/            # Component templates
│       └── ComponentTemplate.jsx # Template mẫu
│
├── context/                   # React Context Providers
│   ├── AuthContext.tsx       # Authentication state
│   └── ToastContext.tsx      # Toast notifications
│
├── hooks/                     # Custom React Hooks
│   ├── useSocket.ts          # Socket.IO hook
│   ├── useRoomState.ts       # Room state management
│   ├── useDebateTimer.ts     # Timer logic
│   └── useToast.ts           # Toast hook
│
├── services/                   # API Services
│   ├── api.ts                # Axios instance & API calls
│   └── auth.ts               # Authentication service
│
├── socket/                     # Socket.IO
│   └── socket.ts             # Socket connection setup
│
├── styles/                     # CSS Files
│   ├── globals.css           # Global styles
│   ├── designSystem.css      # Design system variables
│   ├── home.css              # Home page styles
│   ├── debateRoom.css        # Debate room styles
│   ├── roomLobby.css         # Lobby styles
│   └── ...                   # Other page styles
│
├── utils/                      # Utilities
│   └── designSystem.md       # Design system docs
│
└── types/                      # TypeScript types
```

### Luồng Hoạt Động Frontend

1. **Entry Point** (`index.tsx`):
   - Setup React root
   - Wrap app với `AuthProvider` và `ToastProvider`

2. **Routing** (`App.tsx`):
   - Định nghĩa tất cả routes
   - Mỗi route được wrap trong `PageWrapper`

3. **State Management**:
   - **Context API**: Auth, Toast
   - **Local State**: useState cho component state
   - **Socket.IO**: Real-time updates

4. **Component Hierarchy**:
   ```
   App
   ├── AuthProvider
   ├── ToastProvider
   └── Routes
       └── PageWrapper
           └── Page Components
   ```

---

## ⚙️ Backend (`/backend`)

### Công Nghệ
- **NestJS** (Node.js framework)
- **TypeORM** cho database ORM
- **MySQL** database
- **Socket.IO** cho WebSocket
- **JWT** cho authentication
- **Passport** cho auth strategies
- **bcrypt** cho password hashing

### Cấu Trúc Chi Tiết

```
backend/src/
├── main.ts                    # Entry point, bootstrap app
├── app.module.ts              # Root module
├── app.controller.ts          # Root controller
├── app.service.ts             # Root service
│
├── auth/                      # Authentication Module
│   ├── auth.module.ts
│   ├── auth.controller.ts    # Login, Register endpoints
│   └── auth.service.ts       # Auth logic, JWT
│
├── users/                     # Users Module
│   ├── users.module.ts
│   ├── users.controller.ts   # User CRUD
│   └── users.service.ts       # User business logic
│
├── rooms/                     # Rooms Module
│   ├── rooms.module.ts
│   ├── rooms.controller.ts   # Room management
│   └── rooms.service.ts       # Room logic
│
├── topics/                    # Topics Module
│   ├── topics.module.ts
│   ├── topics.controller.ts  # Topic CRUD
│   └── topics.service.ts     # Topic logic
│
├── debates/                   # Debates Module
│   ├── debates.module.ts
│   ├── debates.controller.ts # Debate management
│   └── debates.service.ts    # Debate logic
│
├── votes/                     # Votes Module
│   ├── votes.module.ts
│   ├── votes.controller.ts   # Voting endpoints
│   └── votes.service.ts      # Vote logic
│
├── chat/                      # Chat Module
│   └── chat.module.ts        # Chat functionality
│
├── events/                    # WebSocket Gateway
│   └── events.gateway.ts     # Socket.IO events
│
└── database/
    └── schema.sql            # Database schema
```

### Module Pattern (NestJS)

Mỗi module trong NestJS có cấu trúc:
- **Module**: Đăng ký dependencies
- **Controller**: Xử lý HTTP requests
- **Service**: Business logic
- **Entity** (nếu có): Database models

### Database Schema

```sql
users          # Người dùng
topics         # Chủ đề debate
rooms          # Phòng debate
participants   # Người tham gia phòng
debates        # Nội dung debate
votes          # Phiếu bầu
chat_messages  # Tin nhắn chat
```

---

## 🔄 Luồng Hoạt Động Tổng Thể

### 1. Authentication Flow
```
User → Login/Register → Backend (JWT) → Frontend (AuthContext)
```

### 2. Room Creation Flow
```
User → CreateRoom → Backend API → Database → Socket.IO → All Users
```

### 3. Debate Flow
```
Room Lobby → Start Debate → DebateRoom → Real-time Updates (Socket.IO)
```

### 4. Voting Flow
```
Debate Ends → VotingPanel → Backend → Database → ResultScreen
```

---

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`#9333ea` → `#a855f7`)
- **Secondary**: Teal (`#14b8a6`)
- **Success**: Green (`#10b981`)
- **Error**: Red (`#ef4444`)
- **Warning**: Yellow (`#f59e0b`)

### Components
- Tuân thủ design system trong `designSystem.css`
- Sử dụng CSS variables
- Responsive design
- Accessibility support

---

## 🔌 Real-time Communication

### Socket.IO Events

**Client → Server:**
- `join-room`: Tham gia phòng
- `leave-room`: Rời phòng
- `raise-hand`: Đặt câu hỏi
- `chat-message`: Gửi tin nhắn
- `vote`: Bỏ phiếu

**Server → Client:**
- `user-joined`: User mới tham gia
- `user-left`: User rời đi
- `hand-raised`: Câu hỏi mới
- `chat-message`: Tin nhắn mới
- `vote-updated`: Cập nhật vote

---

## 📦 Dependencies Chính

### Frontend
- `react`, `react-dom`: UI framework
- `react-router-dom`: Routing
- `axios`: HTTP client
- `socket.io-client`: WebSocket
- `framer-motion`: Animations

### Backend
- `@nestjs/core`: NestJS framework
- `@nestjs/typeorm`: Database ORM
- `@nestjs/websockets`: WebSocket support
- `socket.io`: WebSocket server
- `mysql2`: MySQL driver
- `bcrypt`: Password hashing
- `@nestjs/jwt`: JWT authentication

---

## 🚀 Cách Chạy Dự Án

### Backend
```bash
cd backend
npm install
npm run start:dev  # Port 3000
```

### Frontend
```bash
cd frontend
npm install
npm start  # Port 3001
```

### Database
- Setup MySQL
- Chạy `schema.sql` để tạo tables
- Cấu hình trong `.env` (backend)

---

## 📝 Notes

1. **Development Mode**: 
   - Backend: `synchronize: true` (auto sync DB schema)
   - Frontend: Hot reload enabled

2. **Production**:
   - Build frontend: `npm run build`
   - Build backend: `npm run build`
   - Disable `synchronize` trong production

3. **Environment Variables**:
   - Backend cần `.env` với DB credentials
   - Frontend có thể cần API URL config

---

## 🎯 Tính Năng Chính

✅ User Authentication (JWT)  
✅ Room Management (Create, Join)  
✅ Real-time Debate với Timer  
✅ Voting System  
✅ Chat trong phòng  
✅ Raise Hand (Đặt câu hỏi)  
✅ Results Screen với animations  
✅ Toast Notifications  
✅ Loading States  
✅ Responsive Design  

---

## 📚 Tài Liệu Tham Khảo

- `frontend/src/utils/designSystem.md`: Design system guide
- `frontend/src/COMPONENT_TEMPLATE_GUIDE.md`: Component template
- Component `.example.tsx` files: Usage examples

---

**Tác giả**: Debate Arena Team  
**Cập nhật**: 2024




