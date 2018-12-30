import { environment } from '../../../config/environment';


"use strict";

let watchList = [];
let timer = function(index) {

  let tabUrl = watchList[index].tabUrl;
  //let subject = watchList[index].subject;
  let content = watchList[index].content;
  //let lastStatus = watchList[index].lastStatus.selectedDom;
  
  let httpRequest = makeHttpObject();
  httpRequest.open("GET", tabUrl, true);
  httpRequest.send(null);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4){

      let response = httpRequest.response;
      document.documentElement.innerHTML = response;
      let currentBody = document.getElementsByTagName("BODY")[0];

      console.log('currentBody', currentBody);
      console.log('content', content);

      let domTracker = new diffDOM();
      let diffArray = domTracker.diff(currentBody, content);
      console.log('diffArray', diffArray);
      let reverseArray = [];
      for(var diffNode of diffArray) {
        if(diffNode.action == "addAttribute"){
          if(diffNode.name == "targettrack"){
            reverseArray.push(diffNode);
            break;
          }
        }
      }
      console.log('reverseArray', reverseArray);

      domTracker.apply(currentBody, reverseArray);
      
      console.log('diff',currentBody.querySelector('[targetTrack="true"]').innerHTML);

      html2canvas(currentBody.querySelector('[targetTrack="true"]')).then(canvas => {
        let img =  canvas.toDataURL();
      });
      

      // targetPixelCompare(index);

      // if(subject == "pickedElementID"){

      //   let currentOne = document.getElementById(content.id).innerHTML;
      //   if(currentOne === lastStatus){
      //     console.log("Same");
      //   }else{
      //     console.log("Different");
      //     watchList[index].lastStatus.selectedDom = currentOne;
      //     createNotification(tabUrl);
      //   }
      // }else if(subject == "pickedElementClassName"){

      //   console.log('document.documentElement', document.querySelectorAll(content.classNameList)[content.classIndex].innerHTML);


      //   let currentOne =  document.querySelectorAll(content.classNameList)[content.classIndex].innerHTML;
      //   //let lastDocumentElement = watchList[index].lastStatus.documentElement;

      //   //let dd = new diffDOM();
      //   //console.log('dff', dd.diff(lastDocumentElement, document.documentElement));

      //   if(currentOne === lastStatus){
      //     console.log("Same");
      //   }else{
      //     console.log("Different");
      //     watchList[index].lastStatus.selectedDom = currentOne;
      //     //watchList[index].lastStatus.documentElement =  document.documentElement;
      //     createNotification(tabUrl);
      //   }
      // }else if(subject == "pickedElementTagName"){

      //   console.log('document.documentElement', document.querySelectorAll(content.classNameList)[content.classIndex].getElementsByTagName(content.tagName)[content.tagIndex].innerHTML);
      //   let currentOne =  document.querySelectorAll(content.classNameList)[content.classIndex].getElementsByTagName(content.tagName)[content.tagIndex].innerHTML;
      //   //let lastDocumentElement = watchList[index].lastStatus.documentElement;

      //   //let dd = new diffDOM();
      //   //console.log('dff', dd.diff(lastDocumentElement, document.documentElement));

      //   if(currentOne === lastStatus){
      //     console.log("Same");
      //   }else{
      //     console.log("Different");
      //     watchList[index].lastStatus.selectedDom = currentOne;
      //     //watchList[index].lastStatus.documentElement =  document.documentElement;
      //     createNotification(tabUrl);
      //   }
      // } 
   }  
  };
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {

    // send a message specifying a callback too
    console.log('1, tab.id',tab.id);
    console.log('2, tab.url', tab.url);
    let tabUrl = tab.url;

    let watch = {
      tabUrl: tabUrl,
      content: {},
      subject: "",
      pos: {},
      lastStatus: {
        document: {},
        selectedDom: ""
      }
      
    };
    watchList.push(watch);
    chrome.tabs.sendMessage(tab.id, {text: 'watchList'}, function(){});
});


chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.from == "content"){

    console.log('request.content', request.content);
    // let index = watchList.length-1;

    // watchList[index].content = request.content;
    // watchList[index].subject = request.subject;
    // watchList[index].pos = request.pos;

    // initialWatchThread(index);
    // setInterval(function(){
    //   timer(index);
    // },10000);
  }
});

function initialWatchThread(index){

  let tabUrl = watchList[index].tabUrl;
  let subject = watchList[index].subject;
  let content = watchList[index].content;

  let httpRequest = makeHttpObject();

  console.log(tabUrl,'watchList[index].tabUrl')

  httpRequest.open("GET", tabUrl, true);
  httpRequest.send(null);
  httpRequest.onreadystatechange = function() {

    if (httpRequest.readyState == 4){
     
      let response = httpRequest.response;
      document.documentElement.innerHTML = response;

      if(subject == "pickedElementID"){

        console.log('document.getElementById(content.id)',document.getElementById(content.id));
        document.getElementById(content.id).setAttribute("targetTrack", true);
        
      }else if(subject == "pickedElementClassName"){
    
        html2canvas(currentBody.querySelector('[targetTrack="true"]')).then(canvas => {
          
          let img =  canvas.toDataURL();
        });
    

        document.querySelectorAll(content.classNameList)[content.classIndex].setAttribute("targetTrack", true);
       
      }else if(subject == "pickedElementTagName"){
    
        console.log('document.documentElement', document.querySelectorAll(content.classNameList)[content.classIndex].getElementsByTagName(content.tagName)[content.tagIndex].innerHTML);
        
        document.querySelectorAll(content.classNameList)[content.classIndex].getElementsByTagName(content.tagName)[content.tagIndex].setAttribute("targetTrack", true);
      }

  
      watchList[index].content = document.getElementsByTagName("BODY")[0];

    }
  }
}
function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}


function createNotification(tabUrl) {
  var opt = {type: "basic", title: "Watch", message: "Element Changed", icon: "pop.ico"};

  var notification = new Notification("notification", opt);
  notification.onclick = function(event) {
    console.log(encodeURI(tabUrl));
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    // chrome.tabCapture.captureOffscreenTab(tabUrl,  {
    //   audio: true,
    //   video: true
    // }, function (stream) {
    //   console.log(stream);
    //   console.log(chrome.runtime.lastError);
    // });
    var newURL = environment.urlbox.api_url + environment.urlbox.api_key + "/png?url=" +  encodeURIComponent(tabUrl) + "&thumb_width=1200&ttl=86400";
    chrome.tabs.create({ url: newURL });
  }

  setTimeout(notification.close.bind(notification), 15000);
}

// function targetPixelCompare(index){

//   const api_key = environment.urlbox.api_key;
//   const api_secret = environment.urlbox.api_secret;
//   // Get your API key and secret from urlbox.io
//   const urlbox = Urlbox(api_key, api_secret);
  
//   // See all urlbox screenshot options at urlbox.io/docs
//   const options = {
//     url: watchList[index].tabUrl,
//     thumb_width: 600,
//     format: 'jpg',
//     selector: '#ij0',
//     quality: 80,
//   }
  
//   const imgUrl = urlbox.buildUrl(options);
//   console.log(imgUrl);
// }
