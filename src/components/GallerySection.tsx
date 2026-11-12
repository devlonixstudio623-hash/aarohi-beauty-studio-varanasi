import React, { useState, useRef, useEffect } from 'react';
import { CONFIG, BeforeAfterPair, GalleryItem } from '../config';
import { SafeImage } from './SafeImage';
import { Sparkles, X, ChevronLeft, ChevronRight, Eye, MoveHorizontal, Columns2, SlidersHorizontal } from 'lucide-react';

export const GallerySection: React.FC = () => {
  // Gallery category filter
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Feature D: Before/After Comparison state
  const [activePairIndex, setActivePairIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Bridal', 'Facial', 'Hair', 'Nails', 'Studio'];

  const filteredGallery = activeFilter === 'All'
    ? CONFIG.gallery
    : CONFIG.gallery.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());

  const currentPair: BeforeAfterPair = CONFIG.beforeAfterPairs[activePairIndex] || CONFIG.beforeAfterPairs[0];

  // Mouse & Touch drag handling for slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(prev + 5, 100));
    }
  };

  // Lightbox keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev! > 0 ? prev! - 1 : filteredGallery.length - 1));
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev! < filteredGallery.length - 1 ? prev! + 1 : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, filteredGallery.length]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#F6F1E7]/40 border-t border-[#E8DCC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Real Results &bull; Unfiltered Artistry</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Glow Transformations & Studio Portfolio
          </h2>
          <p className="mt-4 text-base text-[#2B2B28]/70 leading-relaxed">
            See how our tailored hair therapies, gentle extractions, and bespoke bridal bases preserve skin texture while achieving camera-ready perfection.
          </p>
        </div>

        {/* FEATURE D: Interactive Before / After Comparison Slider */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC8] shadow-lg">
            
            {/* Header with Pair Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DCC8]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#5F7155]">
                  Real Transformation Results
                </span>
                <h3 className="font-serif text-2xl text-[#2B2B28] mt-0.5">
                  {currentPair.title}
                </h3>
                <p className="text-xs text-[#2B2B28]/70 mt-1">
                  Treatment: <strong className="text-[#5F7155]">{currentPair.treatment}</strong> &bull; {currentPair.notes}
                </p>
              </div>

              {/* Controls: Mode Toggle & Case Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                {/* View Mode Toggle */}
                <div className="inline-flex rounded-full bg-[#F6F1E7] p-1 border border-[#E8DCC8]">
                  <button
                    onClick={() => setViewMode('slider')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      viewMode === 'slider'
                        ? 'bg-[#5F7155] text-white shadow-xs'
                        : 'text-[#2B2B28] hover:text-[#5F7155]'
                    }`}
                    title="Interactive Slider Mode"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Slider</span>
                  </button>
                  <button
                    onClick={() => setViewMode('sideBySide')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      viewMode === 'sideBySide'
                        ? 'bg-[#5F7155] text-white shadow-xs'
                        : 'text-[#2B2B28] hover:text-[#5F7155]'
                    }`}
                    title="Side by Side Dual View"
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span>Side by Side</span>
                  </button>
                </div>

                {/* Case Switcher */}
                <div className="flex items-center gap-1.5">
                  {CONFIG.beforeAfterPairs.map((pair, idx) => (
                    <button
                      key={pair.id}
                      onClick={() => {
                        setActivePairIndex(idx);
                        setSliderPosition(50);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[32px] ${
                        activePairIndex === idx
                          ? 'bg-[#2B2B28] text-white shadow-xs'
                          : 'bg-[#F6F1E7] text-[#2B2B28] hover:bg-[#E8DCC8]'
                      }`}
                    >
                      Case {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Display */}
            {viewMode === 'slider' ? (
              /* Interactive Split Slider */
              <div
                ref={containerRef}
                className="relative w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden select-none cursor-ew-resize mt-6 border border-[#E8DCC8] bg-[#E8DCC8]/20"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                role="slider"
                aria-label="Before and after comparison slider"
                aria-valuenow={Math.round(sliderPosition)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {/* AFTER Image (Full background) */}
                <div className="absolute inset-0 w-full h-full">
                  <SafeImage
                    src={currentPair.afterUrl}
                    alt={`After ${currentPair.treatment}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute bottom-4 right-4 bg-[#2B2B28]/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm tracking-wider uppercase z-10">
                    After
                  </span>
                </div>

                {/* BEFORE Image (Top layer clipped cleanly with CSS clip-path) */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <SafeImage
                    src={currentPair.beforeUrl}
                    alt={`Before ${currentPair.treatment}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute bottom-4 left-4 bg-[#2B2B28]/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm tracking-wider uppercase z-10">
                    Before
                  </span>
                </div>

                {/* Divider Line & Draggable Handle */}
                <div
                  className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center -translate-x-1/2 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#5F7155] border-2 border-white shadow-xl flex items-center justify-center text-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
                    <MoveHorizontal className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ) : (
              /* Side-by-Side Dual View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="relative rounded-2xl overflow-hidden border border-[#E8DCC8] aspect-[4/3] bg-[#E8DCC8]/20 group">
                  <SafeImage
                    src={currentPair.beforeUrl}
                    alt={`Before ${currentPair.treatment}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#2B2B28]/85 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Before Treatment
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-[#E8DCC8] aspect-[4/3] bg-[#E8DCC8]/20 group">
                  <SafeImage
                    src={currentPair.afterUrl}
                    alt={`After ${currentPair.treatment}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#5F7155] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    After Result
                  </span>
                </div>
              </div>
            )}

            {/* Slider Instructions for accessibility */}
            <div className="flex items-center justify-between text-[11px] text-[#2B2B28]/60 mt-4 px-1">
              <span>{viewMode === 'slider' ? '← Drag slider or use arrow keys →' : 'Dual photo comparison'}</span>
              <span className="text-[#5F7155] font-medium">Unretouched salon results</span>
            </div>

          </div>
        </div>

        {/* Gallery Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all min-h-[44px] cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#5F7155] text-white shadow-xs'
                  : 'bg-white text-[#2B2B28] border border-[#E8DCC8] hover:border-[#8A9A7B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (8 Items) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8DCC8] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer aspect-square"
            >
              <SafeImage
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                aspectRatioClass="aspect-square"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28]/80 via-[#2B2B28]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-semibold">
                  {item.tag}
                </span>
                <p className="font-serif text-sm sm:text-base font-normal leading-snug">
                  {item.title}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#E8DCC8]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tap to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-[#2B2B28]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center z-50"
            aria-label="Close image preview"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(prev => (prev! > 0 ? prev! - 1 : filteredGallery.length - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(prev => (prev! < filteredGallery.length - 1 ? prev! + 1 : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-black/40 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={filteredGallery[lightboxIndex].imageUrl}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain rounded-xl"
            />
            <div className="py-3 px-6 text-center text-white">
              <span className="text-xs uppercase text-[#B89B5E] tracking-widest font-semibold block">
                {filteredGallery[lightboxIndex].tag}
              </span>
              <p className="font-serif text-lg">
                {filteredGallery[lightboxIndex].title}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
