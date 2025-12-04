
export interface SweepIconProps {
  readonly active: boolean;
  readonly pressed: boolean;
}

export const SweepIcon = ({ active, pressed }: SweepIconProps) => {
  const transform = active
    ? "rotate(-12deg) translate(-1px, -1px)"
    : pressed
    ? "scale(0.94)"
    : "rotate(0deg)";

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 64 64"
      className="drop-shadow-md transition-transform duration-500 ease-out"
      style={{ transform }}
      role="img"
      aria-hidden="true">
      <defs>
        <linearGradient
          id="handleGradient"
          x1="32"
          y1="6"
          x2="32"
          y2="34"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient
          id="brushGradient"
          x1="22"
          y1="32"
          x2="42"
          y2="52"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <rect
        x="28"
        y="6"
        width="8"
        height="30"
        rx="4"
        fill="url(#handleGradient)"
      />
      <path
        d="M18 34h28l6 18c1.2 3.6-1.4 7-5.2 7H17.2c-3.8 0-6.4-3.4-5.2-7l6-18z"
        fill="url(#brushGradient)"
      />
      <path
        d="M18.5 34 14 48c-0.8 2.3 0.9 4.6 3.3 4.6H46c2.4 0 4.1-2.3 3.3-4.6L44 34"
        fill="rgba(96, 165, 250, 0.45)"
      />
      <path
        d="M27 10c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v4h-10v-4z"
        fill="#c084fc"
        opacity="0.75"
      />
      <g
        style={{
          animation: active
            ? "sparkleTwinkle 1.3s ease-in-out infinite"
            : "none"
        }}
        transform="translate(6 -4)"
        opacity="0.85">
        <circle cx="46" cy="20" r="2" fill="#fef08a" />
        <circle cx="50" cy="16" r="1.4" fill="#fde68a" />
        <circle cx="48" cy="24" r="1.8" fill="#facc15" />
      </g>
      <path d="M26 40h12l2 8H24l2-8z" fill="#bfdbfe" opacity="0.7" />
    </svg>
  );
};