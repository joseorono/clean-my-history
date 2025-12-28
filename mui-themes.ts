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
        default: 'transparent',
        paper: 'rgba(255, 255, 255, 0.95)'
    },
    text: {
        primary: '#1f2937',
        secondary: '#6b7280'
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
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                color: 'var(--color-text-secondary)',
                '&.Mui-checked': {
                    color: 'var(--color-primary-main)',
                    '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                    }
                },
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                },
                '&.Mui-disabled': {
                    color: 'rgba(0, 0, 0, 0.26)'
                }
            }
        }
    },
  },
};

export const checkboxColors = {
  color: "#9ca3af",
  "&.Mui-hover": {
    color: "#60a5fa"
  },
  "&.Mui-checked": {
    color: "#1976d2"
  }
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
        default: 'transparent',
        paper: 'rgba(30, 41, 59, 0.7)'
    },
    text: {
        primary: '#f1f5f9',
        secondary: '#94a3b8'
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
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                color: 'var(--color-text-secondary)',
                '&.Mui-checked': {
                    color: 'var(--color-primary-main)',
                    '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                    }
                },
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                },
                '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        }
    }
  },
};

