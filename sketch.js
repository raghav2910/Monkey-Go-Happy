var PLAY=1
var END=0
var gameState=PLAY


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50,140,20,50);
  monkey.addAnimation("running", monkey_running);
  

  monkey.scale = 0.09;
  
  ground = createSprite(200,180,600,40);
  ground.x = ground.width /2;
  ground.shapeColor="brown"
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);

   
  score = 0;
  

  
}


function draw() {
  background("lightgreen")
  //displaying score
  text("Survival Time: "+ score, 450,50);
  stroke("black")
  
  
  if(gameState === PLAY){

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
     
    if (ground.x <350){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
      }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnfood();
  
    //spawn obstacles on the ground
    spawnObstacles();
  
    if(FoodGroup.isTouching(monkey)){
        FoodGroup.destroyEach();
    } 
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
 else if (gameState === END) {
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1)  
   
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  monkey.collide(ground);
  
  drawSprites();
}

function spawnfood(){
if(frameCount%80===0){
banana=createSprite(650,120,40,10);
banana.y=Math.round(random(90,170));
banana.addImage(bananaImage); 
banana.velocityX=-(6 + score/100);
banana.scale=0.09;
banana.lifetime=200;
FoodGroup.add(banana);
}
  
}
function spawnObstacles(){
if(frameCount%300===0){
obstacle=createSprite(600,145,10,40)
obstacle.addImage(obstacleImage);
obstacle.velocityX=-(6 + score/100);
obstacle.scale=0.1;
obstacle.lifetime=300;
obstaclesGroup.add(obstacle)  
}
}




