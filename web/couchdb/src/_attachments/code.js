"use strict";

window.thisApp = {
		relativeUrl:"../../",
		databaseUrl:location.origin+"/couchblog",
		absoluteUrl:location.origin+"/couchblog/",
		thumbSize:[129,96]
};



function byId(id) {
	return document.getElementById(id);
}

function byClass(el, name) {
	return el.querySelector("."+name);
}


window.HtmlArea = function(el) {
	
	var htmlTemplate = "<div class='panel'><span style='white-space: nowrap;'>"
		+"<button class='btnUndo'><img src='data:image/gif;base64,R0lGODlhFgAWAOMKADljwliE33mOrpGjuYKl8aezxqPD+7/I19DV3NHa7P///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARR8MlJq7046807TkaYeJJBnES4EeUJvIGapWYAC0CsocQ7SDlWJkAkCA6ToMYWIARGQF3mRQVIEjkkSVLIbSfEwhdRIH4fh/DZMICe3/C4nBQBADs='></button>"
		+"<button class='btnRedo'><img src='data:image/gif;base64,R0lGODlhFgAWAMIHAB1ChDljwl9vj1iE34Kl8aPD+7/I1////yH5BAEKAAcALAAAAAAWABYAAANKeLrc/jDKSesyphi7SiEgsVXZEATDICqBVJjpqWZt9NaEDNbQK1wCQsxlYnxMAImhyDoFAElJasRRvAZVRqqQXUy7Cgx4TC6bswkAOw=='></button>"
		+"</span> <span style='white-space: nowrap;'>"
	+"<button class='btnHead1'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAVUlEQVRIx2NgGAUDDRih9H8qqSEo8Z8ITcSogQMmWgfRqAUEAQseuf+0toCRGhYPuTgIhfrwPy0toHlO/o8sR4uy6D+xxQi5ACUOGGlgOFGl7CiAAwD23RHB+yzZUgAAAABJRU5ErkJggg=='></button>"	
	+"<button class='btnHead2'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAXklEQVQ4y2NgGAWjAB0wovH/45H/T0AvQfAfiyHEyKEAJloFBc0MZiEQJDQxmJESywYkKIgBoUjs1dR28WqoBavwGfwfT3hik1uNy8XUAKvQgoRqhsJy46rREpK+AADfyBRgiDoZsgAAAABJRU5ErkJggg=='></button>"	
	+"<button class='btnParagraph'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAZ0lEQVQ4y2NgGAVQwEikulAoRgar0WiSwCoGBob/BHAoNo1MBAzFpmk1Ma5kIuB9BmobHEpp5DHhcRVNDKbYcHwGh1FiOBMB+TBoWl9NbYPJDhYmWmXpUYOHsMGkAPQyOZQaZcrgAQDmWhTCvDYyXQAAAABJRU5ErkJggg=='></button>"	
	+"<button class='btnPreform'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAbElEQVQ4y2NgGAXDDoQyMDD8h+JQCtRggFVQDauIVPefWINJUYxVLROtwpKuBoeSaMZqYgwORYqw1SRagJI6mLDYvpqaLh9NFTgNXk1rFxNTVmB1CDMeF1+Dsq8hsZHBNQYGBm0oHTZabuMEAMQtIgWOH4tWAAAAAElFTkSuQmCC'></button>"
	+"</span> <span style='white-space: nowrap;'>"
	+"<button class='btnRemove'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oECQMCKPI8CIIAAAAIdEVYdENvbW1lbnQA9syWvwAAAuhJREFUOMtjYBgFxAB501ZWBvVaL2nHnlmk6mXCJbF69zU+Hz/9fB5O1lx+bg45qhl8/fYr5it3XrP/YWTUvvvk3VeqGXz70TvbJy8+Wv39+2/Hz19/mGwjZzuTYjALuoBv9jImaXHeyD3H7kU8fPj2ICML8z92dlbtMzdeiG3fco7J08foH1kurkm3E9iw54YvKwuTuom+LPt/BgbWf3//sf37/1/c02cCG1lB8f//f95DZx74MTMzshhoSm6szrQ/a6Ir/Z2RkfEjBxuLYFpDiDi6Af///2ckaHBp7+7wmavP5n76+P2ClrLIYl8H9W36auJCbCxM4szMTJac7Kza////R3H1w2cfWAgafPbqs5g7D95++/P1B4+ECK8tAwMDw/1H7159+/7r7ZcvPz4fOHbzEwMDwx8GBgaGnNatfHZx8zqrJ+4VJBh5CQEGOySEua/v3n7hXmqI8WUGBgYGL3vVG7fuPK3i5GD9/fja7ZsMDAzMG/Ze52mZeSj4yu1XEq/ff7W5dvfVAS1lsXc4Db7z8C3r8p7Qjf///2dnZGxlqJuyr3rPqQd/Hhyu7oSpYWScylDQsd3kzvnH738wMDzj5GBN1VIWW4c3KDon7VOvm7S3paB9u5qsU5/x5KUnlY+eexQbkLNsErK61+++VnAJcfkyMTIwffj0QwZbJDKjcETs1Y8evyd48toz8y/ffzv//vPP4veffxpX77z6l5JewHPu8MqTDAwMDLzyrjb/mZm0JcT5Lj+89+Ybm6zz95oMh7s4XbygN3Sluq4Mj5K8iKMgP4f0////fv77//8nLy+7MCcXmyYDAwODS9jM9tcvPypd35pne3ljdjvj26+H2dhYpuENikgfvQeXNmSl3tqepxXsqhXPyc666s+fv1fMdKR3TK72zpix8nTc7bdfhfkEeVbC9KhbK/9iYWHiErbu6MWbY/7//8/4//9/pgOnH6jGVazvFDRtq2VgiBIZrUTIBgCk+ivHvuEKwAAAAABJRU5ErkJggg=='></button>"
	+"<button class='btnBold'><img src='data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs='></button>"
	+"<button class='btnItalic'><img src='data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw=='></button>"
	+"<button class='btnUnderline'><img src='data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7'></button>"
	+"</span> <span style='white-space: nowrap;'>"
	+"<button class='btnJustLeft'><img src='data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JMGELkGYxo+qzl4nKyXAAAOw=='></button>"	
	+"<button class='btnJustCenter'><img src='data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIfhI+py+0Po5y02ouz3jL4D4JOGI7kaZ5Bqn4sycVbAQA7'></button>"	
	+"<button class='btnJustRight'><img src='data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JQGDLkGYxouqzl43JyVgAAOw=='></button>"	
	+"</span> <span style='white-space: nowrap;'>"
	+"<button class='btnNumberedList'><img src='data:image/gif;base64,R0lGODlhFgAWAMIGAAAAADljwliE35GjuaezxtHa7P///////yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKSespwjoRFvggCBUBoTFBeq6QIAysQnRHaEOzyaZ07Lu9lUBnC0UGQU1K52s6n5oEADs=' /></button>"
	+"<button class='btnDottedList'><img src='data:image/gif;base64,R0lGODlhFgAWAMIGAAAAAB1ChF9vj1iE33mOrqezxv///////yH5BAEAAAcALAAAAAAWABYAAAMyeLrc/jDKSesppNhGRlBAKIZRERBbqm6YtnbfMY7lud64UwiuKnigGQliQuWOyKQykgAAOw==' /></button>"
	+"<button class='btnQuote'><img src='data:image/gif;base64,R0lGODlhFgAWAIQXAC1NqjFRjkBgmT9nqUJnsk9xrFJ7u2R9qmKBt1iGzHmOrm6Sz4OXw3Odz4Cl2ZSnw6KxyqO306K63bG70bTB0rDI3bvI4P///////////////////////////////////yH5BAEKAB8ALAAAAAAWABYAAAVP4CeOZGmeaKqubEs2CekkErvEI1zZuOgYFlakECEZFi0GgTGKEBATFmJAVXweVOoKEQgABB9IQDCmrLpjETrQQlhHjINrTq/b7/i8fp8PAQA7'></button>"
	+"<button class='btnAddIdent'><img src='data:image/gif;base64,R0lGODlhFgAWAMIHAAAAADljwliE35GjuaezxtDV3NHa7P///yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKCQG9F2i7u8agQgyK1z2EIBil+TWqEMxhMczsYVJ3e4ahk+sFnAgtxSQDqWw6n5cEADs=' /></button>"
	+"<button class='btnDelIdent'><img src='data:image/gif;base64,R0lGODlhFgAWAOMIAAAAADljwl9vj1iE35GjuaezxtDV3NHa7P///////////////////////////////yH5BAEAAAgALAAAAAAWABYAAAQ7EMlJq704650B/x8gemMpgugwHJNZXodKsO5oqUOgo5KhBwWESyMQsCRDHu9VOyk5TM9zSpFSr9gsJwIAOw==' /></button>"
	+"</span> <span style='white-space: nowrap;'>"
	+"<button class='btnTable'>Table</button>"
	+"<button class='btnLink'><img src='data:image/gif;base64,R0lGODlhFgAWAOMKAB1ChDRLY19vj3mOrpGjuaezxrCztb/I19Ha7Pv8/f///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARY8MlJq7046827/2BYIQVhHg9pEgVGIklyDEUBy/RlE4FQF4dCj2AQXAiJQDCWQCAEBwIioEMQBgSAFhDAGghGi9XgHAhMNoSZgJkJei33UESv2+/4vD4TAQA7'></button>"
	+"</span> </div>"
	+"<div class='content' contenteditable='true'></textarea>";
	
	el.innerHTML = htmlTemplate;
	
	var btnBold = byClass(el,"btnBold");
	var btnItalic = byClass(el,"btnItalic");
	var btnUnderline = byClass(el,"btnUnderline");
	var btnLink = byClass(el,"btnLink");
	var btnRemove = byClass(el,"btnRemove");
	var btnUndo = byClass(el,"btnUndo");
	var btnRedo = byClass(el,"btnRedo");
	var btnParagraph = byClass(el,"btnParagraph");
	var btnPreform = byClass(el,"btnPreform");
	var btnHead1 = byClass(el,"btnHead1");
	var btnHead2 = byClass(el,"btnHead2");
	var btnJustLeft = byClass(el,"btnJustLeft");
	var btnJustCenter = byClass(el,"btnJustCenter");
	var btnJustRight = byClass(el,"btnJustRight");
	var btnNumberedList = byClass(el,"btnNumberedList");
	var btnDottedList = byClass(el,"btnDottedList");
	var btnQuote = byClass(el,"btnQuote");
	var btnAddIdent = byClass(el,"btnAddIdent");
	var btnDelIdent = byClass(el,"btnDelIdent");
	var btnTable = byClass(el,"btnTable");
	var content = byClass(el,"content");
	var panel = byClass(el,"panel");
	
	function setContent(x) {
		content.innerHTML=x;
	}
	function getContent() {
		return content.innerHTML;
	}
	function exec(cmd, value) {
		content.focus();
		document.execCommand(cmd, false, value); 
		content.focus();
	}
	this.setContent = setContent;
	this.getContent = getContent;
	
	
	btnBold.addEventListener("click",exec.bind(null,"bold",null));
	btnItalic.addEventListener("click",exec.bind(null,"italic",null));
	btnUnderline.addEventListener("click",exec.bind(null,"underline",null));
	btnRemove.addEventListener("click",exec.bind(null,"removeFormat",null));
	btnUndo.addEventListener("click",exec.bind(null,"undo",null));
	btnRedo.addEventListener("click",exec.bind(null,"redo",null));
	btnParagraph.addEventListener("click",exec.bind(null,"formatblock","p"));
	btnPreform.addEventListener("click",exec.bind(null,"formatblock","pre"));
	btnHead1.addEventListener("click",exec.bind(null,"formatblock","h2"));
	btnHead2.addEventListener("click",exec.bind(null,"formatblock","h3"));
	btnJustLeft.addEventListener("click",exec.bind(null,"justifyleft"));
	btnJustCenter.addEventListener("click",exec.bind(null,"justifycenter"));
	btnJustRight.addEventListener("click",exec.bind(null,"justifyright"));
	btnNumberedList.addEventListener("click",exec.bind(null,"insertorderedlist"));
	btnDottedList.addEventListener("click",exec.bind(null,"insertunorderedlist"));
	btnQuote.addEventListener("click",exec.bind(null,"blockquote"));
	btnAddIdent.addEventListener("click",exec.bind(null,"outdent"));
	btnDelIdent.addEventListener("click",exec.bind(null,"indent"));
	btnTable.addEventListener("click",exec.bind(null,"insertHTML","<table><thead><tr><th> </th><th> </th></tr></thead><tbody><tr><td> </td><td> </td></tr></tbody></table>"));
	btnLink.addEventListener("click",function() {
		var sLnk=prompt('Paste link here','http://');
		if( sLnk && sLnk!='' && sLnk!='http://') {exec("createlink",sLnk)}
	});
	
	this.addButton = function(text, atBegin) {
		var x = document.createElement("button");
		if (typeof text == "string") {
			x.textContent = text;			
		} else if (typeof text == "object" && text instanceof Element) {
			x.appendChild(text);
		}
			
		if (atBegin) {
			panel.insertBefore(x, panel.firstChild);
		} else {
			panel.appendChild(x);
		}
		return x;
	}
	
	this.addSeparator = function(atBegin) {
		var x = document.createTextNode(" ");
		if (atBegin) {
			panel.insertBefore(x, panel.firstChild);
		} else {
			panel.appendChild(x);
		}		
	}
	this.insertHTML = function(html) {
		exec("insertHTML", html);
		
	}
	exec("enableInlineTableEditing",true);
	exec("enableObjectResizing",true);
	exec("styleWithCSS",false);
	
}




