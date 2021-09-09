import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  constructor() { }
  setupSocketConnection(userName,roomName) {
    this.socket = io(environment.SOCKET_ENDPOINT, { transports: ['websocket']});
    this.socket.emit("joinRoom",{userName,roomName});
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}
