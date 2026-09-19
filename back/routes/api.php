<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// استيراد المتحكمات مع تحديد المجلد الصحيح (Api)
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlacementTestController;

/*
|--------------------------------------------------------------------------
| Public Routes (المسارات العامة - بدون مصادقة)
|--------------------------------------------------------------------------
*/

// المصادقة وإنشاء الحساب
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);

// استعادة كلمة المرور
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-reset-otp', [AuthController::class, 'verifyResetOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


/*
|--------------------------------------------------------------------------
| Authenticated Routes (مسارات تتطلب تسجيل الدخول عبر Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // 1. جلب بيانات المستخدم الحالي
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // 2. إدارة الملف الشخصي (متاحة لكل الأدوار)
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/update-avatar', [AuthController::class, 'updateAvatar']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/delete-account', [AuthController::class, 'deleteAccount']);

    /*
    |--------------------------------------------------------------------------
    | Student & Teacher Routes (اختبار تحديد المستوى)
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:student,teacher,admin')->group(function () {
        // جلب أسئلة الاختبار التفاعلي
        Route::get('/placement-test/questions', [PlacementTestController::class, 'getQuestions']);
        // إرسال الإجابات وحساب المستوى
        Route::post('/placement-test/submit', [PlacementTestController::class, 'submit']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin & Teacher Management Routes (إدارة أسئلة الاختبار ونتائج الطلاب)
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,teacher')->prefix('dashboard')->group(function () {
        // إدارة الأسئلة (إضافة، تعديل، حذف)
        Route::get('/questions', [PlacementTestController::class, 'index']);      // عرض كل الأسئلة
        Route::post('/questions', [PlacementTestController::class, 'store']);      // إضافة سؤال جديد
        Route::put('/questions/{id}', [PlacementTestController::class, 'update']); // تعديل سؤال
        Route::delete('/questions/{id}', [PlacementTestController::class, 'destroy']); // حذف سؤال

        // عرض نتائج تحديد المستوى للطلاب
        Route::get('/results', [PlacementTestController::class, 'getResults']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Only Routes (مسارات خاصة بالمسؤول فقط)
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // إضافة أو تغيير أدوار المستخدمين
        // Route::post('/users/{id}/change-role', [AdminController::class, 'changeUserRole']);
    });

});