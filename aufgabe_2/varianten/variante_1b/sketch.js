// Wert Position
let posX = 0;
let posY = 0;

// Wert Radius
let richtung = 0;
let wert = 2;

let scaling = false; // Wird über Mausklick auf true gesetzt

let scaleTarget = 2.5; // Zielwert für scale
let scaleCurrent = 1; // aktueller scale wert

// Transparenz für Kreise
let circleAlpha = 80; // Start-Alpha (0-255)
let fadeSpeed = 0.5; // wie schnell die Alpha pro Frame reduziert wird

// Vier Canvas Objekte
let canvasOne;
let canvasTwo;
let canvasThree;
let canvasFour;
let quadratSize;

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
  background(0, 0, 0);

  // Falls scaling aktiv, Alpha langsam reduzieren
  if (scaling && circleAlpha > 0) {
    circleAlpha = max(0, circleAlpha - fadeSpeed);
  }

  // Alle vier Offscreen-Canvas löschen, damit keine Spuren bleiben
  canvasOne.clear();
  canvasTwo.clear();
  canvasThree.clear();
  canvasFour.clear();

  /*canvasOne.blendMode(MULTIPLY);
  canvasTwo.blendMode(MULTIPLY);
  canvasThree.blendMode(MULTIPLY); 
  canvasFour.blendMode(MULTIPLY);*/

  // Kreise auf den jeweiligen Canvas zeichnen (mit dynamischer Alpha)
  canvasOne.noStroke();
  canvasOne.fill(0, 255, 255, circleAlpha);
  canvasOne.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  canvasTwo.noStroke();
  canvasTwo.fill(255, 0, 255, circleAlpha);
  canvasTwo.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  canvasThree.noStroke();
  canvasThree.fill(255, 255, 0, circleAlpha);
  canvasThree.circle(posX, posY, quadratSize / 2, quadratSize / 2);

  canvasFour.noStroke();
  canvasFour.fill(0, 255, 0, circleAlpha);
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

  // Skalierung einstellen
  if(scaling && scaleCurrent < scaleTarget){
    scaleCurrent +=0.01;
  }

  // Falls geklickt, wird nochmals eine Form gezeichnet
  if(scaling){
    let s = 'Hello';
    let w = textWidth(s);
    noStroke();
    ellipse(width/2, height/2, 20*scaleCurrent, 20*scaleCurrent);
    text('Hello', width/2 - 2 - w/2, height/2, 100*scaleCurrent, 100*scaleCurrent);
  }
}

// Mausklick startet Skalierung und Fade
function mousePressed() {
  scaling = true;
}

// Taste s speichert
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('meinBild.png');
  }
}