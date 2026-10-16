import React from 'react';
import { Presentation, ShieldAlert, Award, ArrowDown } from 'lucide-react';
import socDefenseCenterImg from '../assets/images/soc_defense_center_1792037792575.jpg';

interface HeroSectionProps {
  onStartPresentation: () => void;
  onOpenSimulator: () => void;
  onScrollToTriad: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPresentation,
  onOpenSimulator,
  onScrollToTriad,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Academic kicker metadata without pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
          <span className="text-cyan-400">Академия МВД Республики Казахстан</span>
          <span aria-hidden="true">·</span>
          <span>Кафедра информационных систем и ИИ</span>
          <span aria-hidden="true">·</span>
          <span>4 курс</span>
          <span aria-hidden="true">·</span>
          <span>2025–2026 уч. год</span>
        </div>

        {/* 2-Column Split: Headline & Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
                Современные информационные угрозы и методы противодействия атакам
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                Интерактивный учебный портал и презентационный комплекс: деконструкция триады КЦД, структура киберпреступных синдикатов CaaS, теневой арсенал атак и практические рекомендации по нейтрализации угроз на каждом этапе жизненного цикла инцидента.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onStartPresentation}
                className="px-5 py-3 text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Presentation className="w-4 h-4" />
                Запустить презентацию (10 слайдов)
              </button>

              <button
                onClick={onOpenSimulator}
                className="px-5 py-3 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                Тренажер дежурного SOC
              </button>

              <button
                onClick={onScrollToTriad}
                className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                Изучить материалы <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl min-h-[300px] lg:min-h-full">
            <img
              src={socDefenseCenterImg}
              alt="Центр оперативного управления и мониторинга киберугроз МВД"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Ситуационный центр кибербезопасности
              </span>
              <p className="text-xs text-slate-300">
                Мониторинг периметра государственных ИС, выявление аномалий и пресечение кибератак в реальном времени.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Основа ИБ</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">3 фактора</div>
            <span className="text-xs text-slate-300">Триада КЦД (CIA)</span>
          </div>
          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Синдикаты CaaS</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">6 ролей</div>
            <span className="text-xs text-slate-300">Специализация преступников</span>
          </div>
          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Модель вторжения</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">7 этапов</div>
            <span className="text-xs text-slate-300">Cyber Kill Chain</span>
          </div>
          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Нейтрализация</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">6 стадий</div>
            <span className="text-xs text-slate-300">NIST SP 800-61 / УПК РК</span>
          </div>
        </div>
      </div>
    </section>
  );
};