function start() {

	window.database = new PouchDB(thisApp.databaseUrl,{"skip_setup":true});
	
	window.addEventListener("hashchange", processHashChange);
	processHashChange();
	
	
}


function processHashChange() {
	var h = location.hash;
	if (h == "" || h == "#") return;
	h = h.substr(1);
	var ench = decodeURIComponent(h);
	var options = {};
	if (ench.substr(0,5) == "edit-") {
		options.edit = true;
		ench = ench.substr(5);
	}
	loadArticle(ench,options);
	
}

function loadArticle(id,options) {	
	window.database.get(id).then(function(doc) {
		if (doc.type == "article") {
			navigateToArticle(doc,options);
		}
	}).catch(function(e) {
		if (e.status == 404 && options.edit) {
			var doc = {"_id":id, "type":"article", "title":"", "text":""};
			navigateToArticle(doc, options);			
		}
	})
}


function askLogin() {
	
	return new Promise(function(ok,error) {
		
		var el = byClass(document.body, "loginDlg");
		if (!el.hidden) {
			error({status:409,message:"already opened"});
			return;
		}
		el.hidden = false;
		var buttOk = byClass(el,"loginAction");
		var buttCancel = byClass(el,"loginCancel");
		var cancelFn = function() {
			buttOk.removeEventListener("click",loginFn);
			buttCancel.removeEventListener("click",cancelFn);
			el.hidden = true;
			error ({status:-1, message:"canceled"});
		}
		var loginFn = function() {
			
			var username = byClass(el,"loginUser").value;
			var password = byClass(el,"loginPassword").value;
			window.database.login(username,password)
				.then(function() {
					ok();
					cancelFn();
				})
				.catch(function(x) {
					alert("Přihlášení selhalo: "+ x.message);
				});
		}
		buttOk.addEventListener("click",loginFn);
		buttCancel.addEventListener("click",cancelFn);
		
		
	});
	
}

