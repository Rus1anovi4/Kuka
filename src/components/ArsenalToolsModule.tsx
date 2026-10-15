import React, { useState } from 'react';
import { ARSENAL_CATALOG } from '../data/cyberData';
import { ArsenalCategory } from '../types/cyber';
import { ShieldAlert, Crosshair, ShieldCheck, Tag } from 'lucide-react';

export const ArsenalToolsModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ArsenalCategory | 'all'>('all');

  const filteredItems = activeCategory === 'all'
    ? ARSENAL_CATALOG
    : ARSENAL_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <section id="arsenal" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span>Технический арсенал</span>
            <span aria-hidden="true">·</span>
            <span>Теневой рынок утилит и сервисов</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Инструменты и услуги киберпреступности
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Каталог ключевых средств нападения: от вредоносных троянов-инфостилеров и 0-day эксплойтов до ботнетов, спам-китов и заказных DDoS-сервисов.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Все категории ({ARSENAL_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveCategory('trojans')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'trojans'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Трояны и стилеры
          </button>
          <button
            onClick={() => setActiveCategory('exploits')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'exploits'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            0-day Эксплойты
          </button>
          <button
            onClick={() => setActiveCategory('botnets')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'botnets'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ботнеты
          </button>
          <button
            onClick={() => setActiveCategory('databases')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'databases'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Утечки баз данных
          </button>
          <button
            onClick={() => setActiveCategory('phishing')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'phishing'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AiTM Фишинг
          </button>
          <button
            onClick={() => setActiveCategory('ddos')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'ddos'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DDoS Stresser
          </button>
        </div>

        {/* Arsenal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Header of card: unboxed metadata */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800/80">
                  <span className="font-medium text-cyan-400">{item.subType}</span>
                  <span
                    className={`font-semibold ${
                      item.threatLevel === 'Критический'
                        ? 'text-rose-400'
                        : item.threatLevel === 'Высокий'
                        ? 'text-amber-400'
                        : 'text-blue-400'
                    }`}
                  >
                    ● {item.threatLevel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Attack Vector & Dark web model */}
                <div className="space-y-2 mb-4 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <Crosshair className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Вектор внедрения: </span>
                      <span>{item.attackVector}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <Tag className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Теневая модель: </span>
                      <span>{item.darkWebModel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countermeasures checklist */}
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Меры противодействия и защиты:
                </span>
                <ul className="space-y-1.5">
                  {item.mitigationMethods.map((method, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
