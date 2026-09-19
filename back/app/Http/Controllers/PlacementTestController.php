<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PlacementQuestion;
use App\Models\PlacementTestResult;
use Illuminate\Http\Request;

class PlacementTestController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | 1. واجهات الطالب (Student APIs)
    |--------------------------------------------------------------------------
    */

    /**
     * جلب أسئلة الاختبار للطلاب (تُخفى منها الإجابات الصحيحة)
     */
    public function getQuestions()
    {
        $questions = PlacementQuestion::select('id', 'type', 'question', 'options', 'level_weight')
            ->inRandomOrder()
            ->get();

        return response()->json($questions);
    }

    /**
     * تصحيح الاختبار وتحديد مستوى الطالب
     */
    public function submit(Request $request)
    {
        $request->validate([
            'answers' => 'required|array', // ['question_id' => 'user_answer']
        ]);

        $user = $request->user();
        $userAnswers = $request->answers;
        $score = 0;

        $questions = PlacementQuestion::whereIn('id', array_keys($userAnswers))->get();

        foreach ($questions as $q) {
            $userAns = trim($userAnswers[$q->id] ?? '');

            if ($q->type === 'multiple_choice') {
                if (mb_strtolower($userAns) === mb_strtolower($q->correct_answer)) {
                    $score += $q->points;
                }
            } elseif ($q->type === 'text_input') {
                // المطابقة مع قائمة الإجابات المقبولة
                $acceptable = array_map('mb_strtolower', $q->acceptable_answers ?? []);
                if (in_array(mb_strtolower($userAns), $acceptable)) {
                    $score += $q->points;
                }
            }
        }

        $totalQuestions = count($questions);
        $determinedLevel = $this->calculateJapaneseLevel($score, $totalQuestions);

        // 1. تحديث مستوى المستخدم في جدول users
        $user->update([
            'japanese_level' => $determinedLevel,
        ]);

        // 2. تسجيل النتيجة التفصيلية في جدول placement_test_results
        PlacementTestResult::create([
            'user_id' => $user->id,
            'score' => $score,
            'total_questions' => $totalQuestions,
            'determined_level' => $determinedLevel,
            'user_answers' => $userAnswers,
        ]);

        return response()->json([
            'message' => 'تم تقييم الاختبار بنجاح',
            'score' => $score,
            'total_questions' => $totalQuestions,
            'japanese_level' => $determinedLevel,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | 2. واجهات لوحة التحكم للأدمن والمعلمين (Admin / Teacher APIs)
    |--------------------------------------------------------------------------
    */

    /**
     * عرض جميع الأسئلة للإدارة
     */
    public function index()
    {
        $questions = PlacementQuestion::latest()->get();
        return response()->json($questions);
    }

    /**
     * إنشاء سؤال جديد
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:multiple_choice,text_input',
            'question' => 'required|string',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string',
            'acceptable_answers' => 'nullable|array',
            'level_weight' => 'required|string',
            'points' => 'nullable|integer|min:1',
        ]);

        $question = PlacementQuestion::create($validated);

        return response()->json([
            'message' => 'تم إضافة السؤال بنجاح',
            'data' => $question,
        ], 201);
    }

    /**
     * تعديل سؤال
     */
    public function update(Request $request, $id)
    {
        $question = PlacementQuestion::findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|in:multiple_choice,text_input',
            'question' => 'sometimes|string',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string',
            'acceptable_answers' => 'nullable|array',
            'level_weight' => 'sometimes|string',
            'points' => 'nullable|integer|min:1',
        ]);

        $question->update($validated);

        return response()->json([
            'message' => 'تم تحديث السؤال بنجاح',
            'data' => $question,
        ]);
    }

    /**
     * حذف سؤال
     */
    public function destroy($id)
    {
        $question = PlacementQuestion::findOrFail($id);
        $question->delete();

        return response()->json([
            'message' => 'تم حذف السؤال بنجاح',
        ]);
    }

    /**
     * عرض نتائج جميع الطلاب
     */
    public function getResults()
    {
        $results = PlacementTestResult::with('user:id,first_name,last_name,email,role')
            ->latest()
            ->get();

        return response()->json($results);
    }

    /*
    |--------------------------------------------------------------------------
    | 3. خوارزمية التقييم (Private Methods)
    |--------------------------------------------------------------------------
    */

    private function calculateJapaneseLevel(int $score, int $total): string
    {
        if ($total === 0) return 'N5 (مبتدئ)';

        $percentage = ($score / $total) * 100;

        if ($percentage >= 85) return 'N3 (متوسط)';
        if ($percentage >= 65) return 'N4 (فوق المبتدئ)';
        if ($percentage >= 45) return 'N5 (مبتدئ - متمكن)';
        return 'N5 (مبتدئ - أولي)';
    }
}