let baseGroesse = 100; // Basis-Durchmesser für alle Kreise
let phase = 0; // für die Wellenbewegung

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(240);
  
  // Wellenbewegung
  phase += 0.04;
  
  // Kreisparameter
  let cols = 20;
  let spacing = width / (cols + 1);
  let centerY = height / 2;
  
  for (let i = 0; i < cols; i++) {
    let x = spacing * (i + 1);
    // Vertikale Wellenbewegung
    let yOffset = sin(phase + i * 0.5) * 100;
    let y = centerY + yOffset;
    
    // Distanz zur Maus
    let distanz = dist(mouseX, mouseY, x, y);
    let threshold = 200; // Schwellenwert für Mausinteraktion
    
    // Grundfarbe: Kühl-Blau (220)
    let hue = 220;
    let groesse = baseGroesse;
    
    // Wenn Maus in der Nähe: Übergang zu Rot und Pulsieren
    if (distanz < threshold) {
      // Übergang von Blau (220) zu Rot (0)
      hue = map(distanz, 0, threshold, 0, 220);
      // Größe und Pulsieren
      let pulsieren = sin(frameCount * 0.2) * 20;
      groesse = map(distanz, 0, threshold, baseGroesse * 2, baseGroesse) + pulsieren;
    }
    
    /*stroke(hue, 50, 90);
    strokeWeight(2);*/
    noStroke();
    fill(hue, 80, 95, 80);
    
    ellipse(x, y, groesse, groesse);
  }
}
