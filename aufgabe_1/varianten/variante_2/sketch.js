let sizeSlider, positionSlider, colorSlider, opacitySlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 260, 100, 100, 100); // Farben im HSB-Modus

  // Slider
  sizeSlider = createSlider(10, 200, 50);
  sizeSlider.position(10, 10);
  positionSlider = createSlider(0, width / 1.5, width / 6);
  positionSlider.position(10, 40);
  colorSlider = createSlider(0, 360, 180);
  colorSlider.position(10, 70);
  opacitySlider = createSlider(0, 100, 100);
  opacitySlider.position(10, 100);
}

function draw() {
  background(20, 10, 100);
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
    ellipse(x, y, sizeSlider.value(), sizeSlider.value());
  }
}
