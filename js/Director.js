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
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if ((pencils[0].x + pencils[0].width) <= 0
                && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').addScore = true;
            }
            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
                && pencils.length === 2) {
                this.createPencil();
            }

            this.dataStore.get('pencils').forEach((value) => {
                value.draw();
            });

            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }
    }

    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y || birds.birdsY[0] <= 0) {
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        for (let i = 0, length = pencils.length; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (score.addScore && (birds.birdsX[0] > pencils[0].x + pencils[0].width)) {
            score.addScore = false;
            score.score++;
        }

    }

    birdBindEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right) {
            s = true;
        }
        return !s;
    }

}