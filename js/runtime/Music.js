import {DataStore} from "../base/DataStore.js";

/**
 * 背景音乐类
 */
export class Music {
    constructor() {
		this.audio = DataStore.getInstance().res.get('audio_bgm');
    }

    play() {
        if (this.audio) {
            this.audio.play();
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
        }
    }

	destroy() {
        if (this.audio) {
			this.audio.destroy();
        }
    }

	seek(position) {
		if (this.audio) {
			this.audio.seek(position);
		}
	}

}