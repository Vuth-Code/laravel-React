# AWS EC2 Hosting Guide for E-commerce Application

This guide provides clear, step-by-step instructions for deploying your Laravel backend and React frontend on an AWS EC2 instance.

## Table of Contents

1. [AWS Account and EC2 Setup](#1-aws-account-and-ec2-setup)
2. [Connect to Your EC2 Instance](#2-connect-to-your-ec2-instance)
3. [Install Required Software](#3-install-required-software)
4. [Configure MySQL Database](#4-configure-mysql-database)
5. [Deploy Laravel Backend](#5-deploy-laravel-backend)
6. [Deploy React Frontend](#6-deploy-react-frontend)
7. [Configure Nginx](#7-configure-nginx)
8. [Verify Your Deployment](#8-verify-your-deployment)
9. [Troubleshooting](#9-troubleshooting)

## 1. AWS Account and EC2 Setup

### Create an AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Click "Create an AWS Account" and follow the signup process
3. Provide payment information (required even for free tier)
4. Complete the identity verification process

### Launch an EC2 Instance
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/)
2. Search for "EC2" in the search bar and select it
3. Click the orange "Launch instance" button
4. Enter a name for your instance (e.g., "Ecommerce-App")
5. Select an Amazon Machine Image (AMI):
   - Choose "Ubuntu Server 22.04 LTS" (64-bit x86)
6. Select an Instance Type:
   - For testing: t2.micro (free tier eligible)
   - For production: t2.small or larger
7. Create a key pair:
   - Click "Create new key pair"
   - Enter a name for your key pair
   - Select RSA and .pem format
   - Click "Create key pair" and save the .pem file securely
8. Configure network settings:
   - Click "Edit" in the Network Settings section
   - Ensure "Auto-assign public IP" is set to "Enable"
   - Create a security group with the following rules:
     - Allow SSH (port 22) from your IP address
     - Allow HTTP (port 80) from anywhere (0.0.0.0/0)
     - Allow HTTPS (port 443) from anywhere (0.0.0.0/0)
     - Add custom TCP rule for port 8000 from anywhere (0.0.0.0/0)
     - Add custom TCP rule for port 8080 from anywhere (0.0.0.0/0)
9. Configure storage:
   - Set at least 20GB for production use
10. Review your settings and click "Launch instance"

### Allocate an Elastic IP (Recommended)
1. In the EC2 Dashboard, click "Elastic IPs" in the left sidebar
2. Click "Allocate Elastic IP address"
3. Select "Amazon's pool of IPv4 addresses" and click "Allocate"
4. Select the newly allocated IP, click "Actions" and then "Associate Elastic IP address"
5. Select your EC2 instance and click "Associate"
6. Note down this Elastic IP - you'll use it to access your application

## 2. Connect to Your EC2 Instance

### For Windows Users
1. Download and install PuTTY from [putty.org](https://www.putty.org/)
2. Convert your .pem file to .ppk format using PuTTYgen:
   - Open PuTTYgen
   - Click "Load" and select your .pem file
   - Click "Save private key" and save as .ppk file
3. Open PuTTY and configure:
   - In the "Host Name" field, enter: `ubuntu@your-elastic-ip`
   - In the left sidebar, navigate to Connection > SSH > Auth > Credentials
   - Click "Browse" and select your .ppk file
   - Go back to the Session category, enter a name in "Saved Sessions" and click "Save"
4. Click "Open" to connect

### For Mac/Linux Users
1. Open Terminal
2. Set permissions for your key file:
   ```bash
   chmod 400 /path/to/your-key-pair.pem
   ```
3. Connect to your instance:
   ```bash
   ssh -i /path/to/your-key-pair.pem ubuntu@your-elastic-ip
   ```

## 3. Install Required Software

After connecting to your EC2 instance, you'll need to install and configure all the necessary software.

### Update System Packages
```bash
# Update package lists and upgrade existing packages
sudo apt update && sudo apt upgrade -y
```

### Install Web Server and Database
```bash
# Install Nginx web server and MySQL database
sudo apt install -y nginx mysql-server
```

### Install PHP and Required Extensions
```bash
# Install PHP and necessary extensions for Laravel
sudo apt install -y php-fpm php-mysql php-mbstring php-xml php-bcmath php-curl php-zip unzip
```

### Check PHP Version
```bash
# Check which PHP version was installed
php -v
```
Note the PHP version (e.g., 8.1, 8.2) - you'll need this for configuration.

### Configure PHP Settings
```bash
# Edit PHP configuration (replace 8.1 with your actual PHP version)
sudo nano /etc/php/8.1/fpm/php.ini
```

Find and modify these settings:
- `upload_max_filesize = 64M`
- `post_max_size = 64M`
- `memory_limit = 256M`
- `max_execution_time = 60`

Save and exit (Ctrl+X, then Y, then Enter).

### Restart PHP-FPM
```bash
# Restart PHP-FPM (replace 8.1 with your actual PHP version)
sudo systemctl restart php8.1-fpm
```

### Install Composer (PHP Package Manager)
```bash
# Download and install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### Install Node.js and npm
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

### Install Git
```bash
# Install Git for version control
sudo apt install -y git
```

## 4. Configure MySQL Database

### Secure MySQL Installation
```bash
# Run the MySQL secure installation script
sudo mysql_secure_installation
```

Follow the prompts:
1. When asked about the VALIDATE PASSWORD COMPONENT, choose 'Y' (Yes)
2. Choose password validation policy level (0 = LOW, 1 = MEDIUM, 2 = STRONG) - select 1
3. Set a strong root password and remember it
4. Answer 'Y' (Yes) to all remaining questions:
   - Remove anonymous users
   - Disallow root login remotely
   - Remove test database
   - Reload privilege tables

### Create Database and User for Your Application
```bash
# Login to MySQL as root
sudo mysql -u root -p
# Enter the root password you created

# Create database and user (copy and paste these commands)
CREATE DATABASE ecommerce_db;
CREATE USER 'laravel'@'localhost' IDENTIFIED BY 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'laravel'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

> **IMPORTANT**: Replace 'YourStrongPassword123!' with a secure password. Write it down - you'll need it later.

### Verify Database Connection
```bash
# Test connection with the new user
mysql -u laravel -p
# Enter the password you created

# Check if you can see the database
SHOW DATABASES;
# You should see ecommerce_db listed

# Exit MySQL
EXIT;
```

### Import Existing Database (Optional)
If you have an existing database dump file (.sql) that you want to import:

1. From your local machine, transfer the file to your EC2 instance:
   ```bash
   # Run this on your LOCAL machine, not on EC2
   scp -i /path/to/your-key-pair.pem /path/to/your_database_dump.sql ubuntu@your-elastic-ip:/home/ubuntu/
   ```

2. On your EC2 instance, import the database:
   ```bash
   # Import the database dump
   mysql -u laravel -p ecommerce_db < /home/ubuntu/your_database_dump.sql
   ```

## 5. Deploy Laravel Backend

### Create Project Directory
```bash
# Create directory for your application
sudo mkdir -p /var/www/ecommerce
sudo chown -R ubuntu:ubuntu /var/www/ecommerce
```

### Clone Your Repository
```bash
# Navigate to the project directory
cd /var/www/ecommerce

# Clone your repository (replace with your actual repository URL)
git clone https://github.com/Holydavid66/React_with_lravavel_ecom.git .

# Check the structure
ls -la
```

You should see directories like:
- `laravel-backend` (Laravel API)
- `react-backend` (Admin Panel)
- `react-client` (Customer Frontend)

### Set Up Laravel Backend
```bash
# Navigate to Laravel backend directory
cd /var/www/ecommerce/laravel-backend

# Install Composer dependencies
composer install --optimize-autoloader --no-dev

# Create environment file
cp .env.example .env
```

### Configure Laravel Environment
```bash
# Edit the .env file
nano .env
```

Update these important settings:
```
APP_ENV=production
APP_DEBUG=false
APP_URL=http://54.179.0.116:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_db
DB_USERNAME=laravel
DB_PASSWORD=YourStrongPassword123!

# If you're using mail features, configure these:
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@example.com
MAIL_FROM_NAME="${APP_NAME}"

# If you're using PayPal, configure these:
PAYPAL_MODE=sandbox
PAYPAL_SANDBOX_CLIENT_ID=your-sandbox-client-id
PAYPAL_SANDBOX_CLIENT_SECRET=your-sandbox-client-secret
```

> **IMPORTANT**: Replace 'YourStrongPassword123!' with the actual MySQL password you created earlier.

### Generate Application Keys
```bash
# Generate Laravel application key
php artisan key:generate

# Generate JWT secret (if your app uses JWT)
php artisan jwt:secret
```

### Set Proper File Permissions
```bash
# Set ownership and permissions
sudo chown -R www-data:www-data /var/www/ecommerce/laravel-backend
sudo chmod -R 755 /var/www/ecommerce/laravel-backend
sudo chmod -R 777 /var/www/ecommerce/laravel-backend/storage
sudo chmod -R 777 /var/www/ecommerce/laravel-backend/bootstrap/cache
```

### Run Database Migrations
```bash
# Run migrations to set up database tables
php artisan migrate --force
```

### Optimize Laravel for Production
```bash
# Cache configuration for better performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### Find PHP-FPM Socket Path
```bash
# List available PHP-FPM sockets
ls /var/run/php/
```

Note the socket name that matches your PHP version (e.g., `php8.1-fpm.sock`). You'll need this for Nginx configuration.

## 6. Deploy React Frontend

### Build React Client Frontend
```bash
# Navigate to the React client directory
cd /var/www/ecommerce/react-client

# Install dependencies
npm install

# Create production environment file with your API URL
echo "VITE_API_BASE_URL=http://54.179.0.116/:8000" > .env.production

# Build the React application
npm run build

# Create directory for the built files
sudo mkdir -p /var/www/client-frontend

# Copy build files to the web directory
sudo cp -r dist/* /var/www/client-frontend/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/client-frontend
```

### Build React Admin Frontend
```bash
# Navigate to the React admin directory
cd /var/www/ecommerce/react-backend

# Install dependencies
npm install

# Create production environment file with your API URL
echo "VITE_API_BASE_URL=http://54.179.0.116/:8000" > .env.production

# Build the React application
npm run build

# Create directory for the built files
sudo mkdir -p /var/www/admin-frontend

# Copy build files to the web directory
sudo cp -r dist/* /var/www/admin-frontend/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/admin-frontend
```

## 7. Configure Nginx

Now we'll set up Nginx to serve your Laravel API and React applications.

### Configure Nginx for Laravel Backend API
```bash
# Create Nginx configuration file for Laravel API
sudo nano /etc/nginx/sites-available/laravel-api
```

Copy and paste this configuration (replace placeholders with your values):
```nginx
server {
    listen 8000;
    server_name 54.179.0.116;
    root /var/www/ecommerce/laravel-backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        # Replace php8.1-fpm.sock with your actual PHP version
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Configure Nginx for Client Frontend
```bash
# Create Nginx configuration file for client frontend
sudo nano /etc/nginx/sites-available/client-frontend
```

Copy and paste this configuration (replace placeholders with your values):
```nginx
server {
    listen 80;
    server_name 54.179.0.116;
    root /var/www/client-frontend;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff|woff2)$ {
        expires max;
        add_header Cache-Control "public, immutable";
    }
}
```

### Configure Nginx for Admin Frontend
```bash
# Create Nginx configuration file for admin frontend
sudo nano /etc/nginx/sites-available/admin-frontend
```

Copy and paste this configuration (replace placeholders with your values):
```nginx
server {
    listen 8080;
    server_name 54.179.0.116;
    root /var/www/admin-frontend;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff|woff2)$ {
        expires max;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable All Sites and Restart Nginx
```bash
# Enable all sites
sudo ln -s /etc/nginx/sites-available/laravel-api /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/client-frontend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin-frontend /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If the test is successful, restart Nginx
sudo systemctl restart nginx
```

## 8. Verify Your Deployment

After completing all the setup steps, it's time to verify that everything is working correctly.

### Check Nginx Status
```bash
# Check if Nginx is running
sudo systemctl status nginx

# If it's not running, start it
sudo systemctl start nginx
```

### Test Laravel API
Open your web browser and navigate to:
```
http://54.179.0.116:8000/api/products
```

You should see a JSON response with your products data. If you see an error:
- Check Laravel logs: `sudo tail -f /var/www/ecommerce/laravel-backend/storage/logs/laravel.log`
- Verify Nginx configuration: `sudo nginx -t`
- Check PHP-FPM status: `sudo systemctl status php8.1-fpm` (replace with your PHP version)

### Test Client Frontend
Open your web browser and navigate to:
```
http://your-elastic-ip
```

You should see your e-commerce store frontend. If you see the default Nginx page instead:
- Make sure your client-frontend Nginx configuration is correct
- Verify that the React build files were copied to the correct location
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### Test Admin Panel
Open your web browser and navigate to:
```
http://54.179.0.116:8080
```

You should see the admin login page. Log in with your admin credentials.

## 9. Troubleshooting

### Common Issues and Solutions

#### Default Nginx Page Shows Instead of Your Application
If you see the "Welcome to nginx!" page:

1. Check if your Nginx configuration files are enabled:
   ```bash
   ls -la /etc/nginx/sites-enabled/
   ```

2. Make sure the default Nginx site is disabled:
   ```bash
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo systemctl restart nginx
   ```

3. Verify your application files exist in the correct location:
   ```bash
   ls -la /var/www/client-frontend/
   ls -la /var/www/admin-frontend/
   ```

#### 502 Bad Gateway Error
This usually indicates a problem with PHP-FPM:

1. Check PHP-FPM status:
   ```bash
   sudo systemctl status php8.1-fpm
   ```

2. Verify the PHP-FPM socket path in your Nginx configuration matches the actual socket:
   ```bash
   ls /var/run/php/
   ```

3. Update the socket path in your Nginx configuration if needed:
   ```bash
   sudo nano /etc/nginx/sites-available/laravel-api
   # Update the fastcgi_pass line with the correct socket
   sudo systemctl restart nginx
   ```

#### Database Connection Issues
If your application can't connect to the database:

1. Verify MySQL is running:
   ```bash
   sudo systemctl status mysql
   ```

2. Check your .env file has the correct database credentials:
   ```bash
   nano /var/www/ecommerce/laravel-backend/.env
   ```

3. Test the database connection directly:
   ```bash
   mysql -u laravel -p
   # Enter your password
   USE ecommerce_db;
   SHOW TABLES;
   ```

#### CORS Issues
If your frontend can't communicate with your API:

1. Check Laravel CORS configuration:
   ```bash
   nano /var/www/ecommerce/laravel-backend/config/cors.php
   ```

2. Make sure your API URL in the React .env.production file is correct:
   ```bash
   cat /var/www/ecommerce/react-client/.env.production
   cat /var/www/ecommerce/react-backend/.env.production
   ```

3. Rebuild the React applications if needed:
   ```bash
   cd /var/www/ecommerce/react-client
   npm run build
   sudo cp -r dist/* /var/www/client-frontend/
   ```

### Checking Logs
Always check logs when troubleshooting:

```bash
# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Laravel logs
sudo tail -f /var/www/ecommerce/laravel-backend/storage/logs/laravel.log

# System logs
sudo journalctl -xe
```

---

## Congratulations!

Your e-commerce application is now deployed on AWS EC2. Here's a quick summary of what you've accomplished:

1. Set up an AWS EC2 instance with all necessary software
2. Configured MySQL database for your application
3. Deployed your Laravel backend API
4. Built and deployed your React frontend applications
5. Configured Nginx to serve all components
6. Set up proper security and access controls

### Next Steps

To maintain your application properly:

1. **Set Up Regular Backups**
   ```bash
   # Create a backup script
   sudo nano /usr/local/bin/backup.sh
   ```

   Add this content:
   ```bash
   #!/bin/bash
   TIMESTAMP=$(date +"%Y%m%d%H%M%S")
   BACKUP_DIR="/home/ubuntu/backups"

   # Create backup directory
   mkdir -p $BACKUP_DIR

   # Backup database
   mysqldump -u laravel -p'YourStrongPassword123!' ecommerce_db > $BACKUP_DIR/db_backup_$TIMESTAMP.sql

   # Compress backup
   tar -czf $BACKUP_DIR/backup_$TIMESTAMP.tar.gz $BACKUP_DIR/db_backup_$TIMESTAMP.sql /var/www/ecommerce/laravel-backend/storage/app

   # Clean up old backups (keep last 7 days)
   find $BACKUP_DIR -type f -name "backup_*.tar.gz" -mtime +7 -delete
   ```

   Make it executable and add to cron:
   ```bash
   sudo chmod +x /usr/local/bin/backup.sh
   crontab -e
   ```

   Add this line to run daily at 2 AM:
   ```
   0 2 * * * /usr/local/bin/backup.sh
   ```

2. **Set Up Laravel Scheduler**
   If your application uses Laravel's scheduler:
   ```bash
   crontab -e
   ```

   Add this line:
   ```
   * * * * * cd /var/www/ecommerce/laravel-backend && php artisan schedule:run >> /dev/null 2>&1
   ```

3. **Keep Your Server Updated**
   Regularly update your server with security patches:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Monitor Your Application**
   Install basic monitoring tools:
   ```bash
   sudo apt install -y htop iotop
   ```

5. **Consider Adding a Domain Name**
   For a more professional setup, consider purchasing a domain name and configuring it with your EC2 instance.

### Security Recommendations

1. **Set Up a Firewall**
   ```bash
   sudo apt install -y ufw
   sudo ufw allow ssh
   sudo ufw allow http
   sudo ufw allow https
   sudo ufw allow 8000
   sudo ufw allow 8080
   sudo ufw enable
   ```

2. **Install Fail2Ban to Prevent Brute Force Attacks**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

3. **Consider Setting Up SSL**
   Even without a domain name, you can use self-signed certificates for testing:
   ```bash
   sudo apt install -y certbot
   ```

Remember to regularly check your application logs and server performance to ensure everything continues to run smoothly.

For any issues or questions, refer to the AWS documentation or seek help from the Laravel and React communities.

Good luck with your e-commerce application!












