import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon, Building2, ArrowRight, X } from 'lucide-react';
import { User, AffiliationType } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

export function Auth({ onLogin, onClose }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    affiliation: 'company' as AffiliationType,
    institutionName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup
    const mockUser: User = {
      id: 'u1',
      email: formData.email,
      name: formData.name || 'User',
      affiliation: formData.affiliation,
      institutionName: formData.institutionName || 'My Org'
    };
    onLogin(mockUser);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-8 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              {isLogin ? 'Witaj ponownie' : 'Dołącz do UniBiz'}
            </h2>
            <p className="text-slate-500">
              {isLogin ? 'Zaloguj się, aby zarządzać swoimi projektami' : 'Stwórz konto i zacznij współpracę'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Imię i nazwisko"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Afiliacja</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['university', 'company', 'government', 'individual'] as AffiliationType[]).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, affiliation: type})}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                          formData.affiliation === type 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {type === 'university' ? 'Uczelnia' : 
                         type === 'company' ? 'Firma' : 
                         type === 'government' ? 'Inst. Państwowa' : 'Indywidualny'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nazwa instytucji / firmy"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    required
                    value={formData.institutionName}
                    onChange={e => setFormData({...formData, institutionName: e.target.value})}
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Hasło"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-brand-accent hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-slate-500 hover:text-brand-accent transition-colors"
            >
              {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
