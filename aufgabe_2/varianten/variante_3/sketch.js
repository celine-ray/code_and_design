let pulseFactor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 50);
  
  // Update pulse animation
  pulseFactor = sin(frameCount * 0.05) * 20;

  for(let i = 0; i < 10; i++) {
    let circleX = i * 200;
    let circleY = height/2;
    let distanz = dist(mouseX, mouseY, circleX, circleY);
    let yPos = map(distanz, 0, width, -300, 300);
    let durchmesser = map(distanz, 0, width / 2, 10, 300);
    
    // Check if mouse is hovering
    let isHovering = distanz < 100;
    
    // Base circle
    stroke(50);
    noFill();
    ellipse(circleX, circleY, 200 + pulseFactor, 200 + pulseFactor);
    
    // Interactive circle
    if (isHovering) {
      fill(255, 0, 0, 100);
      stroke(255, 0, 0);
      ellipse(circleX, circleY - yPos, durchmesser + 50, durchmesser + 50);
    } else {
      noFill();
      stroke(255);
      ellipse(circleX, circleY - yPos, durchmesser + pulseFactor, durchmesser + pulseFactor);
    }
  }
}
