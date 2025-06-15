<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
Route::get('products/{id}/image', [ProductController::class, 'getImage']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);

// User profile image route - public access
Route::get('users/{id}/profile/{image}', [UserController::class, 'getProfileImage']);

// JWT Auth routes
Route::post('auth/register', [AuthController::class, 'store']);
Route::post('auth/login', [AuthController::class, 'login']);

// JWT authenticated user route
Route::get('user/profile', function (Request $request) {
    return response()->json($request->user()->load('profile'));
})->middleware('auth:api');

Route::middleware('auth:api')->group(function(){
    // Role Route
    Route::get('role', [RoleController::class, 'index']);
    Route::get('role/{id}', [RoleController::class, 'show']);
    Route::post('role', [RoleController::class, 'store']);
    Route::put('role/{id}', [RoleController::class, 'update']);
    Route::delete('role/{id}', [RoleController::class, 'destroy']);

    // Brand Route
    Route::get('brands', [BrandController::class, 'index']);
    Route::get('brands/{id}', [BrandController::class, 'show']);
    Route::post('brands', [BrandController::class, 'store']);
    Route::put('brands/{id}', [BrandController::class, 'update']);
    Route::delete('brands/{id}', [BrandController::class, 'destroy']);

    // Province Route
    Route::get('provinces', [ProvinceController::class, 'index']);
    Route::get('provinces/{id}', [ProvinceController::class, 'show']);
    Route::post('provinces', [ProvinceController::class, 'store']);
    Route::put('provinces/{id}', [ProvinceController::class, 'update']);
    Route::delete('provinces/{id}', [ProvinceController::class, 'destroy']);

    // Supplier Route
    Route::get('suppliers', [SupplierController::class, 'index']);
    Route::get('suppliers/{id}', [SupplierController::class, 'show']);
    Route::post('suppliers', [SupplierController::class, 'store']);
    Route::put('suppliers/{id}', [SupplierController::class, 'update']);
    Route::delete('suppliers/{id}', [SupplierController::class, 'destroy']);

    // Customer Route
    Route::get('customers', [CustomerController::class, 'index']);
    Route::get('customers/{id}', [CustomerController::class, 'show']);
    Route::post('customers', [CustomerController::class, 'store']);
    Route::put('customers/{id}', [CustomerController::class, 'update']);
    Route::delete('customers/{id}', [CustomerController::class, 'destroy']);

    // Category Route - protected operations
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    // Product Route - protected operations
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    // Auth Route
    Route::get('auth/list', [AuthController::class, 'index']);

    // User Route
    Route::post('users/{id}/profile/image', [UserController::class, 'updateProfileImage']);

    // Order Routes
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
});



//Route
// Route::method_name('uri', 'callback_function');
// method_name: get, post, put, delete, patch, options
// uri: api/product, api/customer ....
// callback_function: function() { request $request; {return $request->usrt();}

// Route::get('product', function(){
//     return 'Product List';
// });
// Route::post('product', function(){
//     return 'Product Create';
// });
// Route::put('product', function(){
//     return 'Product Update';
// });
// Route::delete('product', function(){
//     return 'Product delete';
// });

// -testing brower:
// http://localhost:8000/api/product
// http://localhost:8000/api/customer
// http://localhost:8000/api/employee
// -testing postman:
// GET: http://localhost:8000/api/product
// GET: http://localhost:8000/api/customer

