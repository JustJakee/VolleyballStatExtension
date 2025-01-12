// background.js

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed or updated');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getStatsData') {
      // Retrieve stored stats data from chrome.storage
      chrome.storage.local.get('statsData', (result) => {
          if (result.statsData) {
              sendResponse({ data: result.statsData });
          } else {
              sendResponse({ error: 'No data found' });
          }
      });
      return true; // Indicates that we'll respond asynchronously
  }

  if (message.action === 'clearStatsData') {
      // Clear stored stats data
      chrome.storage.local.remove('statsData', () => {
          console.log('Stats data cleared');
          sendResponse({ status: 'success' });
      });
      return true; // Again, async response
  }
});

// Optional: Trigger actions periodically (e.g., background sync)
chrome.alarms.create('backgroundSync', {
  periodInMinutes: 5, // every 5 minutes
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'backgroundSync') {
      console.log('Background sync triggered');
      // Add any background sync tasks you need here
  }
});
