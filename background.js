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
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "uploadFile") {
    saveFileData(message.fileName, message.fileContents, sendResponse);
    return true; // Keep the message channel open for async response
  } else if (message.action === "clearData") {
    clearFileData(sendResponse);
    return true; // Keep the message channel open for async response
  }
});

function saveFileData(fileName, fileContents, sendResponse) {
  chrome.storage.local.set(
    { fileName: fileName, fileContents: fileContents },
    () => {
      console.log("File data saved:", fileName);
      sendResponse({ message: "File uploaded and data saved." });
    }
  );
}

function clearFileData(sendResponse) {
  chrome.storage.local.remove(["fileName", "fileContents"], () => {
    console.log("File data cleared.");
    sendResponse({ message: "Data cleared." });
  });
}
