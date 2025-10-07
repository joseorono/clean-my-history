import { useEffect, useState } from "react";

import { closeTabsWithKeywords } from "~lib/tabs";

import { getAllTabs, getCurrentTab } from "../../lib/tabs";

export default function AllTabsView() {
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
    <>
      <button
        className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#31CFFF] via-[#13AECD] to-[#175384] px-4 font-semibold text-white shadow-2xl duration-300 hover:scale-105 hover:from-[#175384] hover:to-[#3DAEBD] hover:shadow-xl hover:shadow-cyan-500"
        onClick={async () => closeTabsWithKeywords(["porn"])}>
        <svg
          viewBox="0 0 1.625 1.625"
          className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
          height="15"
          width="15">
          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
        </svg>
        <svg
          width="16"
          fill="none"
          viewBox="0 0 39 7"
          className="origin-right duration-500 group-hover:rotate-90">
          <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
          <line
            strokeWidth="3"
            stroke="white"
            y2="1.5"
            x2="26.0357"
            y1="1.5"
            x1="12"></line>
        </svg>
        <svg width="16" fill="none" viewBox="0 0 33 39" className="">
          <mask fill="white" id="path-1-inside-1_8_19">
            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
          </mask>
          <path
            mask="url(#path-1-inside-1_8_19)"
            fill="white"
            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
          <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
          <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
        </svg>
      </button>
      {/* Uncomment to see all tabs */}
      {/* {tabs.map((tab) => (
        <div key={tab.id}>
          <p>{tab.id}</p>
          <p>{tab.title}</p>
        </div>
      ))} */}
    </>
  );
}
