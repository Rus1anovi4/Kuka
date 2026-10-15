export type ViewMode = 'portal' | 'presentation';

export type CiaPillar = 'confidentiality' | 'integrity' | 'availability';

export interface CiaTriadDetail {
  id: CiaPillar;
  title: string;
  latin: string;
  definition: string;
  threats: string[];
  mvdContext: string;
  consequences: string[];
  defenseControls: string[];
}

export interface SyndicateRole {
  id: string;
  title: string;
  specialization: string;
  responsibilities: string[];
  toolsProvided: string[];
  monetization: string;
  criminalCodeRK: {
    article: string;
    description: string;
  };
  forensicTraces: string[];
}

export type ArsenalCategory = 'trojans' | 'exploits' | 'botnets' | 'databases' | 'phishing' | 'ddos';

export interface ArsenalItem {
  id: string;
  category: ArsenalCategory;
  name: string;
  subType: string;
  description: string;
  attackVector: string;
  darkWebModel: string;
  mitigationMethods: string[];
  threatLevel: 'Критический' | 'Высокий' | 'Средний';
}

export interface KillChainStep {
  step: number;
  phase: string;
  nameRu: string;
  attackerGoal: string;
  methodsAndArsenal: string[];
  earlyDetectionTraces: string[];
  defenseCountermeasures: string[];
  shiftLeftValue: string;
}

export interface IncidentLifecycleStage {
  stageNumber: number;
  stageName: string;
  standardCode: string; // e.g. "NIST 1 / ISO 27035"
  goal: string;
  criticalTimeframe: string;
  actionChecklist: string[];
  neutralizationRecommendations: string[];
  forensicProtocolMVD: string[];
  keyTools: string[];
  commonMistakes: string[];
}

export interface PresentationSlide {
  id: number;
  slideNumber: string;
  title: string;
  subtitle: string;
  keyPoints: {
    heading: string;
    details: string;
  }[];
  takeaway: string;
  speakerNotes: string;
  badgeText: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface SimulatorChoice {
  id: string;
  text: string;
  impactScore: number; // -10 to +10
  feedback: string;
  forensicViable: boolean;
}

export interface SimulatorStep {
  phaseTitle: string;
  situation: string;
  incidentType: string;
  choices: SimulatorChoice[];
}
