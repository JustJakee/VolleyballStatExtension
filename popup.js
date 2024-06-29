document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const fileNameSpan = document.getElementById('fileName');
  const uploadText = document.getElementById('uploadText');

  fileInput.addEventListener('change', handleFileUpload);
  document.getElementById('clearButton').addEventListener('click', clearData);

  // Retrieve and display stored data on popup load
  chrome.storage.local.get('volleyballStats', function(result) {
      if (result.volleyballStats) {
          uploadText.style.display = 'none';
          fileNameSpan.style.display = 'inline';
          // Assuming the file name is also stored in the storage
          const storedFileName = result.volleyballStats.fileName;
          fileNameSpan.textContent = truncateFileName(storedFileName, 8);
          processCSV(result.volleyballStats.fileContents);
      }
  });

  function handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const contents = e.target.result;
              const fileName = file.name;

              // Save the file contents and file name to Chrome storage
              chrome.storage.local.set({ volleyballStats: { fileName, fileContents: contents } }, function() {
                  console.log('Data is saved to Chrome storage');
                  processCSV(contents); // Process CSV after successfully uploading and storing
                  uploadText.style.display = 'none';
                  fileNameSpan.style.display = 'inline';
                  fileNameSpan.textContent = truncateFileName(fileName, 8);
              });
          };
          reader.readAsText(file);
      }
  }

  function clearData() {
      chrome.runtime.sendMessage({ action: 'clearData' }, (response) => {
          console.log(response.message);
          uploadText.style.display = 'inline';
          fileNameSpan.style.display = 'none';
          fileNameSpan.textContent = ''; // Clear the displayed file name
          document.getElementById('buttonsContainer').innerHTML = '';
      });

      // Clear the data in Chrome storage
      chrome.storage.local.remove('volleyballStats', function() {
          console.log('Data cleared from Chrome storage');
      });
  }

  function truncateFileName(fileName, maxLength) {
      if (fileName.length > maxLength) {
          return fileName.slice(0, maxLength) + '...';
      }
      return fileName;
  }

  // Additional code for processCSV and other functions
  function processCSV(csv) {
      const rows = csv.trim().split('\n');
      const headers = rows[1].split('|').map(header => header.trim());
      const jerseyColumnIndex = headers.indexOf('Jersey');

      if (jerseyColumnIndex === -1) {
          console.error('Column "Jersey" not found in CSV headers.');
          return;
      }

      const container = document.getElementById('buttonsContainer');
      container.innerHTML = '';

      // Start iterating from the second row
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
});
