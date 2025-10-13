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
          //mode: prefersDarkMode ? 'dark' : 'light',
          mode: "dark"
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
                    background: "#030e18",
                    color: "#fff",
                    fontWeight: "500"
                  }
                },
                error: {
                  style: {
                    background: "#d32f2f",
                    color: "#fff",
                    fontWeight: "500"
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
