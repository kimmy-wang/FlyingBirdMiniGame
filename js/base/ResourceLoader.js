/**
 * 资源加载器
 */
import {Resources} from "./Resources.js";

export class ResourceLoader {
    constructor() {
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            if (key.indexOf('audio_') === 0) {
                const audio = wx.createInnerAudioContext();
                audio.src = value;
                this.map.set(key, audio);
            } else {
                const image = wx.createImage();
                image.src = value;
                this.map.set(key, image);
            }
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let [key, value] of this.map) {
            if (key.indexOf('audio_') === 0) {
                loadedCount++;
            } else {
                value.onload = () => {
                    loadedCount++;
                    if (loadedCount >= this.map.size) {
                        callback(this.map);
                    }
                }
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}