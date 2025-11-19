/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Database, Filter, ArrowRight, BarChart } from 'lucide-react';

// --- FEATURE PIPELINE DIAGRAM ---
export const FeaturePipelineDiagram: React.FC = () => {
  return (
    <div className="flex flex-col p-8 bg-white rounded-xl shadow-sm border border-slate-200 my-8">
      <h3 className="font-serif text-xl mb-6 text-slate-800">The Pipeline</h3>
      
      <div className="flex flex-col gap-4 relative">
        {/* Step 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 relative z-10"
        >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <Database size={18} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-slate-700 text-sm">Raw Input</h4>
                <p className="text-xs text-slate-500">Hourly Load (kWh) + Weather (Temp, Wind, Solar)</p>
            </div>
        </motion.div>

        {/* Connector */}
        <div className="h-6 w-0.5 bg-slate-300 mx-auto -my-2"></div>

        {/* Step 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100 relative z-10"
        >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Filter size={18} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-emerald-900 text-sm">Feature Engineering</h4>
                <div className="flex gap-2 mt-1 flex-wrap">
                    <span className="px-2 py-0.5 bg-white rounded border border-emerald-200 text-[10px] text-emerald-700 font-mono">Lags(t-1..168)</span>
                    <span className="px-2 py-0.5 bg-white rounded border border-emerald-200 text-[10px] text-emerald-700 font-mono">Sin/Cos Time</span>
                    <span className="px-2 py-0.5 bg-white rounded border border-emerald-200 text-[10px] text-emerald-700 font-mono">Rolling Mean</span>
                </div>
            </div>
        </motion.div>

        {/* Connector */}
        <div className="h-6 w-0.5 bg-slate-300 mx-auto -my-2"></div>

        {/* Step 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800 text-white relative z-10 shadow-lg"
        >
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400">
                <Zap size={18} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-white text-sm">Model Prediction</h4>
                <p className="text-xs text-slate-400">Gradient Boosted Trees (XGB/LGBM)</p>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- RESULTS CHART ---
export const ResultsChart: React.FC = () => {
    const [metric, setMetric] = useState<'accuracy' | 'time'>('accuracy');

    // Data from Paper Table 1
    const models = [
        { name: 'Random Forest', mae: 3.30, time: 115.8, type: 'tree' },
        { name: 'XGBoost', mae: 3.42, time: 2.62, type: 'tree' },
        { name: 'LightGBM', mae: 3.58, time: 3.27, type: 'tree' },
        { name: 'TFT (Transformer)', mae: 5.11, time: 21831, type: 'deep' },
        { name: 'LSTM', mae: 10.13, time: 13496, type: 'deep' },
    ];

    // Sort based on selected metric for better viz
    const sortedModels = [...models].sort((a, b) => 
        metric === 'accuracy' ? a.mae - b.mae : a.time - b.time
    );

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-serif text-white">Performance Comparison</h3>
                    <p className="text-slate-400 text-sm">Trees vs Deep Nets on Drammen Dataset</p>
                </div>
                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                    <button 
                        onClick={() => setMetric('accuracy')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${metric === 'accuracy' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                        Accuracy (MAE)
                    </button>
                    <button 
                        onClick={() => setMetric('time')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${metric === 'time' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                        Training Time
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {sortedModels.map((model, idx) => (
                    <div key={model.name} className="relative group">
                        <div className="flex justify-between text-sm mb-1">
                            <span className={`font-bold ${model.type === 'tree' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                                {model.name}
                            </span>
                            <span className="text-slate-300 font-mono">
                                {metric === 'accuracy' ? `${model.mae.toFixed(2)} kWh` : `${model.time.toLocaleString()} s`}
                            </span>
                        </div>
                        
                        <div className="w-full bg-slate-700/50 h-8 rounded-md overflow-hidden relative flex items-center">
                            {metric === 'accuracy' ? (
                                // Accuracy: Lower is better. We inverse the width visualization or just map max.
                                // Let's map relative to worst (LSTM ~10.13)
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(model.mae / 12) * 100}%` }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`h-full ${model.type === 'tree' ? 'bg-emerald-500' : 'bg-indigo-500'} opacity-80`}
                                />
                            ) : (
                                // Time: Log scale visualization because 2.6s vs 21000s is huge
                                // Simple log approximation for width
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(Math.log(model.time) / Math.log(25000)) * 100}%` }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`h-full ${model.type === 'tree' ? 'bg-emerald-500' : 'bg-indigo-500'} opacity-80`}
                                />
                            )}
                            
                            {/* Label inside bar if wide enough */}
                             <span className="absolute left-2 text-xs font-medium text-white/90 drop-shadow-md z-10">
                                {metric === 'time' && model.time > 1000 ? 'Hours of training...' : ''}
                                {metric === 'time' && model.time < 100 ? 'Seconds!' : ''}
                             </span>
                        </div>
                         {metric === 'accuracy' && (
                            <p className="text-[10px] text-slate-500 mt-1 text-right">Lower is better</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 flex gap-6 text-xs justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                    <span className="text-slate-300">Tree Ensembles</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
                    <span className="text-slate-300">Deep Neural Nets</span>
                </div>
            </div>
        </div>
    );
};

export const BuildingTypeDistribution: React.FC = () => {
    return <div className="bg-white p-4 rounded border border-slate-200">Placeholder</div>
}