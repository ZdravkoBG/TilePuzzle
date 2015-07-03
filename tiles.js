// This is the javascript code which initializes the puzzle
// as solved. This code also allows the user to move tiles in
// order to complete the game. User can also shuffle tiles.

(function() {
"use strict";

//Global Variables
var ROWS_COLS = 4;
var EMPTY_R = 3;
var EMPTY_C = 3;

// Onload sets shuffle button behavior, builds the puzzle, and 
// sets each built tile's onclick function.
window.onload = function() {
	document.getElementById("shufflebutton").onclick = shuffle;
	buildPuzzle();
	var tiles = document.querySelectorAll(".square");
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].onclick = tileId;
	}
};

// Called in onload. Nested for loop which creates tiles
// in rows and columns. Doesn't build one in the empty spot.
function buildPuzzle() {
	for (var r = 0; r < ROWS_COLS; r++) {
		for (var c = 0; c < ROWS_COLS; c++) {
			if (r != EMPTY_R || c != EMPTY_C) {
				var square = document.createElement("div");   //creates the square
				square.innerHTML = r+(c*4)+1;				  //sets square number
				square.className = "square";				  //adds the css class
				square.style.position = "absolute";           //sets position to absolute
				square.style.left = r*100 + "px";             //sets Y coordinate
				square.style.top = c*100 + "px";              //sets X coordinate
				square.style.backgroundImage = "url(background.jpg)"; //image
				square.style.backgroundPosition = -r*100 + "px " + -c*100 + "px"; //image piece
				if (isMoveable(r, c)) {						  //checks if next to empty
					square.classList.add("highlight");        //if yes, highlight
				} 
				document.getElementById("puzzlearea").appendChild(square); //add to board
			}
		}
	}
}

//When a tile is clicked, gets its row and columns
//Then if it's moveable calls the move method.
//Lastly checks for new moveable tiles.
function tileId() {
	var r = parseInt(this.style.left)/100;
	var c = parseInt(this.style.top)/100;
	if (isMoveable(r, c)) {
		moveTile(r, c, this);
		checkNew();
	}
}

//Checks for new moveable tiles.
//Loops over array of all tiles and 
//modifies their highlight class accordingly.
function checkNew() {
	var tiles = document.querySelectorAll(".square");
	for (var i = 0; i < tiles.length; i++) {
		var r = parseInt(tiles[i].style.left)/100;
		var c = parseInt(tiles[i].style.top)/100;	
		if (isMoveable(r, c)) {
			tiles[i].classList.add("highlight");
		} else {
			tiles[i].classList.remove("highlight");
		}
	}
}

//Accepts row and columnt of tile, and based
//on the empty tile's row/col returns true or false.
function isMoveable(r, c) {
	return (Math.abs(r - EMPTY_R) + Math.abs(c - EMPTY_C) == 1);
}

//Accepts information about clicked tile.
//Swaps this information with the empty tile's.
function moveTile(r, c, tile) {
	tile.style.left = EMPTY_R*100 + "px";
	tile.style.top = EMPTY_C*100 + "px";
	EMPTY_R = r;
	EMPTY_C = c;
}

//This algorithm moves valid pieces 1000 times
//randomly until the board is well shuffled.
//At the end checks new board for highlights.
function shuffle() {
	for (var i = 0; i < 1000; i++) {
		var neighbors = [];
		var tiles = document.querySelectorAll(".square");
		for (var j = 0; j < tiles.length; j++) {
			var r = parseInt(tiles[j].style.left)/100;
			var c = parseInt(tiles[j].style.top)/100;	
			if (isMoveable(r, c)) {
				neighbors.push(tiles[j]);
			}
		}
		var tile = neighbors[parseInt(Math.random() * neighbors.length)];
		var r = parseInt(tile.style.left)/100;
		var c = parseInt(tile.style.top)/100;
		moveTile(r, c, tile);
	}
	checkNew();
}
})();
