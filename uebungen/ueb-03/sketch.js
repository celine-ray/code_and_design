let posX = 0;
let posY = 0;
let threshold = 120; // Grenzwert

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(220, 10);

	// Bedingung muss vor dem Zeichnen der Rechtecks kommen
if(posX < threshold){
	// Farbe vor der Position 120
	fill(255, 0, 0,);
} else {
	// Farbe nach der Position 120
	fill(0, 255, 0);
}

	// Zufallswert für Y-Position
	// frameCount zählt Frames
	// % Modulo
	if(frameCount % 10 == 0) {
		posY = random(-200, 200);
	}

	rect(posX, height / 2 + posY, 50, 50);

	/*
	exakt gleich				posX == 350
	kleiner als					posX < 350
	grösser als					posX > 350
	kleiner oder gleich	posX <= 350 (wahr, falls posX 350 ist)
	grösser oder gleich posX >= 350
	ungleich						poxX != 350 (trifft immer zu, ausser posX hat den Wert von 350)
	*/

	if(posX < (windowWidth - 50)) {
		// falls die Bedingung zutrifft
		posX = posX + 2; // dasselbe wie posX++
	}
}
