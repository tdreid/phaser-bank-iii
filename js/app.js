/* global Phaser */

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var cursors;
var ball;

function preload() {
  this.load.image('stars', 'assets/stars.jpg');
  this.load.image('ball', 'assets/ball.png');
  this.load.image('trail', 'assets/blue.png');
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();
  this.add.image(400, 250, 'stars');

  var particles = this.add.particles('trail');

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 0.1, end: 0.2 },
    blendMode: 'ADD'
  });

  ball = this.physics.add.image(400, 100, 'ball');

  ball.setVelocity(0, 0);
  ball.setBounce(1, 1);
  ball.setCollideWorldBounds(true);

  emitter.startFollow(ball);
}

function update(delta) {
  if (cursors.left.isDown) {
    ball.setVelocityX(-300);
  }

  if (cursors.right.isDown) {
    ball.setVelocityX(300);
  }

  if (cursors.up.isDown) {
    ball.setVelocityY(-300);
  }

  if (cursors.down.isDown) {
    ball.setVelocityY(300);
  }
}
