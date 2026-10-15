import React, { useState } from 'react';
import { SYNDICATE_ROLES } from '../data/cyberData';
import { Shield, Scale, Terminal, Search, DollarSign } from 'lucide-react';

export const SyndicateRolesModule: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(SYNDICATE_ROLES[0].id);

  const activeRole = SYNDICATE_ROLES.find((r) => r.id === selectedRoleId) || SYNDICATE_ROLES[0];

  return (
    <section id="syndicate" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span>Криминологический анализ</span>
            <span aria-hidden="true">·</span>
            <span>Модель CaaS (Cybercrime-as-a-Service)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Роли и специализация участников киберпреступных групп
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Современная организованная киберпреступность функционирует по принципам корпоративной теневой экономики с глубоким разделением труда. Для следственных подразделений МВД РК важно точно идентифицировать функции каждого фигуранта для правильной уголовно-правовой квалификации.
          </p>
        </div>

        {/* Horizontal Navigation Grid of Roles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {SYNDICATE_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                selectedRoleId === role.id
                  ? 'bg-slate-800 border-cyan-500/80 text-white shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="text-xs font-semibold leading-snug mb-2 line-clamp-2">
                {role.title}
              </div>
              <div className="text-[11px] font-mono text-cyan-400 truncate">
                {role.criminalCodeRK.article}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Dossier Card on the Selected Role */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between pb-6 mb-6 border-b border-slate-800 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeRole.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-mono text-cyan-400">
                Международный статус: {activeRole.specialization}
              </p>
            </div>

            {/* Legal Qualification according to Kazakhstan Criminal Code */}
            <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-4 max-w-md shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <Scale className="w-4 h-4" />
                <span>Уголовный кодекс РК: {activeRole.criminalCodeRK.article}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {activeRole.criminalCodeRK.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Functional Duties */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                Функционал и задачи в синдикате
              </span>
              <ul className="space-y-2">
                {activeRole.responsibilities.map((resp, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-cyan-400 font-bold shrink-0">▪</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools and Darknet Market offerings */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Арсенал и услуги в даркнете
              </span>
              <div className="space-y-2">
                {activeRole.toolsProvided.map((tool, i) => (
                  <div key={i} className="text-xs sm:text-sm text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 font-mono">
                    <span className="text-slate-500 mr-2">$</span>
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-lg text-xs text-slate-300 flex items-start gap-2 mt-3">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-400 block mb-0.5">Схема монетизации:</span>
                  <span>{activeRole.monetization}</span>
                </div>
              </div>
            </div>

            {/* Forensic Traces for MVD Investigation */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                Цифровые следы для следствия МВД
              </span>
              <ul className="space-y-2">
                {activeRole.forensicTraces.map((trace, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-cyan-950/20 p-3 rounded-lg border border-cyan-900/40">
                    <span className="text-cyan-400 font-bold shrink-0">🔍</span>
                    <span>{trace}</span>
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
