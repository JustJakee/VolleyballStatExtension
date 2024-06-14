document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['fileName', 'fileContents'], (result) => {
        if (result.fileName && result.fileContents) {
            // Display the file name in the UI
            document.getElementById('fileInput').setAttribute('data-file-name', result.fileName);
        }
    });

    // Event listener for file input
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    // Event listener for clear button
    document.getElementById('clearButton').addEventListener('click', clearData);
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            chrome.runtime.sendMessage({ action: 'uploadFile', fileName: file.name, fileContents: contents }, (response) => {
                console.log(response.message);
                processCSV(contents); // Process CSV after successfully uploading and storing
            });
            document.getElementById('fileInput').setAttribute('data-file-name', file.name);
        };
        reader.readAsText(file);
    }
}

function clearData() {
    chrome.runtime.sendMessage({ action: 'clearData' }, (response) => {
        console.log(response.message);
        document.getElementById('fileInput').setAttribute('data-file-name', '');
        document.getElementById('buttonsContainer').innerHTML = '';
    });
}

function processCSV(csv) {
    const rows = csv.trim().split('\n');

    // Assuming headers are in the first row and are separated by '|'
    const headers = rows[1].split('|').map(header => header.trim());
    const jerseyColumnIndex = headers.indexOf('Jersey');

    if (jerseyColumnIndex === -1) {
        console.error('Column "Jersey" not found in CSV headers.');
        return;
    }

    const container = document.getElementById('buttonsContainer');
    container.innerHTML = '';

    for (let i = 2; i < rows.length; i++) {
        const rowData = rows[i].split('|').map(data => data.trim());
        const jerseyNumber = rowData[jerseyColumnIndex]; // Extract jersey number from the found column
    
        const button = document.createElement('button');
        button.classList.add('icon-button');
    
        // Create icon element
        const icon = document.createElement('img');
        icon.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Person_icon.png'; // Replace with your icon file
        icon.alt = `Player Icon`;
        icon.classList.add('icon');
        button.appendChild(icon);
    
        // Create jersey number element
        const jerseyNumberElement = document.createElement('div');
        jerseyNumberElement.textContent = `#${jerseyNumber}`;
        jerseyNumberElement.classList.add('jersey-number');
        button.appendChild(jerseyNumberElement);
    
        button.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: insertData,
                    args: [rowData]
                });
            });
        });
    
        container.appendChild(button);
    }
    
}




function insertData(row) {
    const fields = document.querySelectorAll('input, textarea, select'); // Adjust selector as needed
    row.forEach((data, index) => {
        if (fields[index]) {
            fields[index].value = data;
        }
    });
}
