import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, PlusCircle, Tag, Info, Trophy, Rocket, Building2, GraduationCap } from 'lucide-react';
import { User, MarketType } from '../types';

interface AddProjectProps {
  user: User;
  onClose: () => void;
  onAdd: (project: any) => void;
}

export function AddProject({ user, onClose, onAdd }: AddProjectProps) {
  const [market, setMarket] = useState<MarketType>(
    user.affiliation === 'university' ? 'university' : 
    user.affiliation === 'company' ? 'business' : 'startup'
  );
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    reward: '',
    fundingSought: '',
    stage: 'idea' as 'idea' | 'mvp' | 'scaling'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '');
    
    let newItem: any = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      tags: tagsArray,
      market: market
    };

    if (market === 'university') {
      newItem = { ...newItem, institution: user.institutionName, status: 'searching_partner', createdAt: new Date().toISOString().split('T')[0] };
    } else if (market === 'business') {
      newItem = { ...newItem, organizer: user.institutionName, reward: formData.reward, date: new Date().toISOString().split('T')[0] };
    } else {
      newItem = { ...newItem, founder: user.name, stage: formData.stage, fundingSought: formData.fundingSought };
    }

    onAdd(newItem);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Dodaj nową ofertę</h2>
            <p className="text-slate-500">Wypełnij formularz, aby opublikować swój projekt na UniBiz Hub.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Wybierz Rynek</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMarket('university')}
                  className={`py-3 px-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    market === 'university' ? 'bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-500/20' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap size={20} />
                  <span className="text-xs font-bold">Nauka</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMarket('business')}
                  className={`py-3 px-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    market === 'business' ? 'bg-purple-50 border-purple-200 text-purple-700 ring-2 ring-purple-500/20' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <Building2 size={20} />
                  <span className="text-xs font-bold">Biznes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMarket('startup')}
                  className={`py-3 px-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    market === 'startup' ? 'bg-orange-50 border-orange-200 text-orange-700 ring-2 ring-orange-500/20' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <Rocket size={20} />
                  <span className="text-xs font-bold">Start-up</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Info className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tytuł projektu / wyzwania"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all font-bold"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="relative">
                <textarea 
                  placeholder="Opisz swój projekt, cele i czego szukasz..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all min-h-[150px]"
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tagi (oddzielone przecinkami, np. AI, Ekologia, Software)"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                />
              </div>

              {market === 'business' && (
                <div className="relative">
                  <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nagroda / Cel kontraktu"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    required
                    value={formData.reward}
                    onChange={e => setFormData({...formData, reward: e.target.value})}
                  />
                </div>
              )}

              {market === 'startup' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Etap rozwoju</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                      value={formData.stage}
                      onChange={e => setFormData({...formData, stage: e.target.value as any})}
                    >
                      <option value="idea">Idea</option>
                      <option value="mvp">MVP</option>
                      <option value="scaling">Scaling</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Poszukiwane wsparcie</label>
                    <input 
                      type="text" 
                      placeholder="np. 100 000 PLN"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                      value={formData.fundingSought}
                      onChange={e => setFormData({...formData, fundingSought: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-brand-primary hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Opublikuj ofertę
              <PlusCircle size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
