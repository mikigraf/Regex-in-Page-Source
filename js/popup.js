var result;
chrome.extension.onMessage.addListener(function(request, sender) {
        if(request.action == "getSource"){
            var source = request.source;
            var regex = new RegExp(document.getElementById("regex").value,"g");
            var matchArray = source.match(regex,"g");
            message.innerText = result = matchArray.join("\n \n");
        }
});

function ifPageLoaded(){
    var regexInput = document.getElementById("regex").value;
    var regex = new RegExp(regexInput);
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
        file: "/js/miner.js"
    }, function(){
        if(chrome.extension.lastError){
            message.innerText = "Error \n" + chrome.extension.lastError.message;
        }
    });
};

document.getElementById('execute').addEventListener('click', ifPageLoaded);