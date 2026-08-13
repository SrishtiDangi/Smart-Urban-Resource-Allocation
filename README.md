# 🏙️ Smart Urban Resource Allocation Platform

An AI-powered smart city management dashboard that uses Machine Learning to predict garbage bin overflow, optimize truck routes, and reduce operational costs for municipal corporations.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Overflow Prediction** | Random Forest ML model predicts bin overflow based on weather, population, and waste data |
| 📊 **Analytics Dashboard** | Real-time KPI cards, waste trend charts, overflow pie charts |
| 🗺️ **Ward Monitoring** | Interactive ward map with live bin status |
| 🚛 **Truck Route Optimization** | OR-Tools powered route optimization to minimize fuel consumption |
| 💰 **Economic Analysis** | Fuel savings, CO₂ reduction, and cost analysis |
| 📋 **Prediction History** | Track all predictions made in the current session |
| 📄 **Report Download** | Export PDF and CSV reports for waste, predictions, economics, and ward performance |
| 🌙 **Dark / Light Mode** | Full theme toggle with CSS custom properties |
| 🔐 **JWT Authentication** | Secure login with bcrypt password hashing and 24-hour JWT tokens |
| 📱 **Responsive UI** | Works on desktop and mobile |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **React Router** — client-side routing with protected routes
- **Chart.js** + **React-Chartjs-2** — data visualization
- **Leaflet** — interactive maps
- **jsPDF** — PDF report generation
- **React-Toastify** — toast notifications
- **Lucide React** — icons

### Backend
- **FastAPI** — Python REST API
- **SQLAlchemy** + **SQLite** — ORM and database
- **Scikit-learn** — Random Forest ML model
- **python-jose** — JWT token generation
- **passlib + bcrypt** — password hashing
- **OR-Tools** — route optimization

### DevOps
- **Docker** + **Docker Compose** — containerization

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- pip

### 1. Clone the repo
```bash
git clone https://github.com/SrishtiDangi/Smart-Urban-Resource-Allocation.git
cd Smart-Urban-Resource-Allocation
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Linux/Mac

pip install -r requirements.txt
uvicorn main:app --reload --port 8888
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open in browser
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:8888/docs

---

## 🔐 Authentication

Register your first admin user via the API:

```bash
POST http://localhost:8888/register
Content-Type: application/json

{
  "username": "admin",
  "password": "yourpassword",
  "is_admin": true
}
```

Then login at **http://localhost:5173/login**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login and get JWT token |
| GET | `/me` | Get current user info |
| GET | `/dashboard` | Dashboard KPI data |
| POST | `/predict` | AI overflow prediction |
| GET | `/waste-trend` | Weekly waste trend data |
| GET | `/overflow-summary` | Overflow vs normal bin counts |
| GET | `/wards` | Ward data list |

---

## 📁 Project Structure

```
Smart-Urban-Resource-Allocation/
├── backend/
│   ├── auth.py              # JWT auth + bcrypt
│   ├── main.py              # FastAPI app + routes
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── database/
│   │   ├── connection.py    # SQLAlchemy engine
│   │   ├── database.py      # DB session setup
│   │   └── models.py        # User, Bin, Prediction, Allocation models
│   ├── models/
│   │   └── rf_model.pkl     # Trained Random Forest model
│   ├── schemas/
│   │   └── prediction.py    # Pydantic schemas
│   └── services/
│       ├── model_service.py # ML inference
│       ├── economics.py     # Cost/savings calculations
│       ├── priority.py      # Priority classification
│       ├── recommendation.py
│       └── optimization.py  # Route optimization
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Routes + ThemeProvider + ToastContainer
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/           # Dashboard, Prediction, Analytics, Reports...
│   │   ├── components/      # Sidebar, Navbar, Charts, Forms...
│   │   └── services/
│   │       └── api.js       # Axios API client
│   └── Dockerfile
├── ml/
│   ├── scripts/
│   │   └── train_model.py
│   └── dataset/
│       └── simulated_iot_data.csv
└── docker-compose.yml
```

---

## 🐳 Run with Docker

```bash
docker-compose up --build
```

---

## 👩‍💻 Built by

**Srishti Dangi** | [GitHub](https://github.com/SrishtiDangi)