import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";



import ViewContainer from "~components/view-container";
import { badKeywordCategories } from "~constants";
import type { BadKeywordCategory } from "~constants";
import { openOnboardingTab } from "~lib/utils";
import {
  addCustomKeyword,
  addWhitelistedDomain,
  removeCustomKeyword,
  removeWhitelistedDomain,
  resetSettings,
  toggleCategory,
  type SettingsState
} from "~store/features/settings/settingsSlice";
import type { RootState } from "~store/store";
import formatCategoryLabel from "~utils/format-category-label";

import ViewHeader from "../../components/view-header";

export default function SettingsView() {
  const dispatch = useDispatch();
  const settings = useSelector(
    (state: RootState) => state.settings
  ) as SettingsState;

  const [newKeyword, setNewKeyword] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [openResetDialog, setOpenResetDialog] = useState(false);

  const handleToggleCategory = (category: BadKeywordCategory) => {
    dispatch(toggleCategory(category));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      dispatch(addCustomKeyword(newKeyword));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    dispatch(removeCustomKeyword(keyword));
  };

  const handleAddDomain = () => {
    if (newDomain.trim()) {
      dispatch(addWhitelistedDomain(newDomain));
      setNewDomain("");
    }
  };

  const handleRemoveDomain = (domain: string) => {
    dispatch(removeWhitelistedDomain(domain));
  };

  const handleOpenResetDialog = () => {
    setOpenResetDialog(true);
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
  };

  const handleConfirmReset = () => {
    dispatch(resetSettings());
    setOpenResetDialog(false);
  };

  return (
    <ViewContainer>
      <ViewHeader
        title="Settings"
        subtitle="Configure which content to clean from your browser"
      />

      <div className="mb-2 flex justify-end gap-2">
        <Button
          variant="outlined"
          size="small"
          onClick={() => openOnboardingTab()}>
          Go to Onboarding
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleOpenResetDialog}>
          Reset Settings
        </Button>
      </div>

      {/* Categories Section */}
      <div className="mb-3 rounded-lg border border-gray-700 bg-gray-800 p-3">
        <h2 className="mb-1.5 text-base font-semibold">Categories to Clean</h2>
        <div>
          <p className="mb-1.5 text-gray-400">Select categories to clean:</p>
          <div className="flex flex-wrap gap-2">
            {badKeywordCategories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center rounded-md p-1 hover:bg-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={settings.selectedCategories.includes(category)}
                  onChange={() => handleToggleCategory(category)}
                  name={category}
                />
                <span>{formatCategoryLabel(category)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Keywords Section */}
      <div className="mb-3 rounded-lg border border-gray-700 bg-gray-800 p-3">
        <h2 className="mb-1.5 text-base font-semibold">Custom Keywords</h2>
        <p className="mb-1.5 text-gray-400">
          Add custom keywords to clean from your history
        </p>

        <div className="mb-3 flex">
          <input
            type="text"
            placeholder="New Keyword"
            className="mr-2 flex-1 rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
            value={newKeyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewKeyword(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleAddKeyword()
            }
          />
          <button
            className="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white"
            onClick={handleAddKeyword}>
            Add
          </button>
        </div>

        <div className="flex flex-wrap">
          {settings.customKeywords.map((keyword: string) => (
            <span
              key={keyword}
              className="mb-2 mr-2 flex items-center rounded-md border border-gray-600 bg-gray-700 p-2 text-sm">
              {keyword}
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => handleRemoveKeyword(keyword)}
                aria-label="Remove keyword">
                &times;
              </button>
            </span>
          ))}
          {settings.customKeywords.length === 0 && (
            <p className="text-gray-400">No custom keywords added yet</p>
          )}
        </div>
      </div>

      {/* Whitelisted Domains Section */}
      <div className="mb-3 rounded-lg border border-gray-700 bg-gray-800 p-3">
        <h2 className="mb-1.5 text-base font-semibold">Whitelisted Domains</h2>
        <p className="mb-1.5 text-gray-400">
          Add domains that should never be cleaned
        </p>

        <div className="mb-3 flex">
          <input
            type="text"
            placeholder="New Domain"
            className="mr-2 flex-1 rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
            value={newDomain}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewDomain(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleAddDomain()
            }
          />
          <button
            className="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white"
            onClick={handleAddDomain}>
            Add
          </button>
        </div>

        <div className="flex flex-wrap">
          {settings.whitelistedDomains.map((domain: string) => (
            <span
              key={domain}
              className="mb-2 mr-2 flex items-center rounded-md border border-gray-600 bg-gray-700 p-2 text-sm">
              {domain}
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => handleRemoveDomain(domain)}
                aria-label="Remove domain">
                &times;
              </button>
            </span>
          ))}
          {settings.whitelistedDomains.length === 0 && (
            <p className="text-gray-400">No domains whitelisted yet</p>
          )}
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={openResetDialog}
        onClose={handleCloseResetDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Reset All Settings?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reset all your settings to their default values,
            including:
            <ul style={{ marginTop: "8px", marginLeft: "16px" }}>
              <li>Selected categories</li>
              <li>Custom keywords</li>
              <li>Whitelisted domains</li>
            </ul>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmReset}
            color="error"
            variant="contained"
            autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </ViewContainer>
  );
}