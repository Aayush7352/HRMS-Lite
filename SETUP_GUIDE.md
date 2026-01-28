# HRMS Lite - Complete Setup & Deployment Guide

## 🎯 Overview

This guide will help you set up, run locally, and deploy the HRMS Lite application.

## 📦 What's Included

```
hrms-lite/
├── backend/                 → Node.js/Express API
├── frontend/               → React Application  
├── README.md               → Project documentation
├── DEPLOYMENT.md           → Deployment instructions
├── QUICKSTART.md          → Quick setup guide
├── SUBMISSION.md          → Project summary
└── setup.sh               → Automated setup script
```

## 🚀 Quick Start (3 Steps)

### Step 1: Extract & Setup

```bash
# Extract the archive
tar -xzf hrms-lite-complete.tar.gz
cd hrms-lite

# Run setup script (Linux/Mac)
chmod +x setup.sh
./setup.sh
```

### Step 2: Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env and add:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hrms-lite
NODE_ENV=production
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
# For local development, default is fine:
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

## 🌐 Production Deployment

### Option A: Automated Deployment (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy Backend (Render)**
   - Go to render.com
   - New Web Service → Connect GitHub
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add env: `MONGODB_URI`, `NODE_ENV=production`

3. **Deploy Frontend (Vercel)**
   - Go to vercel.com
   - New Project → Import from GitHub
   - Root Directory: `frontend`
   - Add env: `REACT_APP_API_URL=<backend-url>/api`

### Option B: Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions.

## 📝 Environment Variables

### Required for Backend
```env
MONGODB_URI=<your-mongodb-connection-string>
NODE_ENV=production
PORT=5000  # Optional, defaults to 5000
```

### Required for Frontend
```env
REACT_APP_API_URL=<backend-url>/api
# Local: http://localhost:5000/api
# Production: https://your-app.onrender.com/api
```

## 🔧 MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# Mac
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # Mac
```

### MongoDB Atlas (Recommended for Production)
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster
3. Database Access → Add user
4. Network Access → Add IP (0.0.0.0/0 for testing)
5. Connect → Get connection string
6. Update MONGODB_URI in .env

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend health: `<backend-url>/api/health`
- [ ] Frontend loads without errors
- [ ] Can add new employee
- [ ] Can mark attendance
- [ ] Dashboard shows statistics
- [ ] No CORS errors in console

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
```bash
# Check connection string format
mongodb+srv://username:password@cluster.mongodb.net/dbname

# Verify username/password
# Check IP whitelist in MongoDB Atlas
```

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

### Frontend Issues

**Can't Connect to Backend**
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check REACT_APP_API_URL
echo $REACT_APP_API_URL

# Rebuild with new env
npm run build
```

**CORS Errors**
- Backend has CORS enabled
- Verify API URL doesn't have trailing slash
- Check browser console for exact error

### Common Solutions

1. **Clear npm cache**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **Update all packages**
```bash
npm update
```

3. **Check logs**
```bash
# Backend logs
cd backend && npm start

# Frontend logs (console)
# Open browser DevTools → Console
```

## 📊 Testing the Application

### Manual Testing

1. **Create Employee**
   - Navigate to "Employees"
   - Click "Add Employee"
   - Fill: EMP001, John Doe, john@test.com, Engineering
   - Submit

2. **Mark Attendance**
   - Navigate to "Attendance"
   - Click "Mark Attendance"
   - Select employee, today's date, Present
   - Submit

3. **View Dashboard**
   - Navigate to "Dashboard"
   - Verify employee count
   - Check attendance statistics

### API Testing with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get employees
curl http://localhost:5000/api/employees

# Create employee
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@test.com",
    "department": "Engineering"
  }'

# Get attendance
curl http://localhost:5000/api/attendance
```

## 🎓 Key Features to Test

- [x] Add employee with validation
- [x] Duplicate employee prevention
- [x] Delete employee
- [x] Mark attendance
- [x] Filter by date
- [x] Filter by employee
- [x] View summary statistics
- [x] Dashboard analytics
- [x] Responsive design
- [x] Error handling

## 📱 Responsive Testing

Test on different devices:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Use Chrome DevTools → Toggle device toolbar

## 🔐 Security Notes

- No authentication required (as per assignment)
- Input validation on both client and server
- MongoDB injection prevention via Mongoose
- Email format validation
- Duplicate prevention
- CORS enabled for API access

## 📚 Additional Resources

- **React Docs**: https://react.dev
- **Express Guide**: https://expressjs.com
- **MongoDB Manual**: https://docs.mongodb.com
- **Mongoose**: https://mongoosejs.com

## 💡 Pro Tips

1. **Use MongoDB Compass** for database visualization
2. **Enable React DevTools** for debugging
3. **Check Network tab** in browser DevTools for API calls
4. **Use Postman** for API testing
5. **Enable ESLint** for code quality

## 🎯 Success Criteria

Your deployment is successful when:
✅ Frontend loads at your URL
✅ Backend API responds to health check
✅ Can create employees
✅ Can mark attendance
✅ Dashboard shows data
✅ No errors in console

## 📞 Need Help?

1. Check documentation:
   - README.md for features
   - DEPLOYMENT.md for deployment
   - QUICKSTART.md for setup

2. Review error messages:
   - Backend console logs
   - Browser DevTools console
   - Deployment platform logs

3. Verify configuration:
   - Environment variables
   - MongoDB connection
   - API URLs

## 🎉 You're All Set!

Your HRMS Lite application should now be:
- ✅ Running locally or deployed
- ✅ Connected to MongoDB
- ✅ Fully functional
- ✅ Ready for use

**Congratulations!** 🚀

---

For detailed documentation, see:
- [README.md](README.md) - Complete documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [SUBMISSION.md](SUBMISSION.md) - Project summary
