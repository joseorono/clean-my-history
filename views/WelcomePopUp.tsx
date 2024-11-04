import Button from "@mui/material/Button";

import { openOnboardingTab } from "~lib/utils";

export default function WelcomePopUp() {
  return (
    <>
      <div className="p-4">
        <h2>
          Welcome to the{" "}
          <a href="https://www.plasmo.com" target="_blank">
            Clean My History
          </a>{" "}
          Extension!
        </h2>
        <Button variant="contained" onClick={() => openOnboardingTab()}>
          Go to Onboarding
        </Button>
      </div>
    </>
  );
}
