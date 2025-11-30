type TimeRange = "15min" | "1hour" | "24hours" | "7days" | "30days" | "1year";

const getMilliseconds = (timeRange: TimeRange): number => {
  const now = Date.now();
  switch (timeRange) {
    case "15min":
      return now - 15 * 60 * 1000;
    case "1hour":
      return now - 60 * 60 * 1000;
    case "24hours":
      return now - 24 * 60 * 60 * 1000;
    case "7days":
      return now - 7 * 24 * 60 * 60 * 1000;
    case "30days":
      return now - 30 * 24 * 60 * 60 * 1000;
    case "1year":
      return now - 365 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};

export const cleanAllHistory = async (timeRange: TimeRange = "24hours"): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const startTime = getMilliseconds(timeRange);
  const endTime = Date.now();
  await chrome.history.deleteRange({ startTime, endTime });
};
