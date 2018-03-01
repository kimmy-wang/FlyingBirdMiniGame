import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height);

        /**
         * 小鸟的三种状态需要一个数组去存储
         * 小鸟的宽度34，高度是24，上下边距是10，左右是9
         */
        const margin_top = 10;
        const margin_left = 9;
        const birdWidth = 34;
        const birdHeight = 24;
        this.clippingX = [
            margin_left,
            margin_left + birdWidth + margin_left * 2,
            margin_left + birdWidth + margin_left * 2 + birdWidth + margin_left * 2
        ];
        this.clippingY = [margin_top, margin_top, margin_top];
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        const birdX = window.innerWidth / 4;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY, birdY, birdY];
        this.y = [birdY, birdY, birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        //切换小鸟的速度
        const speed = 0.2;
        this.count += speed;
        // 0,1,2
        if (this.index >= 2) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);

        const g = 0.98 / 2.4;
        const offsetY = (g * this.time * (this.time - 30)) / 2;
        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]);

    }
}