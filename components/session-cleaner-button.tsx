import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { memo, useEffect, useRef, useState } from "react";

import { SweepIcon } from "~/components/icons/sweep-icon";

interface SessionCleanerButtonProps {
  readonly disabled: boolean;
  readonly isLoading: boolean;
  readonly isAnimating: boolean;
  readonly onClick: () => void;
}

function SessionCleanerButtonComponent({
  disabled,
  isLoading,
  isAnimating,
  onClick
}: SessionCleanerButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);
  const completionTimerRef = useRef<number>();
  const prevAnimatingRef = useRef<boolean>(isAnimating);

  useEffect(() => {
    if (prevAnimatingRef.current && !isAnimating && !isLoading) {
      setJustCompleted(true);
      if (completionTimerRef.current) {
        window.clearTimeout(completionTimerRef.current);
      }
      completionTimerRef.current = window.setTimeout(() => {
        setJustCompleted(false);
      }, 800);
    }
    prevAnimatingRef.current = isAnimating;
    return () => {
      if (completionTimerRef.current) {
        window.clearTimeout(completionTimerRef.current);
      }
    };
  }, [isAnimating, isLoading]);

  const handlePointerDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const handlePointerLeave = () => {
    setIsPressed(false);
  };

  return (
    <button
      id="quick-productivity-button"
      onClick={onClick}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className={`group relative flex h-24 w-24 items-center justify-center rounded-full border-none outline-none transition-all duration-500 ${
        disabled
          ? "cursor-not-allowed bg-gray-200 opacity-70 dark:bg-gray-700"
          : "cursor-pointer bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600 shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-blue-500/45 active:scale-95"
      } ${justCompleted ? "ring-2 ring-sky-200 ring-offset-2" : "ring-0"}`}
      aria-label="Quick clean session">
      {isAnimating && !disabled && (
        <>
          <span
            className="absolute h-full w-full rounded-full bg-blue-400/20"
            style={{
              animation: "sweepTrail 1.2s ease-in-out infinite"
            }}></span>
          <span
            className="absolute inset-1 rounded-full border border-white/20"
            style={{
              animation: "sweepTrail 1.4s ease-in-out infinite alternate"
            }}></span>
        </>
      )}

      <span
        className="absolute inset-[14px] rounded-full bg-white/15 transition-opacity duration-300"
        style={{ opacity: isPressed ? 0.55 : 0 }}></span>

      <div className="relative z-10 flex items-center justify-center text-white">
        {isLoading ? (
          <CircularProgress size={34} sx={{ color: "white" }} />
        ) : (
          <SweepIcon active={isAnimating} pressed={isPressed} />
        )}
      </div>

      {justCompleted && !isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <CheckCircleOutlineIcon
            className="text-white drop-shadow"
            sx={{ fontSize: 34 }}
            style={{ animation: "buttonCompletionPop 0.6s ease forwards" }}
          />
        </div>
      )}

      {!disabled && !isLoading && (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
          <div className="absolute -left-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent to-white/60 opacity-20 transition-all duration-700 group-hover:left-full"></div>
        </div>
      )}
    </button>
  );
}

const SessionCleanerButton = memo(SessionCleanerButtonComponent);

export default SessionCleanerButton;