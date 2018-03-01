import {ResourceLoader} from "./base/ResourceLoader.js";
import {Background} from "./runtime/Background.js";
import {DataStore} from "./base/DataStore.js";
import {Director} from "./Director.js";
import {Land} from "./runtime/Land.js";
import {Birds} from "./player/Birds.js";
import {StartButton} from "./player/StartButton.js";
import {Score} from "./player/Score.js";

export class Main {
    constructor() {
		this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourcesFirstLoaded(map));
    }

    onResourcesFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {

        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', Background)
            .put('land', Land)
            .put('birds', Birds)
            .put('startButton', StartButton)
            .put('score', Score);
        this.registerEvents();
        this.director.createPencil();
        this.director.run();
    }

    registerEvents() {
		wx.onTouchStart(
            () => {
                if (!this.director.isGameOver) {
                    this.director.birdBindEvent();
                } else {
                    this.init();
                }
            }
        )
    }
}