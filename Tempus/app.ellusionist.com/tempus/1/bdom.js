// Tempus, Copyright 2018 Stratagem Solutions Ltd, For Ellusionist.com, Inc
Hammer.plugins.fakeMultitouch();

function getIndexForValue(elem, value) {
    "use strict";
    for (var i = 0; i < elem.options.length; i++) {
        if (elem.options[i].value === value) {
            return i;
        }
    }
}
var automaticallyUpdated;
var secondDrum;
var minuteDrum;
var hourDrum;
var selectedSuit = "";
var resetRequired = false;

function preloadImages(array) {
    "use strict";
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        };
        list.push(img);
        img.src = array[i];
    }
}
$(document).ready(function() {
    "use strict";
    initialise();
    try {

        $("#cardSelectionTableContainer").hide();
        if (/(android)/i.test(navigator.userAgent)) {
            //preloadImages(["./images/tabBar1-android.PNG", "./images/tabBar2-android.PNG", "./images/tabBar3-android.PNG", "./images/tabBar4-android.PNG", "./images/tabBar5-android.PNG", "./images/alarm-android.PNG", "./images/bedTime-android.PNG", "./images/stopWatch-android.PNG", "./images/worldClock-android.PNG", "./images/Faded-Area-android.png"]);			
            preloadImages([GetImageNameForLanguage(Language, "tabBar1-android.PNG"), GetImageNameForLanguage(Language, "tabBar2-android.PNG"), GetImageNameForLanguage(Language, "tabBar3-android.PNG"), GetImageNameForLanguage(Language, "tabBar4-android.PNG"), GetImageNameForLanguage(Language, "tabBar5-android.PNG"), GetImageNameForLanguage(Language, "alarm-android.PNG"), GetImageNameForLanguage(Language, "bedTime-android.PNG"), GetImageNameForLanguage(Language, "stopWatch-android.PNG"), GetImageNameForLanguage(Language, "worldClock-android.PNG"), "./images/Faded-Area-android.png"]);
        } else {
            preloadImages([GetImageNameForLanguage(Language, "tabBar1.PNG"), GetImageNameForLanguage(Language, "tabBar2.PNG"), GetImageNameForLanguage(Language, "tabBar3.PNG"), GetImageNameForLanguage(Language, "tabBar4.PNG"), GetImageNameForLanguage(Language, "tabBar5.PNG"), GetImageNameForLanguage(Language, "alarm.PNG"), GetImageNameForLanguage(Language, "bedTime.PNG"), GetImageNameForLanguage(Language, "stopWatch.PNG"), GetImageNameForLanguage(Language, "worldClock.PNG"), "./images/Faded-Area.png"]);
        }


        $('#lineshour').css("right", GetRightPaddingForHoursForLanguage(Language, window.innerWidth));
        $('#linesminute').css("right", GetRightPaddingForMinutesForLanguage(Language, window.innerWidth));
        $('#linessecond').css("right", GetRightPaddingForSecondsForLanguage(Language, window.innerWidth));

        $('#lineshour').css("top", GetTopPaddingForLanguage(Language, window.innerWidth));
        $('#linesminute').css("top", GetTopPaddingForLanguage(Language, window.innerWidth));
        $('#linessecond').css("top", GetTopPaddingForLanguage(Language, window.innerWidth));

        $('#datewrapper').css("font-size", GetDrumLabelFontSizeForLanguage(Language, window.innerWidth));

        $(".round-button").css("font-size", GetButtonFontSizeForLanguage(Language, window.innerWidth));
        $(".round-button-green").css("font-size", GetButtonFontSizeForLanguage(Language, window.innerWidth));

        secondDrum = $("select.date#seconds").drum({
            onSpeedChange: function(elem) {
                //$("#speedreadout").text(elem);
                //console.log("Drum Speed: " + elem);
            }
        });
        hourDrum = $("select.date#hours").drum({
            onChange: function(elem) {}
        });
        minuteDrum = $("select.date#minutes").drum({
            onChange: function(elem) {}
        });
        if (DoubleForce) {
            minuteDrum.drum("setForceDelay", ForceOnSpin);
            secondDrum.drum("setForceDelay", ForceOnSpin2);
        } else {
            minuteDrum.drum("setForceDelay", ForceOnSpin);
            secondDrum.drum("setForceDelay", ForceOnSpin);
        }
        resetRequired = localStorage.getItem("Tempus-resetRequired");
        var preloadedMinuteForce = localStorage.getItem("Tempus-minuteForceNumber")
        var preloadedSecondForce = localStorage.getItem("Tempus-secondForceNumber")
        if (preloadedMinuteForce != null)
            minuteDrum.drum("forceNumber", preloadedMinuteForce);
        if (preloadedSecondForce != null)
            secondDrum.drum("forceNumber", preloadedSecondForce);

        offsetSet = localStorage.getItem("Tempus-offsetSet");
        //hourDrum.drum("setIndex", 7);
    } catch (err) {
        alert("Error in document ready: " + err.message);
    }
});


