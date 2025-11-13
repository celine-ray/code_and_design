// Wert Position
let posX = 0;
let posY = 0;

// Wert Radius
let r = 100;
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
  // Hauptcanvas löschen (heller Hintergrund)
  background(230, 230, 230);

  // Alle vier Offscreen-Canvas löschen, damit keine Spuren bleiben
  canvasOne.clear();
  canvasTwo.clear();
  canvasThree.clear();
  canvasFour.clear();

  // Kreise auf den jeweiligen Canvas zeichnen
  canvasOne.fill(0, 255, 100, 80);
  canvasOne.circle(posX, posY, 200, 200);

  canvasTwo.fill(255, 0, 100, 80);
  canvasTwo.circle(posX, posY, 200, 200);

  canvasThree.fill(255, 100, 0, 80);
  canvasThree.circle(posX, posY, 200, 200);

  canvasFour.fill(255, 0, 0, 80);
  canvasFour.circle(posX, posY, 200, 200);

  // Canvas 1
  image(canvasOne, 0, 0);

  // Canvas 2
  push();
  translate(width / 2, height / 2);
  rotate(90);
  image(canvasTwo, -width / 2, -height / 2);
  pop();

  // Canvas 3
  push();
  translate(width / 2 , height / 2);
  rotate(180);
  image(canvasThree, -width / 2, -height / 2);
  pop();

  // Canvas 4
  push();
  translate(width / 2, height / 2);
  rotate(270);
  image(canvasFour, -width / 2, -height / 2);
  pop();

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
