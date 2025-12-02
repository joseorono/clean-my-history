import { useState } from "react";

import "./style.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

// Redux Store
import { store } from "~store/store";
import PopUpLayout from "~views/PopUpLayout";
import TestView from "~views/TestView";
import WelcomePopUp from "~views/WelcomePopUp";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

function IndexPopup() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [data, setData] = useState("");
  // Create a client
  const queryClient = new QueryClient();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#3b82f6", // Blue 500
            light: "#60a5fa",
            dark: "#2563eb"
          },
          secondary: {
            main: "#8b5cf6", // Violet 500
            light: "#a78bfa",
            dark: "#7c3aed"
          },
          background: {
            default: "transparent",
            paper: "rgba(30, 41, 59, 0.7)" // Slate 800 with opacity
          },
          text: {
            primary: "#f1f5f9", // Slate 100
            secondary: "#94a3b8" // Slate 400
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
            }
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
        }
      }),
    [prefersDarkMode]
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {
              // Only show the test view in development mode
              // process.env.NODE_ENV === "development" && <TestView />
            }

            <WelcomePopUp />

            <PopUpLayout />
            {/* configure global toast settings, like theme */}
            <Toaster
              toastOptions={{
                position: "bottom-center",

                // Aria
                ariaProps: {
                  role: "status",
                  "aria-live": "polite"
                },

                // Styling
                className: "",

                success: {
                  style: {
                    background: "rgba(15, 23, 42, 0.9)",
                    color: "#fff",
                    fontWeight: "500",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }
                },
                error: {
                  style: {
                    background: "rgba(69, 10, 10, 0.9)",
                    color: "#fecaca",
                    fontWeight: "500",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(239, 68, 68, 0.2)"
                  }
                }
              }}
            />
          </CssBaseline>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default IndexPopup;
