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
  constructor(private socketService: SocketioService, private renderer: Renderer2) {
  }


  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    //check for connection
    if (this.socketService.socket !== undefined) {
      this.socket = this.socketService.socket;
      this.socket.on("output", (data) => {
        if (data.length) {
          //build out message div
          data.forEach((item, idx) => {
            let message = document.createElement("div");
            message.setAttribute("class", "chat-message");
            message.textContent = `${item.name}: ${item.message}`;
            this.renderer.appendChild(this.messages, message);
            // this.renderer.insertBefore(this.messages,message,this.messages.nativeElement.firstChild);
          })
        }
      });

      //Get status from server
      this.socket.on("status",(data)=>{
        //get message status
        this.setStatus((typeof data ==="object") ? data.message : data);

        //if status is clear text
        if(data.clear){
          this.textarea.nativeElement.nodeValue = "";
        }
      })


    }
  }
  formatMMDDYYYY (data){
    return (data.getMonth() + 1) + 
    "/" +  data.getDate() +
    "/" +  data.getFullYear();
}

  keydown(event){
    if(event.which == 13  && event.shiftKey == false){
      // Emit to server input 
      this.socket.emit("input",{
        name: this.username.nativeElement.nodeValue,
        message: this.textarea.nativeElement.nodeValue,
        createdAt: this.formatMMDDYYYY(new Date()),
        // createdById:createdById
      })
      event.preventDefault();
    }
  }

  clearChat(event){
    this.socket.emit("clear");
    //clear messages 
    this.socket.on("clear",()=>{
      this.messages.nativeElement.textContent = "";
    })
  }
  setStatus(status) {
    //Set status
    status.textContent = status;
    if (status != this.statusDefault) {
      let delay = setTimeout(() => {
        this.setStatus(this.statusDefault);
      }, 4000)
    }
  }
  ngOnDestroy(): void {
    this.socketService.disconnect();
  }



}
