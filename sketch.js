var ground,groundImage,invisibleg

var runner,runnerAnimation

var obstacle,enemy1img,enemy2img,enemy3img,enemy4img

var enemy1,enemy2,enemy3,enemy4

var won = 2

var play = 1

var end = 0

 var gamestate=play

 var score=0

 var sun,sunImage

 var cloud,cloudImage
 
 var deathsound,jumpsound

 var bg1

 var bullet,bulletimg

 var bullet1,bullet2,bullet3

 var health

  var reset,r1,r2

  var enemyship,enemysimg

  var obstacle

  var award,awardanimation

  var hp=5

  var ehp=10000

  var life,lifeimg

  var bomb,bombimg

  var ammo=1000

  var amimg

function preload(){
groundImage=loadImage("images/main ground.png")
  runnerAnimation= loadAnimation("images/sprite1.png","images/sprite2.png","images/sprite3.png","images/sprite4.png","images/sprite5.png","images/sprite6.png")
  runnerstanding = loadAnimation("images/sprite1.png")
  r1 = loadImage("images/reset1.png")
  r2 = loadImage("images/reset2.png")
  enemysimg = loadImage("images/spaceship.png")
  bullet1 = loadImage("images/enemybullet.png")
  bullet2 = loadImage("images/enemybullet2.png")
  bullet3 = loadImage("images/enemybullet3.png")

 bg = loadImage("images/Main bg.jpg")
 bulletimg = loadImage("images/bullet-png-images-9.png")
 enemy1img=loadImage("images/Enemy 1.png")
  enemy2img=loadImage("images/Enemy2.png")
   enemy3img=loadImage("images/Enemy3.png")
  enemy4img=loadImage("images/Enemy 4.png")
  awardanimation = loadAnimation("images/coin1.png","images/coin2.png","images/coin3.png","images/coin4.png","images/coin3.png","images/coin2.png","images/coin1.png")
  bombimg = loadAnimation("images/bomb1.png","images/bomb2.png","images/bomb3.png","images/bomb4.png","images/bomb3.png","images/bomb2.png","images/bomb1.png")
lifeimg = loadImage("images/life.png")
amimg = loadImage("images/ammo.png")

  

  
  
}

function setup() {
  createCanvas(windowWidth,windowHeight)
bg1 =createSprite(550,300,windowWidth,windowHeight)
bg1.addImage(bg)
bg1.scale=3




invisibleg = createSprite(300,670,600,15)

//enemyship.addImage(enemysimg)
  ground = createSprite(300,670,600,15)
 ground.addImage(groundImage)

runner = createSprite(80,600,50,50)
  runner.addAnimation("runner",runnerAnimation)
  runner.addAnimation("standing",runnerstanding)
runner.scale=1.5

enemyship = createSprite(1150,550,500,500)
enemyship.addImage(enemysimg)
enemyship.scale = 1.7

life = createSprite(120,60,50,50)
life.addImage(lifeimg)
life.scale = 0.25


 
  enemy1g= new Group();
  enemy2g= new Group();
  enemy3g= new Group();
  enemy4g= new Group();
  bulletg= new Group();
  ebulletg = new Group();
  awardg = new Group();
  amg = new Group();
  bombg = new Group();

  reset = createSprite(680,50,50,50)
reset.addImage(r2)
reset.scale = 0.2

}

