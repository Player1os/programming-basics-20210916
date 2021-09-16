let commands = []
let topBarElement = null
let contentElement = null
let inputElement = null
let buttonElement = null

const wait = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const runCommands = async () => {
    buttonElement.disabled = true

    for (const command of commands) {
        await wait()

        switch (command.type) {
            case 'printText':
                contentElement.innerHTML += command.text
                break
            case 'clearText':
                contentElement.innerHTML = ''
                break
        }
    }

    commands = []

    buttonElement.disabled = false
}

const execute = (callback) => {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style = 'background: #111'

        topBarElement = document.createElement('div')
        topBarElement.style = 'height: 1.5em; padding: 0.5em; background: #333; color: #ddd'
        document.body.appendChild(topBarElement)

        contentElement = document.createElement('pre')
        contentElement.style = 'background: #222; color: #eee'
        document.body.appendChild(contentElement)

        inputElement = document.createElement('input')
        inputElement.style = 'width: 80%'
        topBarElement.appendChild(inputElement)

        buttonElement = document.createElement('button')
        buttonElement.style = 'float: right'
        buttonElement.innerHTML = 'Execute'
        buttonElement.onclick = () => {
            callback()
            runCommands()
        }
        topBarElement.appendChild(buttonElement)
    })
}

const printText = (text) => {
    commands.push({
        type: 'printText',
        text
    })
}

const clearText = () => {
    commands.push({
        type: 'clearText'
    })
}

const getInputText = () => {
    if (inputElement === null) {
        return ''
    }

    return inputElement.value
}
