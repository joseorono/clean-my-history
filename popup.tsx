import { useState } from "react"

import "./style.css"


import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";

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
      <CssBaseline />
      <main>This app is using the dark mode</main>
      
      <div className="p-4">
        <h2>
          Welcome to the {" "}
          <a href="https://www.plasmo.com" target="_blank">
            Blemish Cleaner
          </a>{" "}
          Extension!
        </h2>
        <input onChange={(e) => setData(e.target.value)} value={data} />
        <a href="/static/onboarding.html" target="_blank">
          Go to Onboarding.
        </a>

        <div className="border rounded-xl shadow bg-slate-300 text-jet mt-6 p-4">
          <h3>What's next?</h3>
          <p>
            Now I just gotta work on the popup and then I can start working on the actual extension.
          </p>
        </div>

      </div>
    </ThemeProvider>

  )
}

export default IndexPopup;
