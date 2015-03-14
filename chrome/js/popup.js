function popalert(msg) {
	$( "#whole" ).hide();
	$( "#popalert" ).show();
	$( "#popalert" ).html("<p>"+msg+"</p>");
	setTimeout(function() {
		window.close();
	}, 4000);
	
}


function mkrequest(url) {
	try {
		var newURL = "http://"+localStorage.getItem('raspip')+":"+localStorage.getItem('rasport')+url;
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", newURL, true);
		xmlHttp.send();
		
		
	}
	catch(err){
		popalert("Something went wrong. Make sure the ip/port are corrects, and the server is running."+err)
		return "wrong";
	}
	
}

$(function() {
	$( "#castbtn" ).click(function() {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			var url_encoded_url = encodeURIComponent(tabs[0].url);

			if (mkrequest("/stream?url=" + url_encoded_url) != "wrong") {
				popalert("The video should be successfully sent to the Raspberry Pi ! Please wait ~ 20/30 seconds. If it doesn't works, please make sure the ip/ports are corrects, and the server is running.");
			}
		});
			
	});
	$( "#pause" ).click(function() {
		mkrequest("/video?control=pause");
	});
	
	$( "#stop" ).click(function() {
		mkrequest("/video?control=stop");
	});
	
	$( "#backward" ).click(function() {
		mkrequest("/video?control=left");
	});
	
	$( "#forward" ).click(function() {
		mkrequest("/video?control=right");
	});
	
	$( "#vol_down" ).click(function() {
		mkrequest("/sound?vol=less");
	});
	
	$( "#vol_up" ).click(function() {
		mkrequest("/sound?vol=more");
	});
	
	
});