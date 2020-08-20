import {message} from "../message";

export class mkAudio {

    constructor(selector) {

        // Find this element in the DOM
        let domReference = document.querySelector(selector);
        if (!domReference) {
            message.error.badSelector(selector, 'mkAudio.constructor()', 'Is this a valid query selector?')
        } else {
            // Store reference
            self.domReference = domReference;
        }
    }

    play() {
        self.domReference.play()
    }

    pause() {
        self.domReference.pause()
    }

    stop() {
        self.domReference.pause()
    }

}
