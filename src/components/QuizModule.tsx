import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/cyberData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizModule: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <section id="quiz" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              <span>Контроль знаний</span>
              <span aria-hidden="true">·</span>
              <span>Тестирование для 4 курса Академии МВД РК</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Экзаменационный тест: Угрозы ИБ и противодействие
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Проверьте готовность к защите темы перед комиссией: вопросы по классификации триады КЦД, статьям Уголовного кодекса РК, тактике синдикатов и правилам цифровой криминалистики.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={answeredCount < totalQuestions}
                className="px-5 py-2.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                Проверить ответы ({answeredCount}/{totalQuestions})
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Сбросить и пройти заново
              </button>
            )}
          </div>
        </div>

        {/* Score Banner when results shown */}
        {showResults && (
          <div className="bg-slate-900 border border-cyan-800/80 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Результат тестирования: {correctCount} из {totalQuestions} правильных ответов
                </h4>
                <p className="text-xs text-slate-300">
                  {correctCount >= 9
                    ? 'Отличный уровень подготовки! Полное понимание юридических и технических аспектов ИБ.'
                    : correctCount >= 7
                    ? 'Хороший результат. Обратите внимание на ошибки в вопросах криминалистики и нормах УК РК.'
                    : 'Удовлетворительно. Рекомендуется повторно изучить материалы разделов.'}
                </p>
              </div>
            </div>
            <span className="text-2xl font-bold font-mono text-cyan-400 shrink-0">
              {Math.round((correctCount / totalQuestions) * 100)}%
            </span>
          </div>
        )}

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUIZ_QUESTIONS.map((q) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;

            return (
              <div
                key={q.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800/80">
                    <span className="font-mono text-cyan-400 font-semibold">Вопрос 0{q.id}</span>
                    <span className="text-slate-400">{q.category}</span>
                  </div>

                  <p className="text-sm font-semibold text-white mb-4 leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-2 mb-4">
                    {q.options.map((option, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (showResults) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-medium';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                        } else {
                          btnStyle = 'opacity-50 bg-slate-950/30 border-slate-800 text-slate-500';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-medium ring-1 ring-cyan-500/40';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={showResults}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono text-[11px] text-slate-500 shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1 leading-snug">{option}</span>
                          {showResults && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {showResults && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showResults && (
                  <div className="pt-3 border-t border-slate-800/80 bg-slate-950/50 p-3 rounded-lg text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-cyan-400 block mb-1">
                      Обоснование эксперта:
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
