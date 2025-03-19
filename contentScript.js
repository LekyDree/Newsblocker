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

function clearTab() {
  console.log("2");
  //chrome.storage.sync.get(["blockedKeywords"], function (data) {
  //const blockedKeywords = data.blockedKeywords || ["trump"];
  let blockedKeywords = ["trump", "elon", "putin"];

  removeElements(blockedKeywords);
  //});
}

setInterval(() => {
  console.log("4");
  clearTab();
}, 1000);