var triggerUpdateTimeout;
var longpress = 1000;
var elem;
var pos;
var id;

function showOptions() {
    "use strict";
    //console.log("Show Options");
    var popoverheight = viewportheight - 77;
    if ($(".navigationBar").hasClass("iphoneXNavBar")) {
        popoverheight = viewportheight - 107;
    } else if ($(".navigationBar").hasClass("iphoneXMaxNavBar")) {
        popoverheight = viewportheight - 127;
    }
    $("#wholecontainer").webuiPopover({
        title: 'Options',
        type: "iframe",
        url: './Options.html',
        width: viewportwidth - 4,
        height: popoverheight,
        arrow: false,
        cache: false,
        closeable: true,
        trigger: 'manual'
    });


    $("#wholecontainer").webuiPopover('show');
    document.addEventListener('escapeHandler', initialise, false);
    elem = document.getElementById("webuiPopover0");
    if ($(".navigationBar").hasClass("iphoneXNavBar")) {
        elem.style.top = viewportheight - 40;
        overlayLimit = 40;
    } else if ($(".navigationBar").hasClass("iphoneXMaxNavBar")) {
        elem.style.top = viewportheight - 50;
        overlayLimit = 50;
    } else {
        elem.style.top = viewportheight - 20;
        overlayLimit = 20;
    }

    elem.style.left = 0;
    elem.style.position = "fixed";
    elem.style.zIndex = 99999;
    elem.style.background = "#fff";
    pos = viewportheight;
    id = setInterval(frame, 5);
}
var overlayLimit = 0;

function frame() {
    "use strict";
    if (pos === overlayLimit /*0*/ ) {
        clearInterval(id);
    } else {
        pos = pos - 15;
        if (pos < overlayLimit /*20*/ ) {
            pos = overlayLimit /*20*/ ;
        }
        elem.style.top = pos + 'px';
    }
}



function startClick() {
    "use strict";

}

function cancelClick() {
    "use strict";
    secondDrum.drum("clearForce");
    minuteDrum.drum("clearForce");
    resetRequired = false;
    offsetSet = false;
    localStorage.removeItem("Tempus-minuteForceNumber");
    localStorage.removeItem("Tempus-secondForceNumber");
    localStorage.removeItem("Tempus-offsetSet");
    localStorage.removeItem("Tempus-resetRequired");
}

function resize(box, initialsize) {
    "use strict";
    $(box).each(function(i, box) {
        var width = $(box).width(),
            html = '<span style="white-space:nowrap">',
            line = $(box).wrapInner(html).children()[0],
            n = initialsize;

        $(box).css('font-size', n);

        while ($(line).width() > width) {
            $(box).css('font-size', --n);
        }

        $(box).text($(line).text());

    });
}
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        "use strict";
        FastClick.attach(document.body);
    }, false);
}


//Second big lot of script

var viewportwidth;
var viewportheight;
var tablewidth;
var Licenced = false;
var LicenseKey = "";
//var horizontal = true;
function rotationhandler() {
    "use strict";
    layout();
}

