import React, { useRef } from 'react';
import { X, Upload, RotateCcw, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-400" />
              Customize Tier Photos
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload any photos from your computer or set image URLs for each speed & accuracy tier!
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="my-3 p-3 bg-pink-950/40 border border-pink-500/30 rounded-2xl flex items-center justify-between text-xs text-pink-200 flex-shrink-0">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0" />
            Upload any image for the initial look (Tier 3) or top speed look (Tier 5). Saved automatically in your browser!
          </span>
          <button
            onClick={onResetAvatars}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold flex items-center gap-1 transition ml-2 flex-shrink-0"
            title="Reset all to default images"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Tiers List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {BEAUTY_TIERS.map((tier) => {
            const currentImg = customAvatars[tier.tier] || tier.avatar;
            const isCustom = Boolean(customAvatars[tier.tier]);

            return (
              <div
                key={tier.tier}
                className="p-3.5 bg-slate-800/60 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Image preview */}
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 shadow-md" style={{ borderColor: tier.themeColor }}>
                    <img
                      src={currentImg}
                      alt={tier.name}
                      className="w-full h-full object-cover"
                    />
                    {isCustom && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white" style={{ color: tier.themeColor }}>
                        Tier {tier.tier}: {tier.name}
                      </span>
                      {tier.tier === 3 && (
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full">
                          Initial Look
                        </span>
                      )}
                      {tier.tier === 5 && (
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full">
                          Max Speed Look
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{tier.title}</p>
                    <p className="text-[11px] text-pink-300 mt-0.5 font-bold font-mono">Speed Trigger: {tier.targetSpeed}</p>
                  </div>
                </div>

                {/* Upload & URL input controls */}
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
                    className="px-3 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-pink-600/30"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>

                  {isCustom && (
                    <button
                      onClick={() => onUpdateAvatar(tier.tier, null)}
                      className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-xl text-xs transition"
                      title="Revert to default illustration"
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
        <div className="pt-4 mt-2 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold shadow-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
