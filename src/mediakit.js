// The library contains all the media elements on the page
const store = {}

const emoji = {
    sparkle: String.fromCodePoint(0x2728),
    thinking: String.fromCodePoint(0x1F4AC),
    error: String.fromCodePoint(0x1F6AB),
    magnify: String.fromCodePoint(0x1F50D)
}

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

    // Get a element reference for each item
    store.library.forEach(item => {

        // Each item must have at least a selector and type
        if (!item.type) {
            message.error.missingArg('type', 'create', 'Make sure all your media items have a type.')
        }

        if (!item.selector) {
            message.error.missingArg('selector', 'create', 'Make sure all your media items have a query selector.')
        }

        // If we didn't get a name, use the selector instead
        if (!item.name) {
            item.name = item.selector
        }

        // Try to find an element for this selector
        item.element = document.querySelector(item.selector);

        // If we could not find this element
        if (!item.element) {
            message.error.badSelector(item.selector, 'create', 'Is this a standard query selector?')
        }

        // Attach the right control methods to this item
        item.controls = typeControls[item.type]

        // Add event listeners for this media type
        item.listeners = typeListeners[item.type](item)

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
 * If a value was supplied in the options param of create(),
 * this function will use that option. Otherwise, use the specified default.
 * @param configItem
 * @param defaultValue
 * @returns {boolean}
 */
const booleanConfig = (configItem, defaultValue) => {
    return typeof configItem === "boolean" ? configItem : defaultValue;
}

/**
 * Play an item.
 * config.playExclusive will determine if other players are paused as part of this action.
 * @param name {string}
 */
const play = name => {
    if (store.config.playExclusive) {
        pauseAllExcept(name)
    }
    const item = findItem(name)
    item.controls.play(item)
}

/**
 * Pause an item.
 * @param name {string}
 */
const pause = name => {
    const item = findItem(name)
    item.controls.pause(item)
}

/**
 * Stop an item.
 * @param name {string}
 */
const stop = name => {
    const item = findItem(name)
    item.controls.stop(item)
}

/**
 * Pause all items except one.
 * @param name {string}
 */
const pauseAllExcept = name => {

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
const pauseAll = () => {
    store.library.forEach(item => {
        item.controls.pause(item)
    })
}

/**
 * Find an item in the library by name.
 * @param name {string}
 */
const findItem = name => {
    const targetItem = store.library.find(item => {
        return item.name === name;
    })

    if (!targetItem) {
        message.error.couldNotFindItem(name, 'findItem', 'Did you forget to set the name of this item on creation?')
    } else {
        return targetItem;
    }
}

const typeControls = {
    audio: {
        pause: item => {
            item.element.pause()
        },

        play: item => {
            item.element.play()
        },

        stop: item => {
            message.warn.noMethod(item, 'stop')
        }
    },
}

const typeListeners = {
    audio: item => {
        item.element.addEventListener('play', e => {
            if (store.config.playExclusive) {
                pauseAllExcept(item.name)
            }
        })
    }
}

const message = {
    success: {
        created: numbersOfItems => {
            const items = numbersOfItems === 1 ? 'item' : 'items';
            log(emoji.sparkle, `created with ${ numbersOfItems } ${items}.`, 'success');
        }
    },
    warn: {
        noMethod: (item, method) => {
            log(emoji.thinking, `Library item of type '${item.type}' does not support the '${method}' method.`, 'warn');
        }
    },
    error: {
        missingArg: (arg, method, advice = '') => {
            log(emoji.error, `Missing required argument '${arg}' in '${method}'. ${advice}`, 'error');
        },
        badSelector: (selector, method, advice='') => {
            log(emoji.magnify, `Could not find an element with the query selector '${selector}' in '${method}'. ${advice}`,'error')
        },
        couldNotFindItem: (name, method, advice='') => {
            log(emoji.magnify, `Could not find media item with name '${name}' inside method '${method}'. ${advice}`, 'error')
        }
    }
}

const log = (emoji, message, type='warn') => {

    const logStyles = {
        header:
            'padding: 5px;' +
            'margin: 10px;' +
            'border-radius: 5px;' +
            'font-weight: bold;',
        emoji:
            'font-size: 18px;',
        text:
            'color: white;'
    }

    if ((type === 'warn') && store.config.log) {
        console.log(
            // Message
            `%cmediakit%c${emoji}%c${message}`,

            // Header styling
            'color: yellow;' +
            'background-color: yellow;' +
            'color: black;' +
            logStyles.header,

            // Emoji styling
            logStyles.emoji,

            // Text styling
            logStyles.text
        )
    } else if (type === 'error') {
        console.trace(
            // Message
            `%cmediakit%c${emoji}%c${message}`,

            // Header styling
            'background-color: red;' +
            'color: white;' +
            logStyles.header,

            // Emoji styling
            logStyles.emoji,

            // Text styling
            logStyles.text
        )
    } else if ((type === 'success') && store.config.log) {
        console.log(
            // Message
            `%cmediakit%c${emoji}%c${message}`,

            // Header styling
            'background-color: white;' +
            'color: black;' +
            logStyles.header,

            // Emoji styling
            logStyles.emoji,

            // Text styling
            logStyles.text
        )
    }
}

const mediakit = {
    create,
    play,
    pause,
    pauseAll,
    pauseAllExcept,
    stop
}

window.mediakit = mediakit;
export default mediakit;






