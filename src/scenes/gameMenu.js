class gameMenu extends Phaser.Scene {
	constructor() {
		super("gameMenu");
	}

    preload() {
        this.load.image('background1', './assets/newMenuBackground.png');
        this.load.image('startButton', './assets/newstartbutton.png');
        this.load.image('tutorialButton', './assets/tutorialbuttonnew.png');
        this.load.image('creditsbutton', './assets/creditsbuttonnew.png');
        this.load.audio('sfx_select', './assets/start.wav');
        this.load.audio('button', './assets/select_button.mp3'); 

    }

    create() {
      
        //background image
        this.backgroundImage = this.add.sprite(this.centerX(), this.centerY(), 'background1');

       //start button 
		this.startButton = this.add.sprite(this.centerX(), this.centerY() - 50, 'startButton').setInteractive();
        
        this.startButton.on('pointerdown', function () {
            this.sound.play('sfx_select', {volume: .8});
			this.scene.start('playScene');
		}, this);


        //tutorial button
        this.tutorialButton = this.add.sprite(this.centerX(), this.centerY() + 40, 'tutorialButton').setInteractive();
        
        this.tutorialButton.on('pointerdown', function () {
            this.sound.play('button', {volume: .7});
			this.scene.start('tutorial');
		}, this);

        //credits button
        this.creditsbutton = this.add.sprite(this.centerX(), this.centerY() + 300, 'creditsbutton').setInteractive();
        
        this.creditsbutton.on('pointerdown', function () {
            this.sound.play('button', {volume: .7});
			this.scene.start('credits');
		}, this);
	}



    centerX() {
        return this.sys.game.config.width / 2;
    }
    centerY() {
        return this.sys.game.config.height / 2;
    }

};
