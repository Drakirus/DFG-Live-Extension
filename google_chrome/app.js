var stream_url = "https://www.twitch.tv/drfeelgood";

var github_url = "https://api.github.com/repos/Drakirus/DFG-Live-Extension/commits"
var github_login = "drfeelgood75"
// var github_login = "Drakirus"

Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

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

  // Is Github calendar updade
  var xhr_object = new XMLHttpRequest();
  xhr_object.onreadystatechange = function(){
    if (xhr_object.readyState==4 && xhr_object.status==200){
      var data = JSON.parse(xhr_object.responseText);
      var i = 0;
      while (data[i].author.login != github_login){
        i++;
      }
      console.log(data[i]);
      var commitDate = new Date(data[i].commit.author.date).addDays(7); // + one week
      console.log(commitDate);
      console.log(new Date());
      if (commitDate < new Date()) {
        // Si commit est client et que la date est de 1 week
        console.log("Hide Calendar");
        document.getElementById("calendar").style.display = 'none';
      }
    }
  }
  var url = github_url;
  xhr_object.open("GET", url, true);
  xhr_object.send();

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
}); // END DOMContentLoaded
