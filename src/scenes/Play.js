let invulnerable = false;
class Play extends Phaser.Scene {
    
    constructor() {
        super("playScene"); 
    }

    preload() {
        // load images/tiles
        this.load.image('submarine', './assets/Submarine.png');
        this.load.image('submarineL', './assets/SubmarineL.png');
        this.load.image('submarine2', './assets/Submarine2.png');
        this.load.image('submarineL2', './assets/Submarine2L.png');
        this.load.image('ocean', './assets/ocean.png');
        this.load.image('bubble', './assets/bubble.png');
        this.load.image('heart', './assets/heart.png');
        this.load.audio('music','./assets/Music.mp3');
        this.load.audio('fish_collision', './assets/Collision.wav');
        this.load.audio('game_over_sfx', './assets/sfx_explosion.wav');

        // load spritesheet
        this.load.spritesheet('fish', './assets/FishSwim.png', {
            frameWidth: 48, 
            frameHeight: 24, 
            startFrame: 0, 
            endFrame: 3
        });
        
    }
    

    create() {
        this.backgroundMusic = this.sound.add("music", {volume: .5, loop: true}); 
        this.backgroundMusic.play(); 
        this.fishCollide = this.sound.add("fish_collision", {volume: .5});
        this.deathSound = this.sound.add('game_over_sfx', {volume: .5}); 
        this.ocean = this.add.tileSprite(0, 0, 480, 640, 'ocean').setOrigin(0,0);
        this.bubble = this.add.tileSprite(0, 0, 480, 640, 'bubble').setOrigin(0,0);

        // animation config 

        this.anims.create({
            key: 'swim', 
            frames: this.anims.generateFrameNumbers('fish', {start: 0, end: 3}), 
            repeat: -1,
            frameRate: 10
        });

        

        // // Shows heart on screen. Dont remember how to just add images so I just copied the Submarine one and
        // // the heart is currently top left corner. dont know how to move it :/  - Sam 
        // // Instead of a physical heart, we could do a submarine picture x #oflives, like Mario.
        // this.lives = new Submarine(this, borderPadding, borderPadding, 'heart', 0, 30, 30).setOrigin(1, 0.5);
    
        //add sub (p1)
        this.p1Sub = new Submarine(this, game.config.width/2, borderUISize - 42, 'submarine', 0, 42, 28).setOrigin(0, 0);
        this.lives = 3;
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        

        // add 3 fish at different locations;
        this.fish1 = new Fish(this, (0 * 60) + borderUISize + borderPadding/2, game.config.height, 'fish', 0, 48, 24).setOrigin(0, 0);
        this.fish1.anims.play('swim');
        this.fish2 = new Fish(this, (1 * 60) + borderUISize + borderPadding/2, game.config.height, 'fish', 0, 48, 24).setOrigin(0, 0);
        this.fish2.anims.play('swim');
        this.fish3 = new Fish(this, (4 * 60) + borderUISize + borderPadding/2, game.config.height, 'fish', 0, 48, 24).setOrigin(0, 0);
        this.fish3.anims.play('swim');
        this.fish4 = new Fish(this, (5 * 60) + borderUISize + borderPadding/2, game.config.height, 'fish', 0, 48, 24).setOrigin(0, 0);
        this.fish4.anims.play('swim');

        // Display Timer
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(game.config.width - borderPadding, game.config.height - borderPadding, 
            this.p1Score, scoreConfig).setOrigin(1,0.5);
 

        // Timer for the game -Neo
        this.timer = this.time.addEvent({
            delay: 75,
            callback: this.addScore,
            callbackScope: this,
            loop: true
        })

         // Adds Player Lives on the bottom 
        this.livesLeft  = this.add.text(game.config.width - borderPadding, game.config.height - borderPadding, 
            this.lives, scoreConfig).setOrigin(4.25,0.5);
        this.heart = this.add.image(game.config.width - borderPadding, game.config.height - borderPadding, 
            'heart').setOrigin(4.5,0.5);

    }

