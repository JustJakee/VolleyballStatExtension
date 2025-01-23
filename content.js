// Inject Material Icons
const materialIconsLink = document.createElement("link");
materialIconsLink.rel = "stylesheet";
materialIconsLink.href =
  "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(materialIconsLink);

// Inject Material Symbols
const materialSymbolsLink = document.createElement("link");
materialSymbolsLink.rel = "stylesheet";
materialSymbolsLink.href =
  "https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined&display=block";
document.head.appendChild(materialSymbolsLink);

const style = document.createElement("style");
style.textContent = `
#uploadModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, rgb(52, 52, 52), rgb(57, 57, 57));
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    padding: 25px;
    width: 90%;
    max-width: 700px; /* Responsive width */
    max-height: 550px;
    animation: fadeIn 0.3s ease-in-out;
    overflow: hidden;
}

#uploadModal .file-name-display {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}

#uploadModal .close-icon {
    position: absolute;
    right: 20px;
    font-size: 24px;
    color: white;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    transition: color 0.2s ease;
}

#uploadModal .close-icon:hover {
    color: #555;
}

#uploadModal .modal-header {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Black Ops One', sans-serif !important;
}

#uploadModal button {
    width: 100%;
    padding: 10px;
    background: #6200EE;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
    justify-content: center;
    align-items: center;
}

#uploadModal button:hover {
    background: #3700B3;
}

#buttonsContainer {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.player-button {
  max-width: 120px; 
  padding: 20px;
  padding: 20px;
  background-color: #8b8b8b !important;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
  transition: background-color 0.3s ease;
  height: 100px; /* Fixed height for consistency */
}

.player-button:hover {
  background-color: #717171 !important;
}

@font-face {
  font-family: 'JerseyFont';
  src: url('fonts/jersey-M54.ttf') format('truetype');
}

@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');

.jersey-number {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  font-family: 'Black Ops One', sans-serif !important;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

.reopen-icon {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 120px;
    height: 60px;
    z-index: 10000;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
}

.reopen-icon .drag-icon-area {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    flex: 1;
}

.reopen-icon .drag-icon {
    font-size: 24px;
    cursor: move;
}

.reopen-icon .reopen-area {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(135deg,rgb(52, 52, 52),rgb(57, 57, 57));
    flex: 2;
}

.reopen-icon .reopen-area .icon-image {
    width: 50%;
    height: 50%;
    object-fit: contain;
}

.reopen-icon .drag-area {
    height: 20px;
    background-color: #333;
    cursor: move;
}
.buttons-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between buttons */
}

.clear-file-button {
  padding: 10px;
  background-color: #FF7587;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.clear-file-button:hover {
  background-color:rgb(253, 84, 107);
}

.clear-file-button .material-symbols-outlined {
  margin-right: 8px;
}

.upload-button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.upload-button:hover {
  background-color: #0056b3; /* Hover effect */
}

.upload-button-container {
  display: flex;
  justify-content: space-between; /* Align buttons horizontally */
  gap: 10px; /* Space between the buttons */
  margin-top: 10px;
  width: 100%;
}

#uploadButton {
  font-size: 16px; /* Increase font size to make the upload button larger */
  padding: 15px 30px; /* Larger padding for the upload button */
  background-color: #018786; /* Green background  */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clear-file-button {
  font-size: 20px; /* Icon size (larger trash can icon) */
  padding: 10px;
  background-color: transparent; /* Transparent background for the delete button */
  color: #FF7587; 
  border: none;
  border-radius: 50%; /* Round shape */
  cursor: pointer;
  display: none;
}

.clear-file-button:hover {
  background-color: #f1f1f1; /* Light background when hovered */
}
`;

document.head.appendChild(style);

let mainModal, reopenIcon, dragArea;

window.addEventListener("load", () => {
  console.log("Page fully loaded, injecting upload interface.");

  // Create and show the modal for file upload
  mainModal = createModal();

  // Set up the upload button to trigger the file input
  const uploadButton = mainModal.querySelector("#uploadButton");
  uploadButton.addEventListener("click", () => {
    document.getElementById("fileInput").click(); // Trigger file input click
  });

  // Create file input element
  const fileInput = createFileInput();

  // Set up event listener for file input change (file upload)
  fileInput.addEventListener("change", handleFileUpload);

  // Make the modal draggable
  makeModalMovable(mainModal);
});

