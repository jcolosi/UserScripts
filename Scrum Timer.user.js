// ==UserScript==
// @name        Scrum Timer
// @namespace   http://johncolosi.com
// @include     https://jira.vrsn.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @version     2
// ==/UserScript==

// Constants
var MillisPerSecond = 1000;
var MillisPerMinute = 60 * MillisPerSecond;
var MillisPerHour = 60 * MillisPerMinute;

// Variables
var jxInterval;
var jxPreTime = 0;
var jxRunning = false;
var jxStartTime = null;
var jxStopTime = null;

// Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

// Initialize on "load"... lol
$(document).ready(function() {
    $('#ghx-content-main').prepend("<center><button type='button' id='myTimer' class='jxBtnOff'>Start</button></center>");
    document.getElementById("myTimer").addEventListener (
        "click", clickTimer, false
    );
});

function clickTimer() {

    // Start
    if (!jxRunning) {
        jxStartTime = new Date().getTime();

        if (jxPreTime === 0) $('#myTimer').text('Go!');
        else populate();

        if (jxStartTime-jxStopTime < 250) btnReset();
        else btnStart();
    }

    // Stop
    else {
        jxStopTime = new Date().getTime();
        jxPreTime += jxStopTime - jxStartTime;

        if (jxStopTime-jxStartTime < 250) btnReset();
        else btnStop();
    }
}

function btnStart() {
    jxInterval = setInterval(populate, 1000);
    $('#myTimer').addClass('jxBtnOn');
    $('#myTimer').removeClass('jxBtnOff');
    jxRunning = true;
}

function btnStop() {
    clearInterval(jxInterval);
    $('#myTimer').addClass('jxBtnOff');
    $('#myTimer').removeClass('jxBtnOn');
    jxRunning = false;
}

function btnReset() {
    $('#myTimer').text('Start');
    jxPreTime=0;
    btnStop();
}


function populate() {
    var now = new Date().getTime();
    var delta = (now - jxStartTime) + jxPreTime;
    delta %= MillisPerHour;

    var jxMin = Math.floor(delta/MillisPerMinute);
    delta %= MillisPerMinute;
    var jxSec = pad(Math.floor(delta/MillisPerSecond));
    delta %= MillisPerSecond;

    $('#myTimer').text(jxMin+":"+jxSec);
}


function pad(x) {
    return (x<10) ? '0'+x : x;
}