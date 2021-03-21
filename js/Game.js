class Game {
    constructor() {}
    
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", (data)=>{
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    async start() {
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        basketGroup = new Group();
        basket1 = createSprite(100, 200);
        basket1.addImage("basket1", basketImage);
        basket2 = createSprite(200, 200);
        basket2.addImage("basket2", basketImage);
        basketGroup.add(basket1);
        basketGroup.add(basket2);
        baskets = [basket1, basket2];
    }

    play() {
        form.hide();
        background(backdrop);
        textSize(30);
        fill("lime");
        text("Game start!", 200, 150);
        Player.getPlayerInfo();
        fruitsGroup = new Group();
        drawSprites();
        if(allPlayers !== undefined) {
            var index = 0;
            var x = 150;
            var y = 560;
            var colour;
            for(var plr in allPlayers) {
                index += 1;
                x = allPlayers[plr].distance;
                baskets[index-1].x = x;
                baskets[index-1].y = y;
                if(index === player.index) {
                    colour = color("red");
                } else {
                    colour = color("black");
                }
                fill(colour);
                text(allPlayers[plr].name + ": " + allPlayers[plr].fruits, baskets[index-1].x - 20, baskets[index-1].y + 15);
            }
            if(keyIsDown(RIGHT_ARROW) && player.index !== null) {
                player.distance += 10;
                player.updateNameDistanceFruits();
            }
            if(keyIsDown(LEFT_ARROW) && player.index !== null) {
                player.distance -= 10;
                player.updateNameDistanceFruits();
            }
        }
        if(frameCount % 30 === 0) {
            var fruits = createSprite(random(50, 1220), 0, 100, 100);
            fruits.velocityY = 6;
            fruits.debug = true;
            var randSwitch = Math.round(random(1, 5));
            switch(randSwitch) {
              case 1: fruits.addImage("melon", melonImage);
              break;
              case 2: fruits.addImage("apple", appleImage);
              break;
              case 3: fruits.addImage("orange", orangeImage);
              break;
              case 4: fruits.addImage("banana", bananaImage);
              break;
              case 5: fruits.addImage("pineapple", pineappleImage);
              break;
            }
            fruitsGroup.add(fruits);
            fruits.lifetime = 110;
          }
        /*  
          if(player.index !== null) {
            console.log("hello1");
            for(var i = 0; i < fruitsGroup.length; i++) {
                console.log("hello2");
                if(fruitsGroup.get(i).isTouching(baskets)) {
                    console.log("hello3");
                    player.fruits += 1;
                    player.updateNameDistanceFruits();
                    fruitsGroup.get(i).destroy();
                }
            }
        }
        */
    }
}