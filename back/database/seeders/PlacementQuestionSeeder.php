<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlacementQuestionSeeder extends Seeder
{
    public function run(): void
    {
        // تفريغ الجدول لتجنب تكرار البيانات عند إعادة تشغيل الـ Seed
        DB::table('placement_questions')->truncate();

        $questions = [
            // ==========================================
            // المستوى N5 (مبتدئ)
            // ==========================================
            [
                'type' => 'multiple_choice',
                'question' => 'اختر القراءة الصحيحة بالهيراغانا للكلمة: 日本',
                'options' => json_encode(['にほん', 'にんべん', 'ひほん', 'みほん'], JSON_UNESCAPED_UNICODE),
                'correct_answer' => 'にほん',
                'acceptable_answers' => null,
                'level_weight' => 'N5',
                'points' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'multiple_choice',
                'question' => 'اختر الجسيم (Particle) المناسب للفرغ: わたし（ ）スチューデントです。',
                'options' => json_encode(['は', 'が', 'を', 'に'], JSON_UNESCAPED_UNICODE),
                'correct_answer' => 'は',
                'acceptable_answers' => null,
                'level_weight' => 'N5',
                'points' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'text_input',
                'question' => 'اكتب قراءة الفعل (食べる) بالهيراغانا أو الروماجي:',
                'options' => null,
                'correct_answer' => null,
                'acceptable_answers' => json_encode(['たべる', '食べる', 'taberu'], JSON_UNESCAPED_UNICODE),
                'level_weight' => 'N5',
                'points' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==========================================
            // المستوى N4 (مبتدئ متقدم)
            // ==========================================
            [
                'type' => 'multiple_choice',
                'question' => 'اختر التعبير المناسب للربط: 昨日は雨が降った（ ）、出かけませんでした。',
                'options' => json_encode(['ので', 'けれど', 'でも', 'から'], JSON_UNESCAPED_UNICODE),
                'correct_answer' => 'ので',
                'acceptable_answers' => null,
                'level_weight' => 'N4',
                'points' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'text_input',
                'question' => 'حَوِّل الفعل (行く) إلى صيغة الماضي (Ta-form) بالهيراغانا أو الكانجي أو الروماجي:',
                'options' => null,
                'correct_answer' => null,
                'acceptable_answers' => json_encode(['行った', 'いった', 'itta'], JSON_UNESCAPED_UNICODE),
                'level_weight' => 'N4',
                'points' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==========================================
            // المستوى N3 (متوسط)
            // ==========================================
            [
                'type' => 'multiple_choice',
                'question' => 'اختر التعبير القاعدي المناسب: 彼は日本語を話せる（ ）ならず、英語も上手だ。',
                'options' => json_encode(['ばかり', 'だけ', 'ほど', 'くらい'], JSON_UNESCAPED_UNICODE),
                'correct_answer' => 'ばかり',
                'acceptable_answers' => null,
                'level_weight' => 'N3',
                'points' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==========================================
            // المستوى N2 (فوق المتوسط)
            // ==========================================
            [
                'type' => 'multiple_choice',
                'question' => 'اختر التعبير المناسب: この仕事は経験を問わず、やる気（ ）歓迎します。',
                'options' => json_encode(['次第で', 'のもとに', 'を通じて', 'をこめて'], JSON_UNESCAPED_UNICODE),
                'correct_answer' => '次第で',
                'acceptable_answers' => null,
                'level_weight' => 'N2',
                'points' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==========================================
            // المستوى N1 (متقدم)
            // ==========================================
            [
                'type' => 'multiple_choice',
                'question' => 'اختر التعبير المناسب: どんなに困難な状況にあろう（ ）、諦めるわけにはいかない。',
                'options' => json_encode(['とも', 'と', 'が', 'のに'], JSON_UNESCAPED_UNICODE),
                'correct_answer' => 'とも',
                'acceptable_answers' => null,
                'level_weight' => 'N1',
                'points' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('placement_questions')->insert($questions);
    }
}