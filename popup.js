document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const fileNameSpan = document.getElementById('fileName');
  const uploadText = document.getElementById('uploadText');

  fileInput.addEventListener('change', handleFileUpload);
  document.getElementById('clearButton').addEventListener('click', clearData);

  // Test connection button
  document.getElementById('testButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      })
      .then(() => {
        console.log('Content script injected');
      })
      .catch((err) => {
        console.error('Failed to inject content script:', err);
      });
    });
  });

  // Retrieve and display stored data on popup load
  chrome.storage.local.get('volleyballStats', function (result) {
    if (result.volleyballStats) {
      uploadText.style.display = 'none';
      fileNameSpan.style.display = 'inline';
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

        chrome.storage.local.set({ volleyballStats: { fileName, fileContents: contents } }, function () {
          console.log('Data is saved to Chrome storage');
          processCSV(contents);
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
      fileNameSpan.textContent = '';
      document.getElementById('buttonsContainer').innerHTML = '';
    });

    chrome.storage.local.remove('volleyballStats', function () {
      console.log('Data cleared from Chrome storage');
    });
  }

  function truncateFileName(fileName, maxLength) {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + '...';
    }
    return fileName;
  }

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

    for (let i = 2; i < rows.length; i++) {
      const rowData = rows[i].split('|').map(data => data.trim());
      const jerseyNumber = rowData[jerseyColumnIndex];

      const playerData = headers.reduce((obj, header, index) => {
        obj[header] = rowData[index];
        return obj;
      }, {});

      const button = document.createElement('button');
      button.classList.add('icon-button');

      const icon = document.createElement('img');
      icon.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Person_icon.png';
      icon.alt = `Player Icon`;
      icon.classList.add('icon');
      button.appendChild(icon);

      const jerseyNumberElement = document.createElement('div');
      jerseyNumberElement.textContent = `#${jerseyNumber}`;
      jerseyNumberElement.classList.add('jersey-number');
      button.appendChild(jerseyNumberElement);

      button.addEventListener('click', () => {
        fillFormFields(playerData);
        console.log(playerData);
      });

      container.appendChild(button);
    }
  }

  function fillFormFields(playerData) {
    const fieldMapping = {
      'MatchGamesPlayed': 'gp',
      'TotalServes': 'Srv',
      'ServingAces': 'Ace',
      'ServingErrors': 'SEr',
      'ServingPoints': 'SPt',
      'AttacksAttempts': 'Atk',
      'AttacksKills': 'Kls',
      'AttacksErrors': 'Er',
      'ServingReceivedSuccess': 'SvR',
      'ServingReceivedErrors': 'SRE',
      'BlocksSolo': 'Sol',
      'BlocksAssists': 'ABk',
      'BlocksErrors': 'BkE',
      'BallHandlingAttempt': 'Ball_Handling',
      'Assists': 'Ast',
      'AssistsErrors': 'Assists_ERR',
      'Digs': 'Dig',
      'DigsErrors': 'DEr'
    };

    Object.keys(playerData).forEach(header => {
      const fieldId = fieldMapping[header];
      if (fieldId) {
        console.log(`Field ID is: ${fieldId}`);
        const input = document.getElementById(fieldId);
        if (input) {
          console.log(`Input is: ${input}`);
          input.value = playerData[header];
        } else {
          console.log(`Input ${input} was not found`);
        }
      }
    });
  }
});
