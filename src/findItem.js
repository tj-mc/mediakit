import {message} from "./message";
import {store} from "./store";

/**
 * Find an item in the library by name.
 * @param name {string}
 */
export const findItem = (name) => {
    const targetItem = store.library.find(item => {
        return item.name === name;
    })

    if (!targetItem) {
        message.error.couldNotFindItem(name, 'findItem', 'Did you forgot to set the name of this item on creation?')
    } else {
        return targetItem;
    }
}
