chrome.browserAction.onClicked.addListener(function (tab) {
	console.log("Extension icon clicked");
	chrome.tabs.sendMessage(tab.id, { action: "toggle" }, function (response) {
		if (chrome.runtime.lastError) {
			console.log("Error sending message:", chrome.runtime.lastError.message);
			// 콘텐츠 스크립트가 로드되지 않았을 경우, 다시 로드를 시도합니다.
			chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function () {
				if (chrome.runtime.lastError) {
					console.error("Failed to inject content script:", chrome.runtime.lastError.message);
				} else {
					console.log("Content script injected, retrying toggle");
					chrome.tabs.sendMessage(tab.id, { action: "toggle" });
				}
			});
		} else {
			console.log("Message sent successfully");
		}
	});
});
