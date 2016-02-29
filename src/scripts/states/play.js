/*globals require, Phaser*/

'use strict';

var c = require('../constants');

var Princess = require('../prefabs/princess');
var Enemy = require('../prefabs/enemy');
var World = require('../prefabs/world');
var Window = require('../prefabs/window');
var Cheese = require('../prefabs/cheese');
var RottenCheese = require('../prefabs/rottenCheese');
var PrincessSettings = require('../partials/princess_settings');
var utils = require('../utils');

var Play = module.exports = function () {
    Phaser.State.call(this);
};

Play.prototype = Object.create(Phaser.State.prototype);
Play.prototype.constructor = Play;

var princess;
var bgSky;
var cursors;
var turboButton;
var enemyGroup;
var enemiesPerLine;
var castleBg;
var windowBg;
var pauseButton;
var fuelContainer;
var fuelBar;
var cropRect;
var fuelMaxW;
var enemyCreationTimer;
var cheese;
var rottenCheese;
var rottenCheeseTimer;

Play.prototype.create = function () {
    var game = this.game;

    // game

    if (game._debug) {
        game.stage.disableVisibilityChange = true;
        game.debug.start();
    }

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.setBoundsToWorld();

    enemiesPerLine = Math.ceil(this.game.width / 150);
    enemiesPerLine = enemiesPerLine < 3 ? 3 : enemiesPerLine;

    game._world = new World({
        lineSize: enemiesPerLine
    });

    // bg

    bgSky = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg-sky');
    castleBg = game.add.tileSprite(game.world.width / 2 - c.CASTLE_WIDTH / 2, 0, c.CASTLE_WIDTH, game.world.height, 'bg-castle-complete');
    game.physics.enable(castleBg, Phaser.Physics.ARCADE);

    windowBg = new Window(game, game.world.width / 2 - c.WINDOW_WIDTH / 2, c.WINDOW_HEIGHT * 2);

    // UI
    // 30, 5 is the diff for the container into the first px to render the bar.
    var fuelContainerX = 10;
    var fuelContainerY = 15;
    var fuelBarX = 40;
    var fuelBarY = 20;
    var scoreTextX = 10;
    var scoreTextY = 60;

    fuelContainer = this.game.add.sprite(fuelContainerX, fuelContainerY, 'fuel_container');
    fuelBar = this.game.add.sprite(fuelBarX, fuelBarY, 'fuel');

    cropRect = new Phaser.Rectangle(0, 0, fuelBar.width, fuelBar.height);
    fuelMaxW = fuelBar.width;
    fuelBar.crop(cropRect);

    this.scoreText = this.game.add.bitmapText(scoreTextX + 120, scoreTextY, 'scoreFont', '0', 24);
    this.scoreText.smoothed = false;
    this.game.add.bitmapText(scoreTextX, scoreTextY, 'scoreFont', 'score:', 16);

    var pauseButtonX = this.game.width - 62;
    var pauseButtonY = 10;

    pauseButton = this.game.add.sprite(pauseButtonX, pauseButtonY, 'pause_button');
    pauseButton.scale.set(2, 2);
    pauseButton.inputEnabled = true;
    pauseButton.input.useHandCursor = true; //if you want a hand cursor
    pauseButton.events.onInputDown.add(pause, this);

    // Add a input listener that can help us return from being paused
    this.game.input.onDown.add(unpause, this);

    // player

    princess = new Princess(game, game.world.centerX, game.height - c.PRINCESS_HEIGHT, 0);

    cursors = game.input.keyboard.createCursorKeys();
    turboButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // enemies

    enemyGroup = game.add.group();
    enemyCreationTimer = game.time.events.loop(c.ENEMY_SPAWN_DELAY, this.createEnemies, this);

    // cheeses

    cheese = new Cheese(game);

    rottenCheese = new RottenCheese(game);
    rottenCheeseTimer = game.time.create();
    rottenCheeseTimer.add(c.ROTTEN_CHEESE_RESPAWN_TIMEOUT, function () {
        this.reSpawn();
    }, rottenCheese);
};

Play.prototype.update = function () {
    // bg

    bgSky.tilePosition.y += this.game._world.velocity / 200;
    bgSky.tilePosition.x += 0.1;

    castleBg.tilePosition.y += this.game._world.velocity / 120;

    windowBg.update();
    cheese.update();

    // controls
    princess.move(cursors.up.isDown, cursors.down.isDown, cursors.left.isDown, cursors.right.isDown);
    if (turboButton.isDown) {
        princess.faster();
    }

    // game control
    this.physics.arcade.overlap(princess, cheese, function (self, cheese) {
        cheese.kill();
        self.addFuel(c.CHEESE_FUEL);
    }, null, this);

    this.physics.arcade.overlap(princess, rottenCheese, function (self, rottenCheese) {
        rottenCheese.kill();
        self.addFuel(-c.CHEESE_FUEL);
    }, null, this);

    this.physics.arcade.overlap(princess, enemyGroup, function (self, enemy) {
        if (!self._isGhost) {
            enemy.kill();
            self.damage();
        }
    }, null, this);

    princess.update();

    cropRect.width = (princess._data.fuel / c.MAX_FUEL) * fuelMaxW;
    fuelBar.updateCrop();

    // enemies
    enemyGroup.forEach(function (enemy) {
        enemy.update();
    });

    enemyCreationTimer.delay = c.ENEMY_SPAWN_DELAY - this.game._world.velocity / 100;

    this.game._world.setVelocity();
    this.scoreText.text = this.game._world.score;

    // debug
    if (this.game._debug) {
        console.log('enemies created: ', enemyGroup.length);
    }
};

Play.prototype.createEnemies = function () {
    var game = this.game,
        enemy; //the enemy (Sprite) to be added.

    enemy = enemyGroup.getFirstExists(false);

    if (!enemy) {
        enemy = new Enemy(game);
        enemyGroup.add(enemy);
    }

    enemy.revive();
    enemy.reset(utils.getRandomIntInclusive(0, game.width), this.game.height + 150);
    this.game._world.update();
};


// ??

function showSettings() {
    this.princessSettings = new PrincessSettings(this.game); // memory leak !!! TODO fix this! or not?
    this.princessSettings.show();
}

function hideSettings() {
    this.princessSettings.hide();
}

function pause() {
    if (!this.game.paused) {
        this.game.paused = true;
        pauseButton.loadTexture('play_button');
        showSettings.call(this);
    }
}

function unpause(event) {
    var unpaused = false;
    if (this.game.paused) {
        if (event) {
            //Coming from clicking the pause button (sends events)
            if (localCollides(event, pauseButton)) {
                unpaused = true;
            }
        } else {
            //Coming from ESC or any other event
            unpaused = true;
        }
        if (unpaused) {
            this.game.paused = false;
            pauseButton.loadTexture('pause_button');
            hideSettings.call(this);
        }
    }
}

function shiftPause() {
    if (!this.game.paused) {
        pause.apply(this);
    }
    else {
        unpause.apply(this);
    }
}

function localCollides(event, sprite) {
    var x = event.x,
        y = event.y;
    return x >= sprite.x && x <= (sprite.x + sprite.width) && y >= sprite.y && y <= sprite.y + sprite.height;
}
