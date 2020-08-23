/**
 * @package mediakitjs
 * @author Tom McIntosh https://github.com/tj-mc
 * @licence MIT
 */

import {mkAudio} from "./mediaTypes/mkAudio.js";
import {mkVideo} from "./mediaTypes/mkVideo";
import {store} from "./store";
import {message} from "./message";
import {pause, pauseAllExcept, play, stop, pauseAll} from "./controls";
import {mkVimeo} from "./mediaTypes/mkVimeo";
import {mkYoutube} from "./mediaTypes/mkYoutube";

/**
 * Create the mediakit
 * @param mediaList
 * @param options
 */
const create = (mediaList, options = {}) => {

    // Make config object to hold user preferences
    store.config = makeConfig(options)

    // Save all the media items to the store.library
    store.library = mediaList;

    let createdElements = 0;

    // Populate the library
    mediaList.forEach(item => {

        // Each item must have at least a selector and type
        item.type || message.error.missingArg('type', 'create', 'Make sure all your media items have a type.');

        // You must specify a query selector for every item
        item.selector || message.error.missingArg('selector', 'create', 'Make sure all your media items have a query selector.');

        // If we didn't get a name, use the selector instead
        item.name || (item.name = item.selector);

        // Try to find an element for this selector
        // We won't keep this element, as each media type has it's own
        // setup process, and may only need a query selector.
        let element = document.querySelector(item.selector);

        // If we could not find this element
        if (!element) {
            message.error.badSelector(item.selector, 'create', 'Ensure this element exists in the DOM.')
        } else {

            try {

                // Here we'll create an instance of the correct class
                switch (item.type) {
                    case 'audio':
                        item.instance = new mkAudio(item);
                        break;
                    case 'video':
                        item.instance = new mkVideo(item);
                        break;
                    case 'vimeo':
                        item.instance = new mkVimeo(item);
                        break;
                    case 'youtube':
                        item.instance = new mkYoutube(item);
                        break;
                    default:
                        throw new Error()
                }

                createdElements ++;

            } catch (e) {

                message.error.couldNotCreateInstance(item.name, 'create', 'Is this a supported media type?')

            }
        }
    })

    const length = store.library.length;

    createdElements === length && message.success.created(length);
}

const makeConfig = options => {
    return {
        playExclusive: booleanConfig(options.playExclusive, true),
        log: booleanConfig(options.log, false)
    }
}

/**
 * If a value was supplied in the options param of create(),
 * this function will use that option. Otherwise, use the specified default.
 * @param configItem
 * @param defaultValue
 * @returns {boolean}
 */
const booleanConfig = (configItem, defaultValue) => {
    return typeof configItem === "boolean" ? configItem : defaultValue;
}

export {
    play,
    pause,
    pauseAllExcept,
    stop,
    pauseAll,
    create
}
