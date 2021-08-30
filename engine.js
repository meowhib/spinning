var canvas = document.querySelector("canvas");
var cont = canvas.getContext("2d");

var height = window.innerHeight;
var width = window.innerWidth;

canvas.height = height;
canvas.width = width;

// Transforming the canvas into a coordinate system
cont.translate(width/2, height/2);
cont.scale(1, -1);

window.addEventListener("resize", function(){
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
    // Transforming the canvas into a coordinate system
    cont.translate(width/2, height/2);
    cont.scale(1, -1);

    cont.strokeStyle = "#FFFFFF";
    cont.lineWidth = 3;
})

// DOM objects
var speedinput = document.getElementById("speedinput");
var barcountinput = document.getElementById("barcountinput");
var distanceinput = document.getElementById("distanceinput");
var delayinput = document.getElementById("delayinput");
var barlengthinput = document.getElementById("barlengthinput");

// Variables
var theta = 0;
var kappa = 0;
var speed = 1000 / parseInt(speedinput.value);
var bar_count = parseInt(barcountinput.value);
var distance = 0.1;
var delay = 0.1;
var barlength = 200;

// Intervals
var angletheta = setInterval(increaseTheta, speed);
var anglekappa = setInterval(increaseKappa, speed);

// Event listeners
speedinput.addEventListener("input", function(){
    speed = 1000 / parseInt(speedinput.value);
    clearInterval(angletheta);
    angletheta = setInterval(increaseTheta, speed);
    clearInterval(anglekappa)
    anglekappa = setInterval(increaseKappa, speed);
});

barcountinput.addEventListener("input", function(){
    bar_count = parseInt(barcountinput.value);
});

distanceinput.addEventListener("input", function(){
    distance = parseFloat(distanceinput.value);
    console.log(distance);
});

delayinput.addEventListener("input", function(){
    delay = parseFloat(delayinput.value);
});

barlengthinput.addEventListener("input", function(){
    barlength = parseInt(barlengthinput.value);
});

cont.strokeStyle = "#FFFFFF";
cont.lineWidth = 3;

// Draws a disc (fill)
function drawDisc(coord, radius){
    cont.beginPath();
    cont.arc(coord.x, coord.y, radius, 0, Math.PI * 2, true);
    cont.fill();
}

// Draw a circle
function drawCircle(coord, radius){
    cont.beginPath();
    cont.arc(coord.x, coord.y, radius, 0, Math.PI * 2, true);
    cont.stroke();
}

// Draws a line using the coordinate of the center of that line
// at an angle (theta) and a length (radius)
function drawLine(coord, theta, radius, colorIntensity){
    // Figuring out the coordinates of the points at the ends
    function getOpp(theta, hyp){
        return hyp * Math.sin(theta)
    }
    function getAdj(theta, hyp){
        return hyp * Math.cos(theta)
    }

    cont.beginPath();
    cont.moveTo(coord.x + getAdj(theta, radius/2), coord.y + getOpp(theta, radius/2));
    cont.lineTo(coord.x - getAdj(theta, radius/2), coord.y - getOpp(theta, radius/2));
    cont.strokeStyle = "rgba(" + colorIntensity + ", " + colorIntensity + ", " + colorIntensity + ", " + 255 +")";
    cont.stroke();
}

// Inrease the angle at which a line is drawn
function increaseTheta(){
    cont.clearRect(-width/2, -height/2, width, height);
    if (theta >= Math.PI){
        theta = 0;
    } else {
        theta = theta + Math.PI / 120;
    }
    // drawLine(circling(parseFloat(kappa)), theta, 350, 255);
    
    for (var i = 0; i < bar_count; i++){
        drawLine(circling(parseFloat(kappa-Math.PI - i * distance)), theta-Math.PI - i * delay, barlength, 255 - i * 6); 
    }
}

function increaseKappa(){
    if (kappa >= Math.PI){
        kappa = -3.14;
    } else {
        kappa = kappa + Math.PI / 120;
    }
}

function circling(angle){
    return {x: Math.sin(angle) * 100, y: Math.cos(angle) * 100}
}