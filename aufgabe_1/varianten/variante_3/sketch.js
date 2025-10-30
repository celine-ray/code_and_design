let positionSlider, colorSlider, opacitySlider;

// Variablen für automatisches Wachstum
let autoSize = 50;
let growthSpeed = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 260, 100, 100, 100); // Farben im HSB-Modus

  // Slider
  positionSlider = createSlider(0, width, width / 6);
  positionSlider.position(10, 10);
  colorSlider = createSlider(0, 360, 180);
  colorSlider.position(10, 40);
  opacitySlider = createSlider(0, 100, 100);
  opacitySlider.position(10, 70);
}

function draw() {
  background(20, 10, 100);
  
  // Kreisgrösse automatisch ändern
  autoSize += growthSpeed;
  if (autoSize > 200 || autoSize < 10) {
    growthSpeed *= -1; // Richtung umkehren (wachsen/schrumpfen)
  }

  drawCircle(); // Zeichenfunktion für Kreis
}

// Kreiszeichnung entsprechend den Sliderwerten
function drawCircle() {
  let numShapes = 20;
  let radius = positionSlider.value();
  
  for (let i = 0; i < numShapes; i++) {
    let angle = TWO_PI / numShapes * i;
    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);
    fill(colorSlider.value(), 100, 100, opacitySlider.value());
    noStroke();
    ellipse(x, y, autoSize, autoSize); // automatische Grösse
  }
}
