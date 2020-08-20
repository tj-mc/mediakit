const emoji = {
    sparkle: String.fromCodePoint(0x2728),
    thinking: String.fromCodePoint(0x1F4AC),
    error: String.fromCodePoint(0x1F6AB),
    magnify: String.fromCodePoint(0x1F50D)
}

export const message = {
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
