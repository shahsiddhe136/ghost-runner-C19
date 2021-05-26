var towerImg,tower;
var doorImg,door,doorsGroup;
var cbImg , cb , cbsGroup;
var ghost , ghostImg;
var iv, ivsGroup;
var gameState = "play";
var spookySound;

function preload(){
 towerImg = loadImage("tower.png");
 doorImg = loadImage("door.png");
 cbImg = loadImage("climber.png");
 ghostImg = loadImage("ghost-standing.png");
 spookySound = loadSound("spooky.wav");

}

function setup(){
 createCanvas(600,600);
 spookySound.loop();
 tower=createSprite(300,300);
 tower.addImage(towerImg);
 tower.velocityY =1;
 
 ghost=createSprite(200,200,50,50);
 ghost.addImage(ghostImg);
 ghost.scale= 0.3;
 
 doorsGroup = new Group();
 cbsGroup = new Group();
 ivsGroup = new Group();
 
}

function draw (){
 background(0);
if(gameState==="play"){




 
 if(tower.y>400){
 tower.y=300;
 }
  
if(keyDown("left_arrow")){
ghost.x-=3
}

if(keyDown("right_arrow")){
ghost.x+=3
}
 
if(keyDown("space")){
ghost.velocityY =-5;
}
 
ghost.velocityY+=0.8;

if(cbsGroup.isTouching(ghost)){
 ghost.velocityY=0;
}
 
if(ivsGroup.isTouching(ghost)||ghost.y>600){
 ghost.destroy();
 gameState = "end";
}
 
 
 
 spawnDoors();
 
 drawSprites();
}
if(gameState==="end"){
stroke("yellow");
fill("yellow");
textSize(30);
text("Game Over" ,230,250);

}
}

function spawnDoors(){
 if(frameCount%140===0){
  var door = createSprite(200,-50);
  door.addImage(doorImg);
  door.x=Math.round(random(120,400));
  door.velocityY =1;
  
  var cb = createSprite(200,10);
  cb.addImage(cbImg);
  cb.x=door.x;
  cb.velocityY =1;
  
  var iv = createSprite(200,15);
  iv.width=cb.width;
  iv.height = 2;
  iv.x=door.x;
  iv.velocityY =1;
  
  ghost.depth=door.depth;
  ghost.depth+=1;
  
  door.lifetime = 800;
  cb.lifetime = 800;
  iv.lifetime = 800;
  
  doorsGroup.add(door);
  cbsGroup.add(cb);
  ivsGroup.add(iv);
  
 }



}