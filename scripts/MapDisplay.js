
var robot_img = new Image();  // Create a new Image object
robot_img.src = 'assets/robot.png';

var spot_img = new Image();  // Create a new Image object
spot_img.src = 'assets/spot.png';


var hazard_img = new Image();  // Create a new Image object
hazard_img.src = 'assets/hazard.png';

var colorBlob_img = new Image();  // Create a new Image object
colorBlob_img.src = 'assets/colorBlob.png';


//color the cells
function rect(x, y, w, h, state) {
    //  draws a rectangle as per the given arguments
    
    if (state == "start") {
        // Replace the color fill with an image
        ctx.drawImage(robot_img, x, y, w, h);
    } else if(state == "end"){
        ctx.drawImage(spot_img, x, y, w, h);
    } else if(state == "hazard"){
        ctx.drawImage(hazard_img, x, y, w, h);
    }else if(state == "blob"){
        ctx.drawImage(colorBlob_img, x, y, w, h);
    }else {
    if (state == "empty") { return;}
    else if (state == "enterBlob") { ctx.fillStyle = "yellow" ;}


    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
    }
}

function clear() {
    // console.log("clearing the canvas")
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawLines() {
    ctx.strokeStyle = "rgb(189, 185, 185)";
    for (var c = 0; c < tileColumnCount; c++) {
        ctx.beginPath();
        ctx.moveTo(tiles[c][0].x + tileW/2, tiles[c][0].y + tileH / 2);
        ctx.lineTo(tiles[c][tileRowCount-1].x+ tileW/2, tiles[c][tileRowCount-1].y + tileH / 2);
        ctx.stroke();
    }
    for (var r = 0; r < tileRowCount; r++) {
        ctx.beginPath();
        ctx.moveTo(tiles[0][r].x + tileW/2, tiles[0][r].y + tileH / 2);
        ctx.lineTo(tiles[tileColumnCount-1][r].x+ tileW/2, tiles[tileColumnCount-1][r].y + tileH / 2);
        ctx.stroke();
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
const draw = async () => {
    clear();
    // console.log("drawing the canvas")
    drawLines();

    for (var c = 0; c < tileColumnCount; c++) {
        
        for (var r = 0; r < tileRowCount; r++) {
            
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);

        }
    }
    window.requestAnimationFrame(draw);
}

function init() {
    canvas = document.getElementById("canvas");
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation;
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation;
    ctx = canvas.getContext("2d");
    // return setInterval(draw, 10);
    window.requestAnimationFrame(draw);
}
init();