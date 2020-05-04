import { magic } from "./app"

function initialiseApp(event) {
    document.getElementById('generate').addEventListener('click', magic)
}

export {
    initialiseApp
}