console.log("Inject script running");
chrome.runtime.sendMessage({ action: "toggle" }, function (response) {
	console.log("Message sent from inject script");
});
