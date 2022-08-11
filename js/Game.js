class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref("gameState");
            gameStateRef.on("value", function(data){
            gameState = data.val();

        });

    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        });

    }

    addSprites(spriteGroup, numberOfSprites, spriteImage, spriteScale){
        var x, y;
        for(var i=0; i<numberOfSprites;i++){
          x = random(width/2+150, width/2-250);
          y = random(-height*4.5, height-400);
    
          var item = createSprite(x, y);
          item.addImage("item", spriteImage);
          item.scale = spriteScale;
          spriteGroup.add(item);
        }
    
      }

    start(){
        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();

        car1 = createSprite(width/2-50, height-100);
        car1.addImage("car1", car1_img);
        car1.scale = 0.07;

        car2 = createSprite(width/2+100, height-100);
        car2.addImage("car2", car2_img);
        car2.scale = 0.07;

        cars = [car1, car2];

        fuel = new Group();
        coin = new Group();

        this.addSprites(fuel, 4, fuelImage, 0.02);
        this.addSprites(coin, 6, coinImage, 0.09);

    }

    handleElements(){
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffects");


    }

    handleFuel(index){
        cars[index].overlap(fuel, function(collector, collected){
            collected.remove;
        });
    }

    handleCoin(index){
        cars[index].overlap(coin, function(collector, collected){
            collected.remove;
        })
    }

    play(){
        this.handleElements();

        Player.getPlayersInfo();
        if(allPlayers!==undefined){
            image(track, 0, -height*5, width, height*6);

            var index = 0;
            for(var p in allPlayers){

                var x = allPlayers[p].positionX;
                var y = height - allPlayers[p].positionY;

                cars[index].position.x = x;
                cars[index].position.y = y;

                if(index + 1 == player.index){
                    stroke(10);
                    fill("red")
                    ellipse(x, y, 60, 60);

                    this.handleFuel(index);
                    this.handleCoin(index);

                    camera.position.x = cars[index].position.x;
                    camera.position.y = cars[index].position.y;

                }

                index = index + 1;
            }

            if(keyDown("up")){
                player.positionY += 10;
                player.update();
            }

            drawSprites();

        }

        
    }
}