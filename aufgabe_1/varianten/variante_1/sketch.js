function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

let strokeSlider;
let groesseSlider;
let moreCircles; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeSlider = createSlider (0,255,10);
  strokeSlider.position(50,50);
  
  groesseSlider = createSlider (0,255,10);
  groesseSlider.position(50,100);
  background('#dff7ff');
  
  // moreCircles = createSlider (0,255,10);
  // moreCircles.position (50,75);
}

function draw() {
	// wiese
	noStroke();
	fill(105,163,0);
	rect(0, height - 50, width, 55);

	// blueten 
  stroke(240,240,240);
	fill(255,255,255);
  let groesse=groesseSlider.value();
  ellipse(windowWidth/2-100, windowHeight/2, groesse);
  ellipse(windowWidth/2+100, windowHeight/2, groesse);
  ellipse(windowWidth/2, windowHeight/2-100, groesse);
  ellipse(windowWidth/2, windowHeight/2+100, groesse);

	noStroke();
	fill('#ffc501');
  let laenge=strokeSlider. value();
  ellipse(windowWidth/2, windowHeight/2, laenge);
}