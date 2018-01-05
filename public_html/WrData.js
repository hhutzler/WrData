"use strict";

/* Just ignore eslint error:    1:1  error  Strict mode is not permitted strict
   Allow certain variables to be shadowed  */
/* eslint no-shadow: ["error", { "allow": ["libName","funcName"] }] */

var genLibPV  = null;       // Global Library Handle
var wrController = null;    // Global Controller Handle
var svgButton = null;       // Our global Reference to the svgButton Prototype object
                            // Global Prototypes Allows us to check for correct types ....  
var libName = "WrData.js"; 
/* global jQuery, GenLibPV */    // Just to Keep eslint happy !
 jQuery(document).ready(function() {
    var funcName = "jQuery.ready()";
    console.log( funcName + " --> Document Ready Message from jQuery for libWRdata.js !");
     
    genLibPV = new GenLibPV();
    genLibPV.init("displayDiv");
    genLibPV.logJSInfo(libName, funcName, " --> Document Ready Message from jQuery !");
    genLibPV.printStatus();
    startWRData();
});

/* Exported comment -> To keep ESlint happy */
/* exported loadSVGButton */  
function startWRData() {
    var funcName="startWRData()"; 
    var nextButton = null;
    var prevButton = null;
    var protoObj = null;
    try {
	genLibPV.logJSInfo(libName, funcName,"Enter Function: " + funcName ); 
        wrController = createController();
        wrController.getDetails();
        var buttonArr = createButtons();           // return an button array
        genLibPV.logJSInfo(libName, funcName, "Rerturned Button Array Length: " + buttonArr.length  );
        console.dir(buttonArr);         // Dump the Object to the JS console log 
        
        buttonArr.forEach(function(b) {
            // console.dir(buttonObj);         // Dump the Object to the JS console log 
            var button = b.buttonObj;
            // protoObj = wrController;
            switch(button.objectName){
                case "NextSVGButton":
                case "PrevSVGButton":                      
                    // var isProto = svgButton.isPrototypeOf(button);  Do we get returned  the right svgButton prototype ?
                    var isPrototypeOfsvgButton = Object.prototype.isPrototypeOf.call(svgButton , button);
                    if (isPrototypeOfsvgButton) {
                        genLibPV.logJSInfo(libName, funcName,"loadSVGButton()", " -------> Prototype Check OK "  );               
                        // logJSInfo("loadSVGButton() - found Prototype:  ", Object.getPrototypeOf(button) );
                        if (button.objectName === "NextSVGButton") {
                            nextButton = button; 
                        } else if (button.objectName === "PrevSVGButton") {
                            prevButton = button;
                        } else {
                            throw "ButtonName Not Handled Yet: " + button.objectName; 
                        }                            
                   } else {
                        genLibPV.logJSInfo(libName, funcName, " -------> Dumping Failed Object to JS Console ", true  );
                        console.dir(protoObj );
                        throw "Invalid Object Instance: Expected Prototype should be svgButton !";
                    }
                    break;
                default:
                    throw "Invalid ButtonName: " + button.objectName;
            } 
        });
        nextButton.onButtonClick();
        prevButton.onButtonClick();
        
    } catch (e) { 
	genLibPV.logJSInfo(libName, funcName, "[Exception] " + e, true);
	throw e;   
	}
}

function createController() {
    var funcName = "createController()";
    var wrc = null;
    var WRController = Object.create(null);  // this is an empty object, like {}
    WRController.prototype = {
    getDetails:  function() {
       genLibPV.logJSInfo(libName, funcName, "WRController.prototype", "getDetails()::  - objectName: " + this.objectName );
       }
    };

    /* Object.create()
     *      1.st Parameter : The first argument is the prototype to be extended
     *      2.nd Parameter : The second optional argument is an object containing the object's property descriptors.
     */
    wrc = Object.create(WRController.prototype, 
    {   
        // value properties
        objectName:    { writable: true, configurable:true, value: "wrController" }
    });
    return wrc;
  }


function createButtons() { 
    var funcName = "createButtons()";
    var buttonArray = [];   
    var nextButton = null;
    var prevButton = null;
    var isActive = false;
    var SVGButton = null; 

    SVGButton = Object.create(null);  // this is an empty object, like {}
    SVGButton.prototype = {
        getDetails:  function() {
            genLibPV.logJSInfo(libName, funcName, "SVGButton.prototype", "getDetails():: ObjectName: " + this.objectName +
                     "  - isActive: " + this.isActive );
            },
        getButtonStatus: function() {
                return this.isActive;
                }
        };

    /* Object.create()
     *      1.st Parameter : The first argument is the prototype to be extended
     *      2.nd Parameter : The second optional argument is an object containing the object's property descriptors.
     */
    svgButton = Object.create(SVGButton.prototype, 
        {   
        // value properties
            isActive:    { writable: true, configurable:true, value: false },
            objectName:  { writable: true, configurable:true, value: "" },
            buttonId:    { writable: true, configurable:true, value: "" },
        // Implementing an Accessor Descriptor for isActive Parameter [ see SVGBaseButton object ]
            isActiveA: { 
                configurable:true, 
                get: function ()      { 
                    genLibPV.logJSInfo(libName, funcName, "svgButton Obj- get Accessor", this.objectName + ": Returning isActive value: " + this.isActive );
                    return this.isActive;  
                    },
                set: function (value) {
                    this.isActive = value;
                    genLibPV.logJSInfo(libName, funcName, "svgButton Obj - set Accessor", this.objectName + ": Setting New Value for isActive: " +  this.isActive);
                    }  
                }
        });
   
    svgButton.objectName = "svgButton";
    svgButton.getDetails();
    
    nextButton =  Object.create(svgButton);
    nextButton.objectName = "NextSVGButton";
    nextButton.onButtonClick = function() {
        genLibPV.logJSInfo(libName, funcName, "nextButton.onButtonClick: --> Next Button clicked !"); 
    };
    nextButton.getDetails();
    nextButton.isActiveA=true;

    // isActiveA is our Data Accessor
    isActive = nextButton.isActiveA;
    genLibPV.logJSInfo(libName, funcName, "button.js - nextButton isActive: " + isActive);
    genLibPV.logJSInfo(libName, funcName, "button.js - ButtonStatus: " +  nextButton.getButtonStatus() );

    prevButton =  Object.create(svgButton);
    prevButton.objectName = "PrevSVGButton";
    prevButton.onButtonClick = function() {
         genLibPV.logJSInfo(libName, funcName, "prevButton.onButtonClick:  --> Prev Button clicked !");
    };
    isActive = prevButton.isActiveA;
    genLibPV.logJSInfo(libName, funcName, "button.js - prevButton isActive: " + isActive);
    // Return the button Array
    buttonArray.push({  buttonObj: nextButton } );
    buttonArray.push({  buttonObj: prevButton } );

    return buttonArray;
}

