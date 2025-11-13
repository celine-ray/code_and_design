function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(240);

  // Plan: Durchmesser der Ellipse abhängig von Distanz der Maus
  let durchmesser;
  // Distanz des Zentrums des Ellipse zur Maus messen
  let distanz = dist(mouseX, mouseY, width / 2, height / 2);
  // console.log(distanz);
  durchmesser = map(distanz, 0, width / 2, 10, 500);

  noStroke();
  fill(200, 0, 200, 50);
  ellipse(width / 2, height / 2, durchmesser, durchmesser);
}
