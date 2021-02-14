var balloon, balloonIMG;
var Time = 0;
const PLAY = 0;
const END = 1;
var gameState = PLAY;
var spikeGroup;
var ENDIMG;
var restartIMG;
var mus;

function preload() {
  balloonIMG = loadImage("Balloon.png");
  spikeIMG = loadImage("spikes.svg");
  ENDIMG = loadImage("GameOver.png");
  restartIMG = loadImage("Restart.png");
  mus = loadSound("music.mp3");
}

function setup() {
  createCanvas(1075,625);

  mus.loop();

  balloon = createSprite(200, 500, 50, 50);
  balloon.addImage(balloonIMG);
  balloon.scale = 0.2;

  spikeGroup = new Group();
}

function draw() {
  background(255);  

  if(gameState === PLAY){
  balloon.x = mouseX;

  block(balloon,35,35,1);
  block(balloon,765,765,6);

  balloon.setCollider("rectangle",0,0,290,510);

  textSize(20);
  fill(0);
  stroke(0);
  strokeWeight(1);
  text("Time: " + Time,75,65);

  console.log("MouseX: " + mouseX, "MouseY: " + mouseY);

  if(balloon.isTouching(spikeGroup)){
    gameState = END;
    balloon.visible = false;
    spikeGroup.destroyEach();
    
  }


  changeTime();
  spawnSpikes();
}else if(gameState === END){
  image(ENDIMG,20,20,800,600);
  textSize(50);
  fill("orange");
  stroke("orange");
  strokeWeight(2.6);
  text("And You survived " + Time + " Seconds!", 100,550);
  var restartButton = createSprite(940,550);
  restartButton.addImage(restartIMG);
  restartButton.scale = 0.5;
  restartButton.lifetime = 2;
  if(mousePressedOver(restartButton)){
    Time = 0;
    balloon.visible = true;
    restartButton.destroy();
    gameState = PLAY;
  }
}
  drawSprites();
}
function block(e,t,r,i){
  if(i===1){
     if(e.x < t){
       e.x = r
     }
  }else{
    if(e.x > t){
      e.x = r
    }
  }
}

function spawnSpikes(){
  if(Time < 10){
  if(frameCount%80===0){
    var spike = createSprite(random(10,800),0);
    spike.addImage(spikeIMG);
    spike.scale = random(0.25, 0.75);
    spike.velocityY = 3;
    spikeGroup.add(spike);
  }
}else if(Time >= 10 && Time < 30){
  if(frameCount%70===0){
    var spike = createSprite(random(10,800),0);
    spike.addImage(spikeIMG);
    spike.scale = random(0.25, 0.75);
    spike.velocityY = 3;
    spikeGroup.add(spike);
}}else if(Time >= 30){
  if(frameCount%60===0){
    var spike = createSprite(random(10,800),0);
    spike.addImage(spikeIMG);
    spike.scale = random(0.25, 0.75);
    spike.velocityY = 3;
    spikeGroup.add(spike);
}

}


}
function changeTime(){
  if (frameCount%35===0){
    Time = Time + 1;
  }
}