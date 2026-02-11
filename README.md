# HRMS Lite - Human Resource Management System

A lightweight, full-stack Human Resource Management System for managing employees and tracking attendance.

## 🚀 Live Demo

- **Frontend URL**: https://hrms-lite-nu.vercel.app/
- **Backend API**:  https://hrms-lite-w4c2.onrender.com

## 📋 Features

### Employee Management
- ✅ Add new employees with unique ID, name, email, and department
- ✅ View all employees in a clean, organized table
- ✅ Delete employees (with cascading deletion of attendance records)
- ✅ Input validation and error handling
- ✅ Duplicate employee ID and email detection

### Attendance Management
- ✅ Mark daily attendance (Present/Absent) for employees
- ✅ View all attendance records with employee details
- ✅ Filter attendance by date
- ✅ Filter attendance by employee
- ✅ View attendance summary (total present/absent days per employee)
- ✅ Prevent duplicate attendance entries for same employee on same date

### Dashboard
- ✅ Overview statistics (total employees, attendance records)
- ✅ Today's attendance summary (present/absent count)
- ✅ Department distribution visualization
- ✅ Quick action buttons

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router** 6.21.0 - Client-side routing
- **Axios** 1.6.2 - HTTP client
- **React Icons** 4.12.0 - Icon library
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.0.3 - ODM for MongoDB
- **Validator** 13.11.0 - Input validation
- **CORS** - Cross-origin resource sharing

### Deployment
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway / Heroku
- **Database**: MongoDB Atlas

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5500
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update this to your deployed backend URL.

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment Guide

### Backend Deployment (Render/Railway)

1. **Create a new Web Service** on Render or Railway
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. **Add environment variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: (Usually auto-assigned by the platform)
5. **Deploy** and note your backend URL

### Frontend Deployment (Vercel/Netlify)

1. **Create a new project** on Vercel or Netlify
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Add environment variables**:
   - `REACT_APP_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api`)
5. **Deploy** and note your frontend URL

### MongoDB Atlas Setup

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with password
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to your environment variables

## 📚 API Documentation

### Base URL
```
http://localhost:5500/api
```

### Endpoints

#### Employees

**Get all employees**
```http
GET /api/employees
```

**Get single employee**
```http
GET /api/employees/:id
```

**Create employee**
```http
POST /api/employees
Content-Type: application/json

{
  "employeeId": "EMP001",
  "fullName": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

**Delete employee**
```http
DELETE /api/employees/:id
```

#### Attendance

**Get all attendance records**
```http
GET /api/attendance
GET /api/attendance?employeeId=EMP001
GET /api/attendance?date=2025-01-28
```

**Get attendance summary for employee**
```http
GET /api/attendance/summary/:employeeId
```

**Mark attendance**
```http
POST /api/attendance
Content-Type: application/json

{
  "employeeId": "EMP001",
  "date": "2025-01-28",
  "status": "Present"
}
```

#### Dashboard

**Get dashboard statistics**
```http
GET /api/dashboard/stats
```

**Health check**
```http
GET /api/health
```

## 🎨 UI/UX Features

- Clean, modern, and professional design
- Responsive layout (mobile, tablet, desktop)
- Loading states for async operations
- Empty states with helpful messages
- Error handling with user-friendly messages
- Form validation with inline error display
- Modal dialogs for data entry
- Filter functionality for better data management
- Badge components for status indicators
- Smooth transitions and hover effects

## 🔒 Validation & Error Handling

### Employee Validation
- Employee ID: Required, unique
- Full Name: Required, minimum 2 characters
- Email: Required, valid format, unique
- Department: Required

### Attendance Validation
- Employee ID: Required, must exist
- Date: Required
- Status: Required (Present/Absent)
- No duplicate attendance for same employee on same date

### Error Responses
All API errors return structured JSON:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical details (in development)"
}
```

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── models/
│   │   ├── Employee.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── employees.js
│   │   ├── attendance.js
│   │   └── dashboard.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Dashboard.css
│   │   │   ├── Employees.js
│   │   │   ├── Employees.css
│   │   │   ├── Attendance.js
│   │   │   └── Attendance.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## 🎯 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required as per requirements)
- All dates are stored in UTC
- Employee IDs are case-insensitive (converted to uppercase)
- Email addresses are case-insensitive (converted to lowercase)

### Limitations
- No user authentication/authorization
- No edit functionality for employees (can delete and re-add)
- No edit functionality for attendance records
- No advanced reporting or analytics
- No file upload/download features
- No role-based access control
- No audit logging

### Future Enhancements (Out of Scope)
- User authentication and authorization
- Edit employee and attendance records
- Advanced filtering and search
- Export data to CSV/Excel
- Email notifications
- Leave management
- Payroll integration
- Performance reviews
- Document management
- Multi-tenancy support

## 🐛 Known Issues
- None at the moment

## 📝 Development Notes

### Database Schema

**Employee Schema**
```javascript
{
  employeeId: String (unique, uppercase),
  fullName: String,
  email: String (unique, lowercase),
  department: String,
  timestamps: true
}
```

**Attendance Schema**
```javascript
{
  employeeId: String (ref: Employee),
  date: Date,
  status: String (enum: ['Present', 'Absent']),
  timestamps: true
}
```

## 🤝 Contributing
This is an assignment project and is not open for contributions.

## 📄 License
MIT License - This project is created for educational and assignment purposes.

## 👨‍💻 Author
Aayush Dixit.


---

**Note**: Please update the Live Demo URLs, MongoDB connection string, and deployment-specific configurations before submitting.
