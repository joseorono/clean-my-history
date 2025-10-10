import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function TaskButton({
  text,
  successText = null,
  errorText = null,
  loadingText = "Loading...",
  fnQuery,
  disabled = false,
  variant = "contained"
}: ITaskButtonProps) {
  const mutation = useMutation({
    mutationFn: () => fnQuery(),
    // Disable caching by setting cacheTime to 0
    gcTime: 0,
    // Don't retry on failure
    retry: 0,
    // Add proper callbacks
    onSuccess: () => {
      console.log("Mutation success");
      toast.success(successText || "Task completed successfully.");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      console.error(errorText);
      toast.error(errorText || "An error occurred.");
    }
  });

  const handleClick = () => {
    try {
      mutation.mutate();
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={disabled || mutation.isPending}>
      {mutation.isPending ? loadingText : text}
    </Button>
  );
}
