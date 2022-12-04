<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PlaceFoodController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth with Laravel Sanctum
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Auth
Route::post("login", [AuthController::class, 'login']);
Route::post("register", [AuthController::class, 'register']);
Route::post("logout", [AuthController::class, 'logout']);
Route::post("checkPassword", [AuthController::class, 'checkPassword']);

// Auth with Laravel Passport
Route::middleware('auth:api')->group(function() {
    
});
// Posts
Route::apiResource('posts', PostController::class);
Route::get('get-category-post', [PostController::class, 'getAllCategoriesPost']);

// Categories
Route::apiResource('categories', CategoryController::class);

// User
Route::apiResource('user', UserController::class);

//PlaceFood
Route::post("add-food-place/{user_id}", [PlaceFoodController::class, 'addNewFoodPlace']);
Route::get("get-all-food-place", [PlaceFoodController::class, 'getAll']);



