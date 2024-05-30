let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log('Model Loaded!');
}

function draw() {
  image(video, 0, 0, width, height);

  if (poses.length > 0) {
    let leftWrist = poses[0].pose.leftWrist;
    let rightWrist = poses[0].pose.rightWrist;

    // Calculate the distance between left and right wrist
    let distance = dist(leftWrist.x, leftWrist.y, rightWrist.x, rightWrist.y);

    // Map the distance to a font size range
    let fontSize = map(distance, 50, 300, 16, 72);
    fontSize = constrain(fontSize, 16, 72);

    // Update the font size of the text
    document.getElementById('dynamic-font-size').style.fontSize = fontSize + 'px';
  }
}
