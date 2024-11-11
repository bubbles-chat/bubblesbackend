import { createServer } from "http";
import app from "./app";
import { DefaultEventsMap, Server, Socket } from "socket.io";
import socketAuth from "./middlewares/socketAuth.middleware";
import registerChatHandler from "./listeners/chat.listener";

const server = createServer(app)
export const io = new Server(server)

const onConnection = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    registerChatHandler(io, socket)
}

io.use(socketAuth)
io.on('connection', onConnection)

export default server