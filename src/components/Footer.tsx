import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Академия МВД Республики Казахстан</span>
            </div>
            <p className="text-slate-400 text-xs">
              Кафедра информационных систем и искусственного интеллекта · 4 курс · 2025–2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span className="text-slate-300">Дисциплина: Информационная безопасность</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Стандарты: NIST SP 800-61 · ISO/IEC 27035</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Глава 7 УК РК</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            Учебный комплекс и интерактивная презентация по теме «Современные информационные угрозы и методы противодействия атакам».
          </div>
          <div>
            Подготовлено для предэкзаменационной подготовки и защиты курсовых / дипломных проектов.
          </div>
        </div>
      </div>
    </footer>
  );
};
