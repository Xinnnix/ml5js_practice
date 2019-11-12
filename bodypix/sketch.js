let bodypix;
let video;
let segmentation;
let img;
let scl= 20;
let cols, rows;

const options = {
    "outputStride": 8, // 8, 16, or 32, default is 16
    "segmentationThreshold": 0.3 // 0 - 1, defaults to 0.5
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    bodypix = ml5.bodyPix(video, modelReady);
    
    cols = width/scl;
    rows = height/scl;
}

function modelReady() {
    console.log('model is ready!')
    bodypix.segment(gotResults, options)
}

function gotResults(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    //console.log(result);
    segmentation = result;

    //image(video, 0, 0, width, height);
    background(0);
    //image(segmentation.backgroundMask, 0, 0, width, height);
    //image(segmentation.personMask, 0, 0, width, height);

    bodypix.segment(gotResults, options);

}


function draw() {
    for (var x = 0; x <= cols; x++) {
      for (var y = 0; y <= rows; y++) {
        fill(random(255));
        rect(x*scl, y*scl, scl, scl);
      }
    }
  }