function layout() {
    "use strict";
    //console.log("layout");
    /*if (typeof window.innerWidth !== 'undefined') { //sets viewport width/height into respective variables
    	viewportwidth = window.innerWidth; viewportheight = window.innerHeight;
	} else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
	    viewportwidth = document.documentElement.clientWidth; viewportheight = document.documentElement.clientHeight;
	} else {
    	viewportwidth = document.getElementsByTagName('body')[0].clientWidth; viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}*/
    try {
        var calculatedPadding = 0;
        if (CSS.supports('padding-bottom: env(safe-area-inset-bottom)')) {
            var div = document.createElement('div');
            div.style.paddingBottom = 'env(safe-area-inset-bottom)';
            document.body.appendChild(div);
            calculatedPadding = parseInt(window.getComputedStyle(div).paddingBottom);
            document.body.removeChild(div);
            //if (calculatedPadding > 0) {
            //	return true;
            //} 
        }
        var innerHeightVal;
        if (typeof(window.visualViewport) == "undefined")
            innerHeightVal = window.innerHeight;
        else
            innerHeightVal = window.visualViewport.height;
        console.log("Window innerHeight: " + innerHeightVal);
        var dims = {
            w: 0,
            h: 0
        };
        var ruler = document.createElement('div');

        ruler.style.position = 'fixed';
        //		ruler.style.height = window.innerHeight + 'px'; //'100vh';
        ruler.style.height = innerHeightVal + 'px'; //'100vh';
        ruler.style.width = 0;
        ruler.style.top = 0;

        document.documentElement.appendChild(ruler);
        var axis = Math.abs(window.orientation);
        // Set cache conscientious of device orientation
        dims.w = axis === 90 ? ruler.offsetHeight : window.innerWidth;
        dims.h = axis === 90 ? window.innerWidth : ruler.offsetHeight;

        // Clean up after ourselves
        document.documentElement.removeChild(ruler);
        ruler = null;
        //UGLY hack to fix the status bar issue on ios
        if (!/(android)/i.test(navigator.userAgent)) {
            switch (dims.h) {
                case 460:
                    dims.h = 480;
                    break;
                case 548:
                    dims.h = 568;
                    break;
                case 647:
                    dims.h = 667;
                    break;
                case 716:
                    dims.h = 736;
                    break;
                case 768:
                    dims.h = 780 + calculatedPadding;
                    if (!/(android)/i.test(navigator.userAgent)) {
                        $(".navigationBar").addClass("iphoneXNavBar");
                    }
                    break;
                case 852:
                    dims.h = 852 + calculatedPadding;
                    if (!/(android)/i.test(navigator.userAgent)) {
                        $(".navigationBar").addClass("iphoneXMaxNavBar");
                    }
                    break;
            }
        }
        //viewportheight = $(window).height() - calculatedPadding;
        viewportheight = dims.h - calculatedPadding;
        console.log("Calculated padding: " + calculatedPadding + " , viewport height: " + viewportheight);
        //viewportwidth = $(window).width();
        viewportwidth = dims.w;

        viewportwidth = viewportwidth + 2;
        tablewidth = viewportwidth; //sets table width to viewport width
        //alert("Viewport Width: " + viewportwidth + ", Viewport Height: " + viewportheight);
        if (tablewidth > 414 && (!/(android)/i.test(navigator.userAgent))) {
            document.getElementById('body').style.width = "414px";
        } else {
            document.getElementById('body').style.width = tablewidth + "px";
        }
        document.getElementById('body').style.height = viewportheight + "px";
        //console.log(document.getElementById('tabBar'));
        document.getElementById('tabBar').style.height = viewportwidth / 7.5757575758 + 1 + "px";
    } catch (err) {
        alert("Error in Layout logic: " + err.message);
    }

}

