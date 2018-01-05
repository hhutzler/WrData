"use strict";
  
/* Allow certain variables to be shadowed  */
/* eslint no-shadow: ["error", { "allow": ["libName","funcName"] }] */

/* exported GenLibPV */
function GenLibPV() {               // Our Global Library Implementation 
    var libName = "genLibPV.js";
    var message = "Library not yet initialized !";
    var displayDiv = "";
        
        /* Get eslint Warning because of Modifying Numbe Datatype 
        *  173:1  error  Number prototype is read only, properties should not be added  no-extend-native
        */
    Number.prototype.pad = function(size) {
        var s = String(this);
        var defSize = 2;
        while ( s.length < (size || defSize)) { 
            s = "0" + s; 
        }
        return s;
    };
    
    function printStatus() {
        var funcName = "printStatus()";
        logJSInfo(libName, funcName, message);
        }
    
    function init(dDiv) { 
        var funcName = "init()";
        displayDiv = dDiv;
        message = "Init DisplayDiv: " + displayDiv + " OK !";
        logJSInfo(libName, funcName , message);
    }
        
        /* Allow up to 4 parameter to keep eslint happy - Note: the forth parameter is optional  */
        /* eslint max-params: [error, 4] */
    function logJSInfo(libName, funcName, jsIf, err) {
        var color = "blue";
        var jsInfo = "[" + libName+ "][" + funcName + "] " + jsIf;
        var jsInfoLog = "["  + getTime2() + "]"  + jsInfo;
        var logElem =  document.getElementById(displayDiv);
        if (logElem) {
            var logBuffer = logElem.innerHTML;
            if (err === true) {
                jsInfoLog =  "["  + getTime2() + "][ERROR]" + jsInfo;
                color = "red";
            }
            logElem.innerHTML=logBuffer + "<pre> <span style=color:" + color + ">" + jsInfoLog + " </span> </pre>";
            logElem.scrollTop = logElem.scrollHeight;
        } else {
            console.log("----> LOGGER ERROR : could not open displayDiv: " + displayDiv);
            }
        console.log(jsInfo); 	   
    }
        
    function getTime2() {
        var defSize = 2;
        var msSize = 3;
        var today = new Date();
        var h = today.getHours().pad(defSize);
        var m = today.getMinutes().pad(defSize);
        var s = today.getSeconds().pad(defSize);
        var ms = today.getMilliseconds().pad(msSize);
        return h + ":" + m + ":" + s + "." + ms;
    }
        
    return {
        printStatus: printStatus,
        init: init,
        logJSInfo: logJSInfo
    };   
}


