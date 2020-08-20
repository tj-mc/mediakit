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
