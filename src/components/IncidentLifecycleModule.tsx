import React, { useState } from 'react';
import { INCIDENT_LIFECYCLE_STAGES } from '../data/cyberData';
import {
  ShieldAlert,
  CheckSquare,
  Clock,
  Wrench,
  AlertOctagon,
  Scale,
  Sparkles,
  Table,
  Columns
} from 'lucide-react';

export const IncidentLifecycleModule: React.FC = () => {
  const [selectedStageNumber, setSelectedStageNumber] = useState(1);
  const [displayMode, setDisplayMode] = useState<'detail' | 'matrix'>('detail');

  const currentStage = INCIDENT_LIFECYCLE_STAGES.find(
    (s) => s.stageNumber === selectedStageNumber
  ) || INCIDENT_LIFECYCLE_STAGES[0];

  return (
    <section id="lifecycle" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              <span>Регламент SOC / CSIRT МВД</span>
              <span aria-hidden="true">·</span>
              <span>NIST SP 800-61 Rev.2 & ISO/IEC 27035</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Жизненный цикл инцидента и рекомендации по нейтрализации
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Пошаговый алгоритм действий дежурной смены информационной безопасности: от превентивной подготовки до расследования и передачи материалов в следственные органы МВД РК.
            </p>
          </div>

          {/* Toggle between Detailed Deep Dive and Matrix Summary */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setDisplayMode('detail')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'detail'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              Поэтапный разбор
            </button>
            <button
              onClick={() => setDisplayMode('matrix')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'matrix'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              Сводная матрица
            </button>
          </div>
        </div>

        {displayMode === 'detail' ? (
          <>
            {/* 6 Stage Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
              {INCIDENT_LIFECYCLE_STAGES.map((st) => (
                <button
                  key={st.stageNumber}
                  onClick={() => setSelectedStageNumber(st.stageNumber)}
                  className={`p-3 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                    selectedStageNumber === st.stageNumber
                      ? 'bg-slate-800 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">
                      Этап {st.stageNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">NIST</span>
                  </div>
                  <div className="text-xs font-bold leading-snug line-clamp-2">
                    {st.stageName}
                  </div>
                </button>
              ))}
            </div>

            {/* Stage Detailed Workspace */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-cyan-400">Стадия {currentStage.stageNumber} из 6</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentStage.standardCode}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {currentStage.stageName}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-2xl">
                    <strong className="text-white">Главная цель этапа: </strong>
                    {currentStage.goal}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Критический таймфрейм
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {currentStage.criticalTimeframe}
                    </span>
                  </div>
                </div>
              </div>

              {/* Central Box: Specific Practical Neutralization Recommendations */}
              <div className="bg-cyan-950/30 border border-cyan-800/60 rounded-xl p-5 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Практические рекомендации по нейтрализации угроз на данном этапе:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentStage.neutralizationRecommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/70 border border-cyan-900/40 p-3.5 rounded-lg text-xs sm:text-sm text-slate-200 leading-relaxed font-medium"
                    >
                      <span className="text-cyan-400 font-bold block mb-1">Рекомендация {i + 1}:</span>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Checklist & Protocols */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Action Checklist */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-cyan-400" />
                    Операционный чек-лист (Playbook)
                  </span>
                  <ul className="space-y-2">
                    {currentStage.actionChecklist.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                        <span className="text-cyan-400 font-bold shrink-0">☐</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Forensic Protocol MVD */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Криминалистический протокол МВД РК
                  </span>
                  <ul className="space-y-2">
                    {currentStage.forensicProtocolMVD.map((proto, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2 bg-amber-950/20 p-3 rounded-lg border border-amber-900/40">
                        <span className="text-amber-400 font-bold shrink-0">⚖</span>
                        <span>{proto}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Tools */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
                      <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                      Используемый инструментарий:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStage.keyTools.map((tool, i) => (
                        <span key={i} className="text-[11px] font-mono bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4" />
                    Типичные критические ошибки
                  </span>
                  <ul className="space-y-2">
                    {currentStage.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-xs sm:text-sm text-rose-200/90 flex items-start gap-2 bg-rose-950/20 p-3 rounded-lg border border-rose-900/40">
                        <span className="text-rose-400 font-bold shrink-0">✕</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Matrix Summary View */
          <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-4 w-44">Этап инцидента</th>
                  <th className="p-4 w-52">Цель и тайминг</th>
                  <th className="p-4">Главные рекомендации нейтрализации</th>
                  <th className="p-4 w-64">Криминалистика МВД РК</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {INCIDENT_LIFECYCLE_STAGES.map((stage) => (
                  <tr key={stage.stageNumber} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-bold text-white mb-0.5">
                        {stage.stageNumber}. {stage.stageName}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400">
                        {stage.standardCode}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="mb-2 text-slate-200">{stage.goal}</div>
                      <div className="text-[11px] text-amber-400 font-medium">
                        ⏱ {stage.criticalTimeframe}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <ul className="space-y-1.5">
                        {stage.neutralizationRecommendations.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 align-top text-xs text-slate-300 bg-slate-950/30">
                      <ul className="space-y-1.5">
                        {stage.forensicProtocolMVD.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold shrink-0">⚖</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
