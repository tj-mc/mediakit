import {message} from "../message";
import {store} from "../store";
import {pauseAllExcept} from "../controls";
import Player from "@vimeo/player";

export class mkVimeo {

    constructor(item) {

        this.item = item;

        // Find this element in the DOM
        let domReference = this.find()

        if (!domReference) {
            message.error.badSelector(this.item.selector, 'mkAudio.constructor()', 'Is this a valid query selector?')
        }

        this.domRef = domReference;
        this.player = new Player(domReference)

        this.player.on('play', () => {
            this.onPlay()
        })

        this.player.on('pause', () => {
            this.onPause()
        })

        this.player.on('ended', () => {
            this.onStop()
        })

    }

    find() {
        return document.querySelector(this.item.selector)
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
        this.player.pause()
    }

    onStop() {}

}
