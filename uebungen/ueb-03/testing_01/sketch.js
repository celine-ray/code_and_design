// Wert Position
let posX = 0;
let posY = 0;

// Wert Radius
let r = 50;
let richtung = 0;
let wert = 2;

// Vier Canvas Objekte
let canvasOne;
let canvasTwo;
let canvasThree;
let canvasFour;

function setup() {
  createCanvas(400, 400);

  canvasOne = createGraphics(width, height);
  canvasTwo = createGraphics(width, height);
  canvasThree = createGraphics(width, height);
  canvasFour = createGraphics(width, height);

  // Kreis Rechteck rechts oben
  posX = (width - r);
  posY = r;

  // Winkel in Grad
  angleMode(DEGREES);
}

function draw() {
  //background(210, 230, 230);
  //clear();
  
  canvasOne.fill(0, 255, 100);
  //canvasOne.noStroke();
  canvasOne.circle(posX, posY, 100, 100);

  canvasTwo.fill(255, 0, 100);
  //canvasTwo.noStroke();
  canvasTwo.circle(posX, posY, 100, 100);
  
  canvasThree.fill(255, 100, 0);
  //canvasThree.noStroke();
  canvasThree.circle(posX, posY, 100, 100);
  
  canvasFour.fill(255, 100, 255);
  //canvasFour.noStroke();
  canvasFour.circle(posX, posY, 100, 100);

  // Canvas 1
  image(canvasOne, 0, 0);

  // Canvas 2
  push();
  translate(width/2, height/2);
  rotate(90);
  image(canvasTwo, -width / 2 , -height / 2);
  pop();

  // Canvas 3
  push();
  translate(width, height);
  rotate(180); 
  image(canvasThree, 0, 0);
  pop();

  // Canvas 4
  image(canvasFour, 0, 0);

  // Richtung bei Ecken einstellen
  if (posX < r) {
    richtung++;
    posX = r;
  }
  if (posY > height - r) {
    richtung++;
    posY = height - r;
  }
  if (posX > width - r) {
    richtung++;
    posX = width - r;
  }
  if (posY < r) {
    richtung++;
    posY = r;
  }

  // Bewegung einstellen
  if (richtung % 4 == 0) {
    posX = posX - wert;
  }
  if (richtung % 4 == 1) {
    posY = posY + wert;
  }
  if (richtung % 4 == 2) {
    posX = posX + wert;
  }
  if (richtung % 4 == 3) {
    posY = posY - wert;
  }
}

function keyPressed() {
	if (key === 's' || key === 'S') {
		saveCanvas('meinBild.png');
	}
}