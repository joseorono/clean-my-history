import { useState } from "react"

import "./style.css"


import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import WelcomePopUp from "~views/WelcomePopUp";
import PopUpLayout from "~views/PopUpLayout";
import TestView from "~views/TestView";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function IndexPopup() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [data, setData] = useState("")

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <ThemeProvider  theme={theme}>
      <CssBaseline>

          { // Only show the test view in development mode
            process.env.NODE_ENV === "development" && <TestView />
          }

          <WelcomePopUp />
        
        <PopUpLayout />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default IndexPopup;
