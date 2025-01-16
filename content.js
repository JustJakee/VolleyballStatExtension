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
    background: linear-gradient(135deg, #f9f9f9, #e8e8e8);
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 9999;
    width: 320px;
    animation: fadeIn 0.3s ease-in-out;
}

#uploadModal .close-icon {
    position: absolute;
    right: 20px;
    font-size: 24px;
    color: black;
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
    margin-bottom: 20px;
    color: #333;
}

#uploadModal button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

#uploadModal button:hover {
    background: #0056b3;
}

#buttonsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    margin-top: 20px;
}

.icon-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.icon-button:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.icon {
    width: 36px;
    height: 36px;
    margin-bottom: 8px;
}

.jersey-number {
    font-size: 14px;
    font-weight: bold;
    color: #333;
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

/* Reopen Icon Styles */
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
    background-color: black;
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
  modalHeader.innerText = "Upload Player Stats";
  modal.appendChild(modalHeader);

  // Modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modal.appendChild(modalBody);

  // Upload button
  const uploadButton = document.createElement("button");
  uploadButton.id = "uploadButton";
  uploadButton.innerText = "Upload Stats";
  uploadButton.classList.add("upload-button");
  modalBody.appendChild(uploadButton);

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
          mainModal.style.display = "block"; // Ensure the modal is visible with buttons
        }
      );
    };
    reader.readAsText(file);
  }
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
  button.classList.add("icon-button");

  const icon = document.createElement("img");
  icon.src =
    "https://upload.wikimedia.org/wikipedia/commons/6/6f/Person_icon.png";
  icon.alt = "Player Icon";
  icon.style.width = "20px";
  icon.style.height = "20px";
  icon.classList.add("icon");
  button.appendChild(icon);

  const jerseyNumberElement = document.createElement("div");
  jerseyNumberElement.textContent = `#${jerseyNumber}`;
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
