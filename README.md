# School Management System

A comprehensive school management system built with Django, React, and Supabase.

## Project Structure

```
school_management/
├── backend/             # Django backend
│   ├── apps/           # Django applications
│   ├── config/         # Django settings
│   └── requirements.txt
├── frontend/           # React frontend
│   ├── src/
│   └── package.json
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Redis (for Celery)

## Backend Setup

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the backend directory with:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=your-supabase-database-url
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Set up environment variables:
Create a `.env` file in the frontend directory with:
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Start the development server:
```bash
npm start
```

## Features

- Admissions Management
- Student Information System
- Fee Collection
- Expense Management
- Communication & Collaboration
- Reporting & Analytics
- User Management & Security

## Development

- Backend API runs on: http://localhost:8000
- Frontend runs on: http://localhost:3000
- API Documentation: http://localhost:8000/api/docs/

## Testing

Run backend tests:
```bash
python manage.py test
```

Run frontend tests:
```bash
npm test
``` 