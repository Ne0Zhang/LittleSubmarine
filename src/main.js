/*
Team Member: Neo Zhang, Sam Luyen, Jan Ning
Title: The Little Submarine
Completion Data:
Creative Tilt:
    Visually, we are pretty proud of how it turned out. It's not too complicated and doesn't feel too clustered.
However, the best part about the visual is the clarity. Aside from the vulnerability which the player
would have to learn by chance when playing or read the instruction, the layout and design is pretty straight-
forward. 
    Technical/Code wise, we are pretty proud of the speed increase system. From the prespective of 
having nevered code for Phaser and not used to it's API, working with Phaser's Time Event class is pretty
frustrating. At least 10-13 hours are spent on fixing and making sure the timer works. The problem I kept
running into was when one part of the function works, another part either stop working or doesn't comply
with the new integrated code. But with the diffculty, I learned something new and now have a better
understanding of the class. The other proud moment is creatively integrating the spawning function. In our game, 
when the fish reaces the top, it's brought back to its starting y poisition. However, we also want it to spawn
at a different x-position so the player is alway met with random posisiton of the fish. The problem with 
random x-position is that some fish will spawn at the same location; worst case is when all 4 fishes spawn at the
same place. My solution was to write a random number generator that store the number into an array, and everytime
generate a random number, it will check if the number has already been stored. If it is, it will generate a new
number. Once we got an array of unique numbers, passed it to the object.update() function and spawn at a new x-pos.
*/

let config = {
    type: Phaser.CANVAS, 
    width: 480,
    height: 640,
    scene: [gameMenu,credits, tutorial, gameoverscreen, Play]
}

let game = new Phaser.Game(config);

// set UI size
let borderUISize = game.config.width / 8; // 60 pixel
let borderPadding = borderUISize / 2;


// Keybindings
let keyLEFT, keyRIGHT, keySPACE; 