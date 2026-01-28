# HRMS Lite - Quick Reference Card

## 🚀 Quick Commands

### Local Development
```bash
# Setup
cd backend && npm install && npm start  # Terminal 1
cd frontend && npm install && npm start # Terminal 2

# Access
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

### Environment Variables
```bash
# Backend (.env)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hrms
NODE_ENV=production

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| POST | `/api/employees` | Create employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/attendance` | Get attendance records |
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/attendance/summary/:id` | Get summary |
| GET | `/api/dashboard/stats` | Get statistics |
| GET | `/api/health` | Health check |

## 🎯 Key Features

✅ Employee Management (CRUD)
✅ Attendance Tracking
✅ Date Filtering
✅ Employee Filtering
✅ Attendance Summary
✅ Dashboard Statistics
✅ Responsive Design
✅ Error Handling

## 🛠️ Tech Stack

**Frontend:** React, React Router, Axios, CSS3
**Backend:** Node.js, Express, MongoDB, Mongoose
**Deploy:** Vercel/Netlify (Frontend), Render/Railway (Backend)

## 📂 File Structure

```
hrms-lite/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API calls
│   └── public/
└── docs/               # Documentation
```

## 🔍 Testing Checklist

- [ ] Add employee (EMP001)
- [ ] Mark attendance (Present)
- [ ] Filter by date
- [ ] Filter by employee
- [ ] View dashboard
- [ ] Check responsiveness
- [ ] Test validation errors

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check URI, IP whitelist |
| CORS error | Verify API URL, no trailing slash |
| Port in use | Change PORT or kill process |
| Build fails | Clear cache, reinstall packages |
| 404 on routes | Check React Router setup |

## 📱 Deployment URLs

**MongoDB Atlas:** https://cloud.mongodb.com
**Render:** https://render.com
**Vercel:** https://vercel.com
**Railway:** https://railway.app
**Netlify:** https://netlify.com

## 💡 Quick Tips

1. Use MongoDB Compass for DB visualization
2. Check browser console for frontend errors
3. Check backend logs for API errors
4. Test API with cURL or Postman
5. Use React DevTools for debugging

## 📚 Documentation

- README.md → Full documentation
- DEPLOYMENT.md → Deployment guide
- QUICKSTART.md → Quick setup
- SETUP_GUIDE.md → Complete guide
- SUBMISSION.md → Project summary

## ✅ Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables set
- [ ] API connectivity tested
- [ ] All features working
- [ ] No console errors

## 🎓 Key Validations

**Employee:**
- Unique ID & Email
- Valid email format
- Min 2 char name

**Attendance:**
- Employee must exist
- No duplicate entries
- Valid date & status

## 📊 Sample Data

```json
// Employee
{
  "employeeId": "EMP001",
  "fullName": "John Doe",
  "email": "john@example.com",
  "department": "Engineering"
}

// Attendance
{
  "employeeId": "EMP001",
  "date": "2025-01-28",
  "status": "Present"
}
```

---

**Need Help?** Check the comprehensive guides in the documentation folder!
