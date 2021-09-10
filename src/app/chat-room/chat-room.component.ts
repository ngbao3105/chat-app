import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { SocketioService } from '../socketio.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { Users, Channels } from "../dataJson";
import { ChatServiceService } from '../chat-service.service';
declare let jQuery: any;
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  statusDefault: boolean;
  socket;

  public channels = Channels;
  public message = "";
  public users = Users;
  public selectedUser = this.users[0];
  public selectedChannel = this.channels[0];
  private pageNumber = 0;
  private paginatorLimit = 10;
  panelColor: FormControl;
  constructor(private socketService: SocketioService, private renderer: Renderer2, private service: ChatServiceService,) {
  }
  ngOnInit(): void {
    this.panelColor = new FormControl('');
    this.socketService.setupSocketConnection();
    //check for connection
    if (this.socketService.socket !== undefined) {
      this.socket = this.socketService.socket;
      this.socket.emit('joinRoom', { userName: this.selectedUser.userName, channelName: this.selectedChannel.channelName });

      //Message from server
      this.socket.on("message", (data) => {
        if (data != 400) {
          this.outputMessage(data);
        }
      })

      //Admin message from server 
      this.socket.on("admin-message", (data) => {
        this.formatAdminMessage(data);
        this.fetchMoreMessages(true);
      })
    }

  }
  selectChannel(channel) {
    this.socket.disconnect();
    this.selectedChannel = channel;
    this.socket.emit('joinRoom', { userName: this.selectedUser.userName, channelName: this.selectedChannel.channelName });
    // this.socket.emit("joinRoom", this.roomName);
  }

  sendMessage(event) {
    event.preventDefault();

    if (this.message != "") {
      let body = JSON.stringify({
        query: `
      mutation CreateingMessage{
        postMessage(channelId: \"${this.selectedChannel.channelId}\", text:\"${this.message}\", userId:\"${this.selectedUser.userId}\") {
          _id,
          text,
          channelId,
          userId
      }
    }
    `,
      });
      this.service.postBody(body).pipe().subscribe({
        next: () => {
          //Emit message to server
          this.socket.emit("chatMessage", this.message);
          this.message = "";
        },
        error: (err) => { throw err }
      })
    }
  }
  fetchLatestMessages() {
    //config pageNumber 
    this.pageNumber = 0;
    let paginatorSkip = this.pageNumber > 0 ? ((this.pageNumber - 1) * this.paginatorLimit) : 0
    let body = JSON.stringify({
      query: `
    query {
      fetchMessages(channelId: \"${this.selectedChannel.channelId}\",paginatorSkip: ${paginatorSkip},paginatorLimit:${this.paginatorLimit}) {
        _id,
        text,
        channelId,
        userId
    }
  }
  `,
    });
    this.service.postBody(body).subscribe({
      next: (data) => {
        let dataArray = data.data.fetchMessages;
        dataArray.forEach((item, idx) => {
          item["userName"] = item.userId;
          this.outputMessage(item);
        })
      },
      error: (err) => { throw err }
    })
  }

  fetchMoreMessages(old) {
    //config pageNumber 
    this.pageNumber = 1;
    old ? this.pageNumber = this.pageNumber + 1 : this.pageNumber = this.pageNumber - 1;
    let paginatorSkip = this.pageNumber > 0 ? ((this.pageNumber - 1) * this.paginatorLimit) : 0
    let body = JSON.stringify({
      query: `
    query {
      fetchMessages(channelId: \"${this.selectedChannel.channelId}\",paginatorSkip: ${paginatorSkip},paginatorLimit:${this.paginatorLimit}) {
        _id,
        text,
        channelId,
        userId
    }
  }
  `,
    });
    this.service.postBody(body).subscribe({
      next: (data) => {
        let dataArray = data.data.fetchMessages;
        dataArray.forEach((item, idx) => {
          item["userName"] = item.userId;
          this.outputMessage(item);
        })
      },
      error: (err) => { throw err }
    })
  }

  //#region utils
  outputMessage(message) {
    if (message.text !== "") {
      const div = document.createElement("div");

      div.innerHTML = ` <h5>${message.userName}</h5>
                        <p>${message.text}</p>
                        `;
      //Scroll down when new message submitted
      const chatMessages = document.querySelector(".chats");
      if (message.userName == this.selectedUser.userName) {
        div.classList.add("message", "outgoing");
      } else {
        div.classList.add("message", "incoming");
      }
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  formatAdminMessage(message) {
    if (message.text !== "") {
      const div = document.createElement("div");
      div.innerHTML = `<p><b>${message.text}</p>`;
      //Scroll down when new message submitted
      const chatMessages = document.querySelector(".chats");
      div.classList.add("user-join");
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };
  //#endregion
  onUserChange(event) {
    let selectedUserId = event.target.value;
    this.selectedUser = (this.users.filter(item => item.userId == selectedUserId))[0];
  }


  ngOnDestroy(): void {
    this.socketService.disconnect();
  }



}
