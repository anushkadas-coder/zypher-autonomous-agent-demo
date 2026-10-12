
import React, { useState } from 'react';
import { Settings2, Cpu, CheckSquare, Square, Layers, Database, Workflow, RotateCcw, Plus, Activity, Check, ShieldCheck } from 'lucide-react';
import { AgentConfig, AgentStatus } from '../types';
import { AVAILABLE_MODELS, TOOL_DEFINITIONS } from '../constants';

interface SidebarProps {
  config: AgentConfig;
  setConfig: (config: AgentConfig) => void;
  status: AgentStatus;
  onReset: () => void;
  onCreateCleanNode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, status, onReset, onCreateCleanNode }) => {
  const [success, setSuccess] = useState(false);

  const handleCreateNode = () => {
    onCreateCleanNode();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  const toggleTool = (name: string) => {
    const next = config.tools.includes(name)
      ? config.tools.filter(t => t !== name)
      : [...config.tools, name];
    setConfig({ ...config, tools: next });
  };

  return (
    <div className="w-full bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex items-center gap-4 bg-white/50 shrink-0">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
          <Layers className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-black text-[13px] text-slate-900 tracking-tight uppercase truncate">ZYPHER CONSOLE</span>
          <span className="text-[9px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1 block flex items-center gap-1.5">
            <Workflow className="w-3 h-3" />
            SCHEME A | v1.9.2
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Node Cluster Management */}
        <section>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            Audit & Deployment
          </label>
          <div className="space-y-2">
            <button 
              type="button"
              onClick={handleCreateNode}
              className={`w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                success 
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
              }`}
            >
              {success ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 text-blue-400" />}
              {success ? 'Node Re-deployed' : 'New Deployment Node'}
            </button>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
              <span className="text-[9px] font-black text-blue-800 truncate uppercase tracking-tighter max-w-[140px]">{config.name}</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black text-emerald-600 uppercase">Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Kernel */}
        <section>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            Decision Kernel (Mock Provider)
          </label>
          <div className="relative">
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-800 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer font-bold appearance-none"
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
            >
              {AVAILABLE_MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Toolkit */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-slate-500" />
              Agent Toolkit (MCP)
            </label>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {TOOL_DEFINITIONS.map(tool => (
              <div 
                key={tool.name}
                onClick={() => toggleTool(tool.name)}
                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer text-[9px] font-black transition-all border ${
                  config.tools.includes(tool.name) 
                    ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm' 
                    : 'bg-transparent border-slate-100 text-slate-400 hover:border-slate-300'
                }`}
              >
                <span className="font-mono tracking-tighter uppercase">{tool.name}</span>
                {config.tools.includes(tool.name) 
                  ? <CheckSquare className="w-4 h-4 text-blue-500" />
                  : <Square className="w-4 h-4 opacity-10" />
                }
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="pb-6">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3 flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-slate-400" />
            Autonomous Ruleset
          </label>
          <textarea 
            className="w-full h-40 bg-slate-50 border border-slate-200 rounded-lg p-4 text-[10px] resize-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-mono leading-relaxed text-slate-600 transition-all custom-scrollbar"
            value={config.systemPrompt}
            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
          />
        </section>

        <section className="pb-8 space-y-3">
           <button 
             type="button"
             onClick={() => window.dispatchEvent(new CustomEvent('TRIGGER_AUDIT'))}
             className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-[10px] font-black text-blue-700 uppercase tracking-widest hover:bg-blue-100 transition-all active:scale-95 shadow-sm"
           >
             <ShieldCheck className="w-3.5 h-3.5" />
             Execute Protocol Audit
           </button>
           <button 
             type="button"
             onClick={onReset}
             className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-800 transition-all active:scale-95"
           >
             <RotateCcw className="w-3.5 h-3.5" />
             Purge Workspace Context
           </button>
        </section>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <div className="flex items-center justify-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-[0.25em]">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          DETERMINISTIC KERNEL v1.9.2
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
