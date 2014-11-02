chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
  	var Selection="";
  	var fontSize=0;
  	var finalText="";
    if(msg.message == "sentSelection"){
    	Selection=window.getSelection().toString();
    	
    	var target = findByText(document,Selection);
     	
    	fontSize = getStyle(target.parentNode,'font-size');
    	
    	finalText = findByStyle(fontSize);
    	
    	port.postMessage({message: "gotText", finText: finalText});
    }
    
  });
});

function findByText(node, text) {
	if(node.nodeValue != null){
    if(node.nodeValue.indexOf(text) != -1) {
        return node;
    }
   }
   
    for (var i = 0; i < node.childNodes.length; i++) {
        var returnValue = findByText(node.childNodes[i], text);
        if (returnValue != null) {
            return returnValue;
        }
    }

    return null;
}

function findByStyle(fontsize) {

	var leaves = getLeaveNodes();
	var totaltext="";
	for(var i=0;i<leaves.length;i++)
	{
		if(getStyle(leaves[i],'font-size') == fontsize && leaves[i].nodeName == "P" && leaves[i].innerHTML != "")
		{
			totaltext = totaltext + "<br>" + leaves[i].innerHTML ;
		}
	}
	return totaltext;
}

function getLeaveNodes(){
	var leaves = new Array();
	var els = document.body.getElementsByTagName("*");
	for (var i = 0; i < els.length; i++) {
    	if (els[i].children.length == 0) {
        	leaves.push(els[i]);
    	}
    }
    return leaves;
}

function getStyle(el,styleProp)
{
	var x = el;
	if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}