<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;
use App\Mail\SendResetOtpMail;

class AuthController extends Controller
{
    // 🔹 Register
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'nullable',
            'age' => 'nullable|integer',
            'gender' => 'nullable',
            'country' => 'nullable',
            'education_level' => 'nullable',
            'japanese_level' => 'nullable',
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'يجب كتابة بريد إلكتروني صحيح.',
            'password.required' => 'كلمة المرور مطلوبة.',
            'password.min' => 'يجب أن لا تقل كلمة المرور عن 8 أحرف.',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق.',
            'first_name.required' => 'الاسم الأول مطلوب.',
            'last_name.required' => 'الاسم الأخير مطلوب.',
            'age.integer' => 'العمر يجب أن يكون رقماً.',
        ]);

        $otp = rand(100000, 999999);
        $user = User::where('email', $request->email)->first();

        if ($user) {
            // المستخدم موجود ومفعل
            if ($user->email_verified_at) {
                return response()->json([
                    'message' => 'البريد الإلكتروني مسجل بالفعل. يمكنك تسجيل الدخول مباشرة.'
                ], 400);
            }

            // غير مفعل → تحديث البيانات وإرسال OTP جديد
            $user->update([
                'otp' => $otp,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'age' => $request->age,
                'gender' => $request->gender,
                'country' => $request->country,
                'education_level' => $request->education_level,
                'japanese_level' => $request->japanese_level,
                'otp_expires_at' => now()->addMinutes(10),
                'password' => Hash::make($request->password),
            ]);
        } else {
            // مستخدم جديد
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'age' => $request->age,
                'gender' => $request->gender,
                'country' => $request->country,
                'education_level' => $request->education_level,
                'japanese_level' => $request->japanese_level,
                'otp' => $otp,
                'otp_expires_at' => now()->addMinutes(10)
            ]);
        }

        Mail::to($user->email)->send(new SendOtpMail($otp));

        return response()->json([
            'message' => 'تم تسجيل حسابك بنجاح، يرجى إدخال رمز التحقق لتأكيد الحساب.'
        ]);
    }

    // 🔹 Verify OTP
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required'
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.',
            'otp.required' => 'رمز التحقق مطلوب.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود.'], 404);
        }

        if ($user->otp !== $request->otp) {
            return response()->json(['message' => 'رمز التحقق غير صحيح.'], 400);
        }

        if (now()->gt($user->otp_expires_at)) {
            return response()->json(['message' => 'انتهت صلاحية رمز التحقق.'], 400);
        }

        $user->email_verified_at = now();
        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'تم التحقق من البريد الإلكتروني وتفعيل الحساب بنجاح.',
            'token' => $token,
            'user' => $user
        ]);
    }

    // 🔹 Profile
    public function profile()
    {
        return auth()->user();
    }

    // 🔹 Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.',
            'password.required' => 'كلمة المرور مطلوبة.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json(['message' => 'يرجى تفعيل البريد الإلكتروني أولاً قبل تسجيل الدخول.'], 403);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    // 🔹 Resend OTP
    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود.'], 404);
        }

        $otp = rand(100000, 999999);

        $user->otp = $otp;
        $user->otp_expires_at = now()->addMinutes(10);
        $user->save();

        Mail::to($user->email)->send(new SendOtpMail($otp));

        return response()->json(['message' => 'تم إعادة إرسال رمز التحقق بنجاح.']);
    }

    // 🔹 Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح.']);
    }

    // 🔹 Forgot Password
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود.'], 404);
        }

        $otp = rand(100000, 999999);

        $user->reset_otp = $otp;
        $user->reset_otp_expires_at = now()->addMinutes(10);
        $user->save();

        Mail::to($user->email)->send(new SendResetOtpMail($otp));

        return response()->json([
            'message' => 'تم إرسال كود إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.'
        ]);
    }

    // 🔹 Verify Reset OTP
    public function verifyResetOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required'
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.',
            'otp.required' => 'رمز التحقق مطلوب.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود.'], 404);
        }

        if ($user->reset_otp !== $request->otp) {
            return response()->json(['message' => 'رمز التحقق غير صحيح.'], 400);
        }

        if (now()->gt($user->reset_otp_expires_at)) {
            return response()->json(['message' => 'انتهت صلاحية رمز التحقق.'], 400);
        }

        return response()->json([
            'message' => 'تم التحقق من رمز إعادة التعيين بنجاح.'
        ]);
    }

    // 🔹 Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
            'password' => 'required|min:6|confirmed'
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.',
            'otp.required' => 'رمز التحقق مطلوب.',
            'password.required' => 'كلمة المرور الجديدة مطلوبة.',
            'password.min' => 'كلمة المرور يجب أن لا تقل عن 6 أحرف.',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'المستخدم غير موجود.'], 404);
        }

        if ($user->reset_otp !== $request->otp) {
            return response()->json(['message' => 'رمز التحقق غير صحيح.'], 400);
        }

        if (now()->gt($user->reset_otp_expires_at)) {
            return response()->json(['message' => 'انتهت صلاحية رمز التحقق.'], 400);
        }

        $user->password = Hash::make($request->password);
        $user->reset_otp = null;
        $user->reset_otp_expires_at = null;
        $user->save();

        return response()->json([
            'message' => 'تم إعادة تعيين كلمة المرور بنجاح.'
        ]);
    }
}