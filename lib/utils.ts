/*
<a href="/static/onboarding.html" target="_blank">
Go to Onboarding.
</a>

*/

export function openOnboardingTab() {
  chrome.tabs.create({ url: "/static/onboarding.html" })
}
