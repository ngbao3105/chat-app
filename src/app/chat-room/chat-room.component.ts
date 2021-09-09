import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SocketioService } from '../socketio.service';
declare let jQuery: any;
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @ViewChild("clear", { static: true }) clear: ElementRef<HTMLElement>;
  @ViewChild("status", { static: true }) status: ElementRef<HTMLElement>;
  @ViewChild("chat", { static: true }) chat: ElementRef<HTMLElement>;
  @ViewChild("username", { static: true }) username: ElementRef<HTMLElement>;
  @ViewChild("messages", { static: true }) messages: ElementRef<HTMLElement>;
  @ViewChild("textarea", { static: true }) textarea: ElementRef<HTMLElement>;
  statusDefault: boolean;
  socket;
  private roomName = "general";
  private userName = "Joyse";
  constructor(private socketService: SocketioService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.socketService.setupSocketConnection(this.userName, this.roomName);
    //check for connection
    if (this.socketService.socket !== undefined) {
      this.socket = this.socketService.socket;
      this.socket.on("message", (data) => {
        this.outputMessage(data);
      })
    }
  }
  roomClick(roomName) {
    console.log(this.socket.current);
    this.socket.emit("joinRoom", this.roomName);
  }

  submitMessage(event) {
    event.preventDefault();
    const msg = <HTMLInputElement>document.getElementById("msg");

    //Emit message to server
    this.socket.emit('chatMessage', msg.value)
  }

  outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = ` <p class="meta">Sam <span>9:15pm</span></p>
                        <p class="text">
                        ${message}
                    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
  };

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }



}
