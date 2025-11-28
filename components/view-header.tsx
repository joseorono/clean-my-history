import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ViewHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Reusable header component for popup tab views.
 * Provides consistent title and subtitle styling across all views.
 */
export default function ViewHeader({ title, subtitle }: ViewHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
