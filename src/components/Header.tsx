import React from 'react';
import { ViewMode } from '../types/cyber';
import { ShieldAlert, Presentation, LayoutGrid, Award } from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenSimulator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onToggleViewMode,
  activeSection,
  onNavigateSection,
  onOpenSimulator,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <button
            onClick={() => onNavigateSection('hero')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold tracking-tight text-white block group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              КиберЩит МВД РК
            </span>
            <span className="text-xs text-slate-400 block whitespace-nowrap">
              Информационные угрозы и защита
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              if (viewMode !== 'portal') onToggleViewMode('portal');
              onNavigateSection('triad');
            }}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'triad' ? 'text-cyan-400' : ''
            }`}
          >
            Триада КЦД
          </button>
          <button
            onClick={() => {
              if (viewMode !== 'portal') onToggleViewMode('portal');
              onNavigateSection('syndicate');
            }}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'syndicate' ? 'text-cyan-400' : ''
            }`}
          >
            Киберсиндикаты
          </button>
          <button
            onClick={() => {
              if (viewMode !== 'portal') onToggleViewMode('portal');
              onNavigateSection('arsenal');
            }}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'arsenal' ? 'text-cyan-400' : ''
            }`}
          >
            Арсенал атак
          </button>
          <button
            onClick={() => {
              if (viewMode !== 'portal') onToggleViewMode('portal');
              onNavigateSection('killchain');
            }}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'killchain' ? 'text-cyan-400' : ''
            }`}
          >
            Kill Chain
          </button>
          <button
            onClick={() => {
              if (viewMode !== 'portal') onToggleViewMode('portal');
              onNavigateSection('lifecycle');
            }}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'lifecycle' ? 'text-cyan-400' : ''
            }`}
          >
            Реагирование на инциденты
          </button>
          <button
            onClick={() => {
              if (viewMode !== 'portal') onToggleViewMode('portal');
              onNavigateSection('quiz');
            }}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'quiz' ? 'text-cyan-400' : ''
            }`}
          >
            Тестирование
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSimulator}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 rounded-lg hover:bg-cyan-900/60 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            Тренажер инцидента
          </button>

          <button
            onClick={() => onToggleViewMode(viewMode === 'presentation' ? 'portal' : 'presentation')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'presentation'
                ? 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm'
            }`}
          >
            {viewMode === 'presentation' ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                Режим Портала
              </>
            ) : (
              <>
                <Presentation className="w-3.5 h-3.5" />
                Слайды презентации
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
