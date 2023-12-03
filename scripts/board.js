let canvas;
let ctx;


const WIDTH = 1200;
const HEIGHT = 800;

// let isRunning = false;


tileRowCount = 10;   //row number
tileColumnCount = 10;

cellSeperation = 1;

tileW = 40; //box width
tileH = 40;

let boundX = 0
let boundY = 0

var start = [1,1]
var end = []
var spot = []

var tiles = []


function handleSubmit(submitType) {
    // Get the input values when the button is clicked
    var rowsValue = parseInt(document.getElementById("rowsInput").value)+1;;
    var columnsValue = parseInt(document.getElementById("columnsInput").value)+1;

    var startRowValue = parseInt(document.getElementById("startRowInput").value);
    var startColumnValue = parseInt(document.getElementById("startColumnInput").value);

    var hazardRowValue = parseInt(document.getElementById("hazardRowInput").value);
    var hazardColumnValue = parseInt(document.getElementById("hazardColumnInput").value);

    var endRowValue = parseInt(document.getElementById("endRowInput").value);
    var endColumnValue = parseInt(document.getElementById("endColumnInput").value);

    var colorBlobRowValue = parseInt(document.getElementById("colorBlobRowInput").value);
    var colorBlobColumnValue = parseInt(document.getElementById("colorBlobColumnInput").value);

    // Call the functions to handle the changes
    if (submitType == 'mapSize') {
        handleRowChange(rowsValue);
        handleColumnChange(columnsValue);
        // Display the size of the map
        // displayMapSize();
    } else if (submitType == 'startPoint') {
        handleStartPoint(startRowValue, startColumnValue);
    }
    else if (submitType == 'hazardPoint') {
        handleHazardPoint(hazardRowValue, hazardColumnValue);
    }
    else if (submitType == 'endPoint') {
        handleEndPoint(endRowValue, endColumnValue);
    }
    else if (submitType == 'colorBlobPoint') {
        handleColorBlobPoint(colorBlobRowValue, colorBlobColumnValue);
    }
}

// function displayMapSize() {
//     // Get the input values
//     var rowsValue = document.getElementById("rowsInput").value;
//     var columnsValue = document.getElementById("columnsInput").value;

//     // Display the size of the map
//     document.getElementById("mapSizeDisplay").innerHTML = "(" + rowsValue + "," + columnsValue + ")";
// }


function handleRowChange(rows) {
    rows = rows > 1 ? rows : 1
    tiles = []
    tileRowCount = rows
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation

    for (var c = 0; c < tileColumnCount; c++) {
        tiles[c] = []
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r }
        }
    }

    //  Adding neighbours to the tiles
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []
            if (c > 0) { neighbours.push(tiles[c - 1][r]) }
            if (r > 0) { neighbours.push(tiles[c][r - 1]) }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }

            tiles[c][r].neighbours = neighbours
        }
    }
}

function handleColumnChange(columns) {
    columns = columns > 0 ? columns : 1
    tiles = []
    tileColumnCount = columns
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation
    for (var c = 0; c < tileColumnCount; c++) {
        tiles[c] = []
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r }
        }
    }

    //  Adding neighbours to the tiles
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []

            if (c > 0) { neighbours.push(tiles[c - 1][r]) }
            if (r > 0) { neighbours.push(tiles[c][r - 1]) }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }

            tiles[c][r].neighbours = neighbours
        }
    }
}

//handle startPoint
function handleStartPoint(r, c) {

    if(r < tileRowCount && c < tileColumnCount){

        if (tiles[c][r].state !== "end") {
            tiles[start[0]][start[1]].state = "empty";
            start[0] = c;
            start[1] = r;
            openSet = [tiles[start[0]][start[1]]]; // only for Astar
            tiles[c][r].state = "start";
            console.log("changing the start position");
        }
    }
}

//handle hazardPoint
function handleHazardPoint(r,c) { //(c != boundX || r != boundY) && 
    if (tiles[c][r].state != "start" && tiles[c][r].state != "end" && tiles[c][r].state != "blob") {
        tiles[c][r].state = tiles[c][r].state == "empty" ? "hazard" : "empty";
        boundX = c;
        boundY = r;
    }
}

//handle endPoint
function handleEndPoint(r, c) {
    if (r < tileRowCount && c < tileColumnCount) {
        if (tiles[c][r].state !== "start") {
            if (tiles[c][r].state === "empty") {
                // If the tile is currently empty, set it to 'end' and add [c, r] to spot list
                tiles[c][r].state = "end";
                spot.push([c, r]);
                console.log("changing the end position");
            } else {
                // If the tile is not empty, set it to 'empty' and remove [c, r] from spot list
                tiles[c][r].state = "empty";
                spot = spot.filter(item => !(item[0] === c && item[1] === r));
                console.log("changing the empty position");
            }
            console.log("spot", spot[spot.length - 1]);
            end[0] = spot[spot.length - 1][0]
            end[1] = spot[spot.length - 1][1]
            // console.log("end", end[0]);
        }
    }
}

//handle colorBlobPoint
function handleColorBlobPoint(r, c){
    if (tiles[c][r].state != "start" && tiles[c][r].state != "end" && tiles[c][r].state != "hazard") {
        tiles[c][r].state = tiles[c][r].state == "empty" ? "blob" : "empty";
        boundX = c;
        boundY = r;
    }
}

//position of tiles
for (var c = 0; c < tileColumnCount; c++) {
    tiles[c] = []
    for (var r = 0; r < tileRowCount; r++) {
        tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r }
    }
}

//find path
//  Adding neighbours to the tiles
//algorithm run

const handleNeighboursChange = () => {
    // var selector = document.getElementById("Neighbours").value
    console.log("inti neighbours was called")
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []
            if (c > 0) { neighbours.push(tiles[c - 1][r]) }
            if (r > 0) { neighbours.push(tiles[c][r - 1]) }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }
            tiles[c][r].neighbours = neighbours
        }
    }
}

handleNeighboursChange()


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
    else if (state == "enterBlob") { ctx.fillStyle = "yellow" }


    ctx.beginPath();
    ctx.rect(x, y, w, h)
    ctx.closePath();
    ctx.fill();
    }
}

function clear() {
    // console.log("clearing the canvas")
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

function drawLines() {
    ctx.strokeStyle = "rgb(159, 156, 156)";
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
    clear()
    // console.log("drawing the canvas")
    drawLines();

    for (var c = 0; c < tileColumnCount; c++) {
        
        for (var r = 0; r < tileRowCount; r++) {
            
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state)

        }
    }
    window.requestAnimationFrame(draw)
}

function init() {
    canvas = document.getElementById("canvas")
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation
    ctx = canvas.getContext("2d")
    // return setInterval(draw, 10);
    window.requestAnimationFrame(draw)
}
init()