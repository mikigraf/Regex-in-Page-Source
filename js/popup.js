var result;
var message = document.querySelector('#message');
var url;
var notID = 0;
chrome.extension.onMessage.addListener(function(request, sender) {
    chrome.tabs.getSelected(null,function(tab) {
        url = tab.url;
    });

    var regexAsString = document.getElementById("regex").value;
    var source = request.source;
    var regex = new RegExp(regexAsString,"gm");
    var matchArray = source.match(regex, "g");
    localStorage.setItem('regex', document.getElementById("regex").value);

    if(request.action == "getSource"){
        localStorage.removeItem("results");
        message.innerText = result = matchArray.join("\n \n");
        //logRegex(regexAsString);
        message.innerText = JSON.stringify(connectToApi(regex,regex));
        localStorage.setItem("results", result);
    }
    if(request.action == "append"){
        localStorage.removeItem("results");
        message.innerText = result = matchArray.join("\n \n");
        //logRegex(regexAsString);
        message.innerText = JSON.stringify(connectToApi(regex,regex));
        localStorage.setItem("results", result);
    }
    if(request.action == "lastResultst"){
        localStorage.removeItem("results");
        message.innerText = result = matchArray.join("\n \n");
        //logRegex(regexAsString);
        message.innerText = JSON.stringify(connectToApi(regex,regex));
        localStorage.setItem("results", result);
    }
    if(request.action == "clearButton"){
        localStorage.removeItem("results");
    }

});

function connectToApi(params, regex){
    var xhr = new XMLHttpRequest();
    var resp;
    xhr.open("POST", "http://127.0.0.1:8083/?params=" + params + "?regex=" + regex, false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            resp = xhr.responseText;
        }
    };
    xhr.send(params);
    return resp;
}

function ifPageLoaded(){
    var regexInput = document.getElementById("regex").value;
    var regex = new RegExp(regexInput);
   // var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
        file: "/js/miner.js"
    }, function(){
        if(chrome.extension.lastError){
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    });
};


document.getElementById('regex').value = localStorage.getItem('regex');
document.getElementById('execute').addEventListener('click', ifPageLoaded);
document.getElementById('append').addEventListener('click', ifPageLoaded);
document.getElementById('lastResults').addEventListener('click', ifPageLoaded);
document.getElementById('clearButton').addEventListener('click', ifPageLoaded);


