music1="";
music2="";
song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("danceMusic.mp3");
    song1=loadSound("CheapThrills.mp3");
    song2=loadSound("ThisIsWhatYouCameFor.mp3");
}
function setup(){
   canvas= createCanvas(600,500);
   canvas.position(380,380)
   video= createCapture(VIDEO);
   video.hide();
   poseNet=ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
}
function draw(){
   image(video, 0,0,600,500);
   fill("#0000FF");
stroke("#0000FF");
circle(rightWristX, rightWristY, 20);
if(scoreRightWrist>0){
    
if(rightWristY>0 && rightWristY<100){
    song1.rate(0.5);
    song2.rate(0.5);
    music1.rate(0.5);
    music2.rate(0.5);
    document.getElementById("speed").innerHTML="Speed=0.5 x"
}
else if(rightWristY>100 && rightWristY<200){
    song1.rate(1);
    song2.rate(1);
    music1.rate(1);
    music2.rate(1);
    document.getElementById("speed").innerHTML="Speed=1.0 x"
}
else if(rightWristY>200 && rightWristY<300){
    song1.rate(1.1);
    song2.rate(1.1);
    music1.rate(1.1);
    music2.rate(1.1);
    document.getElementById("speed").innerHTML="Speed=1.5 x"
}
else if(rightWristY>300 && rightWristY<400){
    song1.rate(1.2);
    song2.rate(1.2);
    music1.rate(1.2);
    music2.rate(1.2);
    document.getElementById("speed").innerHTML="Speed=2.0 x"
}
else if(rightWristY>400 && rightWristY<500){
    song1.rate(1.3);
    song2.rate(1.3);
    music1.rate(1.3);
    music2.rate(1.3);
    document.getElementById("speed").innerHTML="Speed=2.5 x"
}
}
if(scoreLeftWrist>0){
    circle(leftWristX,leftWristY,20);
leftWristYNo=Number(leftWristY);
removeDecimal=floor(leftWristYNo);
volume=removeDecimal/500;
document.getElementById("volume").innerHTML="Volume-"+volume;
song.setVolume(volume); 
}
}
function playMusic1(){
    music1.play();
    music1.setVolume(1);
    music1.rate(1);
    music2.stop();
    song1.stop();
    song2.stop();
}
function playMusic2(){
    music2.play();
    music2.setVolume(1);
    music2.rate(1);
    music1.stop();
    song1.stop();
    song2.stop();
}
function playSong1(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    music1.stop();
    music2.stop();
    song2.stop();
}
function playSong2(){
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
    music1.stop();
    song1.stop();
    music2.stop();
}
function modelLoaded(){
    console.log("PoseNet Model Initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score left wrist"+scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("left wrist x position="+leftWristX+"left wrist y position="+leftWristY);
        console.log("right wrist x position="+rightWristX+"right wrist y position="+rightWristY);
    }
}
