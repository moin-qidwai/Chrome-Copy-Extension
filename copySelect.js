/**
 * Created by Moin Qidwai on 3/7/14.
 */

function onClickHandler() {
    return function(info, tab) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        	 var port = chrome.tabs.connect(tabs[0].id);
        	 port.postMessage({message: "sentSelection"});
        	 
        	 port.onMessage.addListener(function getResp(response) {
        	 		if(response.message == "gotText")
        	 		{
        	 			copyToClipboard(response.finText);
        	 		}
        	 });
        	 
        });
    };
};

function copyToClipboard( text ){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}


chrome.contextMenus.create({
    "title": "Copy this type text",
    "id": "Selected",
    "contexts":["all"],
    "onclick" : onClickHandler()
});

