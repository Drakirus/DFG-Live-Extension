// Init
var ClientNotified = false;

// Stream Data
var channel = "drfeelgood";
var title_data = "DFG est en ligne !";
var channel_light = "DFG";
var client_id = "3evl4ykxvl1l43tmmmfcs96uhrcw0dh"

function callback() {
  var xhr_object = new XMLHttpRequest();
  xhr_object.onreadystatechange = function(){
    if (xhr_object.readyState==4 && xhr_object.status==200){
      var data = JSON.parse(xhr_object.responseText);
      if(data.stream != null ){ // channel is Online
        if (ClientNotified == false) {
          notify(data.stream.channel.status);
          toogleStream(true);
        }
      }else if (ClientNotified){ // Not Online but ClientNotified (Stream ON) == true
        toogleStream(false);
      }
    }
  }

  var url = "https://api.twitch.tv/kraken/streams/" + channel + "?client_id=" + client_id;
  xhr_object.open("GET", url, true);
  xhr_object.send();
}

function notify(streamTitle) {
  chrome.notifications.create(channel /*ID Notif*/, {
    type: "basic",
    iconUrl: "icons/logo256.png",
    title: title_data,
    message: streamTitle,
  },function(id) {});
}

function toogleStream(value) {
  ClientNotified = value;
  if (value == true) {
    chrome.browserAction.setTitle({title : channel_light + " - Online"});
    chrome.browserAction.setIcon({path:"icon_ONLINE.png"});
  }else{
    chrome.browserAction.setTitle({title : channel_light + " - Offline"});
    chrome.browserAction.setIcon({path:"icon_OFFLINE.png"});
  }
}

chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({ url:"https://www.twitch.tv/" + channel});
});

setInterval(callback,60000);
toogleStream(false);
callback();
