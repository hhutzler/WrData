"use strict";

/* Just ignore eslint error:    1:1  error  Strict mode is not permitted strict
   Allow certain variables to be shadowed  */
/* eslint no-shadow: ["error", { "allow": ["libName","funcName"] }] */

var genLibPV  = null;       // Global Library Handle
var wrController = null;    // Global Controller Object
var wrDisplay = null;       // Global Display Object 
var svgButton = null;       // Our global Reference to the svgButton Prototype object
                            // Global Prototypes Allows us to check for correct types ....  
 

/* global jQuery, GenLibPV, createDisplayObject  */    // Just to keep eslint happy ! 
jQuery(document).ready(function() {
    var funcName = "jQuery.ready()";
    var libName = "WrController.js"; 
    console.log( funcName + " --> Document Ready Message from jQuery for " + libName );
     
    genLibPV = new GenLibPV();
    genLibPV.init("displayDiv");
    genLibPV.logJSInfo(libName, funcName, " --> Document Ready Message from jQuery !");
    genLibPV.printStatus();
    startWRData();
});

/* Exported comment -> To keep ESlint happy */
/* exported loadSVGButton */  
function startWRData() {
    var libName = "WrController.js"; 
    var funcName="startWRData()"; 
    try {
	genLibPV.logJSInfo(libName, funcName,"Enter Function: " + funcName ); 
        createControllerObject();
        wrController.getDetails();
        wrController.createButtons();
        createDisplayObject();
        animateDisplay();
    } catch (e) { 
	genLibPV.logJSInfo(libName, funcName, "[Exception] " + e, true);
	throw e;   
	}
}

function animateDisplay() {
    var actDayPower = 0.0;
    var actPower = 0.0;
    var maxPower =0.0; 
    var timeout = 3000;
    var maxDaykWh = 0.0;
    
    
    /* eslint no-magic-numbers: ["error", { "ignore": [999,90,40,4.7] }] */
    maxPower = 90;
    maxDaykWh = 999;
    actDayPower = Math.floor(Math.random() * maxDaykWh);
    actPower = Math.floor(Math.random() * maxPower);
    wrDisplay.animateGroup("G1",actDayPower, actPower,  maxPower);
    
    maxPower = 4.7;
    maxDaykWh = 40;
    actDayPower = Math.floor(Math.random() * maxDaykWh);
    actPower = Math.floor(Math.random() * maxPower);    
    wrDisplay.animateGroup("G2",actDayPower, actPower,  maxPower);

    setTimeout(animateDisplay, timeout);
}

function createControllerObject() {
    // var funcName = "createControllerObject()";  Not used - keep Eslint happy
    var WRController = Object.create(null);  // this is an empty object, like {}
    var libName = "WrController.js"; 
    WRController.prototype = {
        getDetails:  function() {
            var funcName = "geDetails()"; 
            genLibPV.logJSInfo( this.objectName, funcName, "WRController.prototype  - objectName: " + this.objectName );
        },
        createButtons: function() {
            var funcName = "createButtons()";
            var buttonArr = createButtons();           // return an button array
            genLibPV.logJSInfo(libName, funcName, "Returned Button Array Length: " + buttonArr.length  );
            console.dir(buttonArr);         // Dump the Object to the JS console log 
        
            buttonArr.forEach(function(b) {
                // console.dir(buttonObj);         // Dump the Button Array to the JS console log 
                var button = b.buttonObj;
                genLibPV.logJSInfo(libName, funcName, "--> ButtonName: " + button.objectName + "  - isActvive: " + button.isActive ); 
            });  
            this.buttonArray = buttonArr;
        },
        buttonReleased: function() {
            var funcName = "releaseButton()";
            var buttonArr =  wrController.buttonArray;           // return an button array
            genLibPV.logJSInfo(libName, funcName, "Returned Button Array Length: " + buttonArr.length  );
            console.dir(buttonArr);         // Dump the Button Array to the JS console log 
        
            buttonArr.forEach(function(b) {
                // console.dir(buttonObj);         // Dump the Object to the JS console log 
                var button = b.buttonObj;
                var bRectWidth = 80;
                var bRectHeight = 35;
                genLibPV.logJSInfo(libName, funcName, "--> RESET Button: " + button.objectName + "  - isActvive: " + button.isActive );
                
                var bTxt = document.getElementById(button.svgButtonTextID);
                bTxt.setAttributeNS(null, "font-size", "25");
                bTxt.setAttributeNS(null, "fill", "yellow"); 
                
                var bRect = document.getElementById(button.svgButtonRectID);
                bRect.setAttributeNS(null,"width",bRectWidth.toString() );   
                bRect.setAttributeNS(null,"height",bRectHeight.toString() );  	
            });  
        }
    };

    /* Object.create()
     *      1.st Parameter : The first argument is the prototype to be extended
     *      2.nd Parameter : The second optional argument is an object containing the object's property descriptors.
     */
    wrController = Object.create(WRController.prototype, 
    {   
        // value properties
        objectName:    { writable: true, configurable:true, value: "wrController" },
        libName:       { writable: true, configurable:true, value: "wrController.js" },
        nextButton:    { writable: true, configurable:true, value: null },
        prevButton:    { writable: true, configurable:true, value: null },
        buttonArray:   { writable: true, configurable:true, value: null }
    });
    
    wrController.getDetails();

  }
  

