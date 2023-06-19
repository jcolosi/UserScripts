// ==UserScript==
// @name         MidJourney Quick Click
// @version      1.0
// @description  Open all images into a new tab
// @author       John Colosi
// @match        https://discord.com/channels/*
// @run-at       document-idle
// ==/UserScript==
'use strict';


// C O N S T A N T S
const interval = 2000;
const classTag = "MJQC";


// V A R I A B L E S
var timer;
var iterations = 0;


// E N T R Y
init();


// F U N C T I O N S
function init() {
    startRepeater();
}

function startRepeater() {
    window.addEventListener("load", function() {
        timer = setInterval(repeaterFunctions, interval);
    });
}

function repeaterFunctions() {
    main();
}

function main() {

    // Get all the image containers that don't have our classTag
    document.querySelectorAll('div.imageContainer-10XenG:not(.'+classTag+')').forEach( (box) => {

        // Apply our classTag so we process each container only once
        box.classList.add(classTag);

        // Find the width of the contained image
        const width = box.querySelector('div').style.width;

        // Create a new container div with all the right properties
        const myDiv = document.createElement('div');
        myDiv.setAttribute("display", "block");
        myDiv.setAttribute("max-height", "inherit");
        myDiv.setAttribute("margin", "auto");
        myDiv.setAttribute("width", width);
        myDiv.setAttribute("height", "100%");

        // Create an image and put it in the div container
        for (const image of box.getElementsByTagName('a')) {
            const source = image.getAttribute('href');
            const myA = document.createElement('a');
            myA.setAttribute("href", source);
            myA.setAttribute("target","_blank");
            const myImg = document.createElement('img');
            myImg.setAttribute("width", width);
            myImg.setAttribute("height", "100%");
            myImg.setAttribute("border", "0");
            myImg.setAttribute("src", source);
            myA.append(myImg);
            myDiv.append(myA);
        }

        // Replace the old div container with the new div container
        box.innerHTML = "";
        box.append(myDiv);
    });
}