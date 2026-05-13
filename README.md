## 📋 Resume Analyser
Resume Analyser is a **full-stack AI-powered resume analysis platform** that helps job candidates improve their resumes and prepare for interviews. It uses Google Generative AI to analyze resumes against job descriptions and generate personalized feedback.

![Preview](https://github.com/user-attachments/assets/3e9bc8e9-9154-4036-bcd4-a5100e285bcf)

---

### **🎯 Core Features**
1. **User Authentication** — Register/login with JWT tokens and HTTP-only cookies
2. **Resume Analysis** — Upload PDF resumes and get AI-powered analysis
3. **Interview Preparation** — Auto-generated technical and behavioral interview questions
4. **Skill Gap Analysis** — Identifies missing skills with severity levels
5. **Interview Prep Plan** — Multi-day preparation timeline with daily tasks
6. **Match Scoring** — Rates candidate fit (0-100) for the job role

---

### **🏗️ Tech Stack**

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 + Radix UI |
| **State** | Zustand + React Query |
| **Backend** | Express.js + TypeScript |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + Bcrypt |
| **AI** | Google Generative AI (Gemini 3.1 Flash) |
| **File Processing** | Multer + pdf-parse |

---

### **📁 Architecture**

**Frontend** (frontend)
- Pages: Home, Login, Register, Report, Profile
- Components: Navbar, GenerateResumeReport form, Radix UI components
- Services: Axios instance, Auth API, Resume Report API
- State: User store (Zustand)

**Backend** (backend)
- Controllers: Auth, Resume Report generation
- Models: User (with password hashing), Resume Report
- Repositories: Database access layer
- Services: AI integration with Google Generative AI
- Middleware: Auth verification, file upload handling
- Routes: `/api/auth/*`, `/api/resume/*`

---

### **🔄 Main Workflow**
1. User registers/logs in
2. Uploads resume (PDF) + job description + self-description
3. Backend extracts PDF text → sends to Google AI
4. AI generates structured analysis:
   - Interview questions (technical & behavioral)
   - Skill gaps analysis
   - Preparation plan
   - Resume issues & improvements
5. Report displayed on frontend + stored in MongoDB

---

### **📊 Data Models**

**User**
- Email, password (bcrypt), displayName, timestamps

**Resume Report**
- User reference, resume text, job description
- Match score, technical/behavioral questions
- Skill gaps, preparation plan, identified issues

---

### **🔐 Security**
- JWT authentication with token blacklisting
- Bcrypt password hashing
- CORS restricted to frontend
- Input validation with Zod schemas
- Protected API routes

---

### **✨ Notable Features**
- Full TypeScript type safety (frontend + backend)
- AI-powered structured output validation
- Auto-login on app load
- Toast notifications for user feedback
- Modern responsive UI with Tailwind CSS
- Efficient PDF text extraction

---

### **📈 Current State**
- ✅ Complete authentication system
- ✅ Resume upload & PDF processing
- ✅ AI integration for analysis
- ✅ Report generation & display
- 🔄 UI improvements in progress (modern design, accordion for questions)