function putDoc(doc) {
	
	return window.database.put(doc)
		.catch(function(e) {
			if (e.status == 401) {				
				return askLogin().then(function() {putDoc(doc);});
			} else {
				alert("Něco se nepovedlo:" + e.message);				
			}
		});
	
	
}

function attachmentUpload(doc) {
	
	return new Promise(function(ok,error) {

		var el = byClass(document.body, "attachDlg");
		if (!el.hidden) {
			error({status:409,message:"already opened"});
			return;
		}
		el.hidden = false;
		var selector = byClass(el,"attachFiles");
		var buttCancel = byClass(el,"attachCancel");
		var cancelFn = function() {
			selector.removeEventListener("change",attachFn);
			buttCancel.removeEventListener("click",cancelFn);
			el.hidden = true;
			error ({status:-1, message:"canceled"});
		}
		var attachFn = function() {
			
			console.log(selector.files);
			if (!doc._attachments) doc._attachments = {};
			for (var i = 0; i < selector.files.length; i++) {
				var f = selector.files[i];
				doc._attachments[f.name] = {
						type: f.type,
						content_type:f.type,
						data: f
				}
			}
			ok(doc);
			cancelFn();
			
		}
		selector.addEventListener("change",attachFn);
		buttCancel.addEventListener("click",cancelFn);
		
	});
	
}

