// lobby.js — p5.js

let yourNumber = 4206;
let nowServing = 4201;

function setup() {
  createCanvas(600, 300).parent('stage');

  // Remember visits across pages and sessions
  let visits = Number(localStorage.getItem('visits') || 0) + 1;
  localStorage.setItem('visits', visits);

  if (visits >= 2) {
    yourNumber = yourNumber + visits;   // a new number every visit
    createP('Welcome back. Your number has been reassigned.').parent('notices');
  }
  if (visits >= 3) createP('Have you considered appealing?').parent('notices');
}

function draw() {
  background(244, 241, 232);            // paper colour, matches style.css

  // Every 2 seconds the counter moves on, and skips your number
  if (frameCount % 120 === 0) {
    nowServing++;
    if (nowServing === yourNumber) nowServing++;
  }

  textAlign(CENTER, CENTER);
  fill(30);
  noStroke();
  textSize(18);
  text('NOW SERVING', width / 2, 90);
  textSize(64);
  text(nf(nowServing, 4), width / 2, 150);
  textSize(16);
  text('YOUR NUMBER: ' + yourNumber, width / 2, 220);

  //appeal button
  let overScrew = dist(mouseX, mouseY, 560, 40) < 6;
  cursor(overScrew ? HAND : ARROW);
  fill(overScrew ? 120 : 200);
  circle(560, 40, 8);
}

function mousePressed() {
  if (dist(mouseX, mouseY, 560, 40) < 6) {
    window.location.href = 'appeal.html';
  }
}