function draw() {


if(gamestate === play){
  background("white")
  runner.changeAnimation("runner",runnerAnimation)

    bg1.velocityX=-7
    ground.velocityX=-9

    if(bg1.x<600){
      bg1.x=813
      bg1.width=bg1.width/2
    }
  if(ground.x<600){
    ground.x=ground.width/2
  }
console.log(windowWidth)
    
  if(keyDown(RIGHT_ARROW) && ammo >=1) {
        bullet = createSprite(80,620,50,50)
        bullet.y = runner.y
        bullet.addImage(bulletimg)
        bullet.velocityX=40
        bullet.scale=0.03
        bullet.lifetime = 500
        bulletg.add(bullet)
        ammo = ammo-1
    }
    if(keyDown("space")&& runner.y >= 550) {
      runner.velocityY = -18.5;
  
  }
  
  //add gravity
 runner.velocityY = runner.velocityY + 0.8
   
 runner.collide(invisibleg)

 var select_enemy = Math.round(random(1,4))

 if(World.frameCount % 50 === 0 ){
 if(select_enemy === 1 ){
  Enemy1()
  
 } else if(select_enemy === 2 ){
  Enemy2()
 } else if (select_enemy === 3){
  Enemy3()
 } else if (select_enemy ===4  )  {
  Enemy4()
 }}
 
awardf()
 drawSprites();

 if(enemy1g.isTouching(bulletg)){
  enemy1g.destroyEach();
  bulletg.destroyEach();
  score=score +1; 
  ammo = ammo+2 
}
if(enemy2g.isTouching(bulletg)){
  enemy2g.destroyEach();
  bulletg.destroyEach();
  score=score +4; 
  ammo = ammo+4 
}
if(enemy3g.isTouching(bulletg)){
  enemy3g.destroyEach();
  bulletg.destroyEach();
  score=score +15;  
  ammo = ammo+8
}
if(enemy4g.isTouching(bulletg)){
  enemy4g.destroyEach();
  bulletg.destroyEach();
  score=score +25;  
  ammo = ammo+15
}
if(bulletg.isTouching(enemyship)){
 ehp = ehp-10
  score=score +30; 
 
}

if(awardg.isTouching(runner)){
  
  awardg.destroyEach()
  var ra= Math.round(random(1,2));
  switch(ra) {
    case 1: hp = hp+2
            break;
    case 2: ammo = ammo+25
            break;
}
}

if(amg.isTouching(runner)){
  ammo = ammo+150
  amg.destroyEach()
}

if(enemy1g.isTouching(runner) ||enemy2g.isTouching(runner) || enemy3g.isTouching(runner) || enemy4g.isTouching(runner) || ebulletg.isTouching(runner)  ){
 hp=hp-1
 enemy1g.destroyEach()
 enemy2g.destroyEach()
 enemy3g.destroyEach()
 enemy4g.destroyEach()
 ebulletg.destroyEach()

}
if(hp===0){
  gamestate = end
}


if(ehp===0){
  gamestate = won

 
}


textSize(30)
fill("white")
text("Score: "+ score,170,30);
fill("red")
text("Lives: "+ hp,170,60);
text("BOSS: "+ ehp,1000,30);
fill("yellow")
text("AMMO:  "+ ammo,170,90);
bombf()
obstacles()
amf()
}
else if(gamestate === end){
  
  reset.visible = true;
  if(mousePressedOver(reset)){
    reset1();
  }
  ground.velocityX=0
  runner.changeAnimation("standing",runnerstanding)
  enemy1g.setVelocityEach(0)
  enemy2g.setVelocityEach(0)
  enemy3g.setVelocityEach(0)
  enemy4g.setVelocityEach(0)
  
  
textSize(50)
fill("red")
  text("Game Over!!!!",550,350);

 
}

if(gamestate === won){
  background("black")
  ground.velocityX=0
  runner.changeAnimation("standing",runnerstanding)
  enemy1g.setVelocityEach(0)
  enemy2g.setVelocityEach(0)
  enemy3g.setVelocityEach(0)
  enemy4g.setVelocityEach(0)

  
textSize(50)
fill("gold")
  text("YOU WON!!!!",550,350);
  
}
  }


  






function Enemy1(){
  enemy1 = createSprite(Math.round(random(500,1100)),600,50,50)
  enemy1.addImage(enemy1img)
  enemy1.velocityX=-10
  enemy1.scale=0.9
  enemy1.depth=ground.depth+1
   enemy1.lifetime=90
 enemy1g.add(enemy1);

}

function Enemy2(){
  enemy2 = createSprite(Math.round(random(500,1100)),600,50,50)
  enemy2.addImage(enemy2img)
  enemy2.velocityX=-15
  enemy2.scale=0.9
  enemy2.depth=ground.depth+1
   enemy2.lifetime=90
 enemy2g.add(enemy2);
}

function Enemy3(){
  enemy3 = createSprite(Math.round(random(500,1100)),600,50,50)
  enemy3.addImage(enemy3img)
  enemy3.velocityX=-20
  enemy3.scale=0.9
  enemy3.depth=ground.depth+1
   enemy3.lifetime=90
 enemy3g.add(enemy3);
}

function Enemy4(){
  enemy4 = createSprite(Math.round(random(500,1100)),600,50,50)
  enemy4.addImage(enemy4img)
  enemy4.velocityX=-24
  enemy4.scale=0.7
  enemy4.depth=ground.depth+1
   enemy4.lifetime=90
 enemy4g.add(enemy4);
}

function obstacles() {
  if(frameCount % 125===0){
    obstacle=createSprite(1050,610,50,50)
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(bullet1);
              break;
      case 2: obstacle.addImage(bullet2);
              break;
       case 3: obstacle.addImage(bullet3);
               break;        
              default:break;
    }
    obstacle.velocityX=-17
    obstacle.scale = 0.5
    ebulletg.add(obstacle);
  }









  }
  function awardf(){
 
    if (frameCount % 100 === 0) {
    award=createSprite(1000,400,40,40)
    award.addAnimation("award",awardanimation)
    award.scale=0.4
      award.velocityX=-7
       //assign lifetime to the variable
      award.lifetime = 200
awardg.add(award);
  }
  
  }

  function amf(){
 
    if (frameCount % 220 === 0) {
    am=createSprite(1200,400,40,40)
    am.addImage(amimg)
    am.scale=0.2
      am.velocityX=-7
       //assign lifetime to the variable
      am.lifetime = 200
amg.add(am);
  }
  
  }

  function bombf(){
 
    if (ehp < 9500 && gamestate === play) {
    bomb=createSprite(1200,600,40,40)
    bomb.addAnimation("bomb",bombimg)
    bomb.scale=1
   
       //assign lifetime to the variable
     // if(World.frameCount % 40=== 0){
      //  bombg.destroyEach()
     // }
bombg.add(bomb);
  }else{
    bombg.destroyEach()
  }
  
  }

  function reset1(){
    gamestate = play
    ehp = 10000
    hp = 5
    score = 0
    ammo = 1000
    runner.changeAnimation("running",runnerAnimation)
  }