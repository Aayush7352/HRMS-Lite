#!/bin/bash

echo "🚀 HRMS Lite - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend || exit

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your MongoDB connection string"
fi

echo "Installing backend dependencies..."
npm install

echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
cd ../frontend || exit
echo "📦 Setting up Frontend..."

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your backend API URL"
fi

echo "Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""

cd ..

echo "================================"
echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Update frontend/.env with your backend API URL (if different from default)"
echo "3. Start the backend: cd backend && npm start"
echo "4. Start the frontend: cd frontend && npm start"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo "================================"
