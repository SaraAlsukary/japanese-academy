<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacementTestResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'score',
        'total_questions',
        'determined_level',
        'user_answers',
    ];

    protected $casts = [
        'user_answers' => 'array',
        'score' => 'integer',
        'total_questions' => 'integer',
    ];

    // علاقة النتيجة بالمستخدم
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}