function createButtons() { 
    var funcName = "createButtons()";
    var libName = "WrController.js"; 
    var buttonArray = [];   
    var nextButton = null;
    var prevButton = null;
    var isActive = false;
    var SVGButton = null; 

    SVGButton = Object.create(null);  // this is an empty object, like {}
    SVGButton.prototype = {
        getDetails:  function() {
            genLibPV.logJSInfo(this.objectName, funcName, "SVGButton.prototype", "getDetails():: ObjectName: " + this.objectName +
                     "  - isActive: " + this.isActive +   "  - svgButtonTextID: "  + this.svgButtonTextID + 
                     "  - svgButtonRectID: "  + this.svgButtonRectID);
            },
        getButtonStatus: function() {
            return this.isActive;
                },
        animateButtonPressed : function ()  {
            var bRectWidth = 80;
            var bRectHeight = 35;
            var hOffset = 1;
            var wOffset = 2;
            var bTxt = document.getElementById(this.svgButtonTextID);
            var bRect = document.getElementById(this.svgButtonRectID);
    
            bTxt.setAttributeNS(null, "font-size", "30");
            bTxt.setAttributeNS(null, "fill", "#00FF33");
            bRectWidth =  parseInt(bRect.getAttributeNS(null, "width"),10);
            bRectWidth -=  wOffset;
            bRect.setAttributeNS(null,"width", bRectWidth.toString() );

            bRectHeight =  parseInt(bRect.getAttributeNS(null, "height"),10);
            bRectHeight -=  hOffset;
            bRect.setAttributeNS(null,"height", bRectHeight.toString() );
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
            libName:       { writable: true, configurable:true, value: "wrController.js" },
            buttonId:    { writable: true, configurable:true, value: "" },
            svgButtonTextID: { writable: true, configurable:true, value: "" },
            svgButtonRectID: { writable: true, configurable:true, value: "" },
        // Implementing an Accessor Descriptor for isActive Parameter [ see SVGBaseButton object ]
            isActiveA: { 
                configurable:true, 
                get: function ()      { 
                    genLibPV.logJSInfo(this.objectName, funcName, "svgButton Obj- get Accessor", this.objectName + ": Returning isActive value: " + this.isActive );
                    return this.isActive;  
                    },
                set: function (value) {
                    this.isActive = value;
                    genLibPV.logJSInfo(this.objectName, funcName, "svgButton Obj - set Accessor", this.objectName + ": Setting New Value for isActive: " +  this.isActive);
                    }  
                }
        });
   
    svgButton.objectName = "svgButton";

    svgButton.getDetails();
    
    nextButton =  Object.create(svgButton);
    nextButton.objectName = "svgButtonNext";
    nextButton.svgButtonRectID = nextButton.objectName+"RectID";
    nextButton.svgButtonTextID = nextButton.objectName+"TextID";
    
    nextButton.onButtonClick = function() {
        genLibPV.logJSInfo(this.libName, funcName, " ----------------> nextButton.onButtonClick: --> Next Button clicked !"); 
        this.animateButtonPressed();
    };
    nextButton.getDetails();
    nextButton.isActiveA=true;

    // isActiveA is our Data Accessor
    isActive = nextButton.isActiveA;
    genLibPV.logJSInfo(libName, funcName, "button.js - nextButton isActive: " + isActive);
    genLibPV.logJSInfo(libName, funcName, "button.js - ButtonStatus: " +  nextButton.getButtonStatus() );

    prevButton =  Object.create(svgButton);
    prevButton.objectName = "svgButtonPrev";
    prevButton.svgButtonRectID = prevButton.objectName+"RectID";
    prevButton.svgButtonTextID = prevButton.objectName+"TextID";
    
    prevButton.onButtonClick = function() {
         genLibPV.logJSInfo(libName, funcName, " -----------------> prevButton.onButtonClick:  --> Prev Button clicked !");
         this.animateButtonPressed();
    };
    prevButton.getDetails();
     
    isActive = prevButton.isActiveA;
    genLibPV.logJSInfo(libName, funcName, "button.js - prevButton isActive: " + isActive);
    // Return the button Array
    wrController.prevButton = prevButton;
    wrController.nextButton = nextButton; 
    
    wrController.prevButton.onButtonClick();
    wrController.nextButton.onButtonClick();
    
    buttonArray.push({  buttonObj: nextButton } );
    buttonArray.push({  buttonObj: prevButton } );

    return buttonArray;
}

