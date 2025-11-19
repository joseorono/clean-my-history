import Button from "@mui/material/Button";

import { openOnboardingTab } from "~lib/utils";

export default function WelcomePopUp() {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">
          Welcome to{" "}
          <a href="https://www.plasmo.com" target="_blank">
            FocusSpace
          </a>
          !
        </h2>
        <Button variant="contained" onClick={() => openOnboardingTab()}>
          Go to Onboarding
        </Button>
      </div>
    </>
  );
}
