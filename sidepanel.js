document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileNameSpan = document.getElementById("fileName");
  const uploadText = document.getElementById("uploadText");

  fileInput.addEventListener("change", handleFileUpload);
  document.getElementById("clearButton").addEventListener("click", clearData);

  // Load stored file data when the side panel opens
  chrome.storage.local.get("volleyballStats", function (result) {
    if (result.volleyballStats) {
      uploadText.style.display = "none";
      fileNameSpan.style.display = "inline";
      const storedFileName = result.volleyballStats.fileName;
      fileNameSpan.textContent = truncateFileName(storedFileName, 8);
      processCSV(result.volleyballStats.fileContents);
    }
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        const fileName = file.name;

        chrome.storage.local.set(
          { volleyballStats: { fileName, fileContents: contents } },
          function () {
            console.log("Data is saved to Chrome storage");
            processCSV(contents);
            uploadText.style.display = "none";
            fileNameSpan.style.display = "inline";
            fileNameSpan.textContent = truncateFileName(fileName, 8);
          }
        );
      };
      reader.readAsText(file);
    }
  }

  function clearData() {
    chrome.runtime.sendMessage({ action: "clearData" }, (response) => {
      console.log(response?.message || "Clear message sent.");
      uploadText.style.display = "inline";
      fileNameSpan.style.display = "none";
      fileNameSpan.textContent = "";
      document.getElementById("buttonsContainer").innerHTML = "";

      fileInput.value = "";
    });

    chrome.storage.local.remove("volleyballStats", function () {
      console.log("Data cleared from Chrome storage");
    });
  }

  function truncateFileName(fileName, maxLength) {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + "...";
    }
    return fileName;
  }

  function processCSV(csv) {
    const rows = csv.trim().split("\n");
    const headers = rows[1].split("|").map((header) => header.trim());
    const jerseyColumnIndex = headers.indexOf("Jersey");

    if (jerseyColumnIndex === -1) {
      console.error('Column "Jersey" not found in CSV headers.');
      return;
    }

    const container = document.getElementById("buttonsContainer");
    container.innerHTML = "";

    for (let i = 2; i < rows.length; i++) {
      const rowData = rows[i].split("|").map((data) => data.trim());
      const jerseyNumber = rowData[jerseyColumnIndex];

      const playerData = headers.reduce((obj, header, index) => {
        obj[header] = rowData[index];
        return obj;
      }, {});

      const button = document.createElement("button");
      button.classList.add("icon-button");

      const jerseyNumberElement = document.createElement("div");
      jerseyNumberElement.textContent = `#${jerseyNumber}`;
      jerseyNumberElement.classList.add("jersey-number");
      button.appendChild(jerseyNumberElement);

      button.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tabs[0].id },
              files: ["content.js"],
            })
            .then(() => {
              chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "fillFormFields", data: playerData },
                (response) => {
                  if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                  } else {
                    console.log(response?.status || "Response received");
                  }
                }
              );
            })
            .catch((err) => {
              console.error("Failed to inject content script:", err);
            });
        });
      });

      container.appendChild(button);
    }
  }
});
