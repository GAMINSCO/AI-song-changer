song1 = "";
song2 = "";

lx = 0;
ly = 0;

rx = 0;
ry = 0;

function preload() {
song1 = loadSound("music1.mp3");
song2 = loadSound("music2.mp3");
}

function setup() {
   Canvas = createCanvas(500, 400);
   Canvas.position(440, 220);

   video = createCapture(VIDEO);
   video.hide()

   poseNet = ml5.poseNet(video, modelloaded);
   poseNet.on('pose', gotPoses);
}

function modelloaded() {
   console.log("model is loaded");
}

function gotPoses(result) {
   if(result.length > 0) {
      console.log(result);

      lx = result[0].pose.leftWrist.x
      ly = result[0].pose.leftWrist.y

      rx = result[0].pose.rightWrist.x
      ry = result[0].pose.rightWrist.y

      console.log("left wrist x = ", lx, " left wrist y = ", ly);
      console.log("right wrist x = ", rx, " right wrist y = ", ry);
      
   } else {
      console.error("error");
   }
}

function draw() {
   image(video, 0, 0, 500, 400);

   fill("red");
   circle(lx, ly, 10);
   circle(rx, ry, 10);
}