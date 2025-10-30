// WICHTIG: Variablen sind Platzhalter für Zahlen. Es wird hier kein Farbwert definiert, sondern erst in function draw()!

//let durchmesser;
//durchmesser=10;
let durchmesser = 10;

let rotwert = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(220);

	// console.log(rotwert);
	
	noStroke();
	fill(255, 0, 0, 128);
	rectMode(CENTER);
	rect(80, 100, 500, 500);

	fill('#80be96ff');
	triangle(30, 75, 58, 20, 86, 75);

	stroke(5);
	strokeWeight(4);
	fill(0, 0, 250, 100);
	//ellipse(400, rotwert, rotwert, rotwert);
	 ellipse(400, 400, durchmesser, durchmesser);

	// 11 = 10 + 1
	// 12 = 11 + 1
	durchmesser = durchmesser + 1;

}

//function mouseClicked() {
//	rotwert = rotwert + 4;
//}