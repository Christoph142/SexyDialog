if(window.top !== window.self && document.createElement("dialog").showModal !== undefined){ // subFrames with required HTML5 support only:
	
	// inline script:
	function sexy_dialog_subFrame(){
		window.alert = function(text){ window.dispatchEvent(new CustomEvent("sexy_alert", { "bubbles" : false, "detail" : text })); }
	}
	
	// add subframe's alert handling as inline script to execute in page context:	
	var script = document.createElement("script");
	script.innerHTML = "("+ sexy_dialog_subFrame +")();";
	document.documentElement.appendChild(script);
	
	// content script:
	function sexy_check_key(){
		if(window.event.which === 13 || window.event.which === 27){ // Enter & Esc
			window.event.preventDefault();
			window.event.stopPropagation();
			chrome.extension.sendMessage({ "event" : "sexy_close", "returnValue" : ( window.event.which === 13 ? true : false ) });
			window.removeEventListener("keydown", sexy_check_key, true);
		}
	}
	
	// listen in injected script context for custom events:
	window.addEventListener("sexy_alert", function(e){
		chrome.extension.sendMessage({ "event" : "sexy_alert", "text" : e.detail });
		window.addEventListener("keydown", sexy_check_key, true);
	}, true);
}