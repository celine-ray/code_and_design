// Wert Position
let posX = 0;
let posY = 0;

// Wert Radius
let r = 100;
let richtung = 0;
let wert = 2;

let scaling = false; //wird über mausklick auf true gesetzt

let scaleTarget =2.5; //zielwert für scale
let scaleCurrent = 1; //aktueller scale wert

// Vier Canvas Objekte
let canvasOne;
let canvasTwo;
let canvasThree;
let canvasFour;
let quadratSize ;

function setup() {
  createCanvas(windowWidth, windowHeight);
  quadratSize = min(width, height);
  r = quadratSize / 4;

  canvasOne = createGraphics(quadratSize, quadratSize);
  canvasTwo = createGraphics(quadratSize, quadratSize);
  canvasThree = createGraphics(quadratSize, quadratSize);
  canvasFour = createGraphics(quadratSize, quadratSize);

  // Kreis Rechteck rechts oben
  posX = (canvasOne.width - r);
  posY = r;

  // Winkel in Grad
  angleMode(DEGREES);
}

function draw() {
  // Hauptcanvas löschen (heller Hintergrund)
  background(230, 230, 230);

  // Alle vier Offscreen-Canvas löschen, damit keine Spuren bleiben
  canvasOne.clear();
  canvasTwo.clear();
  canvasThree.clear();
  canvasFour.clear();

  // Kreise auf den jeweiligen Canvas zeichnen
  canvasOne.fill(0, 255, 100, 80);
  canvasOne.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  canvasTwo.fill(255, 0, 100, 80);
  canvasTwo.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  canvasThree.fill(255, 100, 0, 80);
  canvasThree.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  canvasFour.fill(255, 0, 0, 80);
  canvasFour.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  // Canvas 1
  let posCanvasOneX = (width - quadratSize) / 2;
  let posCanvasOneY = (height - quadratSize) / 2;

  push();
  translate(width / 2, height / 2);
  scale(scaleCurrent);
  image(canvasOne, -canvasFour.width / 2, -canvasFour.height / 2);
  pop();

  // Canvas 2
  push();
  translate(width / 2, height / 2);
  rotate(90);
  scale(scaleCurrent);
  image(canvasTwo, -canvasFour.width / 2, -canvasFour.height / 2);
  pop();

  // Canvas 3
  push();
  translate(width / 2 , height / 2);
  rotate(180);
  scale(scaleCurrent);
  image(canvasThree, -canvasThree.width / 2, -canvasThree.height / 2);
  pop();

  // Canvas 4
  push();
  translate(width / 2, height / 2);
  rotate(270);
  scale(scaleCurrent);
  image(canvasFour, -canvasFour.width / 2, -canvasFour.height / 2);
  pop();

  // Richtung bei Ecken einstellen
  if (posX < r) {
    richtung++;
    posX = r;
  }
  if (posY > canvasThree.height - r) {
    richtung++;
    posY = canvasThree.height - r;
  }
  if (posX > canvasThree.width - r) {
    richtung++;
    posX = canvasThree.width - r;
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

  if(scaling && scaleCurrent < scaleTarget){
    scaleCurrent +=0.01;
  }

  //falls geklickt, wird nochmals eine Form gezeichnet
  if(scaling){
    ellipse(width/2, height/2, 10*scaleCurrent , 10*scaleCurrent);
  }


}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('meinBild.png');
  }
}


function mousePressed() {
  scaling = true;
}