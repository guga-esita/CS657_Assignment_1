
let numberOfRows = 10;
let numberOfColumns = 10;
let obstacleRadius; 

function setup() {
  let WW = windowWidth;
  let WH = windowHeight 
  createCanvas(WW, WH);
  // createCanvas(400, 300);
}

function draw() {
  // window width and window height
  let WW = windowWidth;
  let WH = windowHeight;

  // cell width and cell hieght;
  let cWidth= WW / numberOfColumns;
  let cHeight= WH / numberOfRows

  background(0);
  stroke(255)
  strokeWeight(2)

  let x = 0;
  for(let i = 0; i<numberOfColumns+2; i++){
    line(x, 0, x, WW)
    x = x + WW / numberOfColumns
  }
  let y = 0;
  for(let i = 0; i<numberOfRows+2; i++){
    line(0, y, WW, y)
    y = y + WH / numberOfRows
  }
  obstacleRadius = WH / numberOfRows;
  print(obstacleRadius);
  print(WW / numberOfRows - obstacleRadius);
  circle(WW / numberOfRows - obstacleRadius , 30, obstacleRadius / 2);


}
