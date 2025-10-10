import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { Link, Route } from "wouter";

import CleanerView from "./popup-tabs/CleanerView";
import SessionCleanerView from "./popup-tabs/SessionCleanerView";
import SettingsView from "./popup-tabs/SettingsVIew";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="p-4"
      {...other}>
      {value === index && children}
    </div>
  );
}

export default function PopUpLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        {
          //<Link href="/users/1">
          //  <a className="link">Profile</a>
          //</Link>
        }

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Section Tabs">
            <Tab label="Close Tabs" />
            <Tab label="Clean Browser" />
            <Tab label="Settings" />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <SessionCleanerView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CleanerView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SettingsView />
        </CustomTabPanel>

        {
          // <Route path="/" component={} />
          // <Route path="/users/:name" component={CleanerView} />
          // <Route path="/inbox" component={} />
        }
      </div>
    </>
  );
}
