import {io} from "socket.io-client"

const dataclient = port => {
    const url = `ws://localhost:${port}`
    const socket = io(url)

    socket.on("connect", () => console.log(`connect to socket via ${url}`))

    return {
        push: data => {
            socket
                .compress(true)
                .emit("data", data)
        },

        pull: fn => {
            socket
                .on("data", data => fn(data))
        },

        sustain: data => {
            socket
                .compress(true)
                .emit("sustain", data)
        },

        release: data => {
            socket
                .emit("release", data)
        },

        log: (...args) => {
            socket
                .compress(true)
                .emit("log", args)
        }
    }
}

export default dataclient
