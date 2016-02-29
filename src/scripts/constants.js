'use strict';

/*
 * Constants used in the whole game :)
 */

module.exports = {
    /***** directions *****/
    LEFT    : 4, // 100
    CENTER  : 2, // 010
    RIGHT   : 1, // 001
    DOWN    : 8,
    UP      : 16,

    /***** player *****/
    MAX_VELOCITY            :  -800,
    MAX_FUEL                :  100,
    VELOCITY                :  600,
    RESTORE_FACING_DELAY    :  300,
    CONSUME_FUEL_DELAY      :  300,
    SLIDE_DISTANCE          :   20,
    TURBO_DELAY             : 1000,
    ENEMY_FUEL              :  -30,
    GHOST_TIME              : 1000,
    ENEMY_SPAWN_DELAY       : 500,

    /***** cheese, cheese, cheese!! *****/
    CHEESE_FUEL                     :   15,
    CHEESE_RESPAWN_TIMEOUT          : 1500, // miliseconds
    ROTTEN_CHEESE_RESPAWN_TIMEOUT   : 5000, // miliseconds

    /***** backgrounds sprites *****/
    CASTLE_WIDTH            :  320,
    CASTLE_HEIGHT           :  320,
    WINDOW_WIDTH            :   80,
    WINDOW_HEIGHT           :  144,
    WINDOW_SPRITES          :    4,

    /***** player sprite *****/
    PRINCESS_WIDTH: 100,
    PRINCESS_HEIGHT: 140,
    PRINCESS_SPRITES: 3,

    /***** lumberjack sprite *****/
    LUMBERJACK_WIDTH: 168,
    LUMBERJACK_HEIGHT: 124,
    LUMBERJACK_SPRITES: 2,

    /***** wolf sprite *****/
    WOLF_WIDTH: 124,
    WOLF_HEIGHT: 144,
    WOLF_SPRITES: 2,

    /***** hand sprite *****/
    MOVE_DELAY : 10,
    DELAY_BETWEEN_ANIMATIONS: 500,
    ANIMATION_LENGTH: 1000,

    /*** intro sprites ***/
    PRINCE_WIDTH: 250,
    PRINCE_HEIGHT: 185,
    PRINCE_SPRITES: 2,

    HADA_WIDTH: 200,
    HADA_HEIGHT: 150,
    HADA_SPRITES: 4,

    MOUSE_WIDTH: 200,
    MOUSE_HEIGHT: 150,
    MOUSE_SPRITES: 6,

    PRINCESSGRABBED_WIDTH: 400,
    PRINCESSGRABBED_HEIGHT: 300,
    PRINCESSGRABBED_SPRITES: 32,

    PRINCESSLOOKING_WIDTH: 150,
    PRINCESSLOOKING_HEIGHT: 200,
    PRINCESSLOOKING_SPRITES: 2,

    TOWER_WIDTH: 400,
    TOWER_HEIGHT: 300,
    TOWER_SPRITES: 24,

    FLYINGPRINCESS_WIDTH: 200,
    FLYINGPRINCESS_HEIGHT: 150,
    FLYTINGPRINCESS_SPRITES: 6,

    /*** sounds ***/
    SOUNDS: {
        BACKGROUND: "background",
        DIES: "dies",
        CHEESE: "cheese",
        ROTTEN_CHEESE: "rotten_cheese",
        HIT: "hit",
        START: "start",
        INTRO: "intro",
        MENU: "menu"
    },

    SPRITES: {
        WINDOWS: [
            'sprites.window.1',
            'sprites.window.2',
            'sprites.window.3',
            'sprites.window.4'
        ],
        SPEAKER_ON: "sprites.settings.speaker_on",
        SPEAKER_OFF: "sprites.settings.speaker_off",
        CLOSE: "sprites.settings.close",
        RESTART: "sprites.settings.restart",
        CREDITS: "sprites.settings.credits",
        HADA: 'hada'
    },

    BUTTONS: {
        PAUSE: "buttons.pauseButton",
        SETTINGS: "buttons.settings"
    },

    SPEED:{
        TILE: 0.2
    },

    STATES: {
        play: 'play',
        gameOver: 'gameOver'
    },

    TEXT: {
        CREDITS: "- Informal Penguins -" +
        "\n" +
        "\n" +
        "Team:" +
        "\n" +
        "- Hector Benitez" +
        "\n" +
        "- Isaac Zepeda" +
        "\n" +
        "- Porfirio Partida" +
        "\n" +
        "- Thannia Blanchet" +
        "\n" +
        "- tonymtz"
        //ordered by: http://www.online-utility.org/text/sort.jsp
    }
};
