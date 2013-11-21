function sexy_dialog(){
	window.alert = function(text){
		// dialog:
		var dialog = document.createElement("dialog");
		dialog.id = "sexy_dialog";
		dialog.innerHTML = "<div id='sexy_close_button'></div>\
							<div class='sexy_content_area'>"+text+"</div>\
							<div class='sexy_action_area'>\
								<div id='sexy_buttons'>\
									<button id='sexy_confirm'>OK</button>\
								</div>\
							</div>";
		
		document.body.appendChild(dialog);
		
		document.getElementById("sexy_close_button").addEventListener("click", sexy_close, true); // close button
		document.getElementById("sexy_confirm").addEventListener("click", sexy_close, true); // confirm_button
		window.addEventListener("keydown", sexy_check_esc, true);
		dialog.showModal();
	}
}

function sexy_close(){
	var dialog = document.getElementById('sexy_dialog');
	dialog.className = 'close';
	window.removeEventListener('keydown', sexy_check_esc, true);
	window.setTimeout( function(){
		dialog.close();
		document.body.removeChild(dialog);
	}, 200);
}

function sexy_check_esc(){
	if(window.event.which === 27){
		window.event.preventDefault();
		window.event.stopPropagation();
		sexy_close();
	}
}

// add everything as inline script to execute in page context:	
var script = document.createElement("script");
script.innerHTML = "("+ sexy_dialog +")();\n\n"+ sexy_close +"\n\n"+ sexy_check_esc;
document.documentElement.appendChild(script);