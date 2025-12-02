import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import TimerIcon from "@mui/icons-material/Timer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
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
      <Box
        id="popup-tabs"
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Paper elevation={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Section Tabs"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: "44px",
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: 500,
                px: 1
              }
            }}>
            <Tab
              icon={<TimerIcon />}
              label={"Focus"}
              iconPosition="start"
              sx={{ flex: 1, "& .MuiTab-iconWrapper": { mr: 0.5 } }}
            />
            <Tab
              icon={<HistoryIcon />}
              label="Session Cleaner"
              iconPosition="start"
              sx={{ flex: 1, "& .MuiTab-iconWrapper": { mr: 0.5 } }}
            />
            <Tab
              icon={<StorageIcon />}
              label="Browser Cleaner"
              iconPosition="start"
              sx={{ flex: 1, "& .MuiTab-iconWrapper": { mr: 0.5 } }}
            />
            <Tab
              icon={
                <Tooltip title="Settings" placement="bottom">
                  <SettingsIcon />
                </Tooltip>
              }
              iconPosition="start"
              sx={{ flex: 0, minWidth: 48, px: 0.5 }}
            />
          </Tabs>
        </Paper>

        <Box
          id="tabViewContainer"
          sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
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
        </Box>
      </Box>
    </>
  );
}