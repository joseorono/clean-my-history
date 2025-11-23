import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import TimerIcon from "@mui/icons-material/Timer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

import CleanerView from "./popup-tabs/CleanerView";
import FocusModeView from "./popup-tabs/FocusModeView";
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

        <Paper elevation={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Section Tabs"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: "64px",
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 500
              }
            }}>
            <Tab icon={<TimerIcon />} label="Focus Mode" iconPosition="start" />
            <Tab
              icon={<HistoryIcon />}
              label="Session Cleaner"
              iconPosition="start"
            />
            <Tab
              icon={<StorageIcon />}
              label="Browser Cleaner"
              iconPosition="start"
            />
            <Tab
              icon={<SettingsIcon />}
              label="Settings"
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        <CustomTabPanel value={value} index={0}>
          <FocusModeView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SessionCleanerView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CleanerView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
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