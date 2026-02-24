# Digital Medical Assistant (DMA) 🏥

A full-stack mobile application designed to assist with medical data tracking and AI-driven health insights. This project features a robust **NestJS backend** and a cross-platform **React Native frontend**.

---

## 🏗 Project Structure

- **`dma-api/`**: NestJS Backend (REST API, Prisma ORM, PostgreSQL)  
- **`dma-f/`**: React Native Mobile App (Expo, Axios)

---

## 🛠 Tech Stack

| Component         | Technology                     |
|------------------|--------------------------------|
| **Frontend**      | React Native, Expo, Axios      |
| **Backend**       | NestJS (Node.js framework)     |
| **Database**      | PostgreSQL via Docker          |
| **ORM**           | Prisma                         |
| **Authentication**| JWT (JSON Web Tokens)          |

---

## 🚀 Getting Started

Follow these steps to set up your development environment.

### 1. Prerequisites
- **Node.js**: v20.x (LTS)  
- **Docker Desktop**: To run the database container  
- **Git**: To manage version control  

### 2. Backend Setup (`dma-api`)
```bash
cd dma-api
npm install                # Install dependencies
docker-compose up -d       # Start PostgreSQL container
npx prisma migrate dev     # Push database schema
npm run start:dev          # Start development server

### 2. Frontend Setup (`dma-f`)
```bash
cd ../dma-f
npm install                # Install dependencies
npx expo start             # Start the mobile app

Important: Update your API connection.git add README.md
Replace the IP address with your laptop's local IP (e.g., 192.168.x.x)

🔒 Security Note
This project uses several API keys (OpenAI, Google, NewsAPI). These are not included in the repository for security reasons.
To enable these features:
Locate environments.ts
Replace the PASTE_YOUR_KEY_HERE placeholders with your own valid API keys.

## 📝 License
This project was developed for academic purposes at VGTU.