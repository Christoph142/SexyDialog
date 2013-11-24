// echo request back to sending tab (topmost frame):
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){ chrome.tabs.sendMessage(sender.tab.id, request); });