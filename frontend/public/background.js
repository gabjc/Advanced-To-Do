chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "trigger_alert") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            alert('Hello from Chrome extension!');
          },
        });
        sendResponse({ status: "Alert triggered" });
      } else {
        console.error("No active tab found.");
        sendResponse({ status: "Failed to trigger alert: No active tab." });
      }
    });
  }
  return true; // Keep the message port open for async operations
});
