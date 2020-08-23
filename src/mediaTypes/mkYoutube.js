import {message} from "../message";
import {store} from "../store";
import {pauseAllExcept} from "../controls";
import {YouTubePlayer} from "yt-player-es";

export class mkYoutube {

    constructor(item) {

        // Store item data
        this.item = item;

        // Find this element in the DOM
        this.domRef = document.querySelector(this.item.selector);

        // Show error if not found
        this.domRef || message.error.badSelector(this.item.selector, 'mkAudio.constructor()', 'Is this a valid query selector?');

        // Create player
        this.player = new YouTubePlayer(this.item.selector, this.item.config);

        // Try to load the youtube video
        try {
            this.player.load(this.item.config.videoId)
        } catch (e) {
            message.error.couldNotCreateInstance(this.item.name, 'mkYoutube.constructor()', 'Did you supply a video ID?')
        }

        // Register listeners
        this.player.on('playing', () => this.onPlay());
        this.player.on('paused', () => this.onPause());
        this.player.on('ended', () => this.onStop());

    }

    play() {
        this.player.play()
    }

    onPlay() {
        if (store.config.playExclusive) {
            pauseAllExcept(this.item.name)
        }
    }

    pause() {
        this.player.pause()
    }

    onPause() {}

    stop() {
        this.player.stop()
    }

    onStop() {}

}
