import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



import type { BadKeywordCategory } from "~constants";
import { badKeywordCategories, CATEGORIES } from "~constants";

export interface SettingsState {
  selectedCategories: BadKeywordCategory[];
  customKeywords: string[];
  whitelistedDomains: string[];
}

const getDefaultCategories = (): BadKeywordCategory[] => {
  return CATEGORIES.filter((cat) => cat.defaultEnabled).map(
    (cat) => cat.id
  ) as BadKeywordCategory[];
};

const initialState: SettingsState = {
  selectedCategories: getDefaultCategories(),
  customKeywords: [],
  whitelistedDomains: []
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // Handle state initialization from storage
    initializeFromStorage: (state, action: PayloadAction<any>) => {
      if (action.payload?.settings) {
        // Validate and ensure the structure matches our state
        const savedSettings = action.payload.settings;

        // Restore selected categories if they exist
        if (Array.isArray(savedSettings.selectedCategories)) {
          // Filter to ensure only valid categories are included
          state.selectedCategories = savedSettings.selectedCategories.filter(
            (cat: string) =>
              badKeywordCategories.includes(cat as BadKeywordCategory)
          ) as BadKeywordCategory[];
        }

        // Restore custom keywords if they exist
        if (Array.isArray(savedSettings.customKeywords)) {
          state.customKeywords = savedSettings.customKeywords;
        }

        // Restore whitelisted domains if they exist
        if (Array.isArray(savedSettings.whitelistedDomains)) {
          state.whitelistedDomains = savedSettings.whitelistedDomains;
        }
      }
    },
    toggleCategory: (state, action: PayloadAction<BadKeywordCategory>) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);

      if (index !== -1) {
        // Remove category if it exists
        state.selectedCategories.splice(index, 1);
      } else {
        // Add category if it doesn't exist
        state.selectedCategories.push(category);
      }
    },

    selectAllCategories: (state) => {
      state.selectedCategories = [
        ...badKeywordCategories
      ] as BadKeywordCategory[];
    },

    addCustomKeyword: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.trim().toLowerCase();
      if (keyword && !state.customKeywords.includes(keyword)) {
        state.customKeywords.push(keyword);
      }
    },

    removeCustomKeyword: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.toLowerCase();
      state.customKeywords = state.customKeywords.filter((k) => k !== keyword);
    },

    addWhitelistedDomain: (state, action: PayloadAction<string>) => {
      const domain = action.payload.trim().toLowerCase();
      if (domain && !state.whitelistedDomains.includes(domain)) {
        state.whitelistedDomains.push(domain);
      }
    },

    removeWhitelistedDomain: (state, action: PayloadAction<string>) => {
      const domain = action.payload.toLowerCase();
      state.whitelistedDomains = state.whitelistedDomains.filter(
        (d) => d !== domain
      );
    },

    resetSettings: (state) => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  initializeFromStorage,
  toggleCategory,
  selectAllCategories,
  addCustomKeyword,
  removeCustomKeyword,
  addWhitelistedDomain,
  removeWhitelistedDomain,
  resetSettings
} = settingsSlice.actions;

export default settingsSlice.reducer;