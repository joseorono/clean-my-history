import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { badKeyboardCategories } from "../../constants";
import type { BadKeyboardCategory } from "../../constants";
import {
  addCustomKeyword,
  addWhitelistedDomain,
  removeCustomKeyword,
  removeWhitelistedDomain,
  resetSettings,
  toggleCategory,
  type SettingsState
} from "../../store/features/settings/settingsSlice";
import type { RootState } from "../../store/store";

export default function SettingsView() {
  const dispatch = useDispatch();
  const settings = useSelector(
    (state: RootState) => state.settings
  ) as SettingsState;

  const [newKeyword, setNewKeyword] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const handleToggleCategory = (category: BadKeyboardCategory) => {
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

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      dispatch(resetSettings());
    }
  };

  return (
    <div className="p-2 text-white">
      <div className="mb-2">
        <h1 className="mb-2 text-xl font-bold">Settings</h1>
        <p className="text-gray-400">
          Configure which content to clean from your browser
        </p>
      </div>

      {/* Categories Section */}
      <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="mb-2 text-lg font-semibold">Categories to Clean</h2>
        <div>
          <p className="mb-2 text-gray-400">Select categories to clean:</p>
          <div className="flex flex-wrap gap-2">
            {badKeyboardCategories.map((category) => (
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
                <span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Keywords Section */}
      <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="mb-2 text-lg font-semibold">Custom Keywords</h2>
        <p className="mb-2 text-gray-400">
          Add custom keywords to clean from your history
        </p>

        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="New Keyword"
            className="mr-2 flex-1 rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
            value={newKeyword}
            onChange={(e: React.ChangeEvent) => setNewKeyword(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) =>
              e.key === "Enter" && handleAddKeyword()
            }
          />
          <button
            className="rounded-md bg-blue-500 px-8 py-2 text-white"
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
      <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="mb-2 text-lg font-semibold">Whitelisted Domains</h2>
        <p className="mb-2 text-gray-400">
          Add domains that should never be cleaned
        </p>

        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="New Domain"
            className="mr-2 flex-1 rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
            value={newDomain}
            onChange={(e: React.ChangeEvent) => setNewDomain(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) =>
              e.key === "Enter" && handleAddDomain()
            }
          />
          <button
            className="rounded-md bg-blue-500 px-8 py-2 text-white"
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

      {/* Reset Settings */}
      <div className="mt-4 flex justify-end">
        <button
          className="rounded-md bg-red-500 p-2 text-white"
          onClick={handleResetSettings}>
          Reset Settings
        </button>
      </div>
    </div>
  );
}
