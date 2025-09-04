const fileName = "";
const fileContents = "";

chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage if necessary (e.g., on first install)
  chrome.storage.local.get(["fileName", "fileContents"], (result) => {
    if (!result.fileName || !result.fileContents) {
      chrome.storage.local.set({ fileName: "", fileContents: "" }, () => {
        console.log(`${fileName} has been saved.`);
      });
    }
  });

  // Ensure clicking the extension icon opens the side panel
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Handle messages for file storage
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "uploadFile") {
    saveFileData(message.fileName, message.fileContents, sendResponse);
    return true; // Keep the message channel open for async response
  } else if (message.action === "clearData") {
    clearFileData(sendResponse);
    return true;
  }
});

// Save file data into chrome.storage.local
function saveFileData(fileName, fileContents, sendResponse) {
  chrome.storage.local.set(
    { fileName: fileName, fileContents: fileContents },
    () => {
      console.log("File data saved:", fileName);
      sendResponse({ message: "File uploaded and data saved." });
    }
  );
}

// Clear stored file data
function clearFileData(sendResponse) {
  chrome.storage.local.remove(["fileName", "fileContents"], () => {
    console.log("File data cleared.");
    sendResponse({ message: "Data cleared." });
  });
}

// Helper: open side panel for active tab
async function openSidePanelForActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (!tab?.id) return;

  await chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: "sidepanel.html",
    enabled: true,
  });

  await chrome.sidePanel.open({ tabId: tab.id });
}

// Listen for hotkey command
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-side-panel") {
    openSidePanelForActiveTab();
  }
});
