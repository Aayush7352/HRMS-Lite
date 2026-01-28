# Deployment Instructions for HRMS Lite

## Quick Deployment Steps

### Step 1: Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with a strong password
4. Add IP address `0.0.0.0/0` to whitelist (for development)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/hrms-lite`)

### Step 2: Deploy Backend to Render

1. Create account on [Render](https://render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `hrms-lite-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `NODE_ENV` = `production`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://hrms-lite-backend.onrender.com`)

### Step 3: Deploy Frontend to Vercel

1. Create account on [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL` = Your backend URL + `/api` (e.g., `https://hrms-lite-backend.onrender.com/api`)
6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. Your app is live!

## Alternative: Deploy Backend to Railway

1. Create account on [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
5. Add Variables:
   - `MONGODB_URI` = Your MongoDB connection string
   - `NODE_ENV` = `production`
6. Deploy and get your URL

## Alternative: Deploy Frontend to Netlify

1. Create account on [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add Environment Variables:
   - `REACT_APP_API_URL` = Your backend URL + `/api`
6. Click "Deploy site"

## Testing Your Deployment

1. Open your frontend URL
2. Try adding an employee
3. Try marking attendance
4. Check the dashboard

## Troubleshooting

### Backend Issues
- **Database connection failed**: Check MongoDB Atlas IP whitelist and connection string
- **Server not starting**: Check environment variables are set correctly
- **CORS errors**: Ensure CORS is enabled in backend (already configured)

### Frontend Issues
- **Can't connect to backend**: Verify `REACT_APP_API_URL` is correct
- **Build failed**: Run `npm run build` locally to test
- **Page not loading**: Check browser console for errors

### Common Fixes
1. Verify all environment variables are set
2. Check that MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
3. Ensure backend URL in frontend includes `/api` at the end
4. Wait a few minutes after deployment for services to fully start

## Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms-lite
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Free Tier Limits

- **MongoDB Atlas**: 512 MB storage (sufficient for this app)
- **Render**: Apps sleep after 15 min of inactivity (first request will be slow)
- **Vercel**: Unlimited deployments and bandwidth
- **Railway**: 500 hours/month free tier

## Post-Deployment Checklist

✅ Backend is accessible at `/api/health`  
✅ Frontend loads without errors  
✅ Can create employees  
✅ Can mark attendance  
✅ Dashboard shows statistics  
✅ No CORS errors in browser console  
✅ All environment variables are set  

## Support

If you encounter issues:
1. Check the deployment logs in Render/Vercel
2. Verify MongoDB connection
3. Test API endpoints directly using browser or Postman
4. Check browser console for frontend errors

Good luck with your deployment! 🚀
