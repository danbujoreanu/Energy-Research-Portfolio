/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { CityScene } from './components/QuantumScene';
import { ResultsChart, FeaturePipelineDiagram, BuildingTypeDistribution } from './components/Diagrams';
import { ArrowDown, Menu, X, Leaf, Zap, Clock, Database } from 'lucide-react';

const StatCard = ({ label, value, subtext, delay }: { label: string, value: string, subtext: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-emerald-500/50" style={{ animationDelay: delay }}>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed mb-2">{label}</p>
      <h3 className="font-serif text-3xl text-slate-900 text-center mb-2">{value}</h3>
      <div className="w-8 h-0.5 bg-emerald-500 mb-3 opacity-60"></div>
      <p className="text-sm text-slate-600 text-center">{subtext}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Leaf size={18} />
            </div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              STBELF <span className="font-normal text-slate-500">2025</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">Context</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">The Verdict</a>
            <a 
              href="#" 
              className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              Read Paper
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">Context</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">Results</a>
             <a 
              href="#" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-emerald-600 text-white rounded-full shadow-lg cursor-pointer"
            >
              Read Paper
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <CityScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.85)_0%,rgba(248,250,252,0.5)_60%,rgba(248,250,252,0.1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-emerald-600 text-emerald-700 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            AICS 2025 Student Track
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 text-slate-900 drop-shadow-sm">
            The Case for Trees<br/>
            <span className="italic font-normal text-slate-500 text-3xl md:text-5xl block mt-2">Over Deep Nets</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10">
            Forecasting energy demand in buildings is critical for a low-carbon future. But do we really need complex Deep Learning, or are well-tuned Tree Ensembles enough?
          </p>
          
          <div className="flex justify-center">
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer">
                <span>EXPLORE FINDINGS</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-emerald-700 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="intro" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-emerald-600 uppercase">The Challenge</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">Forecasting the Future Grid</h2>
              <div className="w-16 h-1 bg-emerald-500 mb-6"></div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                 <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Zap size={16} className="text-emerald-500"/> Why it matters</h4>
                 <p className="text-sm text-slate-500">
                    Accurate 1–24h predictions allow operators to schedule renewables, avoid coal/gas peaker plants, and manage battery storage efficiently.
                 </p>
              </div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-emerald-600">A</span>s the world moves toward net-zero, our power grids are under immense stress. Variable renewables like wind and solar introduce uncertainty, while the electrification of heating and transport drives demand up.
              </p>
              <p>
                To balance this fragile equation, we need precise forecasts of building energy consumption (STBELF). The industry is currently split: should we use established <strong>Tree-based ensembles</strong> (like XGBoost) or cutting-edge <strong>Deep Learning</strong> (Transformers/LSTMs)?
              </p>
              <p>
                We analyzed the <strong>COFACTOR Drammen</strong> dataset: hourly energy loads from 45 public buildings in Norway over 4 years. The portfolio is diverse, including schools, nursing homes, and offices, offering a rigorous testbed for real-world generalizability.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">Methodology</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-slate-900">Feature Engineering First</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Before any modeling, we built a robust, leakage-safe feature pipeline. Deep models often claim superiority on raw data, but what happens when we give Trees the same engineered inputs?</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
                    <div>
                        <FeaturePipelineDiagram />
                    </div>
                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-emerald-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-slate-900 mb-2">Cyclical Time</h3>
                                <p className="text-slate-600">Encoding time as sine/cosine pairs (Hour of Day, Day of Week, Month) allows models to understand periodic rhythms like school hours or heating seasons.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-emerald-600">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-slate-900 mb-2">Autoregressive Lags</h3>
                                <p className="text-slate-600">Past consumption is the best predictor of future use. We feed the model what happened 1h, 24h, and 1 week ago.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-emerald-600">
                                <ActivityIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-slate-900 mb-2">Rolling Statistics</h3>
                                <p className="text-slate-600">Mean, Min, and Max load over varying windows (3h to 7 days) capture recent trends and volatility without looking into the future.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Results */}
        <section id="results" className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                 <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-500 blur-[120px] opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                     <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/50 text-emerald-400 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-emerald-800">
                            THE VERDICT
                        </div>
                        <h2 className="font-serif text-4xl md:text-6xl mb-6 text-white">Trees Win.</h2>
                        <p className="text-xl text-emerald-200/80 mb-8 leading-relaxed font-light">
                            Across a 4-year test window, Tree Ensembles consistently surpassed Deep Networks in accuracy while training in seconds rather than hours.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Best Accuracy (MAE)</span>
                                    <span className="text-3xl font-serif text-emerald-400">3.30 kWh</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 w-[95%] h-full"></div>
                                </div>
                                <p className="mt-2 text-xs text-slate-500 text-right">Achieved by Random Forest</p>
                            </div>

                            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Fastest Train Time</span>
                                    <span className="text-3xl font-serif text-emerald-400">2.6 s</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 w-full h-full"></div>
                                </div>
                                <p className="mt-2 text-xs text-slate-500 text-right">Achieved by XGBoost</p>
                            </div>
                        </div>
                     </div>

                     <div className="lg:col-span-7">
                        <ResultsChart />
                        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                            <h4 className="text-emerald-400 font-bold mb-2">Key Observation</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Deep learning models (TFT, LSTM) required up to <strong>21,000 seconds</strong> (6+ hours) to train, yet yielded higher error rates (MAE 5.11+) compared to XGBoost which trained in <strong>2.6 seconds</strong> with better accuracy (MAE 3.42). For portfolio-scale operations where models must be retrained frequently, trees are the pragmatic choice.
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Conclusion/Summary */}
        <section className="py-24 bg-white border-t border-slate-200">
             <div className="container mx-auto px-6 text-center">
                 <Leaf size={48} className="mx-auto text-emerald-600 mb-6" />
                 <h2 className="font-serif text-4xl text-slate-900 mb-8">Conclusion</h2>
                 <div className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed space-y-6">
                    <p>
                        The study shows that careful representation design, paired with efficient tree ensembles, creates a formidable baseline for building demand forecasting.
                    </p>
                    <p>
                        While Deep Learning holds promise for multi-horizon tasks with complex covariates, for the specific task of hourly building load forecasting—which is tabular and structured—<strong>Random Forest, XGBoost, and LightGBM</strong> offer the best balance of accuracy, interpretability, and operational efficiency.
                    </p>
                 </div>

                 <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-16">
                    <StatCard label="Buildings" value="45" subtext="Public municipal buildings" delay="0s" />
                    <StatCard label="Observations" value="4 Years" subtext="Hourly data (2018-2022)" delay="0.1s" />
                    <StatCard label="Best R²" value="0.98" subtext="Random Forest Model" delay="0.2s" />
                 </div>
             </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">AICS 2025</div>
                <p className="text-sm">Forecasting Energy Demand in Buildings: The Case for Trees over Deep Nets</p>
            </div>
             <div className="flex gap-6 text-sm font-medium">
                <a href="#" className="hover:text-white transition-colors">Paper</a>
                <a href="#" className="hover:text-white transition-colors">Data</a>
                <a href="#" className="hover:text-white transition-colors">Code</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-600">
            Visualization generated based on anonymous submission to AICS 2025 Student Track.
        </div>
      </footer>
    </div>
  );
};

function ActivityIcon({size}: {size: number}) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    )
}

export default App;