import React, { useRef } from 'react';
import { X, Upload, RotateCcw, Image as ImageIcon, Sparkles } from 'lucide-react';
import { BEAUTY_TIERS } from '../data/lessons';

export default function CustomAvatarModal({
  isOpen,
  onClose,
  customAvatars,
  onUpdateAvatar,
  onResetAvatars
}) {
  if (!isOpen) return null;

  const fileInputRefs = useRef({});

  const handleFileUpload = (tierNum, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url && typeof base64Url === 'string') {
        onUpdateAvatar(tierNum, base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-strong rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none rounded-t-3xl" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text-heading)' }}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
              Customize Tiers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Upload custom images for each speed tier
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-light text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="relative z-10 my-3 p-3 rounded-xl glass-light flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-medium flex-shrink-0">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
            Images are saved locally in your browser
          </span>
          <button
            onClick={onResetAvatars}
            className="px-3 py-1.5 glass-light text-slate-700 dark:text-white rounded-lg font-bold flex items-center gap-1 transition ml-2 flex-shrink-0 cursor-pointer hover:text-rose-500"
            title="Reset all to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Tiers List */}
        <div className="relative z-10 flex-1 overflow-y-auto space-y-2.5 pr-1">
          {BEAUTY_TIERS.map((tier) => {
            const currentImg = customAvatars[tier.tier] || tier.avatar;
            const isCustom = Boolean(customAvatars[tier.tier]);

            return (
              <div
                key={tier.tier}
                className="p-3.5 glass-card rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 transition-all hover:border-white/15"
              >
                {/* Preview & Info */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div
                    className="relative w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 shadow-lg"
                    style={{ borderColor: tier.themeColor + '60' }}
                  >
                    <img
                      src={currentImg}
                      alt={tier.name}
                      className="w-full h-full object-cover"
                    />
                    {isCustom && (
                      <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm" style={{ color: tier.themeColor }}>
                        Tier {tier.tier}: {tier.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono font-bold">{tier.targetSpeed}</p>
                  </div>
                </div>

                {/* Upload Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => (fileInputRefs.current[tier.tier] = el)}
                    onChange={(e) => handleFileUpload(tier.tier, e)}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRefs.current[tier.tier]?.click()}
                    className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-purple-600/20 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </button>

                  {isCustom && (
                    <button
                      onClick={() => onUpdateAvatar(tier.tier, null)}
                      className="p-2 glass-light text-slate-500 dark:text-slate-300 hover:text-rose-500 rounded-xl text-xs transition cursor-pointer"
                      title="Revert to default"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 mt-2 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
