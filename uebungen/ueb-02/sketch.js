let valueSlider;

function setup() {
	createCanvas(windowWidth, windowHeight);

	valueSlider = createSlider(-10, 38, 9);
	valueSlider.position(10, 10);
}

function draw() {
	let inputValue = valueSlider.value();
	
	let inputMin = -10;
	let inputMax = 38;

	let outputMin = 0;
	let outputMax = 255;

	let outputValue = map(inputValue, inputMin, inputMax, outputMin, outputMax);
	//console.log(outputValue);

	background(outputValue);

	//let kreisoutputValue = map(inputValue, inputMin, outputMin, outputMax, inputMax);
	// background 0, kreis 255
	// background 255, kreis 0
	// background 125, kries 125
	// background 100, kreis 155

	fill(255-outputValue);
	noStroke();
	ellipse(width/2, width/2, height, height);
}
