# Quick Start Guide

## 🎯 For Local Development

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)

### Quick Setup (5 minutes)

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hrms-lite
```

2. **Run setup script** (Linux/Mac)
```bash
chmod +x setup.sh
./setup.sh
```

Or manually:

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm start
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default: http://localhost:5000/api)
npm start
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🚀 For Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Links
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas (Free tier)
- **Render** (Backend): https://render.com (Free tier)
- **Vercel** (Frontend): https://vercel.com (Free tier)

## 📖 First Steps After Setup

1. **Add an Employee**
   - Click "Employees" in navigation
   - Click "Add Employee" button
   - Fill in the form and submit

2. **Mark Attendance**
   - Click "Attendance" in navigation
   - Click "Mark Attendance" button
   - Select employee, date, and status
   - Submit

3. **View Dashboard**
   - Click "Dashboard" to see statistics
   - View employee count, attendance summary
   - See department distribution

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hrms-lite
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms-lite
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## 📝 API Testing

Test the backend API:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all employees
curl http://localhost:5000/api/employees

# Create employee
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@example.com",
    "department": "Engineering"
  }'
```

## 🐛 Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Ensure port 5000 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Check browser console for CORS errors

**Database connection failed:**
- For local MongoDB: Ensure MongoDB service is running
- For MongoDB Atlas: Check IP whitelist and credentials

## 📚 Documentation

- [README.md](README.md) - Full project documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- API documentation available in README.md

## 💡 Tips

1. Use MongoDB Compass to view your database
2. Use browser DevTools Network tab to debug API calls
3. Check backend console for error logs
4. Use React DevTools for frontend debugging

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)

Happy coding! 🚀
