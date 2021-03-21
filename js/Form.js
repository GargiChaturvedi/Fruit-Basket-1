class Form {
    constructor() {
        this.nameInput = createInput("Name");
        this.playButton = createButton("Begin!");
        this.greeting = createElement("h3"); 
    }

    hide() {
        this.greeting.hide();
    }

    display() {
        var title = createElement("h1");
        title.html("Fruit Basket");
        title.position(200, 30);
        title.style('color', color("yellow"));

        this.nameInput.position(200, 130);
        this.playButton.position(200, 180);

        this.playButton.mousePressed(()=>{
            this.nameInput.hide();
            this.playButton.hide();

            player.name = this.nameInput.value();
            playerCount += 1;
            player.index = playerCount;
            player.updateNameDistanceFruits();
            player.updateCount(playerCount);

            this.greeting.html("Hello " + player.name + "!");
            this.greeting.position(200, 130);
            this.greeting.style('color', color("red"));
        });
    }
}