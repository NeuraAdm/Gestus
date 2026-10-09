import React from 'react';

type Variant = 'wave' | 'wave-alt' | 'tilt' | 'curve';

interface SectionDividerProps {
  prevColor: string;
  nextColor: string;
  variant?: Variant;
  flipX?: boolean;
}

const PATHS: Record<Variant, string> = {
  wave:       'M0,20 C360,55 1080,5 1440,20 L1440,60 L0,60 Z',
  'wave-alt': 'M0,40 C480,5 960,55 1440,40 L1440,60 L0,60 Z',
  tilt:       'M0,60 L1440,0 L1440,60 L0,60 Z',
  curve:      'M0,60 Q720,10 1440,60 L1440,60 L0,60 Z',
};

const SectionDivider: React.FC<SectionDividerProps> = ({
  prevColor,
  nextColor,
  variant = 'wave',
  flipX = false,
}) => (
  <div
    className="relative -mt-px overflow-hidden leading-none"
    style={{ background: prevColor, height: '60px' }}
    aria-hidden="true"
  >
    <svg
      className="absolute bottom-0 w-full block"
      style={{
        height: '60px',
        transform: flipX ? 'scaleX(-1)' : undefined,
      }}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={nextColor} d={PATHS[variant]} />
    </svg>
  </div>
);

export default SectionDivider;
