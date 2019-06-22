/* TODO:
-i think algo works well enough so... ✓
-draw actual maze using final grid ✓
-Add player + movement
-fin?
*/

/*
-each cell: 50x50
-each cell contains a denary integer, when converted to binary will show which
walls are present.
*/

//logical maze:
let visited = {} //object that holds visited cells, acts as global var
function generateMaze() {
  var grid = [
  // 0   1   2   3   4   5   6   7   8   9
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //0
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //1
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //2
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //3
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //4
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //5
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //6
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //7
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //8
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //9
  ]; // acts as global (due to 'var')
  let initial = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
  let key = initial[0].toString()+initial[1].toString();
  visited[parseInt(key)] = true;
  backtracker(initial, grid);
  return grid;
};

function backtracker(current, grid) {
  let unvisitedCells = unvisited(current);
  while (unvisitedCells.length > 0) {
    let randChoice = Math.floor(Math.random()*unvisitedCells.length);
    let chosen = unvisitedCells.splice(randChoice, 1);
    chosen = chosen[0];
    let tmpCheck = (chosen[0]).toString()+(chosen[1]).toString();
    if (visited[parseInt(tmpCheck)] !== true) {
      removeWall(current, chosen, grid);
      let tmpKey = (chosen[0]).toString()+(chosen[1]).toString();
      visited[parseInt(tmpKey)] = true;
      backtracker(chosen, grid);
    };
  };
};

//e.g. unvisited([5, 4], dict)
function unvisited(cell) { // returns an array of unvisited cells/indexes (empty if all visited)
  let out = [];
  if (cell[0] !== 0) { //if cell not at the top of grid
    let tmpKey = (cell[0]-1).toString()+(cell[1]).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0]-1,cell[1]]);
    };
  };
  if (cell[1] !== 9) { //if cell not at right edge of grid
    let tmpKey = (cell[0]).toString()+(cell[1]+1).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0],cell[1]+1]);
    };
  };
  if (cell[0] !== 9) { //if cell not at bottom of grid
    let tmpKey = (cell[0]+1).toString()+(cell[1]).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0]+1,cell[1]]);
    };
  };
  if (cell[1] !== 0) { //if cell not at left edge of grid
    let tmpKey = (cell[0]).toString()+(cell[1]-1).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0],cell[1]-1]);
    };
  };
  return out;
};

function removeWall(current, chosen, grid) {
  if (chosen[0] > current[0]) { //i.e. if chosen is below current
    grid[current[0]][current[1]] -= 4;
    grid[chosen[0]][chosen[1]] -= 1;
  } else if (chosen[0] < current[0]) { //i.e. if chosen is above current
    grid[current[0]][current[1]] -= 1;
    grid[chosen[0]][chosen[1]] -= 4;
  } else if (chosen[1] < current[1]) { //i.e. if chosen is to left of current
    grid[current[0]][current[1]] -= 8;
    grid[chosen[0]][chosen[1]] -= 2;
  } else if (chosen[1] > current[1]) { //i.e. if chosen is to right of current
    grid[current[0]][current[1]] -= 2;
    grid[chosen[0]][chosen[1]] -= 8;
  };
};

function fourBitBinary(number) {
  let tmp = number.toString(2);
  while (tmp.length < 4)  {
    tmp = "0" + tmp;
  }
  return tmp;
} // returns a four bit binary number (as a string)

//visuals:
function setup() {
  let cnv = createCanvas(500, 500);
  cnv.parent("mazeCanvas");
  rect(0, 0, 500, 500);
  noLoop();
};

function draw() {
  let gridLogic = generateMaze();
  let x = 0;
  let y = 0;
  for (let array of gridLogic) {
    for (let num of array) {
      let binStr = fourBitBinary(num);
      if (binStr[3] === "1") {
        line(x, y, (x+50), y);
      }
      if (binStr[0] === "1") {
        line(x, y, x, (y+50));
      }
      x += 50;
    }
    x = 0;
    y += 50;
  }
  line(500, 0, 500, 500);
  line(0, 500, 500, 500);
};

function keyPressed() {
  if (keyCode === 32) {
    visited = {};
    clear();
    redraw();
  }
}
