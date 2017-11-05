function HttpIOGen(method, url, data, hdrs, codes) {
	return new Promise(function(ok,error){
		
		if (typeof codes == "undefined") codes = [200];
		if (typeof hdrs == "undefined") hdrs = "text/plain";
		if (typeof hdrs == "string") hdrs = {"Content-Type":hdrs};

		
		var ldr = new XMLHttpRequest;
		ldr.open(method,url);
		for (k in hdrs) ldr.setRequestHeader(k,hdrs[k]);
		ldr.onreadystatechange =function() {
			 if(ldr.readyState === XMLHttpRequest.DONE) {
				 if (codes.indexOf(ldr.status) != -1) {
					 ok(ldr.responseText, ldr.status);
				 } else {
					 error(ldr.status, ldr);
				 }
			 }
		};
		if (data!=null) ldr.send(data);else ldr.send();		
	});
	
}

function GET(url, headers, codes) {
	return HttpIOGen("GET", url, null, headers, codes);	
}

function PUT(url, data, headers, codes) {
	return HttpIOGen("PUT", url, data, headers, codes);	
}
function POST(url, data, headers, codes) {
	return HttpIOGen("POST", url, data, headers, codes);	
}
function DELETE(url, headers, codes) {
	return HttpIOGen("DELETE", url, null, headers, codes);	
}
