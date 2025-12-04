import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";

interface QuickProductivityButtonProps {
  readonly disabled: boolean;
  readonly isLoading: boolean;
  readonly isAnimating: boolean;
  readonly onClick: () => void;
}

function QuickProductivityButtonComponent({
  disabled,
  isLoading,
  isAnimating,
  onClick
}: QuickProductivityButtonProps) {
  return (
    <button
      id="quick-productivity-button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex h-24 w-24 items-center justify-center rounded-full border-none outline-none transition-all duration-500 ${
        disabled
          ? "cursor-not-allowed bg-gray-200 opacity-70 dark:bg-gray-700"
          : "cursor-pointer bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
      } `}
      aria-label="Quick clean session">
      {/* Pulse rings when animating */}
      {isAnimating && !disabled && (
        <>
          <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400 opacity-20 duration-1000"></span>
          <span className="absolute h-full w-full scale-110 animate-pulse rounded-full border-2 border-blue-400 opacity-30"></span>
        </>
      )}

      {/* Inner content */}
      <div className="relative z-10 flex items-center justify-center text-white">
        {isLoading ? (
          <CircularProgress size={32} sx={{ color: "white" }} />
        ) : (
          <AutoAwesomeIcon
            className={`transition-transform duration-700 ease-out ${
              isAnimating
                ? "rotate-180 scale-110"
                : "group-hover:rotate-12 group-hover:scale-110"
            } `}
            sx={{ fontSize: 40 }}
          />
        )}
      </div>

      {/* Shine effect overlay */}
      {!disabled && !isLoading && (
        <div className="absolute inset-0 -z-0 overflow-hidden rounded-full">
          <div className="absolute -left-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 transition-all duration-700 group-hover:left-full"></div>
        </div>
      )}
    </button>
  );
}

const QuickProductivityButton = memo(QuickProductivityButtonComponent);

export default QuickProductivityButton;
