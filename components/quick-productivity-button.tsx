import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
    <Box
      id="quick-productivity-button"
      component="button"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 96,
        height: 96,
        borderRadius: "50%",
        backgroundColor: "#90CAF9",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: 3,
        transition: "all 0.5s ease",
        "&:hover:not(:disabled)": {
          backgroundColor: "#64B5F6",
          boxShadow: 4
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed"
        }
      }}>
      {isLoading ? (
        <CircularProgress size={32} color="primary" />
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transition: "transform 0.3s ease",
            transform: isAnimating ? "scale(1)" : "scale(1)"
          }}>
          <rect x="2" y="4" width="18" height="14" rx="2" fill="#1a1a1a" />
          <rect x="4" y="2" width="14" height="2" rx="1" fill="#1a1a1a" />
        </svg>
      )}
    </Box>
  );
}

const QuickProductivityButton = memo(QuickProductivityButtonComponent);

export default QuickProductivityButton;