    update(time, delta) {
        if (this.lives != 0) {
             // Scrolling Background
            this.ocean.tilePositionY += (5 + Math.floor(this.p1Score/1000)*0.05);
            this.bubble.tilePositionY += (4.5 + Math.floor(this.p1Score/1000)*0.05);
            
            // The array will contain number position for the fish,
            // when the fish reach the top, the array will hold different number
            var arr1 = [];
            if (this.fish1.y <= borderUISize - this.fish1.height + 1) {
                arr1 = this.generateRandom();
            }
            
            this.p1Sub.update();

            this.fish1.update(arr1[0]);
            this.fish1.moveSpeed = 5 + Math.floor(this.p1Score/100)*0.05;

            this.fish2.update(arr1[1]);
            this.fish2.moveSpeed = 5 + Math.floor(this.p1Score/100)*0.05;

            this.fish3.update(arr1[2]);
            this.fish3.moveSpeed = 5 + Math.floor(this.p1Score/100)*0.05;

            this.fish4.update(arr1[3]);
            this.fish4.moveSpeed = 5 + Math.floor(this.p1Score/100)*0.05;

            this.livesLeft.text = this.lives;

            // Time = Score

            // check collisions  //we need to add a reset in sub.js  //add if life count is lower than 1, then have it explode.
            // console.log("Invuln status: " + invulnerable);
            if (!invulnerable) {
                if (keyLEFT.isDown) {
                    this.p1Sub.setTexture('submarineL');
                } 
                if (keyRIGHT.isDown) {
                    this.p1Sub.setTexture('submarine');
                }
                if (this.checkCollision(this.p1Sub, this.fish1)) {
                    this.fishCollide.play(); 
                    this.lives -= 1;
                    this.p1Sub.setTexture('submarine2');
                    console.log("Fish 1 (" + this.lives + ")");
                    invulnerable = true;
                    this.invis = this.time.delayedCall(5000, () => {invulnerable = false, this.p1Sub.setTexture('submarine');}, null, this);
                }
                else if (this.checkCollision(this.p1Sub, this.fish2)) {
                    this.fishCollide.play(); 
                    this.lives -= 1;
                    this.p1Sub.setTexture('submarine2');
                    console.log("Fish 2 (" + this.lives + ")");
                    invulnerable = true;
                    this.invis = this.time.delayedCall(5000, () => {invulnerable = false, this.p1Sub.setTexture('submarine');}, null, this);
                }
                else if (this.checkCollision(this.p1Sub, this.fish3)) {
                    this.fishCollide.play(); 
                    this.lives -= 1;
                    this.p1Sub.setTexture('submarine2');
                    console.log("Fish 3 (" + this.lives + ")");
                    invulnerable = true;
                    this.invis = this.time.delayedCall(5000, () => {invulnerable = false, this.p1Sub.setTexture('submarine');}, null, this);
                }
                else if (this.checkCollision(this.p1Sub, this.fish4)) {
                    this.fishCollide.play(); 
                    this.lives -= 1;
                    this.p1Sub.setTexture('submarine2');
                    console.log("Fish 4 (" + this.lives + ")");
                    invulnerable = true;
                    this.invis = this.time.delayedCall(5000, () => {invulnerable = false, this.p1Sub.setTexture('submarine');}, null, this);
                }
            } else {
                if (keyLEFT.isDown) {
                    this.p1Sub.setTexture('submarineL2');
                } 
                if (keyRIGHT.isDown) {
                    this.p1Sub.setTexture('submarine2');
                }
            }

            // If life is 0, explode and game over
            // Code here
        }
        else {
            this.fish1.anims.stop('swim');
            this.fish2.anims.stop('swim');
            this.fish3.anims.stop('swim');
            this.fish4.anims.stop('swim');
            this.livesLeft.text = this.lives;
            // console.log("Game Over");
            this.timer.remove();
            this.game.sound.stopAll(); 
            this.deathSound.play(); 
            invulnerable = false;
            this.scene.start('gameoverscreen');
        }

    }



    checkCollision(Fish, Submarine) {
        // simple AABB checking
        if( Submarine.x < Fish.x + Fish.width &&
            Submarine.x + Submarine.width > Fish.x &&
            Submarine.y < Fish.y + Fish.height &&
            Submarine.height + Submarine.y > Fish.y) {
            return true;
        } 
        else {
            return false;
        }
    }

    // returns a randopm integer 0 to 5 with no repeat;
    generateRandom() {
        const n = 4;
        const arr = [];
        do {
            const num = Math.floor(Math.random() * 6);

            if (!arr.includes(num)) {
                arr.push(num);
            }
        } while (arr.length < n);
        return arr;
    }

    addScore() {
        this.p1Score += 10;
        this.scoreLeft.text = this.p1Score;
    }

}