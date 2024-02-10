var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var score;
var zombieGroup;
var bullets=50;
var gameState="fight"



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

score=0;
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-65,displayHeight/2-40,30,20)
bg.addImage(bgImg)
bg.scale = 1.35


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-200,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-250,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
bulletGroup=new Group();
    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
if(gameState==="fight"){

}
if(score>=100){
  gameState="win"
}
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet=createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX=20;
  bulletGroup.add(bullet);
  player.addImage(shooter_shooting)
  bullets=bullets-1;
  if(bullets==0){
    fill("yellow")
text("You Ran Out Of Bullets, You Lost")
   
  }
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets==0){
  gameState="bullet"
}

if(zombieGroup.isTouching(bulletGroup)){
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        score=score+5;
        
        } 
  }
 }

// destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 
  
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
    if(heart1.visible==true){
      heart1.visible=false;
      gameState="lost";
    }
  if(heart2.visible==true){
    heart2.visible=false;
    heart1.visible=true;
  }
  if(heart3.visible==true){
    heart3.visible=false;
    heart2.visible=true;
    
  }
  
  
       zombieGroup[i].destroy()
       } 
 }
}
drawSprites();
//calling the function to spawn zombies
enemy();
if(gameState=="lost"){
    swal(
      {
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
    );
  zombieGroup.destroyEach();
  player.destroy();
}
else if(gameState=="win"){
  swal(
    {
    title: `Awesome! Played`,
    text: "You Killed the Zombies Successfully!!...",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Play Again"
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  );
  zombieGroup.destroyEach();
  player.destroy();
}
else if(gameState=="bullet"){
  swal(
    {
    title: `Game Over`,
    text: "Oops you ran out of bullets....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Play Again"
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  );
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}
textSize(50)
fill("blue")
text("Score:"+score,600,60);
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1600),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
