function sexy_dialog(){
	var accessible_top_frame = false;
	try{ if(window.top !== window.self && window.top.document) accessible_top_frame = true; }catch(e){/* window.top inaccessible */}

	if(!accessible_top_frame) window.alert = function(text){
		text = text.replace(/\n/g, "<br>");
		
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
	else
	{
		window.alert = function(text){
			window.addEventListener("keydown", sexy_check_key, true);
			window.top.alert(text);
		}
	}
}

function sexy_close(returnValue){
	try{
		var dialog = document.getElementById('sexy_dialog');
		dialog.className = 'close';
		window.removeEventListener('keydown', sexy_check_key, true);
		window.setTimeout( function(){
			dialog.close(returnValue);
			document.documentElement.removeChild(dialog);
		}, 200);
	}
	catch(e){ // no dialog in this frame
		try{ window.top.sexy_close(returnValue); }catch(e){/* window.top inaccessible */}
	}
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