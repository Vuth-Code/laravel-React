# React with Laravel E-commerce Project Setup Guide

This guide provides instructions for setting up and running the full stack e-commerce application built with React and Laravel.

## System Requirements

- PHP 8.0 or higher
- Composer
- Node.js 16 or higher
- NPM or Yarn
- MySQL/PostgreSQL database
- Laragon (for Windows) or similar local development environment

## Project Structure

The project is divided into two main parts:
- `react-client`: React frontend
- Laravel backend (root directory)

## Backend Setup (Laravel)

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd React_with_lravavel_ecom
   ```

2. **Install PHP dependencies**

   ```bash
   composer install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure Database**

   Edit the `.env` file and set your database connection details:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=ecommerce_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run Migrations**

   ```bash
   php artisan migrate
   ```

6. **Seed the Database (Optional)**

   ```bash
   php artisan db:seed
   ```

7. **Configure CORS**

   The CORS configuration has been set up in `config/cors.php` to allow requests from the frontend.

8. **Start the Laravel Server**

   ```bash
   php artisan serve
   ```

   The backend should now be running at `http://localhost:8000`.

## Frontend Setup (React)

1. **Navigate to the React project directory**

   ```bash
   cd react-client
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure API URL**

   Create or edit `.env` file in the `react-client` directory:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Start the React Development Server**

   ```bash
   npm run dev
   ```

   The frontend should now be running at `http://localhost:3000`.

## Features

The application includes the following features:

- **Product Browsing**: View all products and product details
- **Shopping Cart**: Add, remove, and update quantities of products
- **User Authentication**: Register, login, and logout functionality
- **Checkout**: Complete purchases with PayPal integration
- **Order Management**: View order history and details

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user
- `POST /api/login`: User login
- `POST /api/logout`: User logout

### Products
- `GET /api/products`: Get all products
- `GET /api/products/{id}`: Get a specific product

### Cart & Orders
- `POST /api/orders`: Create a new order
- `GET /api/orders`: Get user's orders
- `GET /api/orders/{id}`: Get specific order details

## Additional Configuration

### PayPal Integration

To enable PayPal checkout:

1. Add your PayPal client ID to the frontend environment:
   ```
   REACT_APP_PAYPAL_CLIENT_ID=your-client-id-here
   ```

2. Ensure the PayPal SDK is properly loaded in the checkout component.

## Troubleshooting

### Common Issues

1. **CORS Errors**: If you encounter CORS issues:
   - Verify the CORS configuration in `config/cors.php`
   - Ensure the frontend includes credentials in API requests
   - Check that backend API routes are properly configured

2. **Database Connection Issues**:
   - Verify database credentials in `.env`
   - Ensure the database server is running

3. **API 500 Errors**:
   - Check Laravel logs in `storage/logs/laravel.log`
   - Verify that all required tables are migrated

## Development Guidelines

- Keep API requests in dedicated service files
- Use context providers for global state management
- Follow the established project patterns for components and styling