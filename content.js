const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head.appendChild(link);

let mainModal, reopenIcon, dragArea;

window.addEventListener('load', () => {
    console.log('Page fully loaded, injecting upload interface.');

    mainModal = createModal();

    const uploadButton = mainModal.querySelector('#uploadButton');
    uploadButton.addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    const fileInput = createFileInput();

    fileInput.addEventListener('change', handleFileUpload);

    makeModalMovable(mainModal);
});

// Create the modal structure
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'uploadModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modal.style.zIndex = '9999';
    modal.style.borderRadius = '8px';
    modal.style.width = '300px';

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'center';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.fontSize = '18px';
    modalHeader.style.fontWeight = 'bold';
    modalHeader.style.marginBottom = '10px';
    modalHeader.innerText = 'Upload Player Stats';
    modal.appendChild(modalHeader);

    const modalBody = document.createElement('div');
    const uploadButton = document.createElement('button');
    uploadButton.id = 'uploadButton';
    uploadButton.innerText = 'Upload Stats';
    uploadButton.style.width = '100%';
    uploadButton.style.padding = '10px';
    uploadButton.style.backgroundColor = 'blue';
    uploadButton.style.color = '#fff';
    uploadButton.style.border = 'none';
    uploadButton.style.cursor = 'pointer';
    uploadButton.style.borderRadius = '8px';
    modalBody.appendChild(uploadButton);
    modal.appendChild(modalBody);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '18px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'grey'; // Change X color to grey
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the main modal
        showReopenIcon(); // Show the small icon to reopen the modal
    });

    modal.appendChild(closeButton);

    const dragIcon = document.createElement('div');
    dragIcon.classList.add('material-icons');
    dragIcon.innerText = 'drag_indicator';
    dragIcon.style.position = 'absolute';
    dragIcon.style.top = '10px';
    dragIcon.style.left = '10px';
    dragIcon.style.fontSize = '24px';
    dragIcon.style.cursor = 'move';
    dragIcon.style.zIndex = '10000';

    modal.appendChild(dragIcon);

    document.body.appendChild(modal);

    return modal;
}

// Make the main modal movable
function makeModalMovable(modal) {
    const dragIcon = modal.querySelector('.material-icons');
    let isDragging = false;
    let offsetX, offsetY;

    dragIcon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - modal.offsetLeft;
        offsetY = e.clientY - modal.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            modal.style.left = `${e.clientX - offsetX}px`;
            modal.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Small square icon that reopens the modal
function showReopenIcon() {
    // Check if the reopen icon already exists; if not, create it
    if (!reopenIcon) {
        reopenIcon = document.createElement('div');
        reopenIcon.style.position = 'fixed';
        reopenIcon.style.top = '20px';
        reopenIcon.style.right = '20px';
        reopenIcon.style.width = '120px';  // Adjusted size for both icons
        reopenIcon.style.height = '60px';
        reopenIcon.style.zIndex = '10000'; // Ensure it appears on top
        reopenIcon.style.backgroundColor = '#fff';
        reopenIcon.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        reopenIcon.style.display = 'flex';
        reopenIcon.style.flexDirection = 'row';  // Left and right sides in a row layout

        // Part 1: Left-aligned Drag Icon
        const dragIconArea = document.createElement('div');
        dragIconArea.style.display = 'flex';
        dragIconArea.style.justifyContent = 'center';
        dragIconArea.style.alignItems = 'center';
        dragIconArea.style.cursor = 'move';
        dragIconArea.style.flex = '1';  // Occupy part of the space

        const dragIconImage = document.createElement('div');
        dragIconImage.classList.add('material-icons');
        dragIconImage.innerText = 'drag_indicator';  // The actual drag icon text
        dragIconImage.style.fontSize = '24px';
        dragIconImage.style.cursor = 'move';
        dragIconArea.appendChild(dragIconImage);

        // Part 2: Right area for reopening the modal
        const reopenArea = document.createElement('div');
        reopenArea.style.display = 'flex';
        reopenArea.style.justifyContent = 'center';
        reopenArea.style.alignItems = 'center';
        reopenArea.style.cursor = 'pointer';
        reopenArea.style.backgroundColor = 'black';  // Light gray background
        reopenArea.style.flex = '2';  // Occupy more space

        reopenArea.addEventListener('click', () => {
            reopenIcon.style.display = 'none'; // Hide the reopen icon
            mainModal.style.display = 'block'; // Show the main modal again
        });

        const iconImage = document.createElement('img');
        iconImage.src = chrome.runtime.getURL('icons/vb_icon128.png'); // Path to your volleyball icon
        iconImage.alt = 'Volleyball Icon';
        iconImage.style.width = '50%';
        iconImage.style.height = '50%';
        iconImage.style.objectFit = 'contain';  // Maintain aspect ratio
        reopenArea.appendChild(iconImage);

        // Add the drag functionality to the drag icon
        dragArea = document.createElement('div');
        dragArea.style.height = '20px';
        dragArea.style.backgroundColor = '#333';  // Dark color for the drag area
        dragArea.style.cursor = 'move';
        reopenIcon.appendChild(dragIconArea);  // Add the left-aligned drag icon
        reopenIcon.appendChild(reopenArea);  // Add the reopen area
        reopenIcon.appendChild(dragArea);    // Add the drag area

        document.body.appendChild(reopenIcon);

        makeIconMovable(reopenIcon);  // Make the reopen icon draggable
    } else {
        // If the reopen icon already exists, just show it
        reopenIcon.style.display = 'flex';
    }
}

// Make the reopen icon draggable
function makeIconMovable(icon) {
    let isDragging = false;
    let offsetX, offsetY;

    const dragIconImage = icon.querySelector('.material-icons');

    dragIconImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - icon.offsetLeft;
        offsetY = e.clientY - icon.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            icon.style.left = `${e.clientX - offsetX}px`;
            icon.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Create file input for uploading stats
function createFileInput() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';
    fileInput.style.display = 'none';
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

            chrome.storage.local.set({ volleyballStats: { fileName, fileContents: contents } }, function () {
                console.log('Data is saved to Chrome storage');
                processCSV(contents);
            });
        };
        reader.readAsText(file);
    }
}

// Process the CSV data
function processCSV(contents) {
    console.log('Processing CSV data:', contents);
    // Implement CSV processing logic here...
}
