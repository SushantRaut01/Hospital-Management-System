Hospital Management System – Full Project Structure
===================================================

📁 hospital-management-system/
│
├── 📁 backend/                       # Django Project Root
│   ├── manage.py                    # Django entry point
│   ├── db.sqlite3                   # SQLite database file
│
│   ├── 📁 config/                   # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py             # Installed apps, DB, middleware config
│   │   ├── urls.py                 # Project URL routes (includes apps)
│   │   ├── asgi.py
│   │   └── wsgi.py
│
│   ├── 📁 assistant/                # Assistant Panel App
│   │   ├── __init__.py
│   │   ├── admin.py                # Admin interface config (optional)
│   │   ├── models.py               # Patient model (name, age, status, etc.)
│   │   ├── views.py                # Backend logic for assistant (CRUD)
│   │   ├── urls.py                 # Routes like /api/assistant/add/
│   │   ├── serializers.py          # Convert model <-> JSON (DRF)
│   │   └── 📁 migrations/          # Auto-generated database migrations
│
│   ├── 📁 doctor/                   # Doctor Panel App
│   │   ├── __init__.py
│   │   ├── models.py (optional)    # Only if doctor has separate models
│   │   ├── views.py                # Logic for doctor to fetch patients, add prescriptions
│   │   ├── urls.py                 # Routes like /api/doctor/
│   │   ├── serializers.py          # Doctor data serialization
│   │   └── 📁 migrations/
│
│   └── 📁 static/ (optional)       # Static files if using Django to serve some frontend
│
├── 📁 frontend/                    # React Frontend App
│   ├── package.json               # Node dependencies and scripts
│   ├── vite.config.js             # Or webpack config if you're not using Vite
│   ├── 📁 public/                 # Static assets like favicon, index.html
│   └── 📁 src/                    # React source code
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Main routing and layout
│       ├── 📁 Pages/
│       │   ├── AssistantDashboard.jsx   # Page for Assistant panel
│       │   ├── DoctorDashboard.jsx     # Page for Doctor panel
│       │   └── ...
│       ├── 📁 components/        # Shared reusable UI components
│       ├── 📁 api/               # Axios or Fetch functions to call Django APIs
│       └── 📁 styles/ (optional) # CSS or Tailwind config
│
├── 📄 README.md                  # Project overview and setup instructions
└── 📄 requirements.txt           # Django and backend Python dependencies
