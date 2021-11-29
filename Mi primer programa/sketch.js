console.log("Oscar Samuel Chong Camero")

var gameState = "stand-by";
var score = 0;
var highscore = 0;
var ship1 = createSprite(200,350,50,50)
ship1.setAnimation("ship_copy_2");
var ship1hp = 250;
var ship1shield = 125;
ship1.depth = 2;
var bound1= createSprite(200,150,400,30);
bound1.visible = false;
var stars = createGroup();
var asteroids = createGroup();

var statsHolder = createSprite(50,325,100,150);
var shieldStats = createSprite(25,344,35,110);
shieldStats.shapeColor="cyan";
var shieldSym = createSprite(25,270,30,30);
shieldSym.setAnimation("shield");

var hullStats = createSprite(75,344,35,110);
hullStats.shapeColor="red";
var hullSym = createSprite(75,270,30,30);
hullSym.setAnimation("hull");


function back(){
  var star = createSprite(randomNumber(0, 400), randomNumber(-200, 0), 5, 5);
  star.shapeColor = "white";
  star.velocityY=5;  
  stars.add(star);
  star.lifetime=120;
  star.depth=1;
  bound1.depth=star.depth;
}
function aster(){
  var gen = randomNumber(0,100);
  if(gen < 15){
    var asteroid = createSprite(randomNumber(0, 400), randomNumber(-200, 0),20,20);
    asteroid.setAnimation("asteroid");
    asteroid.shapeColor = "gray";
    asteroid.velocityY=2;  
    asteroids.add(asteroid);
    asteroid.lifetime=300;
    asteroid.depth=ship1.depth;
  }
}
function draw() {
  background("black");
  createEdgeSprites();
  if(gameState=="stand-by"||gameState=="end"){
    textSize(18);
    fill("red");
    text("Presiona la tecla Espacio para continuar",40,200);
    fill("cyan");
    text("Usa W, A, S y D o las flechas para moverte",35,236);
    fill("white");
    text("¡Evita todos los asteroides que puedas!",45,272);
    fill("yellow");
    text("Se recomienda bajar el volumen",75,312);
    statsHolder.visible = false;
    shieldStats.visible = false;
    shieldSym.visible = false;
    hullStats.visible = false;
    hullSym.visible = false;
    asteroids.visible = false;
    if(keyDown("space")){
      ship1.setAnimation("ship_copy_2");
      ship1hp=250;
      ship1shield=125;
      ship1.x=200;
      ship1.y=350;
      shieldStats.y=344;
      hullStats.y=344;
      score = 0;
      statsHolder.visible = true;
      shieldStats.visible = true;
      shieldSym.visible = true;
      hullStats.visible = true;
      hullSym.visible = true;
      gameState = "playing";
    }
  }
  if(gameState=="playing"){
    score = score+1;
    textSize(18);
    fill("cyan");
    text("Puntos de Armadura: " + ship1hp,180,25);
    back();
    aster();
    if(keyDown("w")||keyDown("up_arrow")){
      ship1.y = ship1.y-10;
    }
    if(keyDown("a")||keyDown("left_arrow")){
      ship1.x = ship1.x-10;
    }
    if(keyDown("s")||keyDown("down_arrow")){
      ship1.y = ship1.y+10;
    }
    if(keyDown("d")||keyDown("right_arrow")){
      ship1.x = ship1.x+10;
    }
    if(ship1.isTouching(asteroids)){
    if(ship1shield==0){
      playSound("sound://category_hits/retro_game_simple_impact_1.mp3");
      ship1hp = ship1hp-2;
      hullStats.y = hullStats.y+0.9;
    }
    else{
      playSound("sound://category_digital/pulse.mp3");
      ship1shield = ship1shield-5;
      shieldStats.y = shieldStats.y+4.4;
      if(ship1shield==0){
        playSound( "sound://category_digital/power_down_1.mp3");
      }
    }
  }
  
  }
  if(ship1hp==0){
    playSound( "sound://category_explosion/8bit_explosion.mp3");
    ship1.setAnimation("explosion");
    ship1hp=-1;
    gameState="end";
  }
  if(gameState=="end"){
    textSize(18);
    fill("orange");
    text("Has fallado, intenta de nuevo",80,175);
  }
  ship1.collide(statsHolder);
  ship1.collide(edges);
  ship1.collide(bound1);
  
  textSize(18);
  fill("red");
  text("Último puntaje : " + score,200,50);
  text("Mejor puntaje : " + highscore,200,82);
  if(score>highscore){
      highscore=score;
    }
  drawSprites();
}
