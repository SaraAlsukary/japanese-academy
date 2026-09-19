<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, HasApiTokens, InteractsWithMedia;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'education_level',
        'japanese_level',
        'gender',
        'age',
        'country',
        'reset_otp_expires_at',
        'reset_otp',
        'otp',
        'otp_expires_at',
        'email_verified_at'
    ];

    protected $hidden = [
        'password',
        'otp',
        'reset_otp',
        'remember_token',
        'media', // إخفاء كائن الميديا الخام لتخفيف الحجم
    ];

    // إضافة رابط الصورة تلقائياً لبيانات المستخدم
    protected $appends = ['avatar_url'];

    /**
     * تحديد مجموعة الوسائط للصورة الشخصية (تقتصر على صورة واحدة فقط)
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
             ->singleFile();
    }

    /**
     * Accessor لجلب رابط الصورة المباشر
     */
    public function getAvatarUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('avatar') ?: null;
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}