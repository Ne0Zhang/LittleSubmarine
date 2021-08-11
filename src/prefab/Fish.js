class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, wid, len) {
        super(scene, x, y, texture, frame, wid, len);

        // add object to existing scene
        scene.add.existing(this);

        this.width = wid;
        this.height = len;
        this.moveSpeed = 0;
    }

    // keep the variable in the parameter so the fish will spawn
    // at the wanted position.
    update(pos) {
        this.y -= this.moveSpeed;

        if(this.y <= 0 - this.height) {
            this.reset(pos);
        }
    }

    //position reset
    reset(pos) {
        this.y = game.config.height;
        this.x = (pos * 60) + borderUISize + borderPadding/2;
    }
}