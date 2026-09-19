<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * التحقق من صلاحية ودور المستخدم
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles الأدوار المسموح لها بالتمرير
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. التأكد من تسجيل دخول المستخدم
        if (! $request->user()) {
            return response()->json([
                'message' => 'غير مصرح لك بالوصول، يرجى تسجيل الدخول أولاً.'
            ], 401);
        }

        // 2. فحص ما إذا كان دور المستخدم ضمن الأدوار المسموح بها
        if (! in_array($request->user()->role, $roles)) {
            return response()->json([
                'message' => 'عذراً، ليس لديك الصلاحيات الكافية للوصول لهذا العرض.'
            ], 403);
        }

        return $next($request);
    }
}