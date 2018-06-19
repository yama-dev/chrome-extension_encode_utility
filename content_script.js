
// Get Select text.
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  var selectStr = document.getSelection();
  sendResponse({
    text: selectStr.toString(),
    count: selectStr.toString().length
  });
});

