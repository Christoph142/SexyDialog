if(window.top === window.self){  // topmost frames only:
	
	chrome.extension.onMessage.addListener( function(request){ // send requests from injected script to site context:
		if		(request.event === "sexy_alert") window.dispatchEvent(new CustomEvent("sexy_alert", { "bubbles" : false, "detail" : request.text }));
		else if	(request.event === "sexy_close") window.dispatchEvent(new CustomEvent("sexy_close", { "bubbles" : false, "detail" : request.returnValue }));
	});
	
	function sexy_dialog(){
		window.alert = function(text){
			text = text.toString().replace(/\n/g, "<br>");
			
			var dialog = document.createElement("dialog");
			dialog.id = "sexy_dialog";
			dialog.innerHTML = "<div id='sexy_close_button'></div>\
								<div class='sexy_content_area'>"+text+"</div>\
								<div class='sexy_action_area'>\
									<div id='sexy_buttons'>\
										<button id='sexy_confirm'>OK</button>\
									</div>\
								</div>";
			
			document.documentElement.appendChild(dialog);
			
			document.getElementById("sexy_close_button").addEventListener("click", sexy_close, true); // close button
			document.getElementById("sexy_confirm").addEventListener("click", sexy_close, true); // confirm button
			window.addEventListener("keydown", sexy_check_key, true);
			
			dialog.showModal();
		}
		
		window.addEventListener("sexy_alert", function(e){ window.alert(e.detail); }, true);
		window.addEventListener("sexy_close", function(e){ sexy_close(e.detail); }, true);
	}
	
	function sexy_close(returnValue){
		var dialog = document.getElementById("sexy_dialog");
		dialog.className = "close";
		window.removeEventListener("keydown", sexy_check_key, true);
		window.setTimeout( function(){
			dialog.close(returnValue);
			document.documentElement.removeChild(dialog);
		}, 200);
	}
	
	function sexy_check_key(){
		if(window.event.which === 13 || window.event.which === 27){ // Enter & Esc
			window.event.preventDefault();
			window.event.stopPropagation();
			sexy_close( window.event.which === 13 ? true : false );
		}
	}
	
	// add everything as inline script to execute in page context:	
	var script = document.createElement("script");
	script.innerHTML = "("+ sexy_dialog +")();\n\n"+ sexy_close +"\n\n"+ sexy_check_key;
	document.documentElement.appendChild(script);	
}