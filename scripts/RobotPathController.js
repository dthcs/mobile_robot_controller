
function showPath() {
	var temp = tiles[end[0]][end[1]];
	var temp_start = tiles[start[0]][start[1]];

	console.log("Show path was called ");
	
	tiles[end[0]][end[1]].state = "end";


  
	return new Promise((resolve) => {
		const abc = () => {
			temp = tiles[end[0]][end[1]];

			if (temp == temp_start || isRobotRunning == false) {
				// if(end[0] === spot[0][0] && end[1] === spot[0][1]){
				// 	displayNotice("1: 탐색완료!");
				// }
				resolve(); // Resolve the promise when finished
				return;
			}

			if(!temp.previous){
				displayNotice("(" + (end[1]) + ", " + (end[0]) + ")에 탐색지점로의 경로를 찾을 수 없습니다!");
				// console.log("no way to spot: ", (end[0], end[1]));
				// if(end[0] === spot[0][0] && end[1] === spot[0][1]){
				// 	displayNotice("2: 탐색완료!");
				// }
				resolve();
				return;
			}
	
			while (temp.previous != temp_start) {
			temp = temp.previous;
			}
				
			//robot through colorBlob
			if(tiles[temp.column][temp.row].state === "blob"){
				//notice robot run through a important cell
				displayNotice("(" + (temp.row+1) + ", " + (temp.column+1) + ")의 중요지점을 통과했습니다!");
				tiles[temp.column][temp.row].state = "enterBlob";
			}
			else{
				tiles[temp.column][temp.row].state = "start";
			}
			//return colorBlob state
			if(tiles[temp.column][temp.row].previous.state === "enterBlob"){
				tiles[temp.column][temp.row].previous.state = "blob";
			}else{
				tiles[temp.column][temp.row].previous.state = "empty";
			}

			temp_start = temp;
			start[0] = temp_start.column;
			start[1] = temp_start.row;
	
			setTimeout(abc, 500);
			};
	
		abc();
	});
}

function displayNotice(message) {
    var noticeDiv = document.getElementById("notice");

    if (noticeDiv) {
        // Append the new notice message to the existing content
        noticeDiv.innerHTML += "<p>" + message + "</p>";
    } else {
        console.log(message);
    }
}

let isRobotRunning = true; 

function runRobot(){
	if(isRobotRunning == false){
		isRobotRunning = true;
	}
	Astar();
	showPath().then(() => {
		if(isRobotRunning == false){

		}else if(spot.length > 1){

			spot.pop();
			
			end = spot[spot.length-1];
			runRobot();
		}
	});
}




function stopRobot() {
	isRobotRunning = false;
    
	console.log(isRobotRunning);
}