// Create the modal structure
function createModal() {
  // Modal container
  const modal = document.createElement("div");
  modal.id = "uploadModal";
  modal.classList.add("modal");

  // Drag icon
  const dragIcon = document.createElement("div");
  dragIcon.classList.add("material-icons", "close");
  dragIcon.innerText = "drag_indicator";
  dragIcon.style.color = "white";
  dragIcon.style.cursor = "move";
  modal.appendChild(dragIcon);

  // Close button (using Material Symbols "close" icon)
  const closeButton = document.createElement("div");
  closeButton.classList.add("material-symbols-outlined", "close-icon");
  closeButton.innerText = "close";
  closeButton.addEventListener("click", closeModal);
  modal.appendChild(closeButton);

  // Modal header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  modalHeader.innerText = "Volleyball Stat Importer";
  modal.appendChild(modalHeader);

  // Modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modal.appendChild(modalBody);

  // Upload button container (with delete button next to it)
  const uploadButtonContainer = document.createElement("div");
  uploadButtonContainer.classList.add("upload-button-container");

  // Upload button
  const uploadButton = document.createElement("button");
  uploadButton.id = "uploadButton";
  uploadButton.innerHTML = `
  <span class="material-symbols-outlined" style="font-size: 20px; margin-right: 8px;">upload_file</span> 
  <span style="font-weight: bold;">Upload File Here</span>`;
  uploadButton.classList.add("upload-button");
  uploadButtonContainer.appendChild(uploadButton);

  // Clear file button (delete button next to upload button)
  const clearFileButton = document.createElement("button");
  clearFileButton.classList.add("clear-file-button");
  clearFileButton.style.backgroundColor = "#B00020";
  clearFileButton.innerHTML = `<span class="material-symbols-outlined">delete</span> Clear File`;
  clearFileButton.addEventListener("click", clearFile);
  uploadButtonContainer.appendChild(clearFileButton);

  // Append the button container to the modal body
  modalBody.appendChild(uploadButtonContainer);

  // Buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "buttonsContainer";
  modalBody.appendChild(buttonsContainer);

  // Append modal to body
  document.body.appendChild(modal);

  return modal;
}

function closeModal() {
  mainModal.style.display = "none"; // Hide the modal
  showReopenIcon(); // Show the reopen icon
}

// Make the modal draggable
function makeModalMovable(modal) {
  const dragIcon = modal.querySelector(".material-icons");
  let isDragging = false;
  let offsetX, offsetY;

  dragIcon.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - modal.offsetLeft;
    offsetY = e.clientY - modal.offsetTop;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (isDragging) {
      modal.style.left = `${e.clientX - offsetX}px`;
      modal.style.top = `${e.clientY - offsetY}px`;
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}

// Small square icon to reopen the modal
function showReopenIcon() {
  if (!reopenIcon) {
    reopenIcon = document.createElement("div");
    reopenIcon.classList.add("reopen-icon");

    // Drag icon area
    const dragIconArea = document.createElement("div");
    dragIconArea.classList.add("drag-icon-area");

    const dragIconImage = document.createElement("div");
    dragIconImage.classList.add("material-icons", "drag-icon");
    dragIconImage.innerText = "drag_indicator";
    dragIconArea.appendChild(dragIconImage);

    // Reopen area
    const reopenArea = document.createElement("div");
    reopenArea.classList.add("reopen-area");

    reopenArea.addEventListener("click", () => {
      reopenIcon.style.display = "none";
      mainModal.style.display = "block";
    });

    const iconImage = document.createElement("img");
    iconImage.src = chrome.runtime.getURL("icons/vb_icon128.png");
    iconImage.alt = "Volleyball Icon";
    iconImage.classList.add("icon-image");
    reopenArea.appendChild(iconImage);

    // Drag area
    const dragArea = document.createElement("div");
    dragArea.classList.add("drag-area");

    reopenIcon.appendChild(dragIconArea);
    reopenIcon.appendChild(reopenArea);
    reopenIcon.appendChild(dragArea);

    document.body.appendChild(reopenIcon);

    makeIconMovable(reopenIcon);
  } else {
    reopenIcon.style.display = "flex";
  }
}

// Make the reopen icon draggable
function makeIconMovable(icon) {
  let isDragging = false;
  let offsetX, offsetY;

  const dragIconImage = icon.querySelector(".material-icons");

  dragIconImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (isDragging) {
      icon.style.left = `${e.clientX - offsetX}px`;
      icon.style.top = `${e.clientY - offsetY}px`;
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}

// Create file input for uploading stats
function createFileInput() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "fileInput";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);
  return fileInput;
}

