<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('placement_questions', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['multiple_choice', 'text_input'])->default('multiple_choice'); // نوع السؤال
            $table->text('question');                               // نص السؤال
            $table->json('options')->nullable();                    // الخيارات للأسئلة المتعددة
            $table->string('correct_answer')->nullable();           // الإجابة الصحيحة للخيارات
            $table->json('acceptable_answers')->nullable();         // الإجابات المقبولة للأسئلة الكتابية ["たべる", "食べる", "taberu"]
            $table->string('level_weight');                         // مستوى السؤال (N5, N4, N3, N2, N1)
            $table->integer('points')->default(1);                  // درجة السؤال
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placement_questions');
    }
};