function linkToAttachment(id, name,  a) {
	if (!a || a.stub) {
		return thisApp.relativeUrl+encodeURIComponent(id)+"/"+encodeURIComponent(name);
	} else {
		return URL.createObjectURL(a.data);
	}
}

function getThumbnail(url) {
	return new Promise(function(ok,error) {
	    var img = new Image();
	    img.src = url;
	    img.onload = function () {
	
	    	URL.revokeObjectURL(url);
	    	var myCan = document.createElement('canvas');
	    	myCan.width = thisApp.thumbSize[0];
	    	myCan.height = thisApp.thumbSize[1];;
	    	var cntxt = myCan.getContext("2d");
	    	cntxt.drawImage(img, 0,0,myCan.width, myCan.height);
	    	myCan.toBlob(function(b) {
	    		ok(b);
	    	},"image/jpeg",10);
	    }
	    img.error = function() {
	    	error("failed to load image")
	    	URL.revokeObjectURL(url);
	    }
	});    
}


function updateAttachmentsEdit(doc, htmlarea) {

	var chklist = [];
	var panel = byId("attchPanel");
	if (panel.listeners) {
		byClass(panel,"selAll").removeEventListener("click",panel.listeners["selAll"]);
		byClass(panel,"delete").removeEventListener("click",panel.listeners["delete"]);
		byClass(panel,"thumb").removeEventListener("click",panel.listeners["thumb"]);
		byClass(panel,"unthumb").removeEventListener("click",panel.listeners["unthumb"]);
		byClass(panel,"addGal").removeEventListener("click",panel.listeners["addGal"]);
		byClass(panel,"delGal").removeEventListener("click",panel.listeners["delGal"]);		
	}
	if (panel.dataUrls) {
		panel.dataUrls.forEach(function(x) {
			URL.revokeObjectURL(x);
		})
	}

	
	delete panel.listeners
	delete panel.dataUrls;
	if (!doc) return;
	
	
	
	var gallery = doc.gallery;
	if (!gallery) {
		gallery = {}
	}


	var l;
	panel.dataUrls = [];
	panel.listeners = {};
	panel.listeners["selAll"] = l = function() {
		
		var any=false;
		chklist.forEach(function(x)  {
			if (!x.checked) {any=true;x.checked = true;}
		});
		if (!any) {
			chklist.forEach(function(x)  {
				x.checked = false;
			});			
		}
		
	}
	byClass(panel,"selAll").addEventListener("click",l);
	
	panel.listeners["delete"] = l = function() {
			
		chklist.forEach(function(x) {
			if (x.checked) {
				var name = x.value;
				var thumbName = "thumb_"+name;
				delete doc._attachments[name];
				if (doc._attachments[thumbName])
					delete doc._attachments[thumbName];
			}
		});
		updateAttachmentsEdit(doc, htmlarea);
			
	};
	byClass(panel,"delete").addEventListener("click",l);
	
	
	panel.listeners["thumb"] = l = function() {

			var results = [];
			var names = [];
			chklist.forEach(function(x) {
				if (x.checked) {
					var name = x.value;
				
					var u = linkToAttachment(doc._id,name,doc._attachments[name]);
					results.push(getThumbnail(u))
					names.push(name);
				}			
			})
			Promise.all(results).then(function(blobs) {
				var idx;
				for (idx = 0; idx < names.length; idx++) {
					var b = blobs[idx];
					var name = names[idx];
					doc._attachments["thumb_"+name] = {
							type:b.type,
							data:b,
							content_type:b.type
					};					
				}
				updateAttachmentsEdit(doc, htmlarea);
			});
			
			
			
	};
	byClass(panel,"thumb").addEventListener("click",l);
	
	panel.listeners["unthumb"] = l = function() {

		chklist.forEach(function(x) {
			if (x.checked) {
				var name = x.value;
				delete doc._attachments["thumb_"+name];
			}			
		})
		updateAttachmentsEdit(doc, htmlarea);
	};
	byClass(panel,"unthumb").addEventListener("click",l);
	
	
	panel.listeners["addGal"] = l = function() {
			
		chklist.forEach(function(x) {
			if (x.checked) {
				var name = x.value;
				gallery[name] = true;
			}
		})
		doc.gallery = gallery;		
		updateAttachmentsEdit(doc, htmlarea);
			
	};

	byClass(panel,"addGal").addEventListener("click",l);

	
	panel.listeners["delGal"] = l = function() {
			
		chklist.forEach(function(x) {
			if (x.checked) {
				var name = x.value;
				delete gallery[name];
			}
		});
		doc.gallery = gallery;
		updateAttachmentsEdit(doc, htmlarea);
			
	};
		
	byClass(panel,"delGal").addEventListener("click",l);

	var content = byId("attchList");
	content.innerHTML="";	
	
	for(var name in doc._attachments) {
		if (name.substr(0,6) == "thumb_") continue;
		var thumbName = "thumb_"+name;
		var a = doc._attachments[name];
		var row = document.createElement("tr");
		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");
		var cell5 = document.createElement("td");
		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		var chk = document.createElement("input");
		chk.setAttribute("type","checkbox");
		chk.setAttribute("value",name);
		cell1.appendChild(chk);		
		var nd = document.createTextNode(name);
		var aa = document.createElement("a");
		var url = linkToAttachment(doc._id,name,a)
		aa.setAttribute("href",url);
		aa.setAttribute("target","_blank");
		panel.dataUrls.push(url);
		aa.appendChild(nd);		
		var hasThumb = false;
		
		cell4.appendChild(aa);
		if (doc._attachments[thumbName]) {
			var nd = document.createElement("img");
			nd.src = linkToAttachment(doc._id,thumbName,doc._attachments[thumbName]);
			nd.onload=function() {
				URL.revokeObjectURL(nd.src);
			}
			cell3.appendChild(nd);
			hasThumb=true;
		}
		if (gallery[name]) 
			cell2.textContent="*";
		content.appendChild(row);
		chklist.push(chk);
		var linkAdd = document.createElement("button");
		linkAdd.innerHTML="Vložit odkaz";
		cell5.appendChild(linkAdd);
		linkAdd.addEventListener("click", function(id, name) {
			
			htmlarea.insertHTML("<a href=\""+linkToAttachment(id,name)+"\">"+name+"</a>");
			
		}.bind(null,doc._id, name));
		if (hasThumb) {
			var thumbAdd = document.createElement("button");
			thumbAdd.innerHTML="Vložit náhled";
			cell5.appendChild(thumbAdd);
			thumbAdd.addEventListener("click", function(id, name, thumbName) {			
				htmlarea.insertHTML("<a href=\""+linkToAttachment(id,name)+"\"><img src=\""+linkToAttachment(id,thumbName)+"\"></a>");
			}.bind(null,doc._id, name,thumbName));
		}
		if (a.content_type.substr(0,6) == "image/") {
			var imgAdd = document.createElement("button");
			imgAdd.innerHTML="Vložit obrázek";
			cell5.appendChild(imgAdd);		
			imgAdd.addEventListener("click", function(id, name) {			
				htmlarea.insertHTML("<img src=\""+linkToAttachment(id,name)+"\">");
			}.bind(null,doc._id,name));
		}
	}
	
}

