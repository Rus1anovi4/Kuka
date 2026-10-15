import React, { useState, useEffect, useCallback } from 'react';
import { PRESENTATION_SLIDES } from '../data/cyberData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  X,
  Clock,
  Sparkles
} from 'lucide-react';

interface PresentationViewProps {
  onExit: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ onExit }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timer states (default 10 minutes for academic defense presentation)
  const [timerSeconds, setTimerSeconds] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onExit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onExit]);

  // Timer ticking
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col select-none overflow-hidden">
      {/* Top Deck Bar */}
      <div className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-1 rounded">
            Слайд {currentSlide.slideNumber}
          </span>
          <span className="text-xs text-slate-400 hidden md:inline">
            Академия МВД РК · Информационная безопасность
          </span>
        </div>

        {/* Presentation Defense Timer */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className={`text-xs font-mono font-semibold tabular-nums ${timerSeconds < 120 ? 'text-amber-400' : 'text-slate-200'}`}>
            {formatTime(timerSeconds)}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isTimerRunning ? 'Пауза' : 'Старт'}
          >
            {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(600);
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Сброс таймера на 10 минут"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Slide Controls & Exit */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              showSpeakerNotes
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
            title="Показать/скрыть тезисы для доклада"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Заметки докладчика</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Полноэкранный режим (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onExit}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded transition-colors cursor-pointer ml-2"
            title="Выйти из презентации (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Center: Slide Canvas */}
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-between overflow-y-auto max-w-5xl mx-auto w-full">
          <div>
            {/* Header of slide */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-2">
                {currentSlide.badgeText}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                {currentSlide.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-medium">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {currentSlide.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {point.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {point.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Takeaway box */}
            <div className="bg-slate-900/60 border border-cyan-900/40 rounded-xl p-4 flex items-start gap-3 mt-4">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                  Главный вывод слайда
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {currentSlide.takeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls on Canvas */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Управление: <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200">Пробел</kbd> / <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200">→</kbd> след, <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200">←</kbd> пред
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Назад
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === totalSlides - 1}
                className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed rounded text-slate-950 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                Вперед <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Drawer: Speaker Notes */}
        {showSpeakerNotes && (
          <div className="w-80 md:w-96 border-l border-slate-800 bg-slate-900/95 p-6 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Речь докладчика для комиссии
                </span>
                <span className="text-xs text-slate-500">МВД РК</span>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 mb-4">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  {currentSlide.speakerNotes}
                </p>
              </div>

              <div className="space-y-2 mt-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                  Оглавление презентации
                </span>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {PRESENTATION_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        idx === currentSlideIndex
                          ? 'bg-cyan-950 text-cyan-300 font-medium border border-cyan-800'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate">{idx + 1}. {s.title}</span>
                      <span className="text-[10px] text-slate-500 ml-2 shrink-0">{s.slideNumber}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
              4 курс · Специальность: Информационные системы и ИИ
            </div>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div className="h-1 bg-slate-900 w-full shrink-0">
        <div
          className="h-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};
