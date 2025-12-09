import type { ThemeOptions } from '@mui/material/styles';

export const themeOptionsLight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
        default: "transparent",
        paper: "rgba(255, 255, 255, 0.95)"
    },
    text: {
        primary: "#1f2937", // Gris oscuro para light mode
        secondary: "#6b7280" // Gris medio para light mode
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                backgroundColor: "transparent"
            }
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: "none",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0, 0, 0, 0.1)"
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "9999px"
            }
        }
    }
  },
};

export const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
        default: "transparent",
        paper: "rgba(30, 41, 59, 0.7)" // Slate 800 with opacity
    },
    text: {
        primary: "#f1f5f9", // Slate 100 para dark mode
        secondary: "#94a3b8" // Slate 400 para dark mode
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                backgroundColor: "transparent"
            }
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: "none",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "9999px"
            }
        }
    }
  },
};

