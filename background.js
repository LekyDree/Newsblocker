chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "update") {
    console.log("Update");
    reAddContentScripts();
  }
});

function reAddContentScripts() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url && tab.url.startsWith("https://news.google.com/")) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["contentScript.js"],
        });
      }
    });
  });
}
