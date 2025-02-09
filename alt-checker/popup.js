document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');
  let isEnabled = false;

  function resetButton() {
    isEnabled = false;
    toggleButton.textContent = '대체 텍스트 표시';
  }

  toggleButton.addEventListener('click', function() {
    isEnabled = !isEnabled;
    toggleButton.textContent = isEnabled ? 
      '대체 텍스트 숨기기' : 
      '대체 텍스트 표시';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleOverlay'});
    });
  });

  // content script로부터의 리셋 메시지 수신
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'resetPopup') {
      resetButton();
    }
  });
});