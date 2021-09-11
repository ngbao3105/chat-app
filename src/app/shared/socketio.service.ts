import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../environment';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  constructor() { }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, { transports: ['websocket']});
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}