// Handle file upload and process the data
function handleFileUpload(event) {
  const file = event.target.files[0];
  const uploadButton = document.getElementById("uploadButton");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target.result;
      const fileName = file.name;

      // Truncate file name if necessary (e.g., if longer than 20 characters)
      const truncatedName =
        fileName.length > 20 ? fileName.substring(0, 20) + "..." : fileName;

      chrome.storage.local.set(
        { volleyballStats: { fileName, fileContents: contents } },
        function () {
          console.log("Data is saved to Chrome storage");

          // Replace the upload button text with the truncated file name
          uploadButton.innerText = `${truncatedName}`;

          // Change button color to green
          uploadButton.style.backgroundColor = "#5ea374";

          // Show the "Clear File" button
          showClearFileButton();

          // Process the CSV contents here
          processCSV(contents);

          // Ensure the modal is visible with buttons
          mainModal.style.display = "block";
        }
      );
    };
    reader.readAsText(file);
  }
}
function showClearFileButton() {
  const clearFileButton = document.querySelector(".clear-file-button");

  chrome.storage.local.get("volleyballStats", function (data) {
    if (data.volleyballStats && data.volleyballStats.fileName) {
      clearFileButton.style.display = "flex"; // Show the button
    } else {
      clearFileButton.style.display = "none"; // Hide the button
    }
  });
}

function hideClearFileButton() {
  const clearFileButton = document.querySelector(".clear-file-button");
  if (clearFileButton) {
    clearFileButton.style.display = "none"; // Hide the button
  }
}

// Function to clear the file input and any associated data
function clearFile() {
  // Find the file input (assuming you have an input element for file uploads)
  const fileInput = document.querySelector("#fileInput");

  if (fileInput) {
    fileInput.value = ""; // Clear the file input
  }

  // Optionally, clear any data associated with the uploaded file
  // Example: Resetting player stats or file data
  const playerStats = document.querySelector("#playerStats");
  if (playerStats) {
    playerStats.innerHTML = ""; // Clear any displayed player stats
  }

  // Remove file data from storage
  chrome.storage.local.remove("volleyballStats", function () {
    console.log("File cleared from storage");
  });

  // Hide the Clear File button after clearing
  const clearFileButton = document.querySelector(".clear-file-button");
  if (clearFileButton) {
    clearFileButton.style.display = "none"; // Hide the button
  }

  console.log("File cleared"); // You can log or alert the user
}

// Process the CSV data
function processCSV(csv) {
  const rows = csv.trim().split("\n");
  console.log("CSV Rows:", rows);

  const headers = rows[1]
    .split("|")
    .map((header) => header.trim().toLowerCase());
  console.log("Headers:", headers);

  const jerseyColumnIndex = headers.indexOf("jersey");
  if (jerseyColumnIndex === -1) {
    console.error('Column "Jersey" not found in CSV headers.');
    return;
  }

  const container = document.getElementById("buttonsContainer");
  if (!container) {
    console.error("Buttons container not found inside the modal.");
    return;
  }

  container.innerHTML = ""; // Clear any existing buttons

  for (let i = 2; i < rows.length; i++) {
    const rowData = rows[i].split("|").map((data) => data.trim());
    const jerseyNumber = rowData[jerseyColumnIndex];

    if (!jerseyNumber) {
      console.warn(`Skipping row with missing jersey number: ${rows[i]}`);
      continue;
    }

    const playerData = headers.reduce((obj, header, index) => {
      obj[header] = rowData[index];
      return obj;
    }, {});

    createPlayerButton(jerseyNumber, playerData);
  }
}

// Helper function to create player buttons
function createPlayerButton(jerseyNumber, playerData) {
  const container = document.getElementById("buttonsContainer");

  // Ensure container exists before appending buttons
  if (!container) {
    console.error("Cannot create player button: Buttons container not found.");
    return;
  }

  const button = document.createElement("button");
  button.classList.add("player-button");

  const jerseyNumberElement = document.createElement("div");
  jerseyNumberElement.textContent = jerseyNumber;
  jerseyNumberElement.classList.add("jersey-number");

  button.appendChild(jerseyNumberElement);

  // When the button is clicked, process the player data
  button.addEventListener("click", () => {
    console.log("Player Data:", playerData); // Log player data for debugging
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
                console.log(response.status);
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
