import {message} from "../message";
import {store} from "../store";
import {pauseAllExcept} from "../controls";

export class mkHtml5 {

    constructor(item) {

        this.item = item;

        // Find this element in the DOM
        let domReference = this.find()

        if (!domReference) {
            message.error.badSelector(this.item.selector, 'mkAudio.constructor()', 'Is this a valid query selector?')
        }

        this.domRef = domReference;

        this.domRef.addEventListener('play', ()=>{
            this.onPlay()
        });

        this.domRef.addEventListener('pause', ()=>{
            this.onPause()
        });

        this.domRef.addEventListener('ended', ()=>{
            this.onStop()
        });
    }

    find() {
        return document.querySelector(this.item.selector)
    }

    play() {
        this.domRef.play()
    }

    onPlay() {
        if (store.config.playExclusive) {
            pauseAllExcept(this.item.name)
        }
    }

    pause() {
        this.domRef.pause()
    }

    onPause() {}

    stop() {
        this.domRef.pause()
    }

    onStop() {}

}
