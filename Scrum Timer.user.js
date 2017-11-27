// ==UserScript==
// @name        Scrum Timer
// @namespace   http://johncolosi.com
// @include     https://www.google.com/
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @resource    https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
// @require     https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
// @resource    https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css
// @version     1
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$('#lga').prepend("<button type='button' id='myTimer' class='btn btn-lg btn-default'>Start</button>");

document.getElementById ("myTimer").addEventListener (
    "click", clickTimer, false
);

var MillisPerSecond = 1000;
var MillisPerMinute = 60 * MillisPerSecond;
var MillisPerHour = 60 * MillisPerMinute;

var jxInterval;
var jxPreTime = 0;
var jxRunning = false;
var jxStartTime = null;
var jxStopTime = null;

// This may be unneccessary, do css in the real env with stylish
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);


function clickTimer() {

    // Start or restart
    if (!jxRunning) {
        jxStartTime = new Date().getTime();

        if (jxPreTime === 0) $('#myTimer').text('Go!');
        else populate();

        if (jxStartTime-jxStopTime < 250) {
            $('#myTimer').text('Reset');
            jxPreTime=0;
        }

        jxInterval = setInterval(populate, 1000);
        $('#myTimer').addClass('btn-success');
        $('#myTimer').removeClass('btn-default');
        jxRunning = true;
    }

    // Stop
    else {
        jxStopTime = new Date().getTime();

        if (jxStopTime-jxStartTime < 250) {
            $('#myTimer').text('Reset');
            jxPreTime=0;
        } else {
            jxPreTime += jxStopTime - jxStartTime;
            clearInterval(jxInterval);
            $('#myTimer').addClass('btn-default');
            $('#myTimer').removeClass('btn-success');
            jxRunning = false;
        }
    }
}

function populate() {
    var now = new Date().getTime();
    var delta = (now - jxStartTime) + jxPreTime;
    delta %= MillisPerHour;
    var m = Math.floor(delta/MillisPerMinute);
    delta %= MillisPerMinute;
    var s = pad(Math.floor(delta/MillisPerSecond));
    delta %= MillisPerSecond;
    var x = pad(delta);

    $('#myTimer').text(m+":"+s);
}


function pad(x) {
    return (x<10) ? '0'+x : x;
}