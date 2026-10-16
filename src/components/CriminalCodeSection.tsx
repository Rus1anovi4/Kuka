import React from 'react';
import { RK_CRIMINAL_ARTICLES } from '../data/cyberData';
import { Scale, Brain, Cpu, ShieldCheck } from 'lucide-react';
import forensicsImg from '../assets/images/cyber_forensics_investigation_1792037792643.jpg';

export const CriminalCodeSection: React.FC = () => {
  return (
    <section id="legal" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span>Правоприменительная практика</span>
            <span aria-hidden="true">·</span>
            <span>Глава 7 Уголовного кодекса Республики Казахстан</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Уголовно-правовая квалификация и роль искусственного интеллекта
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Правонарушения в сфере информатизации и связи (ст. 205–213 УК РК) и применение алгоритмов искусственного интеллекта в предиктивной защите и криминалистическом расследовании МВД РК.
          </p>
        </div>

        {/* 2-Column Split: Criminal Code Articles & AI in Forensics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left: Articles List */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4" />
              Статьи Уголовного кодекса РК в сфере киберпреступности
            </span>
            <div className="space-y-2.5">
              {RK_CRIMINAL_ARTICLES.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono text-cyan-400">
                      {art.article}
                    </span>
                    <span className="text-[11px] text-amber-400/90 font-medium">
                      {art.sanction}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    {art.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI & Forensics Visual Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-5 border border-slate-800 h-48">
                <img
                  src={forensicsImg}
                  alt="Криминалистическая лаборатория исследования цифровых носителей"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-3">
                  <span className="text-xs font-mono text-cyan-300">
                    Экспертиза носителей (ст. 271 УПК РК)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Brain className="w-4 h-4" />
                <span>ИИ в противоборстве киберугрозам</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Специальность «Информационные системы и ИИ»
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Студенты и курсанты 4 курса изучают применение алгоритмов машинного обучения для поведенческого анализа (UEBA), выявления аномалий в сетевых потоках (NDR) и автоматической нейтрализации вторжений за миллисекунды.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Автоматический триаж: </strong>
                  ИИ фильтрует до 98% ложных срабатываний SIEM в первые секунды.
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Предиктивное реагирование: </strong>
                  Изоляция хостов по паттернам поведения без ожидания сигнатуры антивируса.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
