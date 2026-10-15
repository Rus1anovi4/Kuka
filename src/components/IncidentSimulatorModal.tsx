import React, { useState } from 'react';
import { SIMULATOR_SCENARIO } from '../data/cyberData';
import {
  X,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Scale
} from 'lucide-react';

interface IncidentSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentSimulatorModal: React.FC<IncidentSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [history, setHistory] = useState<{ stepIndex: number; score: number; feedback: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentStep = SIMULATOR_SCENARIO[currentStepIndex];
  const selectedChoice = currentStep.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    if (selectedChoiceId) return; // already made choice for this step
    setSelectedChoiceId(choiceId);
    const choice = currentStep.choices.find((c) => c.id === choiceId);
    if (choice) {
      setTotalScore((prev) => prev + choice.impactScore);
      setHistory((prev) => [
        ...prev,
        {
          stepIndex: currentStepIndex,
          score: choice.impactScore,
          feedback: choice.feedback,
        },
      ]);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < SIMULATOR_SCENARIO.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedChoiceId(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedChoiceId(null);
    setTotalScore(0);
    setHistory([]);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Тренажер дежурного офицера SOC МВД РК
              </h3>
              <p className="text-xs text-slate-400">
                Отработка тактики реагирования на киберинцидент
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {!isCompleted ? (
            <div>
              {/* Stepper info */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <span className="font-semibold text-cyan-400 uppercase tracking-wider">
                  {currentStep.phaseTitle}
                </span>
                <span className="font-mono">
                  Счет: <span className={totalScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{totalScore}</span> баллов
                </span>
              </div>

              {/* Situation Box */}
              <div className="bg-slate-950/80 border border-amber-900/40 rounded-xl p-4 sm:p-5 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Вводная оперативная обстановка ({currentStep.incidentType})</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {currentStep.situation}
                </p>
              </div>

              {/* Choices */}
              <div className="space-y-3 mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                  Выберите ваше тактическое решение:
                </span>
                {currentStep.choices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice.id)}
                      disabled={selectedChoiceId !== null}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? choice.impactScore > 0
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-500 text-rose-200'
                          : selectedChoiceId !== null
                          ? 'opacity-40 bg-slate-950/30 border-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <span className="font-bold text-cyan-400 shrink-0">
                        {choice.id.split('-')[1]}.
                      </span>
                      <span className="flex-1 leading-relaxed">{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert if choice made */}
              {selectedChoice && (
                <div
                  className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${
                    selectedChoice.impactScore > 0
                      ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                  }`}
                >
                  {selectedChoice.impactScore > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1">
                      {selectedChoice.impactScore > 0 ? 'Тактически верное решение (+10)' : 'Ошибочное действие (' + selectedChoice.impactScore + ')'}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {selectedChoice.feedback}
                    </p>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {selectedChoiceId && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="px-5 py-2 text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentStepIndex < SIMULATOR_SCENARIO.length - 1 ? 'Перейти к следующей фазе →' : 'Подвести итоги симуляции'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-400 mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Учения завершены: Итоговая аттестация
              </h4>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                Вы набрали <strong className="text-cyan-400">{totalScore} из 40 баллов</strong>. Оценка тактических действий дежурного офицера информационной безопасности:
              </p>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 max-w-lg mx-auto mb-6 text-left">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                  Квалификационный вердикт:
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {totalScore >= 35
                    ? '«ОТЛИЧНО»: Продемонстрировано безупречное владение регламентом NIST SP 800-61 и уголовно-процессуальными требованиями УПК РК. Цифровые улики сохранены, атака локализована без потери данных.'
                    : totalScore >= 20
                    ? '«ХОРОШО»: Инцидент ликвидирован, однако допущены незначительные тактические ошибки при сборе доказательств.'
                    : '«ТРЕБУЕТСЯ ПОВТОРЕНИЕ»: Допущены критические ошибки (выключение питания, сброс сессий без krbtgt). Рекомендуется повторно изучить раздел «Жизненный цикл инцидента».'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Пройти сценарий заново
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors cursor-pointer"
                >
                  Вернуться на сайт
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
