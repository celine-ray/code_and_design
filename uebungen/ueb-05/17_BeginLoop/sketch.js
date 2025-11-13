function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 50);
  noFill();
  stroke(255);

  //Studiere mal den Code ab hier. Welche Blöcke wiederholen sich?
  //Welche Werte verändern sich?

  /*let i = 0;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;
  ellipse(i * 200, height / 2, 200, 200);*/

  for(let i = 0; i < 10; i++) {
    // Plan: y Position ist abhängig von Distanz von Maus zu Mitte der Ellipse
    let distanz = dist(mouseX, mouseY, i*200, height/2);
    // map(distanz, 0, width, nach unten, nach oben)
    let yPos = map(distanz, 0, width, -300, 300);

    // Plan: Durchmesser abhängig von Distanz (je näher desto kleiner)
    let durchmesser = map(distanz, 0, width / 2, 10, 300);
    
    // ohne Verschiebungsfaktor
    stroke(50);
    ellipse(i * 200, height / 2, 200, 200);
    // mit Verschiebungsfaktor
    stroke(255);
    ellipse(i * 200, height / 2 - yPos, durchmesser, durchmesser);
  }
}
