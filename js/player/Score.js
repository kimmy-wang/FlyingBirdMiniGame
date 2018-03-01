import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.score = 0;
        this.addScore = true;
    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ff5df5';
        this.ctx.fillText(
            this.score +' 分',
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 18,
            1000
        )
    }
}