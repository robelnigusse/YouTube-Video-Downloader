# 🎬 YouTube Video Downloader

A simple web application that allows users to download YouTube videos by selecting their preferred video quality.

## 🚀 Features

* Paste a YouTube video URL
* Fetch available video qualities (e.g., 360p, 720p, 1080p)
* Choose your desired quality
* Download the video 

## 🛠️ Tech Stack

### Frontend

* React

### Backend

* Python
* FastAPI
* Video processing library (`yt-dlp`)
  
### DevOps

- Docker  
- Docker Compose 
  

---

## 📦 Getting Started

You can run this project in **two ways**:

---
## 🐳 Option 1: Run with Docker (Recommended)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/youtube-downloader.git
cd youtube-downloader
```
### 2. Build and start containers
```bash
docker-compose up --build
```
### 3. open the app
- Frontend → http://localhost:3000


## 💻 Option 2: Run Locally (Without Docker)

```bash
git clone https://github.com/your-username/youtube-downloader.git
cd YouTube-Video-Downloader

```

### 2. Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Setup Frontend (React)

```bash
cd frontend
npm install
npm start
```

## 🔗 Usage

1. Open the app in your browser
2. Paste a YouTube video URL
3. Click **Analize**
4. Select your preferred video quality
5. Click **Download**

## ⚠️ Disclaimer

This project is for educational purposes only. Downloading copyrighted content without permission may violate YouTube's terms of service.

