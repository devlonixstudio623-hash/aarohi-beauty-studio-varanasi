import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  aspectRatioClass?: string;
}

/**
 * Resilient image component with soft sage-to-beige gradient placeholder.
 * If an image URL is missing or fails to load, gracefully displays the placeholder
 * with a camera icon so broken image icons never appear.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Aarohi Beauty Studio',
  className = '',
  aspectRatioClass = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showPlaceholder = !src || hasError;

  if (showPlaceholder) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#E8DCC8]/60 via-[#F6F1E7] to-[#8A9A7B]/30 text-[#5F7155] border border-[#E8DCC8]/50 ${aspectRatioClass} ${className}`}
        aria-label={alt}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-white/70 shadow-sm flex items-center justify-center mb-2 text-[#5F7155]">
            <Camera className="w-5 h-5 stroke-[1.5]" />
          </div>
          <span className="text-xs font-medium tracking-wide text-[#5F7155]/80 max-w-[180px] line-clamp-2">
            {fallbackText || alt || 'Aarohi Studio'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className.includes('h-full') ? 'h-full' : ''} ${className.includes('w-full') ? 'w-full' : ''}`}>
      {/* Soft skeleton glow before image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8DCC8]/40 via-[#F6F1E7] to-[#E8DCC8]/40 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
