console.log("Content script loaded!");

function removeElements(keywords) {
  console.log("5");
  document.querySelectorAll(".PO9Zff, article").forEach((element) => {
    let text = element.textContent.toLowerCase();
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      let blockText = document.createElement("div");
      blockText.textContent = "Blocked Article";
      blockText.style.cssText = `
        font-weight: bold;
        text-align: center;
        padding: 12px;
        background-color: #e0f7fa; /* Soft cyan */
        color: #00796b; /* Deep teal */
        border: 1px solid #b2dfdb;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;
        font-family: Arial, sans-serif;
      `;

      element.replaceWith(blockText);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("1");
  clearTab();
});

let intervalId = null;

function clearTab() {
  try {
    chrome.storage.sync.get("blockedKeywords", function (data) {
      const blockedKeywords = data.blockedKeywords || [];
      console.log(blockedKeywords);
      removeElements(blockedKeywords);
    });
  } catch (error) {
    console.log("stopped");
    clearInterval(intervalId);
    intervalId = null;
  }
}

intervalId = setInterval(() => {
  clearTab();
}, 1000);
