let mobilenet;
let video;
let label;
let classifier;
let ukeButton;
let whistleButton;
let trainButton;
function modelReady(){
  console.log('Model is ready!');
  mobilenet.predict(gotResults);
}
function videoReady(){
  console.log('Video is ready')
}
function whileTraining(loss){
  if (loss == null){
    console.log('Training is completed');
    classifier.classify(gotResults);
  }else{
    console.log(loss);}
}
function gotResults(error, results){
  if(error){
    console.log(error);
  }else{
    label = results[0].label;
    console.log(results);
    classifier.classify(gotResults);

  }
}

function setup(){
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();

  background(0);

  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  ukeButton = createButton('ukulele');
  ukeButton.mousePressed(function(){
    classifier.addImage('ukulele');
  });
  whistleButton = createButton('whistle');
  whistleButton.mousePressed(function(){
    classifier.addImage('whistle');
  });
  trainButton = createButton('train');
  trainButton.mousePressed(function(){
    classifier.train(whileTraining);

  })

}
function draw(){
  background(0);
  image(video,0,0);
  fill(255);
  textSize(20);
  text(label, 10, height-20);
}
