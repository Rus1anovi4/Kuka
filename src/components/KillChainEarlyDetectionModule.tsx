import React, { useState } from 'react';
import { KILL_CHAIN_STEPS } from '../data/cyberData';
import { ArrowRight, ShieldCheck, Eye, Zap, Crosshair } from 'lucide-react';

export const KillChainEarlyDetectionModule: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = KILL_CHAIN_STEPS[activeStepIndex];

  return (
    <section id="killchain" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span>Модель угроз и архитектура</span>
            <span aria-hidden="true">·</span>
            <span>Lockheed Martin Kill Chain & MITRE ATT&CK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Цепочка атаки и возможности раннего обнаружения
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Концепция «Shift-Left» в информационной безопасности: перехват атаки на начальных этапах (разведка, доставка) многократно снижает ущерб и затраты по сравнению с ликвидацией последствий на этапе выполнения задачи хакерами.
          </p>
        </div>

        {/* 7-Step Interactive Pipeline Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {KILL_CHAIN_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                activeStepIndex === idx
                  ? 'bg-slate-800 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-cyan-400 font-bold">
                  0{s.step}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Фаза
                </span>
              </div>
              <div className="text-xs font-bold leading-snug truncate">
                {s.nameRu}
              </div>
            </button>
          ))}
        </div>

        {/* Main Stage Panel for Selected Step */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Header of Stage */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Этап {currentStep.step} из 7</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-cyan-400">{currentStep.phase}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {currentStep.nameRu}
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                <strong className="text-white">Цель атакующего: </strong>
                {currentStep.attackerGoal}
              </p>
            </div>

            {/* Shift-left value banner */}
            <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-4 lg:max-w-md shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Эффективность раннего перехвата (Shift-Left)</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {currentStep.shiftLeftValue}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hacker Tactics and Arsenal */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                Методы и арсенал противника
              </span>
              <ul className="space-y-2">
                {currentStep.methodsAndArsenal.map((method, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Early Detection Traces (IoCs & Telemetry) */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Следы раннего обнаружения (IoC / Трассировка)
              </span>
              <ul className="space-y-2">
                {currentStep.earlyDetectionTraces.map((trace, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 font-mono">
                    <span className="text-cyan-400 font-bold shrink-0">👁</span>
                    <span>{trace}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Defensive Countermeasures */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Меры и механизмы защиты (SOC/EDR)
              </span>
              <ul className="space-y-2">
                {currentStep.defenseCountermeasures.map((counter, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2 bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/40">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{counter}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-slate-200 transition-colors cursor-pointer"
            >
              Предыдущий этап
            </button>
            <span className="text-xs text-slate-400">
              Шаг {activeStepIndex + 1} из {KILL_CHAIN_STEPS.length}
            </span>
            <button
              onClick={() => setActiveStepIndex((prev) => Math.min(KILL_CHAIN_STEPS.length - 1, prev + 1))}
              disabled={activeStepIndex === KILL_CHAIN_STEPS.length - 1}
              className="px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-slate-950 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Следующий этап <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
