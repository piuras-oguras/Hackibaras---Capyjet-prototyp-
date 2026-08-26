import { Project, Hackathon, Startup } from './types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Nowoczesny system filtracji mikroplastiku',
    institution: 'Politechnika Warszawska',
    description: 'Opracowaliśmy prototyp filtra o wysokiej wydajności. Szukamy partnera biznesowego do optymalizacji kosztów produkcji i wprowadzenia na rynek.',
    tags: ['Ekologia', 'Inżynieria Materiałowa', 'B+R'],
    market: 'university',
    status: 'searching_partner',
    createdAt: '2024-03-20'
  },
  {
    id: 'p2',
    title: 'Algorytm wczesnego wykrywania anomalii w sieciach energetycznych',
    institution: 'AGH w Krakowie',
    description: 'Zaawansowane modele AI gotowe do testów w warunkach rzeczywistych. Potrzebujemy dostępu do infrastruktury i wsparcia wdrożeniowego.',
    tags: ['AI', 'Energetyka', 'Software'],
    market: 'university',
    status: 'searching_partner',
    createdAt: '2024-03-22'
  }
];

export const mockHackathons: Hackathon[] = [
  {
    id: 'h1',
    title: 'GovTech Challenge: Cyfrowa Gmina',
    organizer: 'Ministerstwo Cyfryzacji',
    description: 'Stwórz rozwiązanie ułatwiające komunikację obywatela z urzędem. Najlepsze projekty otrzymają kontrakt na wdrożenie.',
    reward: 'Kontrakt wdrożeniowy + 50 000 PLN',
    tags: ['GovTech', 'UX', 'Web'],
    market: 'business',
    date: '2024-05-15'
  },
  {
    id: 'h2',
    title: 'GreenEnergy Hack: Optymalizacja OZE',
    organizer: 'EnergoCorp S.A.',
    description: 'Szukamy innowacyjnych sposobów na zarządzanie rozproszonymi źródłami energii. Możliwość stałej współpracy lub zatrudnienia.',
    reward: 'Współpraca B2B / Zatrudnienie',
    tags: ['OZE', 'Data Science', 'IoT'],
    market: 'business',
    date: '2024-06-01'
  }
];

export const mockStartups: Startup[] = [
  {
    id: 's1',
    title: 'EcoPack Solutions',
    founder: 'Anna Kowalska',
    description: 'Biodegradowalne opakowania z odpadów rolniczych. Mamy gotowy prototyp i pierwsze testy u lokalnych dostawców.',
    stage: 'mvp',
    tags: ['Sustainability', 'Packaging', 'AgriTech'],
    market: 'startup',
    fundingSought: '500 000 PLN'
  },
  {
    id: 's2',
    title: 'HealthAI Diagnostics',
    founder: 'Marek Nowak',
    description: 'Platforma do analizy obrazów RTG wspierana przez AI, skracająca czas diagnozy o 40%. Szukamy partnerów medycznych do pilotażu.',
    stage: 'idea',
    tags: ['HealthTech', 'AI', 'SaaS'],
    market: 'startup',
    fundingSought: '1 000 000 PLN'
  }
];
