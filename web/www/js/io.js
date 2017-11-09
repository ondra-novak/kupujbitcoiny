function HttpIOGen(method, url, data, codes, hdrs) {
	return new Promise(function(ok,error){
		
		if (codes == null) codes = [200,201,202,203,204];
		if (codes == null) hdrs = "text/plain";
		if (typeof hdrs == "string" || codes == null) hdrs = {"Content-Type":hdrs};

		if (typeof data == "object") data = JSON.stringify(data);
		
		var ldr = new XMLHttpRequest;
		ldr.open(method,url);
		for (k in hdrs) ldr.setRequestHeader(k,hdrs[k]);
		ldr.onreadystatechange = function() {
			 if(ldr.readyState === XMLHttpRequest.DONE) {
				 if (codes.indexOf(ldr.status) != -1) {
					 ok(ldr.responseText, ldr.status, ldr);
				 } else {
					 error(ldr.status, ldr);
				 }
			 }
		};
		if (data != null) ldr.send(data);else ldr.send();		
	});
	
}

function GET(url, codes, headers) {
	return HttpIOGen("GET", url, null, headers, codes);	
}

function PUT(url, data, codes, headers) {
	return HttpIOGen("PUT", url, data, headers, codes);	
}
function POST(url, data, codes, headers) {
	return HttpIOGen("POST", url, data, headers, codes);	
}
function DELETE(url, codes, headers) {
	return HttpIOGen("DELETE", url, null, headers, codes);	
}
