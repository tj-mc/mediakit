import {message} from "./message";
import {findItem} from "./findItem";
import {mkAudio} from "./mediaTypes/mkAudio";

// The library contains all the media elements on the page
const store = {}

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

    // Populate the library
    store.library.forEach(item => {

        // Each item must have at least a selector and type
        if (!item.type) {
            message.error.missingArg('type', 'create', 'Make sure all your media items have a type.')
        }

        // You must specify a query selector for every item
        if (!item.selector) {
            message.error.missingArg('selector', 'create', 'Make sure all your media items have a query selector.')
        }

        // If we didn't get a name, use the selector instead
        if (!item.name) {
            item.name = item.selector
        }

        // Try to find an element for this selector
        // We won't keep this element, as each media type has it's own
        // setup process, and may only need a query selector.
        let element = document.querySelector(item.selector);

        // If we could not find this element
        if (!element) {
            message.error.badSelector(item.selector, 'create', 'Is this a standard query selector?')
        }

        // Here we'll create an instance of the correct class
        switch (item.type) {
            case 'audio':
                item.instance = new mkAudio(item.selector);
                break;
        }

    })

    const length = store.library.length;
    message.success.created(length)

}

const makeConfig = options => {
    return {
        playExclusive: booleanConfig(options.playExclusive, true),
        log: booleanConfig(options.log, false)
    }
}

/**
 * Play an item.
 * config.playExclusive will determine if other players are paused as part of this action.
 * @param name {string}
 */
export const play = name => {
    console.log(name)
    if (store.config.playExclusive) {
        pauseAllExcept(name)
    }
    const item = findItem(name)
    item.instance.play(item)
}

/**
 * Pause an item.
 * @param name {string}
 */
export const pause = name => {
    const item = findItem(name)
    item.instance.pause(item)
}

/**
 * Stop an item.
 * @param name {string}
 */
export const stop = name => {
    const item = findItem(name)
    item.instance.stop(item)
}

/**
 * Pause all items except one.
 * @param name {string}
 */
export const pauseAllExcept = name => {

    if (name) {
        store.library.forEach(item => {
            if (name !== item.name) {
                item.controls.pause(item)
            }
        })
    } else {
        message.error.missingArg('name', 'pauseAllExcept')
    }
}

/**
 * Pause all items in the library.
 */
export const pauseAll = () => {
    store.library.forEach(item => {
        item.controls.pause(item)
    })
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

export const mk = {
    create,
    play,
    pause,
    pauseAll,
    pauseAllExcept,
    stop
}
