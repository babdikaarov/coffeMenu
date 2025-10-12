#!/bin/bash

# ReactCoffeMenu Development Startup Script
# This script starts both Vite dev server and DecapCMS proxy

echo "🚀 Starting ReactCoffeMenu with DecapCMS..."
echo ""
echo "📦 Starting Vite dev server..."
npm run dev &
VITE_PID=$!

echo "⏳ Waiting for Vite to start..."
sleep 3

echo "🎨 Starting DecapCMS proxy server..."
npm run cms &
CMS_PID=$!

echo ""
echo "✅ Both servers started!"
echo ""
echo "📍 URLs:"
echo "   - Website:  http://localhost:5173"
echo "   - CMS Admin: http://localhost:5173/admin"
echo ""
echo "💡 Press Ctrl+C to stop both servers"
echo ""

# Trap Ctrl+C and kill both processes
trap "echo ''; echo '🛑 Stopping servers...'; kill $VITE_PID $CMS_PID 2>/dev/null; exit" INT TERM

# Wait for both processes
wait
