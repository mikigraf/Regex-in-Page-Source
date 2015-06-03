var result;
var message = document.querySelector('#message');
var url;
chrome.extension.onMessage.addListener(function(request, sender) {
    chrome.tabs.getSelected(null,function(tab) {
        url = tab.url;
    });
    //todo params
    //var notification = chrome.notifications.create(//params);

    var source = request.source;
    var regex = new RegExp(document.getElementById("regex").value,"g");
    var matchArray = source.match(regex,"g");
    localStorage.setItem('regex', document.getElementById("regex").value);

    if(request.action == "getSource"){
        localStorage.removeItem("results");
        //todo update
    //    chrome.notifications.update();
        message.innerText = result = matchArray.join("\n \n");
        if(url != null){
            //show notification
        }
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
        message.innerText = "CLEARED";
        localStorage.removeItem("results");
    }

});

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
}

function lastResults(){
    chrom.tabs.executeScript(null, {
        file: "/js/lastResults.js"}, function(){
        if(chrome.extension.lastError) {
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    })

}

function clearField(){
    chrom.tabs.executeScript(null, {
        file: "/js/clear.js"}, function(){
        if(chrome.extension.lastError) {
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    })
}

document.getElementById('regex').value = localStorage.getItem('regex');
document.getElementById('execute').addEventListener('click', ifPageLoaded);
document.getElementById('append').addEventListener('click', append);
document.getElementById('last').addEventListener('click', lastResults);
document.getElementById('clear').addEventListener('click', clearField);