function doOnOrientationChange() {
    "use strict";
    switch (window.orientation) {
        case -90:
            document.getElementById('wholecontainer').style.display = "none"; //was calculatorbuttons
            break;
        case 90:
            document.getElementById('wholecontainer').style.display = "none";
            break;
        default:
            document.getElementById('wholecontainer').style.display = "inherit"; //"table";
            //For testing landscape in desktop safari
            //document.getElementById('calculatorbuttons').style.display = "none"
            break;
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);

function BlockElasticScroll(event) {
    "use strict";
    event.preventDefault();
}

var Language;
var UseStackType;
var ForceOnSpin;
var ForceOnSpin2;
var DoubleForce;
var UseOffset;
var OffsetType;
var offsetSet = false;

function initialise() {
    "use strict";
    document.ontouchmove = function(event) {
        event.preventDefault();
    };

    layout();
    try {
        if (localStorage.getItem("Tempus-initialised") === null) {
            Language = 0;
            UseStackType = 0;
            ForceOnSpin = 3;
            ForceOnSpin2 = 3;
            DoubleForce = false;
            UseOffset = false;
            OffsetType = 1;
            localStorage.setItem("Tempus-Language", JSON.stringify(Language));
            localStorage.setItem("Tempus-UseStackType", JSON.stringify(UseStackType));
            localStorage.setItem("Tempus-ForceOnSpin", JSON.stringify(ForceOnSpin));
            localStorage.setItem("Tempus-ForceOnSpin2", JSON.stringify(ForceOnSpin2));
            localStorage.setItem("Tempus-initialised", JSON.stringify(1));
            localStorage.setItem("Tempus-DoubleForce", JSON.stringify(DoubleForce));
            localStorage.setItem("Tempus-UseOffset", JSON.stringify(UseOffset));
            localStorage.setItem("Tempus-OffsetType", JSON.stringify(OffsetType));
			//localStorage.setItem("Tempus-Licenced",JSON.stringify("OVM23RLVD6"));
        } else {
            Language = JSON.parse(localStorage.getItem("Tempus-Language"));
            UseStackType = JSON.parse(localStorage.getItem("Tempus-UseStackType"));
            ForceOnSpin = JSON.parse(localStorage.getItem("Tempus-ForceOnSpin"));
            ForceOnSpin2 = JSON.parse(localStorage.getItem("Tempus-ForceOnSpin2"));
            Licenced = JSON.parse(localStorage.getItem("Tempus-Licenced"));
            DoubleForce = JSON.parse(localStorage.getItem("Tempus-DoubleForce"));
            UseOffset = JSON.parse(localStorage.getItem("Tempus-UseOffset"));
            OffsetType = JSON.parse(localStorage.getItem("Tempus-OffsetType"));
            if (Licenced === null) {
                Licenced = true;
            }
            LicenseKey = JSON.parse(localStorage.getItem("Tempus-LicenseKey"));
        }
        if (Licenced) {
            $("#navigationTitle").text(GetTranslation(Language, "Timer"));
        } else {
            $("#navigationTitle").text(GetTranslation(Language, "Timer") + " - " + GetTranslation(Language, "Unlicensed"));
        }
    } catch (err) {
        alert("Error in initialisation: " + err.message);
    }
    $("#timerStart").text(GetTranslation(Language, "Start"));
    $("#timerCancel").text(GetTranslation(Language, "Cancel"));
    $("#lineshour").text(GetTranslation(Language, "Hours"));
    $("#linesminute").text(GetTranslation(Language, "Minutes"));
    $("#linessecond").text(GetTranslation(Language, "Seconds"));
    $("#navigationEdit").text(GetTranslation(Language, "Edit"));
    $("#timerEnds").text(GetTranslation(Language, "WhenTimerEnds"));
    if (/(android)/i.test(navigator.userAgent)) {
        $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar5-android.PNG"));
    } else {
        $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar5.PNG"));
    }
    if (Licenced) {
        $("#navigationTitle").text(GetTranslation(Language, "Timer"));
    } else {
        $("#navigationTitle").text(GetTranslation(Language, "Timer") + " - " + GetTranslation(Language, "Unlicensed"));
    }
}

$(function() {
    "use strict";
    $("#tabTimer").bind('touchstart mousedown', function(event) {
        triggerUpdateTimeout = setTimeout(showOptions, longpress);
    });
    $("#tabTimer").bind('touchend mouseup', function(event) {
        clearTimeout(triggerUpdateTimeout);
    });
    $(".tabBar ul li").click(
        function(event) {
            //if(Licenced === false){
            //	showOptions();
            //}
            if (event.target.id === "tabTimer") {
                $("#cardSelectionTableContainer").hide();
                $("#timerContainer").show();
                if (Licenced) {
                    $("#navigationTitle").text(GetTranslation(Language, "Timer"));
                } else {
                    $("#navigationTitle").text(GetTranslation(Language, "Timer") + " - " + GetTranslation(Language, "Unlicensed"));
                }
                $("#navigationEdit").hide();
                $("#navigationAdd").hide();
                //$(".tabBar ul").css("background-image", "url(images/tabBar5.PNG)");
                if (/(android)/i.test(navigator.userAgent)) {
                    $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar5-android.PNG"));
                } else {
                    $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar5.PNG"));
                }
                //$("#body").css("background-image", "");
                $("#backgroundImageContainer").attr('src', '');
                $("#backgroundImageContainer").hide();
            } else {
                $("#timerContainer").hide();
                var isForceSet = false;

                var TitlePreamble = "";
                if (DoubleForce) {
                    var minuteForce = minuteDrum.drum("getForce");
                    var secondForce = secondDrum.drum("getForce");
                    isForceSet = (minuteForce && secondForce);
                    if (minuteForce) {
                        TitlePreamble = "(" + GetTranslation(Language, "Second") + ")";
                    } else {
                        TitlePreamble = "(" + GetTranslation(Language, "First") + ")";
                    }
                } else {
                    isForceSet = secondDrum.drum("getForce") || minuteDrum.drum("getForce");
                }
                if (!Licenced) {
                    isForceSet = true;
                }
                if (isForceSet && Licenced && (UseOffset && !offsetSet)) {
                    if (OffsetType === 0) {
                        TitlePreamble = "(" + GetTranslation(Language, "TopCard") + ")";
                    } else {
                        TitlePreamble = "(" + GetTranslation(Language, "BottomCard") + ")";
                    }
                }
                if (!resetRequired) {
                    resetRequired = isForceSet;
                    if (resetRequired)
                        localStorage.setItem("Tempus-resetRequired", true);
                }
                if (event.target.id === "tabClubs") {
                    //if(isForceSet || resetRequired || (UseOffset && UseStackType === 5) || (UseOffset && offsetSet))
                    if (((isForceSet || resetRequired) && (!UseOffset || UseStackType === 5)) || ((isForceSet || resetRequired) && UseOffset && offsetSet)) {
                        $("#navigationTitle").text(GetTranslation(Language, "WorldClock"));
                        $("#navigationEdit").show();
                        $("#navigationAdd").show();
                        if (/(android)/i.test(navigator.userAgent)) {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar1-android.PNG"));
                            //$("#body").css("background-image", "url(images/worldClock-android.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "worldClock-android.PNG"));
                        } else {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar1.PNG"));
                            //$("#body").css("background-image", "url(images/worldClock.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "worldClock.PNG"));
                        }
                        $("#backgroundImageContainer").show();
                    } else {
                        if (UseStackType === 5) {
                            var elements = document.getElementById('numberTable').getElementsByTagName('td');

                            for (var i = 0; i <= elements.length - 1; i++) {
                                elements[i].innerHTML = i;
                            }

                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").hide();
                            $("#numberTable").show();
                            selectedSuit = "0";
                            $("#navigationTitle").text(TitlePreamble + " 0 - 14");
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar1.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar1-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar1.PNG"));
                            }
                        } else {
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").show();
                            $("#numberTable").hide();
                            selectedSuit = "Clubs";
                            $("#navigationTitle").text(TitlePreamble + " " + GetTranslation(Language, "Clubs"));
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar1.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar1-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar1.PNG"));
                            }
                        }
                    }
                } else if (event.target.id === "tabHearts") {
                    //if(isForceSet || resetRequired || (UseOffset && UseStackType === 5) || (UseOffset && offsetSet))
                    if (((isForceSet || resetRequired) && (!UseOffset || UseStackType === 5)) || ((isForceSet || resetRequired) && UseOffset && offsetSet)) {
                        $("#navigationTitle").text(GetTranslation(Language, "Alarm"));
                        $("#navigationEdit").show();
                        $("#navigationAdd").show();
                        //$(".tabBar ul").css("background-image", "url(images/tabBar2.PNG)");
                        if (/(android)/i.test(navigator.userAgent)) {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar2-android.PNG"));
                            //$("#body").css("background-image", "url(images/alarm-android.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "alarm-android.PNG"));
                        } else {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar2.PNG"));
                            //$("#body").css("background-image", "url(images/alarm.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "alarm.PNG"));
                        }
                        $("#backgroundImageContainer").show();
                    } else {
                        if (UseStackType === 5) {
                            var elements = document.getElementById('numberTable').getElementsByTagName('td');

                            for (var i = 0; i <= elements.length - 1; i++) {
                                elements[i].innerHTML = i + 15;
                            }
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").hide();
                            $("#numberTable").show();
                            selectedSuit = "13";
                            $("#navigationTitle").text(TitlePreamble + " 15 - 29");
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar2.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar2-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar2.PNG"));
                            }
                        } else {
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").show();
                            $("#numberTable").hide();
                            selectedSuit = "Hearts";
                            $("#navigationTitle").text(TitlePreamble + " " + GetTranslation(Language, "Hearts"));
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar2.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar2-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar2.PNG"));
                            }
                        }
                    }
                } else if (event.target.id === "tabSpades") {
                    //if(isForceSet || resetRequired || (UseOffset && UseStackType === 5) || (UseOffset && offsetSet))
                    if (((isForceSet || resetRequired) && (!UseOffset || UseStackType === 5)) || ((isForceSet || resetRequired) && UseOffset && offsetSet)) {
                        $("#navigationTitle").text(GetTranslation(Language, "Bedtime"));
                        $("#navigationEdit").hide();
                        $("#navigationAdd").hide();
                        //$(".tabBar ul").css("background-image", "url(images/tabBar3.PNG)");
                        if (/(android)/i.test(navigator.userAgent)) {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar3-android.PNG"));
                            //$("#body").css("background-image", "url(images/bedTime-android.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "bedTime-android.PNG"));
                        } else {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar3.PNG"));
                            //$("#body").css("background-image", "url(images/bedTime.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "bedTime.PNG"));
                        }
                        $("#backgroundImageContainer").show();
                    } else {
                        if (UseStackType === 5) {
                            var elements = document.getElementById('numberTable').getElementsByTagName('td');

                            for (var i = 0; i <= elements.length - 1; i++) {
                                elements[i].innerHTML = i + 30;
                            }
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").hide();
                            $("#numberTable").show();
                            selectedSuit = "26";
                            $("#navigationTitle").text(TitlePreamble + " 30 - 44");
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar3.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar3-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar3.PNG"));
                            }
                        } else {
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").show();
                            $("#numberTable").hide();
                            selectedSuit = "Spades";
                            $("#navigationTitle").text(TitlePreamble + " " + GetTranslation(Language, "Spades"));
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar3.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar3-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar3.PNG"));
                            }
                        }
                    }
                } else if (event.target.id === "tabDiamonds") {
                    //if(isForceSet || resetRequired || (UseOffset && UseStackType === 5) || (UseOffset && offsetSet))
                    if (((isForceSet || resetRequired) && (!UseOffset || UseStackType === 5)) || ((isForceSet || resetRequired) && UseOffset && offsetSet)) {
                        $("#navigationTitle").text(GetTranslation(Language, "Stopwatch"));
                        $("#navigationEdit").hide();
                        $("#navigationAdd").hide();
                        //$(".tabBar ul").css("background-image", "url(images/tabBar4.PNG)");
                        if (/(android)/i.test(navigator.userAgent)) {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar4-android.PNG"));
                            //$("#body").css("background-image", "url(images/stopWatch-android.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "stopWatch-android.PNG"));
                        } else {
                            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar4.PNG"));
                            //$("#body").css("background-image", "url(images/stopWatch.PNG)");
                            $("#backgroundImageContainer").attr('src', GetImageNameForLanguage(Language, "stopWatch.PNG"));
                        }
                        $("#backgroundImageContainer").show();
                    } else {
                        if (UseStackType === 5) {
                            var elements = document.getElementById('numberTable').getElementsByTagName('td');

                            for (var i = 0; i <= elements.length - 1; i++) {
                                elements[i].innerHTML = i + 45;
                            }
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").hide();
                            $("#numberTable").show();
                            selectedSuit = "39";
                            $("#navigationTitle").text(TitlePreamble + " 45 - 59");
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar4.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar4-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar4.PNG"));
                            }
                        } else {
                            $("#cardSelectionTableContainer").show();
                            $("#cardTable").show();
                            $("#numberTable").hide();
                            selectedSuit = "Diamonds";
                            $("#navigationTitle").text(TitlePreamble + " " + GetTranslation(Language, "Diamonds"));
                            $("#navigationEdit").hide();
                            $("#navigationAdd").hide();
                            //$(".tabBar ul").css("background-image", "url(images/tabBar4.PNG)");
                            if (/(android)/i.test(navigator.userAgent)) {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar4-android.PNG"));
                            } else {
                                $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar4.PNG"));
                            }
                        }
                    }
                }
            }
        });
});
$(function() {
    "use strict";
    $(".cardSelectionTable tr td").click(function(event) {
        var numberToForce;
        var offsetCompensator = 0; //If the offset type is from top, we need to subtract 1 to avoid an off by one error
        if (OffsetType === 0)
            offsetCompensator = 1;
        switch (UseStackType) {
            case 0:
                numberToForce = mnemonicaLookup[event.target.innerHTML][selectedSuit];
                break;
            case 1:
                numberToForce = aronsonLookup[event.target.innerHTML][selectedSuit];
                break;
            case 2:
                numberToForce = stebbinsLookup[event.target.innerHTML][selectedSuit];
                break;
            case 3:
                numberToForce = ndoLookup[event.target.innerHTML][selectedSuit];
                break;
            case 4:
                numberToForce = eightkingsLookup[event.target.innerHTML][selectedSuit];
                break;
            case 5:
                numberToForce = event.target.innerHTML;
                break;
        }
        if (DoubleForce) {
            var FirstForceInput = minuteDrum.drum("getForce");
            var SecondForceInput = secondDrum.drum("getForce");
            var minuteForceVal = minuteDrum.drum("getForceIndex");
            var secondForceVal = secondDrum.drum("getForceIndex");
            if (!FirstForceInput) {
                minuteDrum.drum("forceNumber", numberToForce);
                localStorage.setItem("Tempus-minuteForceNumber", numberToForce);
            } else if (!SecondForceInput) {
                secondDrum.drum("forceNumber", numberToForce);
                localStorage.setItem("Tempus-secondForceNumber", numberToForce);
            } else if (UseOffset) { //Both forces have been input. Now to set the offsets for the minute drum and second drum
                var firstForce, secondForce;
                var newMinuteForce = minuteForceVal - numberToForce + offsetCompensator;
                if (newMinuteForce < 1) {
                    newMinuteForce = 52 + newMinuteForce; //Add it, because it's a negative number
                }
                //var newSecondForce = secondForceVal - minuteForceVal;// + (offsetCompensator * 2); //Compound
                var newSecondForce = secondForceVal - numberToForce + offsetCompensator; //Lloyd's new way
                if (newSecondForce < 1) {
                    newSecondForce = 52 + newSecondForce; //Add it, because it's a negative number
                }

                if (newMinuteForce < newSecondForce) {
                    firstForce = newMinuteForce;
                    secondForce = newSecondForce;
                } else {
                    firstForce = newSecondForce;
                    secondForce = newMinuteForce;
                }


                //minuteDrum.drum("forceNumber", newMinuteForce); //Offset from the position set
                //secondDrum.drum("forceNumber", newSecondForce); //Compound offset, as if the deck has been cut and the cut completed

                minuteDrum.drum("forceNumber", firstForce);
                secondDrum.drum("forceNumber", secondForce);
                localStorage.setItem("Tempus-minuteForceNumber", firstForce);
                localStorage.setItem("Tempus-secondForceNumber", secondForce);
                localStorage.setItem("Tempus-offsetSet", true);
                offsetSet = true;
            }
        } else {
            var ForceInput = minuteDrum.drum("getForce");
            var ForceInputVal = minuteDrum.drum("getForceIndex");
            if (!ForceInput) {
                secondDrum.drum("forceNumber", numberToForce);
                minuteDrum.drum("forceNumber", numberToForce);
                localStorage.setItem("Tempus-minuteForceNumber", numberToForce);
                localStorage.setItem("Tempus-secondForceNumber", numberToForce);
            } else { //Force has been input. Now to set the offset
                var newForceNumber = (ForceInputVal - numberToForce + offsetCompensator);
                if (newForceNumber < 1) {
                    newForceNumber = 52 + newForceNumber; //Add it, because it's a negative number
                }
                secondDrum.drum("forceNumber", newForceNumber); //Offset from the position set
                minuteDrum.drum("forceNumber", newForceNumber); //Offset from the position set
                localStorage.setItem("Tempus-minuteForceNumber", newForceNumber);
                localStorage.setItem("Tempus-secondForceNumber", newForceNumber);
                localStorage.setItem("Tempus-offsetSet", true);

                offsetSet = true;
            }
        }

        $("#cardSelectionTableContainer").hide();
        $("#timerContainer").show();
        if (Licenced) {
            $("#navigationTitle").text(GetTranslation(Language, "Timer"));
        } else {
            $("#navigationTitle").text(GetTranslation(Language, "Timer") + " - " + GetTranslation(Language, "Unlicensed"));
        }
        $("#navigationEdit").hide();
        $("#navigationAdd").hide();
        //$(".tabBar ul").css("background-image", "url(images/tabBar5.PNG)");
        if (/(android)/i.test(navigator.userAgent)) {
            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar5-android.PNG"));
        } else {
            $(".tabBar ul").css("background-image", GetImageCSSForLanguage(Language, "tabBar5.PNG"));
        }
    });
});