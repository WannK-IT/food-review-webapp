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
Route::post('add-post', [PostController::class, 'insert']);
Route::get('get-single-post/{id}', [PostController::class, 'getPostById']);
Route::get('get-post-map-category/{category_id}', [PostController::class, "getPostMapCategory"]);

Route::get('get-category-post', [PostController::class, 'getAllCategoriesPost']);
Route::get('get-relate-post/{id}', [PostController::class, 'getRelatePost']);
Route::get('get-detail-post/{id}', [PostController::class, 'getDetailPost']);
Route::get('get-post-and-user/{id}', [PostController::class, 'getListPostAndUser']);
Route::get('get-list-post-by-user/{id}', [PostController::class, 'getListPostByUser']);
Route::get('count-post-by-user/{id}', [PostController::class, 'countPostByUser']);
Route::get('count-post-by-cate', [PostController::class, 'countPostByCate']);
Route::get('getAllMedia/{user_id}', [PostController::class, 'getAllMediaByUserId']);
Route::get('getAllPostByUser/{user_id}', [PostController::class, 'getAllPostByUserId']);

//get image
Route::get('get-list-image/{id}', [PostController::class, 'getListImage']);
Route::get('get-list-image-by-user/{id}', [PostController::class, 'getListImageByUser']);
//Comment
Route::post('comment', [PostController::class, 'saveComment']);
Route::get('get-list-comment/{id}', [PostController::class, 'getListCommnet']);

// Categories
Route::apiResource('categories', CategoryController::class);
Route::get('get-category-post', [PostController::class, 'getAllCategoriesPost']);
Route::get('get-detail-cate/{id}', [CategoryController::class, 'getDetailCate']);

// User
Route::apiResource('user', UserController::class);
Route::get('get-detail-user/{id}', [UserController::class, 'getDetailUser']);

//PlaceFood
Route::post("add-food-place/{user_id}", [PlaceFoodController::class, 'addNewFoodPlace']);
Route::get("get-all-food-place", [PlaceFoodController::class, 'getAll']);
Route::get('getAllFoodPlaceByUser/{user_id}', [PlaceFoodController::class, 'getAllPlaceFoodByUserId']);



