let model;
let targetLabel = 'C';
//let trainingData = [];
let state = 'collection';

function setup() {
  createCanvas(400, 400);
  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
  };
  model = ml5.neuralNetwork(options);
  //model.loadData('ml5_neuralNetwork_test.json',dataLoaded)
  background(255);
}

function dataLoaded() {
  console.log(model.data)
}

function keyPressed() {
  if (key == 't') {
    state = 'training';
    console.log('starting training.');
    model.normalizeData();

    let options = {
      epochs: 300
    }
    model.train(options, whileTraining, finishedTraining);
  } else if (key == 's') {
    model.saveData('ml5_neuralNetwork_test');
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);

}

function finishedTraining() {

  console.log('finished training.');
  state = 'prediction';
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  };
  if (state == 'collection') {
    let target = {
      label: targetLabel
    };

    model.addData(inputs, target);


    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  } else if (state == 'prediction') {
    model.classify(inputs, gotResults);
  }

}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  stroke(0);
  fill(180, 200, 190);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(results[0].label, mouseX, mouseY);
}