import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { closeTabsWithKeywords } from "~lib/tabs";

import { allBadKeywords } from "../../constants";
import { getAllTabs, getCurrentTab } from "../../lib/tabs";

export default function SessionCleanerView() {
  const [tabs, setTabs] = useState([]);

  const fetchAllTabs = async () => {
    const allTabs = await getAllTabs();
    setTabs(allTabs);
    console.log("All Tabs:", allTabs);
  };
  useEffect(() => {
    fetchAllTabs();
  }, []);

  return (
    <Box className="p-4 text-white">
      <Typography variant="h5" component="h1" gutterBottom>
        Session Cleaner
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        className="mb-4 text-gray-400">
        Close tabs that might distract you from work
      </Typography>

      <div className="flex flex-col gap-4 pt-4">
        {/* Main panic button */}
        <button
          className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#90CAF9] font-semibold shadow-lg transition-all duration-500 hover:bg-[#64B5F6] hover:shadow-xl"
          onClick={async () => closeTabsWithKeywords(allBadKeywords)}>
          {/* Single SVG Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-300 group-hover:scale-110">
            <rect
              x="2"
              y="4"
              width="18"
              height="14"
              rx="2"
              className="fill-stone-800 transition-colors duration-300 group-hover:fill-[#1565C0]"
            />
            <rect
              x="4"
              y="2"
              width="14"
              height="2"
              rx="1"
              className="fill-stone-800 transition-colors duration-300 group-hover:fill-[#1565C0]"
            />
          </svg>
        </button>
      </div>
    </Box>
  );
}
