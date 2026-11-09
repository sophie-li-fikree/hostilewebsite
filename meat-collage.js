

const PHOTO_COUNT = 12;

const LAYERS = 35;     // how many photo pieces in each pile 
const GRAIN = 4000;    // how many grain specks each frame (0 = no grain)

let photos = [];       // array of photos 
let collage;           // the current pile, drawn once and kept
let clicks = 0;
let releaseAfter;      // how many clicks until the visitor is let go

async function setup() {
  createCanvas(windowWidth, windowHeight).parent('stage');   // fill the browser window

  // Load every photo before starting (p5 2.x: await instead of preload)
  let loading = [];
  for (let n = 1; n <= PHOTO_COUNT; n++) {
    loading.push(loadImage('assets/flesh' + n + '.jpg'));
  }
  photos = await Promise.all(loading);   // photos[0] is flesh1, photos[1] is flesh2 ...

  collage = createGraphics(width, height);
  makeCollage();

  releaseAfter = floor(random(5, 13)); // somewhere from 5 to 12 clicks
}

// Build one new pile of photos into the "collage" layer
function makeCollage() {
  let g = collage;
  g.background(60, 10, 20);            // dark red underneath everything

  for (let i = 0; i < LAYERS; i++) {
    // Pick a random photo number from 1 to PHOTO_COUNT
    let n = floor(random(1, PHOTO_COUNT + 1));
    let img = photos[n - 1];             // the list starts counting at 0

    // Cut a random rectangle out of the photo (the crop)
    let sw = random(0.3, 1) * img.width;
    let sh = random(0.3, 1) * img.height;
    let sx = random(img.width - sw);
    let sy = random(img.height - sh);

    // Where it lands on the canvas, and how big
    // (sizes are a share of the window, so a bigger window gets bigger pieces)
    let dw = random(0.15, 0.45) * width;
    let dh = random(0.15, 0.45) * height;
    let dx = random(-60, width - dw + 60);   // can hang off the edge a little
    let dy = random(-60, height - dh + 60);

    // Half see-through; some pieces get a pink-red cast
    if (random() < 0.4) {
      g.tint(255, 110, 140, random(110, 190));
    } else {
      g.tint(255, random(110, 210));
    }
    g.image(img, dx, dy, dw, dh, sx, sy, sw, sh);
  }
  g.noTint();

  // A red wash over the whole pile
  g.noStroke();
  g.fill(200, 20, 50, 45);
  g.rect(0, 0, width, height);
}

// When the browser window changes size, resize the canvas and make a new pile to fit
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  collage.remove();                        // throw away the old layer
  collage = createGraphics(width, height);
  makeCollage();
}

function draw() {
  image(collage, 0, 0);

  // Grain: tiny specks redrawn every frame, so it flickers like a screen
  strokeWeight(1.5);
  for (let i = 0; i < GRAIN; i++) {
    stroke(random(255), random(40, 90));
    point(random(width), random(height));
  }
}

function mousePressed() {
  // Only count clicks on the collage itself
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

  clicks++;
  makeCollage();

  if (clicks >= releaseAfter) {
    window.location.href = 'index.html';
  }
}
