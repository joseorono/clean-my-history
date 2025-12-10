import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import TimerIcon from "@mui/icons-material/Timer";
import Box from "@mui/material/Box";
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
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}>
        <div 
         className="mx-4 mt-2 border-rounded" 
         style={{
          borderBottom: "1px solid rgba(229, 231, 235, 0.2)",
          borderRadius: "12px",
          overflow: "hidden"
         }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Section Tabs"
            variant="fullWidth"
            TabIndicatorProps={{
              sx: {
                height: 0,
                bottom: 0,
                top: "auto",
                "&::before": {
                  content: "''",
                  display: "block",
                  margin: "0 auto",
                  width: "60%",
                  height: 2,
                  borderRadius: "0 0 12px 12px",
                  borderBottom: "2px solid #42a5f5",
                  backgroundColor: "rgba(59, 130, 246, 0.9)"
                }
              }
            }}
            sx={{
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
              p: 0.5,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              minHeight: "48px",
              "& .MuiTab-root": {
                position: "relative",
                zIndex: 1,
                minHeight: "40px",
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                borderRadius: "12px",
                transition: "all 0.2s ease",
                color: "text.secondary",
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.05)"
                },
                "&.Mui-selected": {
                  color: "text.primary",
                  backgroundColor: "rgba(59, 130, 246, 0.2)", // Blue tint
                  opacity: 1,
                  borderRadius: "12px",
                },
                "& .MuiTab-root": {
                  minHeight: "44px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  px: 1
                }
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
        </div>

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