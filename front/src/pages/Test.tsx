// components/Test.tsx
import React from 'react';
import { useTest } from '../hooks/useTest';

const Test: React.FC = () => {
  const {
    questions,
    currentQuestion,
    currentIndex,
    answers,
    loading,
    submitting,
    error,
    result,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
    resetTest,
    refetchQuestions,
    isFirstQuestion,
    isLastQuestion,
    hasAnsweredCurrent,
  } = useTest();

  // نسبة التقدم في الاختبار
  const progressPercent = questions.length > 0
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  // 1. حالة التحميل
  if (loading) {
    return (
      <div dir="rtl" className="min-h-[380px] flex my-20  flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-right">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium text-xl">جاري تحميل أسئلة الاختبار...</p>
      </div>
    );
  }

  // 2. حالة الخطأ عند جلب الأسئلة
  if (error && !questions.length) {
    return (
      <div dir="rtl" className="min-h-[300px] my-20  flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-red-100 text-center space-y-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">
          !
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900">فشل في تحميل الأسئلة</h3>
          <p className="text-xl text-gray-500">{error}</p>
        </div>
        <button
          onClick={() => refetchQuestions()}
          className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xl font-bold hover:bg-red-700 transition"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // 3. حالة ظهور النتيجة بعد إكمال الاختبار
  if (result) {
    return (
      <div dir="rtl" className="max-w-xl my-20  mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-200">
          ✓
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">اكتمل الاختبار بنجاح!</h2>
          <p className="text-gray-500 text-xl">تم تقييم إجاباتك وتحديد مستواك اللغوي بناءً عليها.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="block text-xl font-semibold text-gray-400 mb-1">النتيجة</span>
            <span className="text-2xl font-bold text-gray-800">
              {result.score} / {result.total_questions}
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="block text-xl font-semibold text-gray-400 mb-1">المستوى المحدد</span>
            <span className="text-2xl font-black text-red-600">{result.japanese_level}</span>
          </div>
        </div>

        <button
          onClick={resetTest}
          className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-xl shadow-md transition"
        >
          إعادة الاختبار
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const currentAnswer = answers[currentQuestion.id] || '';

  return (
    <div dir="rtl" className="max-w-2xl my-20 mx-auto bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl space-y-6 text-right">
      {/* الترويسة وشريط التقدم */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xl font-bold">
          <span className="text-gray-500">
            السؤال <span className="text-red-600">{currentIndex + 1}</span> من {questions.length}
          </span>
          <span className="px-3 py-1 rounded-full text-xl font-semibold bg-gray-100 text-gray-600">
            {currentQuestion.type === 'multiple_choice' ? 'اختيار من متعدد' : 'سؤال كتابي'}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* نص السؤال */}
      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 min-h-[100px] flex items-center text-right">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed w-full">
          {currentQuestion.question}
        </h3>
      </div>

      {/* منطقة الإجابة */}
      <div className="space-y-3">
        {currentQuestion.type === 'multiple_choice' ? (
          /* خيارات الاختيار من متعدد */
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options?.map((option, idx) => {
              const isSelected = currentAnswer === option;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAnswer(currentQuestion.id, option)}
                  className={`w-full p-4 text-right rounded-2xl font-medium transition-all border flex items-center justify-between text-xl ${
                    isSelected
                      ? 'border-red-600 bg-red-50 text-red-700 font-bold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-right text-xl">{option}</span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-red-600 bg-red-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* إدخال نص كتابي */
          <div className="space-y-2">
            <label className="block text-xl font-semibold text-gray-500 text-right">
              اكتب إجابتك باليابانية (كانجي / هيراغانا) أو بالروماجي:
            </label>
            <input
              type="text"
              dir="auto"
              value={currentAnswer}
              onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
              placeholder="مثال: たべる / taberu"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none font-medium text-xl text-gray-800 transition text-right"
            />
          </div>
        )}
      </div>

      {/* عرض الأخطاء */}
      {error && <p className="text-xl text-red-600 text-center font-medium">{error}</p>}

      {/* التنقل بين الأسئلة */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={prevQuestion}
          disabled={isFirstQuestion}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-xl font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          السابق
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={submitTest}
            disabled={!hasAnsweredCurrent || submitting}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري التسليم...</span>
              </>
            ) : (
              'إنهاء الاختبار'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={nextQuestion}
            disabled={!hasAnsweredCurrent}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

export default Test;