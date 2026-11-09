
function setup() {
  createCanvas(600, 300).parent('stage');
}

function draw() {
  background(244, 241, 232);              // paper colour, matches style.css

  // The stamp starts 3x its size and shrinks to normal over 60 frames (about 1 second)
  let s = max(1, 3 - frameCount / 30);

  translate(width / 2, height / 2);       // draw around the centre of the canvas
  scale(s);
  rotate(-0.15);                          // a slight tilt; real stamps are never straight

 //stamp
  noFill();
  stroke(170, 30, 30);                    // stamp red
  strokeWeight(4);
  rect(-120, -35, 240, 70, 6);            // centred box, rounded corners
  noStroke();
  fill(170, 30, 30);
  textAlign(CENTER, CENTER);
  textSize(36);
  text('RECEIVED', 0, 0);

  randomSeed(27);
  fill(244, 241, 232);
  for (let i = 0; i < 120; i++) {
    circle(random(-125, 125), random(-40, 40), random(1, 3));
  }
}
