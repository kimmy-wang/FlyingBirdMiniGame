import {Sprite} from "../base/Sprite.js";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(image, 0, 0,
            image.width, image.height,
            0, window.innerHeight - image.height,
            image.width, image.height);
        // 陆地的水平位移量
        this.offsetX = 0;
        // 陆地的水平位移速度
        this.offsetSpeed = 2;
    }

    draw() {
        this.offsetX += this.offsetSpeed;
        if (this.offsetX >= (this.img.width - window.innerWidth)) {
            this.offsetX = 0;
        }
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.offsetX,
            this.y,
            this.width,
            this.height);
    }
}