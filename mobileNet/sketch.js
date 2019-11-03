let mobilenet;

function modelReady(){
  console.log('Model is ready!');
}
function imageReady(){
  image(puffin, 0, 0, width, height);
  mobilenet.predict(puffin, gotResults);
}
function gotResults(error, results){
  if(error){
    console.log(error);
  }else{
    console.log(results);
    let label = results[0].label;
    let conf = results[0].confidence;
    fill(0);
    textSize(20);
    text(label, 10, height-50);
    createP(label);
    createP(conf);
  }
}

function setup(){
  createCanvas(640, 480);
  puffin = createImg('puffin.jpg', imageReady);
  puffin.hide();
  background(0);

  mobilenet = ml5.imageClassifier('MobileNet', modelReady);

}
