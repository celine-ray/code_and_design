let spannungSlider;
let energieSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Slider
  spannungSlider = createSlider(0, 100, 50);
  spannungSlider.position(50, 50);
  energieSlider = createSlider(0, 100, 50);
  energieSlider.position(50, 100);
  noStroke();
}

function draw() {
  background(20, 10, 100);
  
  // Werte auslesen
  let spannung = spannungSlider.value();
  let energie = energieSlider.value();
  
  // Mit map() Werte umrechnen
  let abstand = map(spannung, 0, 100, 50, width / 2 - 200);
  let groesse = map(energie, 0, 100, 50, 250);
  let farbton = map(energie, 0, 100, 180, 360); // von blau zu rot
  let transparenz = map(energie, 0, 100, 30, 30);
  
  // Kreispositionen (links/rechts)
  let x1 = width / 2 - abstand;
  let x2 = width / 2 + abstand;
  let y = height / 2;
  
  // Farbe links: kühler
  fill(farbton - 60, 80, 100, transparenz);
  ellipse(x1, y, groesse, groesse);
  
  // Farbe rechts: wärmer
  fill(farbton, 80, 100, transparenz);
  ellipse(x2, y, groesse, groesse);
  
  // Verbindungslinie
  stroke(farbton, 80, 100, 50);
  strokeWeight(map(energie, 0, 100, 10, 100));
  line(x1, y, x2, y);
}
