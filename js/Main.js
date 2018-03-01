import {ResourceLoader} from "./base/ResourceLoader.js";
import {Background} from "./runtime/Background.js";
import {DataStore} from "./base/DataStore.js";
import {Director} from "./Director.js";
import {Land} from "./runtime/Land.js";
import {Birds} from "./player/Birds.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourcesFirstLoaded(map));
    }

    onResourcesFirstLoaded(map) {
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
            .put('birds', Birds);

        this.director.createPencil();
        this.director.run();
    }
}