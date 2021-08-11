class credits extends Phaser.Scene {
	constructor() {
		super("credits");
	}

    preload() {
        this.load.image('tutorialbackground1', './assets/Donecredits.png');
        this.load.image('MenuButton', './assets/MenuButton.png')
        this.load.audio('button', './assets/select_button.mp3'); 
    }

    create() {
      
        //background image
        this.backgroundImage = this.add.sprite(this.centerX(), this.centerY(), 'tutorialbackground1');

        //back to menu
        this.MenuButton = this.add.sprite(this.centerX()+150, this.centerY() + 275, 'MenuButton').setInteractive();
        
        this.MenuButton.on('pointerdown', function () {
            this.sound.play('button', {volume: .7});
			this.scene.start('gameMenu');
		}, this);
	}



    centerX() {
        return this.sys.game.config.width / 2;
    }
    centerY() {
        return this.sys.game.config.height / 2;
    }

};