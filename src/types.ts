export type MarketType = 'university' | 'business' | 'startup';
export type AffiliationType = 'university' | 'company' | 'government' | 'individual';

export interface User {
  id: string;
  email: string;
  name: string;
  affiliation: AffiliationType;
  institutionName: string;
}

export interface Project {
  id: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
  market: 'university';
  status: 'searching_partner' | 'in_progress';
  createdAt: string;
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  description: string;
  reward: string;
  tags: string[];
  market: 'business';
  date: string;
}

export interface Startup {
  id: string;
  title: string;
  founder: string;
  description: string;
  stage: 'idea' | 'mvp' | 'scaling';
  tags: string[];
  market: 'startup';
  fundingSought?: string;
}
