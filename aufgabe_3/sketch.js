/**
 * HandPose Boilerplate mit ml5.js
 * 
 * Dieses Sketch erkennt Hände über die Webcam und zeichnet die erkannten Keypoints.
 * Es dient als Ausgangspunkt für eigene Hand-Tracking-Projekte.
 * 
 * Dokumentation: https://docs.ml5js.org/#/reference/handpose
 * 
 * Jede Hand hat 21 Keypoints (0-20):
 * - 0: Handgelenk
 * - 1-4: Daumen
 * - 5-8: Zeigefinger
 * - 9-12: Mittelfinger
 * - 13-16: Ringfinger
 * - 17-20: Kleiner Finger
 */

// Globale Variablen
let handpose;           // Das ml5.js HandPose-Modell
let video;              // Die Webcam
let hands = [];         // Array mit allen erkannten Händen
let ratio;              // Skalierungsfaktor zwischen Video und Canvas
let isModelReady = false; // Flag, ob das Modell geladen und Hände erkannt wurden

/**
 * Lädt das HandPose-Modell vor dem Setup
 * Diese Funktion wird automatisch vor setup() ausgeführt
 */
function preload() {
  handpose = ml5.handPose();
}

/**
 * Initialisiert Canvas und Webcam
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Performanceoptimierung
  
  // Webcam einrichten
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Versteckt das Standard-Video-Element
  
  // Berechne Skalierungsfaktor für Video-zu-Canvas-Anpassung
  ratio = width / video.width;
  
  // Starte Hand-Erkennung
  handpose.detectStart(video, gotHands);
}

/**
 * Hauptzeichnungs-Loop
 */
function draw() {
  background(0);

  // Spiegle die Darstellung horizontal (für intuitivere Interaktion)
  push();
  translate(width, 0);
  scale(-1, 1);

  //Zeige das Video (optional)
  // image(video, 0, 0, video.width * ratio, video.height * ratio);
  
  // Zeichne nur, wenn das Modell bereit ist und Hände erkannt wurden
  if (isModelReady) {
    drawHandPoints();
    
    // HIER KÖNNEN EIGENE/Andere ZEICHNUNGEN Oder Interaktionen HINZUGEFÜGT WERDEN
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      
      // Definiere die Verbindungen zwischen Keypoints (Knochen der Hand)
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],       // Daumen
        [0, 5], [5, 6], [6, 7], [7, 8],       // Zeigefinger
        [0, 9], [9, 10], [10, 11], [11, 12],  // Mittelfinger
        [0, 13], [13, 14], [14, 15], [15, 16],// Ringfinger
        [0, 17], [17, 18], [18, 19], [19, 20] // Kleiner Finger
      ];
      
      // Zeichne die Verbindungen zwischen Keypoints
      stroke(200, 200, 200); // Hellgraue Linien
      strokeWeight(2);
      for (let conn of connections) {
        let p1 = hand.keypoints[conn[0]];
        let p2 = hand.keypoints[conn[1]];
        line(p1.x * ratio, p1.y * ratio, p2.x * ratio, p2.y * ratio);
      }
      
      // Durchlaufe alle 21 Keypoints einer Hand
      for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        
        // Fingerspitzen sind die Keypoints: 4, 8, 12, 16, 20
        let isFingertip = [4, 8, 12, 16, 20].includes(j);
        
        if (isFingertip) {
          // Fingerspitzen in rot
          fill(255, 0, 0);
        } else {
          // Andere Keypoints in grün
          fill(0, 255, 0);
        }
        
        noStroke();
        circle(keypoint.x * ratio, keypoint.y * ratio, 10);
      }
    }

    // Angenommen, du hast die erste erkannte Hand
    if (hands.length > 0) {
      let hand = hands[0];
      let thumbTip = hand.keypoints[4];

      // Jetzt kannst du die Koordinaten nutzen:
      // Daumenspitze zeichnen
      let x = thumbTip.x * ratio;  // X-Position auf dem Canvas
      let y = thumbTip.y * ratio;  // Y-Position auf dem Canvas
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 50, 50); // Zeichne einen Kreis auf der Daumenspitze
      // Zeichne einen roten Kreis auf der Zeigefingerspitze
      let indexTip = hand.keypoints[8];
      let ix = indexTip.x * ratio;
      let iy = indexTip.y * ratio;
      fill(255, 0, 0);
      noStroke();
      ellipse(ix, iy, 50, 50); // Zeichne einen Kreis auf der Zeigefingerspitze
      //console.log(`Daumenspitze: ${x}, ${y}`);
      //console.log(`Zeigefingerspitze: ${ix}, ${iy}`);
    }

    // Zeichne Kreis zwischen den Händen
    drawDistanceCircle();
  }
  
  pop();
}

