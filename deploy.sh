#!/bin/bash
set -e

echo "Starting deployment process..."
echo "==============================="

# Navigate to project root
cd /var/www/ecommerce
echo "Current directory: $(pwd)"

# Pull latest changes
echo "Pulling latest changes from git repository..."
git pull origin pin

# Backend deployment
echo "Deploying Laravel backend..."
cd /var/www/ecommerce/laravel-backend

echo "Installing composer dependencies..."
composer install --no-interaction --optimize-autoloader --no-dev

echo "Setting up environment file if not exists..."
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
fi

echo "Running database migrations..."
php artisan migrate --force

echo "Clearing and caching configurations..."
php artisan config:clear
php artisan config:cache
php artisan route:clear
php artisan route:cache
php artisan view:clear
php artisan view:cache

echo "Creating storage symlink..."
php artisan storage:link

echo "Setting proper permissions..."
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache

# Frontend client deployment
echo "Deploying React client frontend..."
cd /var/www/ecommerce/react-client

echo "Installing npm dependencies..."
npm install

echo "Creating production environment file..."
echo "VITE_API_BASE_URL=http://54.179.0.116:8000/api" > .env.production

echo "Building React client application..."
npm run build

echo "Copying build files to web directory..."
mkdir -p /var/www/client-frontend
cp -r dist/* /var/www/client-frontend/

echo "Setting proper permissions for client frontend..."
chown -R www-data:www-data /var/www/client-frontend

# Admin frontend deployment
echo "Deploying React admin frontend..."
cd /var/www/ecommerce/react-backend

echo "Installing npm dependencies..."
npm install

echo "Creating production environment file..."
echo "VITE_API_BASE_URL=http://54.179.0.116:8000/api" > .env.production

echo "Building React admin application..."
npm run build

echo "Copying build files to web directory..."
mkdir -p /var/www/admin-frontend
cp -r dist/* /var/www/admin-frontend/

echo "Setting proper permissions for admin frontend..."
chown -R www-data:www-data /var/www/admin-frontend

# Restart services
echo "Restarting web services..."
systemctl restart php8.1-fpm
systemctl restart nginx

echo "==============================="
echo "Deployment completed successfully!"
echo "Client frontend: http://54.179.0.116"
echo "Admin frontend: http://admin.54.179.0.116"
echo "API: http://54.179.0.116:8000/api"
echo "==============================="