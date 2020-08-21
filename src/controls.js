import {store} from "./store";
import {findItem} from "./findItem";
import {message} from "./message";

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
    item.instance.play()
}

/**
 * Pause an item.
 * @param name {string}
 */
export const pause = name => {
    const item = findItem(name)
    item.instance.pause()
}

/**
 * Stop an item.
 * @param name {string}
 */
export const stop = name => {
    const item = findItem(name)
    item.instance.stop()
}

/**
 * Pause all items except one.
 * @param name {string}
 */
export const pauseAllExcept = name => {

    if (name) {
        store.library.forEach(item => {
            if (name !== item.name) {
                item.instance.pause()
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
        item.instance.pause()
    })
}
