import React, { useEffect, useState } from 'react';
import { Check, Copy, Share2, X, ExternalLink } from 'lucide-react';

export default function ShareToast({ toast, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const handleCopyAgain = async () => {
    if (!toast.url) return;
    try {
      await navigator.clipboard.writeText(toast.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[92vw] sm:w-auto animate-fadeInUp select-none"
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-strong border border-indigo-500/40 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl bg-slate-900/90 text-white">
        {/* Success Icon */}
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
          <Check className="w-4 h-4 stroke-[2.5]" />
        </div>

        {/* Content */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {toast.title || 'Link Copied!'}
            </span>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
              Shareable
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 truncate max-w-[240px] sm:max-w-xs font-mono opacity-90 mt-0.5">
            {toast.url || toast.message}
          </p>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={handleCopyAgain}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer flex-shrink-0"
          title="Copy Link Again"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer flex-shrink-0"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
