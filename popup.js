document.addEventListener("DOMContentLoaded", () => {
  const keywordInput = document.getElementById("keywordInput");
  const addButton = document.getElementById("addButton");
  const blockList = document.getElementById("blockList");
  const toggleListButton = document.getElementById("toggleList");

  addButton.addEventListener("click", addKeyword);

  chrome.storage.sync.get("blockedKeywords", function (data) {
    const blockedKeywords = data.blockedKeywords || [];
    renderKeywords(blockedKeywords);
  });

  function renderKeywords(blockedKeywords) {
    blockList.innerHTML = "";

    if (blockedKeywords.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.textContent = "Blocked Keywords Will Appear Here";
      placeholder.classList.add("placeholder");
      blockList.appendChild(placeholder);
      return;
    }

    blockedKeywords.forEach((keyword) => {
      const li = document.createElement("li");

      const listText = document.createElement("span");
      listText.textContent = keyword
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      listText.classList.add("listText");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "-";
      removeBtn.classList.add("removeButton");
      removeBtn.onclick = () => removeKeyword(keyword);

      li.appendChild(removeBtn);
      li.appendChild(listText);
      blockList.appendChild(li);
    });
  }

  function addKeyword() {
    const keyword = keywordInput.value.trim().toLowerCase();
    keywordInput.value = "";
    if (!keyword) return;

    chrome.storage.sync.get("blockedKeywords", (data) => {
      const blockedKeywords = data.blockedKeywords || [];
      if (!blockedKeywords.includes(keyword)) {
        blockedKeywords.push(keyword);
        chrome.storage.sync.set({ blockedKeywords }, () => {
          renderKeywords(blockedKeywords);
        });
        console.log(`Added keyword: ${keyword}`);
      }
    });
  }

  function removeKeyword(keyword) {
    chrome.storage.sync.get("blockedKeywords", (data) => {
      const blockedKeywords = data.blockedKeywords.filter((k) => k !== keyword);
      chrome.storage.sync.set({ blockedKeywords }, () => {
        renderKeywords(blockedKeywords);
      });
      console.log(`Removed keyword: ${keyword}`);
    });
  }

  toggleListButton.addEventListener("click", () => {
    blockList.classList.toggle("hidden");
    toggleListButton.textContent = blockList.classList.contains("hidden")
      ? "▼ Show Blocked Keywords"
      : "▲ Hide Blocked Keywords";
  });

  keywordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addKeyword();
    }
  });
});
