/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  Search, 
  PlusCircle, 
  ArrowRight, 
  Building2, 
  Code, 
  Zap,
  Filter,
  Users,
  Trophy,
  Calendar,
  Rocket,
  Handshake,
  ArrowLeft,
  Info,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { mockProjects, mockHackathons, mockStartups } from './data';
import { MarketType, Project, Hackathon, Startup, User } from './types';
import { Auth } from './components/Auth';
import { AddProject } from './components/AddProject';

type ViewState = {
  type: 'list';
} | {
  type: 'details';
  item: Project | Hackathon | Startup;
};

export default function App() {
  const [activeMarket, setActiveMarket] = useState<MarketType>('university');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<ViewState>({ type: 'list' });
  
  // Auth & Data State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [hackathons, setHackathons] = useState<Hackathon[]>(mockHackathons);
  const [startups, setStartups] = useState<Startup[]>(mockStartups);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredHackathons = hackathons.filter(h => 
    h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredStartups = startups.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleShowDetails = (item: Project | Hackathon | Startup) => {
    setView({ type: 'details', item });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setView({ type: 'list' });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddNewItem = (item: any) => {
    if (item.market === 'university') setProjects([item, ...projects]);
    else if (item.market === 'business') setHackathons([item, ...hackathons]);
    else setStartups([item, ...startups]);
    
    setShowAddProject(false);
    setActiveMarket(item.market);
    setView({ type: 'list' });
  };

  if (view.type === 'details') {
    const item = view.item;
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button 
              onClick={handleBackToList}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              Powrót do listy
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                <Zap size={18} />
              </div>
              <span className="text-lg font-display font-bold text-slate-900">UniBiz Hub</span>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
          >
            {/* Header Image/Pattern */}
            <div className={`h-48 w-full ${
              item.market === 'university' ? 'bg-blue-600' :
              item.market === 'business' ? 'bg-purple-600' :
              'bg-orange-500'
            } relative`}>
              <div className="absolute inset-0 opacity-20 pattern-dots"></div>
              <div className="absolute -bottom-12 left-8 p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
                {item.market === 'university' ? <Building2 size={48} className="text-blue-600" /> :
                 item.market === 'business' ? <Code size={48} className="text-purple-600" /> :
                 <Rocket size={48} className="text-orange-500" />}
              </div>
            </div>

            <div className="pt-20 px-8 pb-12">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
                    {item.title}
                  </h1>
                  <p className="text-lg text-slate-500 flex items-center gap-2">
                    {item.market === 'university' ? <Users size={20} /> :
                     item.market === 'business' ? <Building2 size={20} /> :
                     <Users size={20} />}
                    {'institution' in item ? item.institution : 
                     'organizer' in item ? item.organizer : 
                     `Founder: ${item.founder}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                    item.market === 'university' ? 'bg-blue-100 text-blue-700' :
                    item.market === 'business' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {item.market === 'university' ? 'Projekt B+R' :
                     item.market === 'business' ? 'Hackathon' :
                     `Start-up (${(item as Startup).stage})`}
                  </span>
                  {'date' in item && (
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <Calendar size={14} /> Termin: {item.date}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Info size={20} className="text-brand-accent" />
                      Opis Projektu
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-green-500" />
                      Kluczowe Cele & Korzyści
                    </h2>
                    <ul className="space-y-3">
                      {[
                        'Innowacyjne podejście do problemu',
                        'Możliwość szybkiego wdrożenia rynkowego',
                        'Wsparcie merytoryczne ekspertów',
                        'Dostęp do nowoczesnej infrastruktury'
                      ].map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <h3 className="font-bold mb-4">Szczegóły Kontraktu</h3>
                    <div className="space-y-4">
                      {'reward' in item && (
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Nagroda</p>
                          <p className="font-bold text-slate-900">{item.reward}</p>
                        </div>
                      )}
                      {'fundingSought' in item && (
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Finansowanie</p>
                          <p className="font-bold text-slate-900">{item.fundingSought}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Lokalizacja</p>
                        <p className="font-bold text-slate-900">Polska / Zdalnie</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Tagi</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-primary rounded-3xl p-6 text-white">
                    <h3 className="font-bold mb-4">Kontakt z wystawcą</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-sm opacity-80">
                        <Mail size={16} />
                        kontakt@unibiz.pl
                      </div>
                      <div className="flex items-center gap-3 text-sm opacity-80">
                        <Phone size={16} />
                        +48 123 456 789
                      </div>
                      <div className="flex items-center gap-3 text-sm opacity-80">
                        <Globe size={16} />
                        www.instytucja.pl
                      </div>
                    </div>
                    <button className="w-full py-4 bg-brand-accent hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20">
                      Aplikuj teraz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
                <Zap size={24} />
              </div>
              <span className="text-xl font-display font-bold text-slate-900">UniBiz Hub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveMarket('university')}
                className={`text-sm font-medium transition-colors ${activeMarket === 'university' ? 'text-brand-accent' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Dla Uczelni
              </button>
              <button 
                onClick={() => setActiveMarket('business')}
                className={`text-sm font-medium transition-colors ${activeMarket === 'business' ? 'text-brand-accent' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Dla Biznesu & Gov
              </button>
              <button 
                onClick={() => setActiveMarket('startup')}
                className={`text-sm font-medium transition-colors ${activeMarket === 'startup' ? 'text-brand-accent' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Start-upy
              </button>
              
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                    <UserIcon size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-700">{currentUser.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuth(true)}
                  className="bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
                >
                  Zaloguj się
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            key={activeMarket}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold mb-6"
          >
            {activeMarket === 'university' 
              ? 'Przekuj naukę w dochodowy biznes' 
              : activeMarket === 'business'
              ? 'Znajdź innowatorów i wykonawców jutra'
              : 'Zmień swój pomysł w globalny start-up'}
          </motion.h1>
          <motion.p 
            key={activeMarket + '-desc'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10"
          >
            {activeMarket === 'university'
              ? 'Łączymy naukowców z wizją z biznesem, który wie jak skalować. Wspólnie wdrażajcie innowacje B+R.'
              : activeMarket === 'business'
              ? 'Wrzucaj ogłoszenia w formie hackatonów. Nawiąż współpracę z najlepszymi talentami i software house’ami.'
              : 'Pokaż swój pomysł inwestorom i partnerom. Znajdź wsparcie, którego potrzebujesz, aby wystartować.'}
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => currentUser ? setShowAddProject(true) : setShowAuth(true)}
              className="bg-brand-accent hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              {activeMarket === 'university' ? 'Dodaj Projekt B+R' : activeMarket === 'business' ? 'Opublikuj Hackathon' : 'Dodaj Pomysł na Start-up'}
              <PlusCircle size={20} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all">
              Dowiedz się więcej
            </button>
          </div>
        </div>
      </header>

      {/* Market Selector Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-2 flex gap-2 border border-slate-100 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveMarket('university')}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-3 py-4 rounded-2xl transition-all ${activeMarket === 'university' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <GraduationCap size={24} />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold">Rynek Nauki</p>
              <p className="text-xs opacity-70">Projekty B+R</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveMarket('business')}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-3 py-4 rounded-2xl transition-all ${activeMarket === 'business' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Briefcase size={24} />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold">Rynek Pracy</p>
              <p className="text-xs opacity-70">Hackathony</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveMarket('startup')}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-3 py-4 rounded-2xl transition-all ${activeMarket === 'startup' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Rocket size={24} />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold">Start-upy</p>
              <p className="text-xs opacity-70">Innowacyjne pomysły</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={
                activeMarket === 'university' ? "Szukaj projektów, uczelni, technologii..." : 
                activeMarket === 'business' ? "Szukaj hackatonów, firm, wyzwań..." :
                "Szukaj pomysłów, founderów, branż..."
              }
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-medium hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={20} />
            Filtry
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {activeMarket === 'university' ? (
              filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-brand-accent/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Building2 size={24} />
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      Szuka Partnera
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2">
                    <Users size={16} />
                    {project.institution}
                  </p>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleShowDetails(project)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl group-hover:bg-brand-primary group-hover:text-white transition-all"
                  >
                    Szczegóły kontraktu
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              ))
            ) : activeMarket === 'business' ? (
              filteredHackathons.map((hackathon) => (
                <motion.div 
                  key={hackathon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-brand-accent/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Code size={24} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar size={16} />
                      {hackathon.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-accent transition-colors">
                    {hackathon.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2">
                    <Building2 size={16} />
                    {hackathon.organizer}
                  </p>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {hackathon.description}
                  </p>
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
                    <Trophy className="text-amber-500" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Nagroda / Cel</p>
                      <p className="text-sm font-bold text-slate-900">{hackathon.reward}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {hackathon.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleShowDetails(hackathon)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl group-hover:bg-brand-primary group-hover:text-white transition-all"
                  >
                    Szczegóły wyzwania
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              ))
            ) : (
              filteredStartups.map((startup) => (
                <motion.div 
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-brand-accent/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Rocket size={24} />
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      startup.stage === 'idea' ? 'bg-yellow-100 text-yellow-700' :
                      startup.stage === 'mvp' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {startup.stage}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-accent transition-colors">
                    {startup.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2">
                    <Users size={16} />
                    Founder: {startup.founder}
                  </p>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {startup.description}
                  </p>
                  {startup.fundingSought && (
                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
                      <Handshake className="text-brand-accent" size={20} />
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Poszukiwane wsparcie</p>
                        <p className="text-sm font-bold text-slate-900">{startup.fundingSought}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {startup.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleShowDetails(startup)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
                  >
                    Zobacz szczegóły
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {((activeMarket === 'university' && filteredProjects.length === 0) || 
          (activeMarket === 'business' && filteredHackathons.length === 0) ||
          (activeMarket === 'startup' && filteredStartups.length === 0)) && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Brak wyników</h3>
            <p className="text-slate-500">Spróbuj zmienić frazę wyszukiwania lub filtry.</p>
          </div>
        )}
      </main>

      {/* Auth Modals */}
      {showAuth && (
        <Auth 
          onLogin={handleLogin}
          onClose={() => setShowAuth(false)}
        />
      )}
      
      {showAddProject && currentUser && (
        <AddProject 
          user={currentUser}
          onClose={() => setShowAddProject(false)}
          onAdd={handleAddNewItem}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                  <Zap size={18} />
                </div>
                <span className="text-lg font-display font-bold text-slate-900">UniBiz Hub</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                Największa w Polsce platforma łącząca świat nauki z dynamicznym biznesem. Wspieramy innowacje od pomysłu do wdrożenia.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Platforma</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-brand-accent transition-colors">Dla Uczelni</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Dla Biznesu</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Jak to działa?</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Cennik</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Kontakt</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-brand-accent transition-colors">Centrum pomocy</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Współpraca</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Regulamin</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Polityka prywatności</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
            <p>© 2024 UniBiz Hub. Wszystkie prawa zastrzeżone.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
