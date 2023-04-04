song1 = "";
song2 = "";

function preload() {
song1 = loadSound("music1.mp3");
song2 = loadSound("music2.mp3");
}

function setup() {
   Canvas = createCanvas(500, 400);
   Canvas.position(440, 220);

   video = createCapture(VIDEO);
   video.hide()
}

function draw() {
   image(video, 0, 0, 500, 400);
}