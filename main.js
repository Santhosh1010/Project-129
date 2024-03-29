clownpierce = "";
undertale = "";
playing = "0";
song1status = "false";
song2status = "false";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup()
{
    canvas = createCanvas(650, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function preload()
{
    song1 = loadSound("Clownpierce.mp3");
    song2 = loadSound("Undertale.mp3");
}

function draw()
{
    image(video, 0, 0, 650, 530);
        if(scoreLeftWrist > 0.2){
            fill("#ff0000");
            stroke("#ff0000");
            circle(leftWristX, leftWristY, 20);
            song2.stop();
            if(song1status == "false"){
                song1status = "true";
                console.log(song1status);
                song1.play();
                document.getElementById("song_name").innerHTML = "Song Name = Clownpierce's PVP Music";
            }
        }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreLeftWrist)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightwristY = " + rightWristY);
    }
}

function play1()
{
    if(playing = "2")
    {
        song1.stop();
        song2.stop();
    }
    song1.play();
    playing = "1";
}

function play2()
{
    if(playing = "1")
    {
        song1.stop();
        song2.stop();
    }
    song2.play();
    playing = "2";
}

function stop()
{
    song1.stop();
    song2.stop();
}