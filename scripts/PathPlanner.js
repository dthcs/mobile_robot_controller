
function heuristics(a, b) {
	return Math.abs(a.column - b.column) + Math.abs(a.row - b.row);
}

function removeElmentFromArray(arr, element){
	for (var i = arr.length -1; i >=0; i--){
		if (arr[i] == element) {
			arr.splice(i, 1);
			}
	}
}

function Astar() {

	console.log("running A*");
	var solved = false;
	var openSet = [tiles[start[0]][start[1]]];
	var closedSet = [];
	var isRunning = true;

	while (isRunning) {

		if (openSet.length == 0) {
			console.log("open set is empty: ", openSet.length);
			break
		}
		if (solved == true) {
			solved = false;
			console.log("solved = true");
			openset = [];
			break;
		}
		if (!isRunning) {
			console.log("returning because isRunning is false");
			break;
		}
		isRunning = true;

		//find the node in the openset having the lowest f value
		minIndex = 0;
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[minIndex].f) {
				minIndex = i;
			}
		}

		currentNode = openSet[minIndex];

		if (currentNode.column == tiles[end[0]][end[1]].column && currentNode.row == tiles[end[0]][end[1]].row) {
			solved = true;
			isRunning = false;
		}
		
		if (closedSet.length > tileRowCount * tileColumnCount) {
			isRunning = false;
			solved = false;
			console.log("Algorithm checking for more than possible case");
			break;
		}

		removeElmentFromArray(openSet, currentNode);
		closedSet.push(tiles[currentNode.column][currentNode.row]);

		var neighbours = currentNode.neighbours;
		for (var i = 0; i < neighbours.length; i++) {
			if (tiles[neighbours[i].column][neighbours[i].row].state != "hazard" && (tiles[neighbours[i].column][neighbours[i].row].state != "end" || tiles[neighbours[i].column][neighbours[i].row] === tiles[end[0]][end[1]]) && !closedSet.includes(tiles[neighbours[i].column][neighbours[i].row])) {
				var tempG = tiles[currentNode.column][currentNode.row].g + heuristics(tiles[currentNode.column][currentNode.row], tiles[neighbours[i].column][neighbours[i].row]);
				var newPathBetter = false;

				if (openSet.includes(tiles[neighbours[i].column][neighbours[i].row])) {
					//  this block will run only of the node is already in the open set meaning we already have a path for this node
					//  the heuristic will remain the same but the value of g will be different
					// change this value only if the g value is lesser than the already existing g value
					if (tempG < tiles[neighbours[i].column][neighbours[i].row].g) {
						newPathBetter = true;
						tiles[neighbours[i].column][neighbours[i].row].g = tempG;
					}
				} else {
					newPathBetter = true // since this will be the only path we have for the node
					tiles[neighbours[i].column][neighbours[i].row].g = tempG;
					openSet.push(tiles[neighbours[i].column][neighbours[i].row]);
				}

				if (newPathBetter) {
					tiles[neighbours[i].column][neighbours[i].row].h = heuristics(tiles[neighbours[i].column][neighbours[i].row], tiles[end[0]][end[1]]);
					tiles[neighbours[i].column][neighbours[i].row].f = tiles[neighbours[i].column][neighbours[i].row].g + tiles[neighbours[i].column][neighbours[i].row].h;
					tiles[neighbours[i].column][neighbours[i].row].previous = tiles[currentNode.column][currentNode.row];
				}
			}
		}
	}
};