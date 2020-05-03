import { magic } from "./app"

function do_the_magic(event) {
    document.getElementById('generate').addEventListener('click', magic)
}

export {
    do_the_magic
}