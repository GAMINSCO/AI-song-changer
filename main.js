song1 = "";
song2 = "";

lx = 0;
ly = 0;

rx = 0;
ry = 0;

Lscore = 0;
Rscore = 0;

Song1Playing = "";
Song2Playing = "";

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
//      console.log(result);

      lx = result[0].pose.leftWrist.x
      ly = result[0].pose.leftWrist.y

      rx = result[0].pose.rightWrist.x
      ry = result[0].pose.rightWrist.y

      Lscore = (result[0].pose.keypoints[9].score).toFixed(2);
      Rscore = (result[0].pose.keypoints[10].score).toFixed(2);

//      console.log("left wrist x = ", lx, " left wrist y = ", ly);
//      console.log("right wrist x = ", rx, " right wrist y = ", ry);

//      console.log("L score = ", Lscore);
//      console.log("R score = ", Rscore);
      
   } else {
      console.error("error");
   }
}

function draw() {
   image(video, 0, 0, 500, 400);

   fill("red");
   stroke("red");


   if ( Lscore >= 0.4 ) {
      circle(lx, ly, 10);

      Song1Playing = song1.isPlaying();
      Song2Playing = song2.isPlaying();

      if (Song1Playing == "false" && Song2Playing == "false") {
         song1.play();

         document.getElementById("songName").innerHTML = "Song Playing : Song 1";

      } else if (Song1Playing == "true" && Song2Playing == "false") {

         document.getElementById("songName").innerHTML = "Song Playing : Song 1";

      } else if (Song1Playing == "false" && Song2Playing == "true") {
         song2.stop();
         song1.play();

         document.getElementById("songName").innerHTML = "Song Playing : Song 1";
      }
   }

   if ( Rscore >= 0.4 ) {
   circle(rx, ry, 10);

   Song1Playing = song1.isPlaying();
   Song2Playing = song2.isPlaying();

   if (Song1Playing == "false" && Song2Playing == "false") {
      song2.play();

      document.getElementById("songName").innerHTML = "Song Playing : Song 2";

   } else if (Song1Playing == "false" && Song2Playing == "true") {

      document.getElementById("songName").innerHTML = "Song Playing : Song 2";

   } else if (Song1Playing == "true" && Song2Playing == "false") {
      song1.stop();
      song2.play();

      document.getElementById("songName").innerHTML = "Song Playing : Song 2";
   }
   }
}