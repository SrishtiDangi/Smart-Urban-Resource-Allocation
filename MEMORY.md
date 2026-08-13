# 🧠 MEMORY.md — Project Work Log
> For collaborators joining later — read this first before touching anything!

---

## 📌 What Is This Project?

**Smart Urban Resource Allocation Platform** — an AI-powered full-stack web app that helps municipal corporations predict garbage bin overflow, optimize truck routes, and save fuel/money using Machine Learning.

**Live Repo:** https://github.com/SrishtiDangi/Smart-Urban-Resource-Allocation

---

## 👥 Contributors

| Name | GitHub | Role |
|------|--------|------|
| Srishti Dangi | [@SrishtiDangi](https://github.com/SrishtiDangi) | Project Lead |
| Vanshika | [@Oneshika7](https://github.com/Oneshika7) | Developer |

---

## 🗂️ Project Structure

```
Smart-Urban-Resource-Allocation/
├── backend/                   ← FastAPI Python backend
│   ├── main.py                ← All API routes (auth, predict, history, weather)
│   ├── auth.py                ← JWT token creation + bcrypt password hashing
│   ├── requirements.txt       ← Python dependencies
│   ├── Dockerfile
│   ├── database/
│   │   ├── connection.py      ← SQLAlchemy engine (urban.db)
│   │   ├── database.py        ← DB session + second engine (urban_platform.db)
│   │   └── models.py          ← User, Bin, Prediction, Allocation SQLAlchemy models
│   ├── models/
│   │   ├── overflow_model.pkl ← Primary trained Random Forest model
│   │   ├── rf_model.pkl       ← Secondary trained model
│   │   └── model_columns.pkl  ← Feature column names
│   ├── schemas/
│   │   └── prediction.py      ← Pydantic schema for /predict request
│   └── services/
│       ├── model_service.py   ← ML inference + SHAP explainability
│       ├── economics.py       ← Fuel/money/CO2 savings calculator
│       ├── priority.py        ← Priority level from confidence score
│       ├── recommendation.py  ← Action recommendation from priority
│       └── optimization.py    ← OR-Tools route optimization
│
├── frontend/                  ← React + Vite frontend
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.jsx            ← Router, ThemeProvider, ToastContainer, ProtectedRoute
│   │   ├── index.css          ← Global CSS vars (dark/light theme tokens)
│   │   ├── context/
│   │   │   └── ThemeContext.jsx  ← Dark/light mode state + toggle
│   │   ├── services/
│   │   │   └── api.js         ← All axios API calls
│   │   ├── pages/
│   │   │   ├── Login.jsx/css       ← Login page (JWT auth)
│   │   │   ├── Dashboard.jsx/css   ← Main dashboard
│   │   │   ├── Prediction.jsx/css  ← AI prediction page
│   │   │   ├── Analytics.jsx/css   ← Analytics charts
│   │   │   ├── HistoryPage.jsx/css ← Persistent DB prediction history
│   │   │   ├── Reports.jsx/css     ← PDF + CSV report downloads
│   │   │   ├── Economics.jsx/css   ← Economic analysis
│   │   │   ├── WardMonitoring.jsx  ← Ward map + status
│   │   │   ├── ResourceAllocation.jsx
│   │   │   └── Settings.jsx
│   │   └── components/
│   │       ├── Navbar.jsx/css
│   │       ├── Sidebar.jsx/css     ← Nav + dark mode toggle + logout
│   │       ├── PredictionForm.jsx/css  ← Main AI form with result + SHAP + history
│   │       ├── ShapChart.jsx/css   ← SHAP AI explainability bar chart ⭐
│   │       ├── PredictionHistory.jsx/css ← Session history table
│   │       ├── PageLoader.jsx/css  ← Loading spinner overlay
│   │       ├── DashboardCards.jsx
│   │       ├── WasteChart.jsx
│   │       ├── OverflowPieChart.jsx
│   │       ├── WardTable.jsx
│   │       ├── WeatherWidget.jsx
│   │       ├── CityMap.jsx/css
│   │       ├── EconomicsChart.jsx/css
│   │       ├── TruckRoute.jsx/css
│   │       └── (many more chart components)
│
├── ml/
│   ├── scripts/
│   │   └── train_model.py     ← Random Forest training script
│   └── dataset/
│       ├── generate_data.py   ← IoT data simulator
│       └── simulated_iot_data.csv
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ✅ All Features Built (In Order)

### Phase 1 — Foundation
| # | Feature | Files |
|---|---------|-------|
| 1 | FastAPI backend setup | `backend/main.py` |
| 2 | SQLAlchemy DB + models | `database/models.py`, `connection.py` |
| 3 | ML Random Forest model | `ml/scripts/train_model.py`, `overflow_model.pkl` |
| 4 | React frontend + Vite | `frontend/` |
| 5 | Sidebar Navigation | `Sidebar.jsx` |
| 6 | Dashboard page | `Dashboard.jsx`, `DashboardCards.jsx` |
| 7 | AI Prediction form | `PredictionForm.jsx` |
| 8 | Ward Monitoring + Map | `WardMonitoring.jsx`, `WardMap.jsx`, `CityMap.jsx` |
| 9 | Truck Route component | `TruckRoute.jsx` |
| 10 | Weather Widget | `WeatherWidget.jsx` |
| 11 | Analytics charts | `WasteChart.jsx`, `OverflowPieChart.jsx` etc. |
| 12 | Economic Analysis page | `Economics.jsx`, `EconomicsChart.jsx` |
| 13 | Dockerfiles | `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml` |

### Phase 2 — Auth + Polish
| # | Feature | Files |
|---|---------|-------|
| 14 | `.gitignore` | `.gitignore` |
| 15 | JWT Authentication | `backend/auth.py`, `/register`, `/login`, `/me` endpoints |
| 16 | ProtectedRoute guard | `App.jsx` — redirects to `/login` if no token |
| 17 | Dark / Light Mode | `ThemeContext.jsx`, `Sidebar.jsx` toggle button |
| 18 | Logout button | `Sidebar.jsx` — clears token, redirects to `/login` |
| 19 | CSS variable theming | `index.css` — all colors via `var(--*)` |

### Phase 3 — Completion (Module 1)
| # | Feature | Files |
|---|---------|-------|
| 20 | Toast Notifications (global) | `react-toastify`, wired in `App.jsx` |
| 21 | Loading Animation | `PageLoader.jsx/css` — ring spinner overlay |
| 22 | Prediction History (session) | `PredictionHistory.jsx/css` — in-form table |
| 23 | Report Download (real) | `Reports.jsx` — jsPDF for PDF, Blob for CSV |
| 24 | Full README | `README.md` — setup, API docs, structure |
| 25 | Mobile responsive CSS | Dashboard, Navbar, Sidebar, Reports |

### Phase 4 — Wow Factor (Module 2)
| # | Feature | Files |
|---|---------|-------|
| 26 | **SHAP AI Explainability** ⭐ | `ShapChart.jsx/css`, `model_service.py` |
| 27 | **Persistent History Page** | `HistoryPage.jsx/css`, `/history` API endpoint |
| 28 | **Live Weather API** | `/weather` endpoint, OpenWeatherMap + mock fallback |
| 29 | Save predictions to DB | `main.py` — saves to `Prediction` table on every `/predict` |

---

## 🔌 API Endpoints (Current)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login → JWT token |
| GET | `/me` | ✅ | Current user info |
| GET | `/dashboard` | ❌ | KPI stats |
| POST | `/predict` | ❌ | AI prediction + SHAP + saves to DB |
| GET | `/history?limit=50` | ❌ | Past predictions from DB |
| GET | `/weather` | ❌ | Live weather (or mock fallback) |
| GET | `/waste-trend` | ❌ | Weekly waste data |
| GET | `/overflow-summary` | ❌ | Overflow vs normal counts |
| GET | `/wards` | ❌ | Ward list |

---

## ⚙️ How to Run Locally

### Backend
```bash
cd backend
.venv\Scripts\activate         # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8888
```
> API docs: http://localhost:8888/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
> App: http://localhost:5173

### First-time Setup — Register Admin User
```bash
POST http://localhost:8888/register
{ "username": "admin", "password": "yourpassword", "is_admin": true }
```

---

## 🔑 Important Notes for Collaborators

1. **JWT Secret Key** is hardcoded in `backend/auth.py` → `SECRET_KEY`. Change before deploying!
2. **Weather API** uses mock data by default. To use real weather:
   - Get a free key at https://openweathermap.org
   - Set `OPENWEATHER_API_KEY` in `backend/main.py`
3. **Two DB files exist** — `urban.db` (routes) and `urban_platform.db` (predictions). This is legacy; can be unified later.
4. **ML model file** is `backend/models/overflow_model.pkl` — loaded at server startup.
5. **SHAP** can be slow on first request (explainer initialization). Normal behavior.
6. **Frontend runs on port 5173**, backend on **port 8888**. CORS is configured for `localhost:5173` only.

---

## 🚧 What's Left / Future Work

- [ ] WebSocket real-time dashboard (live bin data updates)
- [ ] Click map ward → auto-fill prediction form
- [ ] Weather API auto-fills temperature + rainfall in prediction form
- [ ] Email alerts when overflow predicted
- [ ] Admin panel (user management)
- [ ] 7-day forecast chart
- [ ] CI/CD with GitHub Actions
- [ ] Deploy: Railway (backend) + Vercel (frontend)
- [ ] GitHub screenshots in README

---

## 📦 Key Dependencies

### Backend (Python)
| Package | Purpose |
|---------|---------|
| `fastapi` | REST API framework |
| `uvicorn` | ASGI server |
| `sqlalchemy` | ORM |
| `scikit-learn` | Random Forest ML |
| `shap` | AI explainability |
| `python-jose` | JWT tokens |
| `passlib[bcrypt]` | Password hashing |
| `httpx` | Async HTTP (weather API) |
| `pandas` | Data processing |
| `ortools` | Route optimization |

### Frontend (Node)
| Package | Purpose |
|---------|---------|
| `react` + `vite` | UI framework |
| `react-router-dom` | Routing + ProtectedRoute |
| `axios` | API calls |
| `chart.js` + `react-chartjs-2` | Charts |
| `leaflet` + `react-leaflet` | Interactive maps |
| `jspdf` | PDF generation |
| `react-toastify` | Toast notifications |
| `lucide-react` | Icons |

---

*Last updated: August 2026 — by Vanshika (@Oneshika7)*
