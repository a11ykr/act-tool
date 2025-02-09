document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');
  let isEnabled = false;

  toggleButton.addEventListener('click', function() {
    isEnabled = !isEnabled;
    toggleButton.textContent = isEnabled ? 
      '대체 텍스트 숨기기' : 
      '대체 텍스트 표시';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleOverlay'});
    });
  });
});
