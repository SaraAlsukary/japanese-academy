<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacementQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'question',
        'options',
        'correct_answer',
        'acceptable_answers',
        'level_weight',
        'points',
    ];

    protected $casts = [
        'options' => 'array',
        'acceptable_answers' => 'array',
        'points' => 'integer',
    ];
}