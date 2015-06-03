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
        //todo update
     //   chrome.notifications.update();
        result = message.innerText + (matchArray.join("\n \n"));
        localStorage.setItem("results", result);
    }
    if(request.action == "returnLast"){
        message.innerText = "last Item";
    }
    if(request.action == "clear"){
        message.innerText = source;
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

function append(){
    var regexInput = document.getElementById("regex").value;
    var regex = new RegExp(regexInput);
    //var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
        file: "/js/append.js"
    }, function(){
        if(chrome.extension.lastError){
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    });
};

function lastResults(){
    chrom.tabs.executeScript(null, {
        file: "/js/lastResults.js"}, function(){
        if(chrome.extension.lastError) {
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    })

};

function clearField(){
    chrom.tabs.executeScript(null, {
        file: "/js/clear.js"}, function(){
        if(chrome.extension.lastError) {
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    })
};

function creationCallback(notID) {
    console.log("Succesfully created " + notID + " notification");
    if (document.getElementById("clear").checked) {
        setTimeout(function() {
            chrome.notifications.clear(notID, function(wasCleared) {
                console.log("Notification " + notID + " cleared: " + wasCleared);
            });
        }, 3000);
    }
};


document.getElementById('regex').value = localStorage.getItem('regex');
document.getElementById('execute').addEventListener('click', ifPageLoaded);
document.getElementById('append').addEventListener('click', append);
document.getElementById('last').addEventListener('click', lastResults);
document.getElementById('clearButton').addEventListener('click', clearField);



