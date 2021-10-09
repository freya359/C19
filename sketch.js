var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50, 50);
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.4
  
  spookySound.loop()
}

function spawnDoors(){
  if (frameCount% 140==0){
    door = createSprite(200,50);
    door.addImage("door",doorImg)
    door.velocityY = 3;
    door.x=Math.round(random(120,400))
    doorsGroup.add(door);
    door.lifetime=800
    door.depth=ghost.depth
    ghost.depth=ghost.depth+1

  climber = createSprite(200,110);
  climber.addImage("climber",climberImg)
  climber.velocityY = 3;
  climber.x=door.x
  climbersGroup.add(climber);
  climber.lifetime=800

  invisibleBlock=createSprite(200,110)
  invisibleBlock.width=climber.width
  invisibleBlock.height=2
  invisibleBlock.x=climber.x
  invisibleBlock.velocityY=3
  invisibleBlockGroup.add(invisibleBlock)
  }
}



function draw() {
  background(200);
  if (gameState=="play"){
  if (keyDown("left")){
    ghost.x=ghost.x -3
  }

  if (keyDown("right")){
    ghost.x=ghost.x +3
  }

  if (keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY= ghost.velocityY+0.3
  if(tower.y > 400){
      tower.y = 300
    }
    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY=0 
    }
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
      ghost.destroy()
      gameState="end"

    }
    spawnDoors()
  drawSprites()
}
if (gameState=="end"){
  textSize(30)
  fill("yellow")
    text("Game over",230,250)
    
}
}