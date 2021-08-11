class Submarine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, wid, len) {
        super(scene, x, y, texture, frame, wid, len);

        this.width = wid;
        this.height = len;
        // add objects to scene
        scene.add.existing(this);
        this.moveSpeed = 10;
    }

    update() {
        if (keyLEFT.isDown && this.x > borderUISize + borderPadding/2) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= 5*60 + borderUISize + borderPadding/2) {
            this.x += this.moveSpeed;
        }
    }
}