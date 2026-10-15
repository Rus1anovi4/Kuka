import React, { useState } from 'react';
import { ViewMode } from './types/cyber';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CiaTriadModule } from './components/CiaTriadModule';
import { SyndicateRolesModule } from './components/SyndicateRolesModule';
import { ArsenalToolsModule } from './components/ArsenalToolsModule';
import { KillChainEarlyDetectionModule } from './components/KillChainEarlyDetectionModule';
import { IncidentLifecycleModule } from './components/IncidentLifecycleModule';
import { CriminalCodeSection } from './components/CriminalCodeSection';
import { QuizModule } from './components/QuizModule';
import { Footer } from './components/Footer';
import { PresentationView } from './components/PresentationView';
import { IncidentSimulatorModal } from './components/IncidentSimulatorModal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('portal');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Header
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Main Content: Presentation Mode or Portal Mode */}
      {viewMode === 'presentation' ? (
        <PresentationView onExit={() => setViewMode('portal')} />
      ) : (
        <main className="flex-1">
          {/* Hero Section with Academic Context & MVD SOC Visual */}
          <HeroSection
            onStartPresentation={() => setViewMode('presentation')}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onScrollToTriad={() => handleNavigateSection('triad')}
          />

          {/* Module 1: CIA Triad (Конфиденциальность, Целостность, Доступность) */}
          <CiaTriadModule />

          {/* Module 2: Syndicate Roles and Criminal Economy (CaaS) */}
          <SyndicateRolesModule />

          {/* Module 3: Threat Arsenal & Shadow Tools Catalog */}
          <ArsenalToolsModule />

          {/* Module 4: Cyber Kill Chain & Shift-Left Early Detection */}
          <KillChainEarlyDetectionModule />

          {/* Module 5: Incident Lifecycle & Stage-by-Stage Neutralization Recommendations */}
          <IncidentLifecycleModule />

          {/* Module 6: Kazakhstan Criminal Code (ст. 205-213 УК РК) & AI Role */}
          <CriminalCodeSection />

          {/* Module 7: Assessment Quiz (10 Questions for MVD Academy Cadets) */}
          <QuizModule />
        </main>
      )}

      {/* Institutional Footer */}
      {viewMode === 'portal' && <Footer />}

      {/* Interactive Cadet Incident Response Drill Simulator */}
      <IncidentSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </div>
  );
}
