document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('processButton').addEventListener('click', processTextArea);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      processCSV(contents);
    };
    reader.readAsText(file);
  }
}

function processTextArea() {
  const csvInput = document.getElementById('csvInput').value;
  if (csvInput) {
    processCSV(csvInput);
  }
}

function processCSV(csv) {
  const rows = csv.trim().split('\n').map(row => row.split(','));
  const container = document.getElementById('buttonsContainer');
  container.innerHTML = '';

  rows.forEach((row, index) => {
    const button = document.createElement('button');
    button.textContent = `Row ${index + 1}`;
    button.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: insertData,
          args: [row]
        });
      });
    });
    container.appendChild(button);
  });
}

function insertData(row) {
  const fields = document.querySelectorAll('input, textarea, select'); // Adjust selector as needed
  row.forEach((data, index) => {
    if (fields[index]) {
      fields[index].value = data;
    }
  });
}
