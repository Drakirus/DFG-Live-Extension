var stream_url = "https://www.twitch.tv/drfeelgood";

document.addEventListener("DOMContentLoaded", function(event) {
  chrome.browserAction.getTitle({}, function(title){

    if (title == "DFG - Online") {
      document.getElementById("ONLINE").innerHTML = `
        <div class='online'>DFG est en LIVE Go!</Div>`;
    }
    else {
      document.getElementById("ONLINE").innerHTML = "";
    }

  });

  var openStream = document.getElementById('ONLINE');
  if (openStream){
    openStream.addEventListener('click', openLink = function() {
      chrome.tabs.create({
        url: stream_url
      });
    }, false);
  }

  var calendar = document.getElementById('calendar');
  if (calendar){
    calendar.addEventListener('click', openCal = function() {
      chrome.tabs.create({
        url: chrome.extension.getURL('dialog.html'),
        active: false
      }, function(tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true
        });
      });
    }, false);
  }

  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    (function () {
      var ln = links[i];
      var location = ln.href;
      ln.onclick = function () {
        chrome.tabs.create({active: true, url: location});
      };
    })();
  }
});
