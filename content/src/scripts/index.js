"use strict";

function pickWatchElement(e){
    
    e.preventDefault();
    if(e.target){
        let posX = e.clientX;
        let posY = e.clientY;
        let insertDocument = document.createElement("div");

        e.target.classList.remove("hoverTrack");
        e.target.classList.add("clickTrack");
        insertDocument.innerHTML = "<button id='btn-track'>Insert</button>"
        document.documentElement.append(insertDocument);

        document.removeEventListener("mouseover", hoverWatchElement);
        document.removeEventListener("click", pickWatchElement);
        document.getElementById("btn-track").addEventListener("click", function(){

            chrome.runtime.sendMessage({
                from: 'content',
                content: document.all[0].outerHTML
            });

          
            // Send message to background watch.js
            // if(e.target.id){

            //     // Select element with ID
            //     // Send message to background
    
                
    
            //     chrome.runtime.sendMessage({
            //         from: 'content',
            //         subject: 'pickedElementID',
            //         content: {id: e.target.id},
            //         pos: {posX: posX, posY: posY}
            //     });
            // }else if(e.target.className != "clickTrack"){
                
            //     console.log('e.target.className', e.target.className);
            //     // Select element with className
            //     // and className index
    
            //     var classNames = e.target.className;
            //     var classNameList = "";
    
            //     console.log("e.target.className", e.target.className);
            //     classNames.split(" ").forEach(function(className){
    
            //         if(className != "clickTrack"){
                       
            //             console.log('className', className);
            //             classNameList = classNameList.concat('.');
            //             classNameList = classNameList.concat(className);
            //         }
            //     });
            //     var classElems = document.querySelectorAll(classNameList);
            //     console.log('classElems', classElems);
    
            //     [].forEach.call(classElems, function(classElem, classIndex) {
    
            //         if(classElem.className.includes("clickTrack")){
                        
            //            console.log('classNameexist');

            //            e.target.classList.remove("clickTrack");
            //            console.log('classNameList',classNameList);
            //            console.log('classIndex', classIndex);

            //             // Send message to background watch.js
            //             chrome.runtime.sendMessage({
            //                 from: 'content',
            //                 subject: 'pickedElementClassName',
            //                 content: {classNameList: classNameList, classIndex: classIndex},
            //                 pos: {posX: posX, posY: posY}
            //             });
            //         }
            //     });               
            // }else{
    
            //     // Select first parent element with className and its index 
            //     // and select element with tagName and its index
    
            //     var selectedElement = e.target;
            //     var tagName = e.target.tagName;
            //     selectedElement = selectedElement.parentElement;
            //     do{
            //         selectedElement = selectedElement.parentElement;
            //         //e.target.classList.remove("addBorder");
            //         if(selectedElement.className != ""){
            //             selectedElement.classList.add("clickTrackClass");
            //             var classNames = selectedElement.className;
            //             var classNameList = "";
    
            //             console.log("e.target.className", selectedElement.className);
            //             classNames.split(" ").forEach(function(className){
    
            //                 if(className != "clickTrackClass"){
            //                     console.log('className', className);
            //                     classNameList = classNameList.concat('.');
            //                     classNameList = classNameList.concat(className);
            //                 }
            //             });
            //             console.log('classNameList', classNameList);
            //             var classElems = document.querySelectorAll(classNameList);
    
            //             [].forEach.call(classElems, function(classElem, classIndex) {
                            
            //                 if(classElem.className.includes("clickTrackClass")){
    
            //                     classElem.classList.remove("clickTrackClass");
            //                     var tagElems = document.querySelectorAll(classNameList)[classIndex].getElementsByTagName(tagName);
                                
            //                     [].forEach.call(tagElems, function(tagElem, tagIndex) {
            //                         if(tagElem.className.includes("clickTrack")){
                                        
            //                             console.log('tagNameexist')
    
            //                             e.target.classList.remove("clickTrack");
                                        
            //                             chrome.runtime.sendMessage({
            //                                 from: 'content',
            //                                 subject: 'pickedElementTagName',
            //                                 content: {
            //                                     classNameList: classNameList, 
            //                                     classIndex: classIndex, 
            //                                     tagName: tagName, 
            //                                     tagIndex: tagIndex
            //                                 },
            //                                 pos: {posX: posX, posY: posY}
            //                             })
            //                         }                                        
            //                     });
            //                 }
            //             });   
            //         }               
            //     } while( selectedElement.className == "")
            // }
        
        });

        // if(e.target.id){

        //     // Select element with ID
        //     // Send message to background

        //     document.removeEventListener("click", pickWatchElement);
        //     document.removeEventListener("mouseover", hoverWatchElement);

        //     chrome.runtime.sendMessage({
        //         from: 'content',
        //         subject: 'pickedElementID',
        //         content: {id: e.target.id},
        //         pos: {posX: posX, posY: posY}
        //     });
        // }else if(e.target.className != "addBorder"){

        //     // Select element with className
        //     // and className index

        //     var classNames = e.target.className;
        //     var classNameList = "";

        //     console.log("e.target.className", e.target.className);
        //     classNames.split(" ").forEach(function(className){

        //         if(className != "addBorder"){
        //             document.removeEventListener("click", pickWatchElement, false);
        //             document.removeEventListener("hover", hoverWatchElement, false);

        //             console.log('className', className);
        //             classNameList = classNameList.concat('.');
        //             classNameList = classNameList.concat(className);
        //         }
        //     });
        //     var classElems = document.querySelectorAll(classNameList);

        //     [].forEach.call(classElems, function(classElem, classIndex) {

        //         if(classElem.className.includes("addBorder")){
                    
        //             document.removeEventListener("click", pickWatchElement);
        //             document.removeEventListener("mouseover", hoverWatchElement);

        //             // Send message to background watch.js
        //             chrome.runtime.sendMessage({
        //                 from: 'content',
        //                 subject: 'pickedElementClassName',
        //                 content: {classNameList: classNameList, classIndex: classIndex},
        //                 pos: {posX: posX, posY: posY}
        //             });
        //         }
        //     });               
        // }else{

        //     // Select first parent element with className and its index 
        //     // and select element with tagName and its index

        //     var selectedElement = e.target;
        //     var tagName = e.target.tagName;
        //     selectedElement = selectedElement.parentElement;
        //     do{
        //         selectedElement = selectedElement.parentElement;
        //         //e.target.classList.remove("addBorder");
        //         if(selectedElement.className != ""){
        //             selectedElement.classList.add("addBorderClass");
        //             var classNames = selectedElement.className;
        //             var classNameList = "";

        //             console.log("e.target.className", selectedElement.className);
        //             classNames.split(" ").forEach(function(className){

        //                 if(className != "addBorderClass"){
        //                     console.log('className', className);
        //                     classNameList = classNameList.concat('.');
        //                     classNameList = classNameList.concat(className);
        //                 }
        //             });
        //             console.log('classNameList', classNameList);
        //             var classElems = document.querySelectorAll(classNameList);

        //             [].forEach.call(classElems, function(classElem, classIndex) {
                        
        //                 if(classElem.className.includes("addBorderClass")){

        //                     classElem.classList.remove("addBorderClass");
        //                     var tagElems = document.querySelectorAll(classNameList)[classIndex].getElementsByTagName(tagName);
                            
        //                     [].forEach.call(tagElems, function(tagElem, tagIndex) {
        //                         if(tagElem.className.includes("addBorder")){
                                    
        //                             document.removeEventListener("click", pickWatchElement);
        //                             document.removeEventListener("mouseover", hoverWatchElement);

        //                             chrome.runtime.sendMessage({
        //                                 from: 'content',
        //                                 subject: 'pickedElementTagName',
        //                                 content: {
        //                                     classNameList: classNameList, 
        //                                     classIndex: classIndex, 
        //                                     tagName: tagName, 
        //                                     tagIndex: tagIndex
        //                                 },
        //                                 pos: {posX: posX, posY: posY}
        //                             })
        //                         }                                        
        //                     });
        //                 }
        //             });   
        //         }               
        //     } while( selectedElement.className == "")
        // }             
    }
}

function hoverWatchElement(e){
    if(e.target){   
        var elems = document.querySelectorAll(".hoverTrack");
        [].forEach.call(elems, function(el) {

            el.classList.remove("hoverTrack");
        });

        e.target.classList.add("hoverTrack");
    }
}


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
   
    // If the received message popup click event for watchlist

    if (msg.text === 'watchList') {

        // Call the specified callback, passing
        // when pick element

        document.addEventListener("click", pickWatchElement);

        // when hover event
        document.addEventListener("mouseover", hoverWatchElement);
    }
});