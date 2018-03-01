/**
 * 游戏逻辑控制类
 */
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const min = window.innerHeight / 8;
        const max = window.innerHeight / 2;
        const top = min + Math.random() * (max - min);
        this.dataStore.get('pencils').push(new UpPencil({top}));
        this.dataStore.get('pencils').push(new DownPencil({top}));
    }

    run() {
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if ((pencils[0].x + pencils[0].width) <= 0
                && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
            }
            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
                && pencils.length === 2) {
                this.createPencil();
            }

            this.dataStore.get('pencils').forEach((value) => {
                value.draw();
            });

            this.dataStore.get('land').draw();

            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }
    }

}