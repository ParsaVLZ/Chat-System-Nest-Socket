import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"

@WebSocketGateway({cors: {origin: "*"}})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server
    afterInit(server: any) {
        console.log("Socket Initialized!");
    }

    handleConnection(client: any, ...args: any[]) {
        const { sockets } = this.server.sockets;
        console.log("ClienId:" + client.id + " connected!");
        console.log("Online users:" + sockets.size);     
    }

    handleDisconnect(client: any) {
        const { sockets } = this.server.sockets;
        console.log("ClienId:" + client.id + " disconnected!");
        console.log("Online users:" + sockets.size);
    }

    @SubscribeMessage("ping")
    pingHandler(client: any, data: any){
        console.log("Message received from client with id" + client.id);
        console.log("Data:", data);
        client.emit("pong", {message: "Hello Client From NestJS!"})
    }
}
