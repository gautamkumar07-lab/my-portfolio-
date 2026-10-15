import React, { useState, useRef } from 'react';
import { 
  Code, 
  Sparkles, 
  Upload, 
  Maximize2, 
  Sliders, 
  RotateCcw, 
  Camera,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import defaultPortrait from '../assets/images/gautam_yadav_portrait_1791782839559.jpg';

export const PhotoCard: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    return localStorage.getItem('gautam_custom_photo') || defaultPortrait;
  });

  const [activeFilter, setActiveFilter] = useState<'natural' | 'studio' | 'cinematic' | 'noir'>('natural');
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // 3D Tilt calculation
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          try {
            localStorage.setItem('gautam_custom_photo', result);
          } catch (storageErr) {
            console.warn('Could not cache photo:', storageErr);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          try {
            localStorage.setItem('gautam_custom_photo', result);
          } catch (storageErr) {
            console.warn('Could not cache photo:', storageErr);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setPhotoSrc(defaultPortrait);
    localStorage.removeItem('gautam_custom_photo');
  };

  const filterClass = {
    natural: 'photo-filter-natural',
    studio: 'photo-filter-studio',
    cinematic: 'photo-filter-cinematic',
    noir: 'photo-filter-noir',
  }[activeFilter];

  return (
    <div className="relative w-full max-w-md photo-3d-wrapper py-8 px-4">
      {/* Hidden File Input for uploading custom photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Ambient Pulsing Cyan Glow */}
      <div 
        className="absolute inset-4 bg-teal-500/15 rounded-3xl blur-[40px] pointer-events-none transition-all duration-500"
        style={{
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          opacity: isHovered ? 1 : 0.7,
        }}
      />

      {/* 3D Tilted Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative rounded-3xl bg-[#09111e]/90 border border-teal-500/40 p-10 pt-12 pb-10 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.18)] backdrop-blur-2xl group"
      >
        
        {/* Floating Badge 1: Top-Left (</> coding) */}
        <div className="absolute -top-3.5 -left-4 sm:-left-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950/95 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] text-teal-300 font-mono text-xs font-semibold hover:border-teal-400 transition-all cursor-default">
          <Code className="w-3.5 h-3.5 text-teal-400" />
          <span>coding</span>
        </div>

        {/* Floating Badge 2: Top-Right (React.js) */}
        <div className="absolute top-12 -right-4 sm:-right-6 z-20 px-4 py-2 rounded-xl bg-slate-950/95 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] text-teal-300 font-mono text-xs font-semibold hover:border-teal-400 transition-all cursor-default">
          <span>React.js</span>
        </div>

        {/* Floating Badge 3: Bottom-Left (C++ • Python) */}
        <div className="absolute bottom-10 -left-4 sm:-left-6 z-20 px-4 py-2 rounded-xl bg-slate-950/95 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] text-teal-300 font-mono text-xs font-semibold hover:border-teal-400 transition-all cursor-default">
          <span>C++ • Python</span>
        </div>

        {/* Floating Badge 4: Bottom-Right (</> AI + Web) */}
        <div className="absolute -bottom-3.5 -right-3 sm:-right-4 z-20 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950/95 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)] text-teal-300 font-mono text-xs font-semibold hover:border-teal-400 transition-all cursor-default">
          <Code className="w-3.5 h-3.5 text-teal-400" />
          <span>AI + Web</span>
        </div>

        {/* Circular Avatar Container with Glowing Cyan Ring */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-4 ring-teal-400/80 ring-offset-4 ring-offset-slate-950 shadow-[0_0_35px_rgba(20,184,166,0.5)] mb-6 cursor-pointer group/avatar ${
            isDragOver ? 'scale-105 ring-rose-500' : ''
          }`}
          onClick={() => fileInputRef.current?.click()}
          title="Click to change photo"
        >
          {/* Main Photo */}
          <img
            src={photoSrc}
            alt="Gautam Kumar"
            className={`w-full h-full object-cover object-center transition-transform duration-500 ${filterClass} group-hover/avatar:scale-105`}
            referrerPolicy="no-referrer"
          />

          {/* Hover Overlay with Change Icon */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
            <Camera className="w-6 h-6 text-teal-400 mb-1" />
            <span className="text-[11px] font-semibold">Change Photo</span>
          </div>

          {/* Drag Overlay */}
          {isDragOver && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-white">
              <Upload className="w-6 h-6 text-teal-400 animate-bounce mb-1" />
              <span className="text-[11px] font-bold">Drop Image</span>
            </div>
          )}
        </div>

        {/* Name and Designation below Circular Avatar */}
        <h3 className="text-2xl font-extrabold text-white font-display tracking-tight text-center">
          Gautam Kumar
        </h3>
        <p className="text-sm text-slate-400 font-mono text-center mt-1">
          B.Tech CSE • Developer
        </p>

        {/* Controls Bar Toggle (Subtle on hover/click) */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-300 hover:bg-teal-900 text-[11px] font-semibold flex items-center gap-1 transition-all"
          >
            <Camera className="w-3 h-3" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => setIsLightboxOpen(true)}
            className="p-1.5 rounded-lg bg-slate-900 border border-teal-500/30 text-slate-400 hover:text-white transition-all"
            title="View Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowControls(!showControls)}
            className="p-1.5 rounded-lg bg-slate-900 border border-teal-500/30 text-slate-400 hover:text-white transition-all"
            title="Filters"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Expanded Filters Panel */}
        {showControls && (
          <div className="mt-4 w-full p-3 rounded-xl bg-slate-950 border border-teal-500/30 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[11px]">Filter Preset:</span>
              {photoSrc !== defaultPortrait && (
                <button
                  onClick={handleResetPhoto}
                  className="text-[11px] text-teal-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['natural', 'studio', 'cinematic', 'noir'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`py-1 rounded text-[10px] capitalize transition-all ${
                    activeFilter === filter
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div className="relative max-w-sm w-full p-4 rounded-3xl bg-slate-950 border border-teal-500/40 text-center cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="w-56 h-56 mx-auto rounded-full overflow-hidden ring-4 ring-teal-400 ring-offset-4 ring-offset-slate-950 mb-4 shadow-[0_0_40px_rgba(20,184,166,0.6)]">
              <img
                src={photoSrc}
                alt="Gautam Kumar"
                className={`w-full h-full object-cover ${filterClass}`}
              />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Gautam Kumar</h4>
            <p className="text-xs text-teal-400 font-mono mb-4">B.Tech CSE • Developer</p>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