function navigateToArticle(doc, options) {
	
	var artView = byId("artView");
	var artEdit = byId("artEdit")
	if (options.edit) {
		artView.hidden=true;
		artEdit.hidden=false
		var artTitleEdit = byId("artTitleEdit");
		var artTextEdit = byId("artTextEdit");
		var htmlEditor = new HtmlArea(artTextEdit);
		artTitleEdit.value = doc.title;
		htmlEditor.setContent(doc.text);
		htmlEditor.addSeparator(true);
		var img = document.createElement("img");
		img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAWCAYAAABnnAr9AAABl0lEQVRYw+3Wv0pcQRTH8Q8I+gQG"
				+"oqjEwjyBIj6ACCHBOiRdkkItAmIhpIjv4CNoI0RfQyzFSkESiCERTGe0MNk0Z0Hk3rt7/+y6xfzg"
				+"wIUzM3fmy5zfGZKSkpKSHkv7WI/vDXwZhE3tRXSjVskxrYp7GsMl3uEXnlbYR+OQWgMICj7E/Pc9"
				+"/EdPIPUbVJN76iukJkC9xCGuIw7xImN+Xjxct2jMo0GqC2oeV3iNUTzBG/zGbIc113Hcz1tbB1Jd"
				+"UAdYyRi/1qGrvcV5GHxlUGU6Vl1IdUF9w0TG+El8zVlrCT8wU9cHuz18E5DgH4YK8kP4m3OIW4xk"
				+"zBmJ3EPN4WdOWVYqvU4QmoIk3jSTBfmpOFyZGzWRcaOex01abLqz5sFoEhLsYrMg/wk7JT1qNV7i"
				+"9x+b52H63ZT3DYarwtrrASSYxnd8Dt8YjpjBFi7wLOdAC9Hh2l1vNL6voszaOsbHEj54guUOlpAL"
				+"q9UDSG2NYxtn4S238b0duSLzX8YR/kQc4VWNd1Tb8E9x11QZJiUlJSUNmP4D6P+ls6KoJwsAAAAA"
				"SUVORK5CYII=";
		var saveButt = htmlEditor.addButton(img,true);
		saveButt.addEventListener("click",function() {
		
			doc.title = artTitleEdit.value;
			doc.text = htmlEditor.getContent();
			doc.modified = (new Date().toJSON());
			if (!doc.created) {
				doc.created = doc.modified;
			}
			console.log(doc);			
			putDoc(doc).then(function() {				
				location.hash='#'+encodeURIComponent(doc._id);
				
			});
			
		});
		var attachButt = htmlEditor.addButton("Přidat přílohy");
		attachButt.addEventListener("click",function() {			
			attachmentUpload(doc).then(function(doc) {
				updateAttachmentsEdit(doc, htmlEditor);
			})
			
		});
		
		window.database.getSession().then(function(x) {
			doc.author= x.userCtx.name;
		});
		
		updateAttachmentsEdit(doc,htmlEditor);
		
		


	} else {
		updateAttachmentsEdit(null);
		artView.hidden=false;
		artEdit.hidden= true;
		
		var artTitle = byId("artTitle");
		var artText = byId("artText");
		var artAuthor = byId("artAuthor");
		var artDatetimeCreated = byId("artDatetimeCreated");
		var artDatetimeUpdated = byId("artDatetimeUpdated");
		
		artTitle.textContent = doc.title;
		artText.innerHTML = doc.text;
		artAuthor.textContent = doc.author;
		artDatetimeCreated.textContent = (new Date(doc.created)).toLocaleString();
		artDatetimeUpdated.textContent = (new Date(doc.modified)).toLocaleString();
		
		var editButt = byId("buttGoEdit");
		editButt.onclick = function() {
			location.hash='#edit-'+encodeURIComponent(doc._id);
		}
		var newButt = byId("buttGoNew");
		newButt.onclick = function() {
			var d = "a."+Date.now();
			location.hash='#edit-'+encodeURIComponent(d);
		}

	}
}