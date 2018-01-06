"use strict";

/* Just ignore eslint error:    1:1  error  Strict mode is not permitted strict
   Allow certain variables to be shadowed  */

/* eslint no-shadow: ["error", { "allow": ["funcName"] }] */
/* global  genLibPV, Snap, mina */  
var wrDisplay = null;       // Global Display Object 

/* exported createDisplayObject */
function createDisplayObject() {
    // var funcName = "createDisplayObject()"; - Not used -  keep Eslint happy 
    var WRDisplay = Object.create(null);  // this is an empty object, like {}
    WRDisplay.prototype = {
        getDetails:  function() {
            var funcName = "geDetails()"; 
            genLibPV.logJSInfo( this.objectName , funcName, "WrDisplay.prototype  - objectName: " + this.objectName );
        },
        updatePanelMode1:  function(sel, addInfo, val) {
            var htmlSelector = sel;
            var addText = addInfo;
            var svgTextElement = null;
            var actVal = val;
            var panelTxt = "";

            svgTextElement =  Snap.select(htmlSelector);
            panelTxt = actVal + " " + addText;
            svgTextElement.node.innerHTML = panelTxt;
            return svgTextElement;
        },
        updatePanelMode2: function (sel, aPower, mPower ) {
            var htmlSelector = sel;
            var maxPower = mPower;
            var actPower = aPower;
            var svgTextElement = null;
            var n = 0.0;
            var panelTxt = "";
            
             /* eslint no-magic-numbers: ["error", { "ignore": [2] }] */
            svgTextElement =  Snap.select(htmlSelector);
            n = (actPower/maxPower).toFixed(2);
            panelTxt = n;
            svgTextElement.node.innerHTML = panelTxt;
        },
        
        updateTrafficLight: function (sel, aPower, tlightImage ) {
            // var htmlSelector = sel;
            var actPowerProKW = aPower;
            var tlight ="";
            var levelLow = 0.3;
            var levelMid = 0.5;
            // var svgTrafficLight = Snap.select(sel);
            
            if (actPowerProKW <= levelLow) {
		tlight="tlight_red.gif";
            } else if ( actPowerProKW >= levelLow && actPowerProKW <= levelMid ) {
		tlight="tlight_yellow.gif";
            } else {
		tlight="tlight_green.gif";
            }
            var elem =document.getElementById(tlightImage);
            elem.href.baseVal="images/" + tlight;
        },
           /* eslint max-params: [error, 4] */
       animateGroup: function (groupNumber, actDayP, actP,  maxP) {
            var groupID = groupNumber; 
            var svgTextElement1 = null;
            var svgTextElement2 = null;
            var svgTextElement3 = null;
            // var svgTextElement4 = null;
           
            var maxFountSize=22;
            var timing = 1500;
            var actDayPower = actDayP;
            var actPower = actP;
            var maxPower = maxP;
            // var actDayPowerProKW = 0.0;
            var actPowerProKW = 0.0;
	
            var htmlSelector1 = "#svgText1" + groupID;
            var htmlSelector2 = "#svgText2" + groupID;
            var htmlSelector3 = "#svgText3" + groupID;
            var htmlSelector4 = "#svgText4" + groupID;
            var htmlSelectTL =   "#svgTrafficLight" + groupID;
            var htmlSelectTLImage =   "svgTrafficLightImg" + groupID;
            var snapLow = 0;
            var snapHigh = 1;
            
            svgTextElement1 = this.updatePanelMode1(htmlSelector1,"kWh", actDayPower);
            svgTextElement2 = this.updatePanelMode1(htmlSelector2, "kW", actPower);
            this.updatePanelMode2(htmlSelector3, actDayPower, maxPower);
            svgTextElement3 =  Snap.select(htmlSelector3);

            actPowerProKW = this.updatePanelMode2(htmlSelector4, actPower, maxPower);
            // svgTextElement4 =  Snap.select(htmlSelector4);

            this.updateTrafficLight(htmlSelectTL, actPowerProKW, htmlSelectTLImage);

            Snap.animate( snapLow, snapHigh, function( value ) {
                    // svgTextElement.transform('s' + value   );     --> Animate by transform
		svgTextElement1.attr({ "font-size": value * maxFountSize ,  opacity: value });      // Animate by font-size 
		svgTextElement2.attr({ "font-size": value * maxFountSize,  opacity: value });       // and opacity !
		svgTextElement3.attr({ "font-size": value * maxFountSize,  opacity: value });
            }, timing, mina.bounce, null );     
        }
    };

    /* Object.create()
     *      1.st Parameter : The first argument is the prototype to be extended
     *      2.nd Parameter : The second optional argument is an object containing the object's property descriptors.
     */
    wrDisplay = Object.create(WRDisplay.prototype, 
    {   
        // value properties
        objectName:    { writable: true, configurable:true, value: "wrDisplay" },
        libName:       { writable: true, configurable:true, value: "wrDisplay.js" }
       
    });
    wrDisplay.getDetails();
  }
