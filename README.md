
# AI Code Assistant (Monorepo)

This repository contains a full-stack AI Code Assistant with:

## 1. Backend (FastAPI + StarCoder2)
- Located in `/backend`
- Run with `uvicorn main:app --reload`
- Uses HuggingFace Transformers to serve AI completions

## 2. Frontend (React + Tailwind)
- Located in `/frontend`
- Run with `npm install && npm run dev`
- Connects to the backend API

## 3. VS Code Extension
- Located in `/vscode-extension`
- Provides an editor integration to send code to backend and view suggestions

## Getting Started

### A. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### B. Frontend
```bash
cd frontend
npm install
npm run dev
```

### C. VS Code Extension
```bash
cd vscode-extension
npm install
code .
# Press F5 to launch Extension Host
```

---
To deploy:
- Use Render for backend
- Use Vercel for frontend (set `REACT_APP_API_URL`)
- Publish the VS Code extension with `vsce`

---
