var database;
var basketImage, backdrop, melonImage, orangeImage, pineappleImage, appleImage, bananaImage;
var gameState = 0;
var playerCount = 0;
var form, player, game;
var allPlayers;
var fruitsGroup;
var basket1, basket2, baskets, basketGroup;

function preload() {
  basketImage = loadImage("images/basket2.png");
  backdrop = loadImage("images/jungle.jpg");
  melonImage = loadImage("images/melon2.png");
  orangeImage = loadImage("images/orange2.png");
  pineappleImage = loadImage("images/pineapple2.png");
  appleImage = loadImage("images/apple2.png");
  bananaImage = loadImage("images/banana2.png");
}

function setup() {
  createCanvas(1280, 610);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backdrop);

  if(playerCount === 2) {
    game.update(1);
  }
  if(gameState === 1) {
    clear();
    game.play();
  }
}