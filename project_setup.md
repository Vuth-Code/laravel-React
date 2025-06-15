# Laravel React E-commerce Project Documentation

## Project Overview
This is a full-stack e-commerce application built with Laravel (backend) and React (frontend). The project implements a complete e-commerce system with user authentication, product management, and various business-related features.

## Tech Stack
- **Backend**: Laravel 10.x
- **Frontend**: React
- **Database**: Supports multiple databases (MySQL/MariaDB/PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local storage with public disk configuration
- **API**: RESTful API architecture

## Project Structure

### Backend Components (Laravel)

#### Models
1. **User & Profile**
   - User authentication and profile management
   - One-to-one relationship between User and Profile
   - JWT authentication implementation

2. **Product Management**
   - Products
   - Categories
   - Brands
   - Suppliers

3. **Location Management**
   - Provinces
   - Distance tracking from city

4. **Customer Management**
   - Customer profiles
   - Contact information
   - Address management

#### Key Features

1. **Authentication System**
   - JWT-based authentication
   - User registration and login
   - Profile management with image upload

2. **Product Management**
   - CRUD operations for products
   - Category and brand association
   - Image upload and storage
   - Stock management
   - Price management

3. **Supplier Management**
   - Supplier registration
   - Contact information
   - Website URL tracking
   - Status management

4. **Customer Management**
   - Customer registration
   - Profile management
   - Address tracking
   - Status management

5. **Role-Based Access Control**
   - Role management
   - Permission system
   - Status tracking

### API Endpoints

#### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/list - List users (protected)

#### Products
- GET /api/products - List products
- GET /api/products/{id} - Get product details
- POST /api/products - Create product
- PUT /api/products/{id} - Update product
- DELETE /api/products/{id} - Delete product

#### Categories
- GET /api/categories - List categories
- GET /api/categories/{id} - Get category details
- POST /api/categories - Create category
- PUT /api/categories/{id} - Update category
- DELETE /api/categories/{id} - Delete category

#### Similar CRUD endpoints exist for:
- Brands
- Suppliers
- Customers
- Provinces
- Roles

### Database Structure

The database includes the following key tables:

1. **users**
   - Basic user information
   - Authentication details
   - Email verification

2. **profiles**
   - Extended user information
   - Profile image
   - Contact details

3. **products**
   - Product information
   - Category and brand relationships
   - Stock and price management
   - Image storage

4. **categories**
   - Category management
   - Status tracking
   - Image support

5. **brands**
   - Brand information
   - Country of origin
   - Status management

6. **suppliers**
   - Supplier details
   - Contact information
   - Website tracking

7. **customers**
   - Customer information
   - Contact details
   - Status management

8. **provinces**
   - Location management
   - Distance tracking
   - Status management

## Setup Instructions

### Backend Setup (Laravel)

1. **Environment Setup**
   ```bash
   cd laravel-backend
   cp .env.example .env
   composer install
   php artisan key:generate
   php artisan jwt:secret
   ```

2. **Database Configuration**
   - Configure database credentials in .env file
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

3. **Run Migrations**
   ```bash
   php artisan migrate
   ```

4. **Storage Setup**
   ```bash
   php artisan storage:link
   ```

5. **Start Laravel Server**
   ```bash
   php artisan serve
   ```

### Frontend Setup (React)

1. **Install Dependencies**
   ```bash
   cd react-frontend
   npm install
   ```

2. **Configure Environment**
   - Create .env file with API configuration
   - Set up API base URL

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Security Features

1. **JWT Authentication**
   - Secure token-based authentication
   - Token expiration and refresh
   - Protected routes

2. **File Upload Security**
   - File type validation
   - Size restrictions
   - Secure storage

3. **Input Validation**
   - Request validation for all endpoints
   - Data sanitization
   - Error handling

## Development Guidelines

1. **API Development**
   - Follow RESTful conventions
   - Implement proper error handling
   - Use appropriate HTTP status codes

2. **Database**
   - Use migrations for schema changes
   - Implement proper relationships
   - Follow naming conventions

3. **Security**
   - Validate all inputs
   - Implement proper authentication
   - Secure file uploads

4. **Code Organization**
   - Follow PSR standards
   - Use proper namespacing
   - Maintain clean code structure