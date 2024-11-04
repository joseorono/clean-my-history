export {};

console.log("Background Worker Active. You can now use the extension");

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "static/onboarding.html"
    });
  }
});
