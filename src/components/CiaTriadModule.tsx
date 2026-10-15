import React, { useState } from 'react';
import { CIA_TRIAD_DATA } from '../data/cyberData';
import { CiaPillar } from '../types/cyber';
import { Lock, FileCheck2, Server, ShieldCheck, AlertTriangle } from 'lucide-react';

export const CiaTriadModule: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<CiaPillar>('confidentiality');

  const currentData = CIA_TRIAD_DATA.find((item) => item.id === selectedPillar) || CIA_TRIAD_DATA[0];

  return (
    <section id="triad" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span>Базовые принципы ИБ</span>
            <span aria-hidden="true">·</span>
            <span>Стандарты ISO/IEC 27001 & СТ РК</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Триада КЦД и векторы угроз безопасности
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Любая кибератака направлена на дестабилизацию одного или нескольких компонентов классической триады: конфиденциальности, целостности или доступности. В правоохранительных системах МВД РК нарушение любого элемента влечет прямые юридические и оперативные последствия.
          </p>
        </div>

        {/* 3 Interactive Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl mb-8">
          <button
            onClick={() => setSelectedPillar('confidentiality')}
            className={`p-4 rounded-lg text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              selectedPillar === 'confidentiality'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${selectedPillar === 'confidentiality' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-950 text-slate-500'}`}>
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">Конфиденциальность</div>
              <div className="text-xs text-slate-400">Защита от несанкционированного доступа</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedPillar('integrity')}
            className={`p-4 rounded-lg text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              selectedPillar === 'integrity'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${selectedPillar === 'integrity' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-950 text-slate-500'}`}>
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">Целостность</div>
              <div className="text-xs text-slate-400">Недопущение искажения и подмены данных</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedPillar('availability')}
            className={`p-4 rounded-lg text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              selectedPillar === 'availability'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${selectedPillar === 'availability' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-950 text-slate-500'}`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">Доступность</div>
              <div className="text-xs text-slate-400">Бесперебойное функционирование 24/7/365</div>
            </div>
          </button>
        </div>

        {/* Dynamic Display Panel for Selected Pillar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {currentData.title}
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                  {currentData.latin}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300">
                {currentData.definition}
              </p>
            </div>
          </div>

          {/* Context for MVD RK */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
              Специфика в органах внутренних дел (МВД РК)
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {currentData.mvdContext}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Threat Vectors */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Типовые векторы угроз</span>
              </div>
              <ul className="space-y-2">
                {currentData.threats.map((threat, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span>{threat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Consequences */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Оперативные последствия</span>
              </div>
              <ul className="space-y-2">
                {currentData.consequences.map((consequence, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-rose-400 font-bold">!</span>
                    <span>{consequence}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Defense Controls */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Методы и барьеры нейтрализации</span>
              </div>
              <ul className="space-y-2">
                {currentData.defenseControls.map((ctrl, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/40">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
