
import React, { useRef, useEffect } from 'react';
import { User, BrainCircuit, Terminal, CheckCircle2, ChevronRight, Zap, Search, FileText, PenTool, Loader2, AlertTriangle, RotateCcw, ShieldCheck, Database, Activity } from 'lucide-react';
import { Message, AgentStatus } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  status: AgentStatus;
  onSendMessage: (content: string) => void;
  input: string;
  setInput: (val: string) => void;
  onHardReset: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, status, onSendMessage, input, setInput, onHardReset 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === AgentStatus.IDLE) {
      onSendMessage(input);
      setInput('');
    }
  };

  const quickActions = [
    { label: "Run Integrity Audit", icon: <ShieldCheck className="w-3 h-3" />, command: "Run full workspace integrity audit" },
    { label: "Security Scan", icon: <Database className="w-3 h-3" />, command: "Execute database security scan" },
    { label: "System Metrics", icon: <Activity className="w-3 h-3" />, command: "Check current system telemetry" },
  ];

  const getToolIcon = (name: string) => {
    const n = name.toUpperCase();
    if (n.includes('READ')) return <FileText className="w-3.5 h-3.5" />;
    if (n.includes('WRITE')) return <PenTool className="w-3.5 h-3.5" />;
    if (n.includes('SEARCH')) return <Search className="w-3.5 h-3.5" />;
    return <Terminal className="w-3.5 h-3.5" />;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 select-none">
            <div className="p-6 bg-slate-50 rounded-full border border-slate-100 mb-5 shadow-inner">
              <Zap className="w-10 h-10 text-blue-500 fill-blue-500/5" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Deterministic Kernel Standby</p>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Select a protocol below or type a custom command</p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(action.command)}
                  disabled={status !== AgentStatus.IDLE}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isError = m.role === 'system' && m.content.includes('PROTOCOL_PANIC');
          
          return (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`flex gap-4 max-w-[95%] sm:max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${
                  m.role === 'user' ? 'bg-slate-900 border-slate-800' : isError ? 'bg-red-600 border-red-500' : 'bg-blue-600 border-blue-500'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <div className="text-[10px] font-black text-white italic">ZY</div>}
                </div>
                
                <div className="flex flex-col gap-5 min-w-0 flex-1">
                  {m.thoughtTrace && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[8px] text-blue-600 font-black uppercase tracking-[0.25em] px-1">
                        <BrainCircuit className="w-3 h-3" />
                        Autonomous Reasoning Loop
                      </div>
                      <div className="px-5 py-4 bg-blue-50/30 border border-blue-100 rounded-xl text-[12px] text-blue-900 leading-relaxed font-medium italic shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 group-hover:w-1.5 transition-all" />
                        {m.thoughtTrace}
                      </div>
                    </div>
                  )}

                  {m.content && (
                    <div className={`px-5 py-4 rounded-xl text-[13px] leading-relaxed shadow-sm font-medium ${
                      m.role === 'user' 
                        ? 'bg-slate-900 text-white shadow-slate-900/10' 
                        : isError 
                          ? 'bg-red-50 border border-red-200 text-red-900'
                          : 'bg-[#fafbfc] border border-slate-200 text-slate-800'
                    }`}>
                      <div className="whitespace-pre-wrap font-medium">
                        {isError ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-red-700 font-black tracking-widest uppercase text-[10px]">
                              <AlertTriangle className="w-4 h-4" /> Logic Protocol Breach
                            </div>
                            <div className="font-mono text-[11px] bg-white/50 p-3 rounded-lg border border-red-100 leading-relaxed">
                              {m.content}
                            </div>
                            <button 
                              onClick={onHardReset}
                              className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-red-600/10"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Restore Integrity (Purge)
                            </button>
                          </div>
                        ) : m.content}
                      </div>
                    </div>
                  )}

                  {m.toolCalls && m.toolCalls.length > 0 && (
                    <div className="space-y-4">
                      {m.toolCalls.map((call, idx) => {
                        const result = m.toolResults?.find(r => r.id === call.id || r.name === call.name);
                        return (
                          <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm border-l-4 border-l-blue-500 transition-all hover:shadow-md">
                            <div className="bg-slate-50/50 px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
                              <div className="flex items-center gap-3 text-[9px] text-slate-700 font-black tracking-widest uppercase">
                                <span className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                                  {getToolIcon(call.name)}
                                </span>
                                {call.name.toUpperCase()}
                              </div>
                              {result && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded text-emerald-600 text-[8px] font-black uppercase border border-emerald-100">
                                  <CheckCircle2 className="w-3 h-3" /> EXECUTED
                                </div>
                              )}
                            </div>
                            
                            <div className="p-4 space-y-4">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Call Parameters</span>
                                <div className="text-[10px] font-mono text-blue-700 bg-blue-50/20 p-3 rounded-lg border border-blue-100/10">
                                  {Object.entries(call.args).length > 0 ? Object.entries(call.args).map(([key, val]) => (
                                    <div key={key} className="flex gap-2">
                                      <span className="opacity-40">{key}:</span>
                                      <span className="truncate">{String(val)}</span>
                                    </div>
                                  )) : <span className="opacity-40 italic">void()</span>}
                                </div>
                              </div>
                              
                              {result && (
                                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50">
                                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Kernel Output Stream</span>
                                  <div className="text-[11px] font-mono bg-slate-900 text-emerald-400 p-4 rounded-lg border border-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner max-h-48 overflow-y-auto custom-scrollbar">
                                    {String(result.result)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {status !== AgentStatus.IDLE && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center px-6 py-4 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-900/10 border border-slate-800">
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                Autonomous Loop Active
                <span className="inline-flex gap-1">
                  <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </span>
              </span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 border-t border-slate-100 bg-white shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2">
            <ChevronRight className={`w-4 h-4 transition-all duration-300 ${status === AgentStatus.IDLE ? 'text-blue-500 translate-x-1' : 'text-slate-200'}`} />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-[13px] font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm"
              placeholder={status === AgentStatus.IDLE ? "Submit protocol directive..." : "Kernel processing... Observe Reactive Loop"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== AgentStatus.IDLE}
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim() || status !== AgentStatus.IDLE}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 text-white rounded-xl px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center transition-all shadow-lg active:scale-[0.98]"
            >
              Execute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
