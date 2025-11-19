// Request notification permission
const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
};

// Send notification with tab count
export const sendNotification = async (tabCount: number) => {
  const hasPermission = await requestNotificationPermission();

  if (hasPermission) {
    const notification = await new Notification("Clean My History", {
      icon: chrome.runtime.getURL("icon.png"),
      body: `Found ${tabCount} tabs with distracting content`,
      tag: "clean-my-history-alert",
      requireInteraction: false,
      silent: false
    });

    // Handle click events
    notification.onclick = () => {
      console.log("Notification clicked");
      window.focus();
      notification.close();
    };

    // Handle close events
    notification.onclose = () => {
      console.log("Notification closed");
    };

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 15000);
  }
};