/**
 * Callback-Funktion für HandPose-Ergebnisse
 * Wird automatisch aufgerufen, wenn neue Hand-Daten verfügbar sind
 * 
 * @param {Array} results - Array mit erkannten Händen
 */
function gotHands(results) {
  hands = results;
  
  // Setze Flag, sobald erste Hand erkannt wurde
  if (hands.length > 0) {
    isModelReady = true;
  }
}

/**
 * Zeichnet alle erkannten Hand-Keypoints
 * Jede Hand hat 21 Keypoints (siehe Kommentar oben)
 */
function drawHandPoints() {
  // Durchlaufe alle erkannten Hände (normalerweise max. 2)
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    
    // Durchlaufe alle 21 Keypoints einer Hand
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      
      // Zeichne Keypoint als grüner Kreis
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x * ratio, keypoint.y * ratio, 10);
    }
  }
}

/**
 * Zeichnet einen gelben Kreis zwischen den beiden Händen
 * Die Größe des Kreises hängt vom kleinsten Abstand zwischen allen Fingerspitzen ab
 */
function drawDistanceCircle() {
  // Überprüfe, ob zwei Hände erkannt wurden
  if (hands.length === 2) {
    let hand1 = hands[0];
    let hand2 = hands[1];
    
    // Nimm das Handgelenk (Keypoint 0) als Referenzpunkt für jede Hand
    let wrist1 = hand1.keypoints[0];
    let wrist2 = hand2.keypoints[0];
    
    // Berechne die Positionen auf dem Canvas
    let x1 = wrist1.x * ratio;
    let y1 = wrist1.y * ratio;
    let x2 = wrist2.x * ratio;
    let y2 = wrist2.y * ratio;
    
    // Berechne den Abstand zwischen den Handgelenken
    let wristDistance = dist(x1, y1, x2, y2);
    
    // Array der Fingerspitzen-Keypoints: 4, 8, 12, 16, 20
    const fingertipIndices = [4, 8, 12, 16, 20];
    
    // Finde den kleinsten Abstand zwischen allen Fingerspitzen-Paaren
    let minFingertipDistance = Infinity;
    
    for (let i of fingertipIndices) {
      let tip1 = hand1.keypoints[i];
      let tip2 = hand2.keypoints[i];
      
      let tipX1 = tip1.x * ratio;
      let tipY1 = tip1.y * ratio;
      let tipX2 = tip2.x * ratio;
      let tipY2 = tip2.y * ratio;
      
      let tipDistance = dist(tipX1, tipY1, tipX2, tipY2);
      minFingertipDistance = min(minFingertipDistance, tipDistance);
    }
    
    // Verwende den kleineren Abstand (Fingerspitzen oder Handflächen)
    let distance = min(wristDistance, minFingertipDistance);
    
    // Berechne die Mitte zwischen den Handgelenken
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2;
    
    // Zeichne einen gelben Kreis in der Mitte
    // Die Größe ist proportional zum Abstand (mit Faktor 0.5 für bessere Skalierung)
    fill(255, 255, 0); // Gelb
    noStroke();
    circle(midX, midY, distance * 0.5);
  }
}