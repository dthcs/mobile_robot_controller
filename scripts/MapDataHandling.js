
let canvas;
let ctx;


const WIDTH = 1200;
const HEIGHT = 800;

// let isRunning = false;


tileRowCount = 10;   //row number
tileColumnCount = 10;

cellSeperation = 1;

var tileW = 40; //box width
var tileH = 40;

let boundX = 0;
let boundY = 0;

var start = [1,1];
var end = [];
var spot = [];

var tiles = [];


function handleRowChange(rows) {
    rows = rows > 1 ? rows : 1;
    tiles = [];
    tileRowCount = rows;
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation;
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation;

    for (var c = 0; c < tileColumnCount; c++) {
        tiles[c] = [];
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r };
        }
    }

    //  Adding neighbours to the tiles
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = [];
            if (c > 0) { neighbours.push(tiles[c - 1][r]) };
            if (r > 0) { neighbours.push(tiles[c][r - 1]) };
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) };
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) };

            tiles[c][r].neighbours = neighbours;
        }
    }
}

function handleColumnChange(columns) {
    columns = columns > 0 ? columns : 1;
    tiles = [];
    tileColumnCount = columns;
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation;
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation;
    for (var c = 0; c < tileColumnCount; c++) {
        tiles[c] = [];
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r };
        }
    }

    //  Adding neighbours to the tiles
    handleNeighboursChange();
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
            end[0] = spot[spot.length - 1][0];
            end[1] = spot[spot.length - 1][1];
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
    tiles[c] = [];
    for (var r = 0; r < tileRowCount; r++) {
        tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r };
    }
}

//  Adding neighbours to the tiles

const handleNeighboursChange = () => {
    // var selector = document.getElementById("Neighbours").value
    console.log("inti neighbours was called")
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = [];
            if (c > 0) { neighbours.push(tiles[c - 1][r]); }
            if (r > 0) { neighbours.push(tiles[c][r - 1]); }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]); }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]); }
            tiles[c][r].neighbours = neighbours;
        }
    }
}

handleNeighboursChange();

