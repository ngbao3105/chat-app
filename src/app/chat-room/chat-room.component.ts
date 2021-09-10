import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class ChatRoomComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("chats", { static: true }) chats: ElementRef<HTMLDivElement>;

  statusDefault: boolean;
  socket;

  public channels = Channels;
  public message = "";
  public users = Users;
  public selectedUser = this.users[0];
  public selectedChannel = this.channels[0];
  private morePageNumber = 0;
  private paginatorLimit = 10;
  public isDataFetchedAll = false;
  panelColor: FormControl;
  constructor(private socketService: SocketioService, private renderer: Renderer2, private service: ChatServiceService,) {
  }

  ngOnInit(): void {
    this.leaveAndJoinChannel();

  }
  selectChannel(channel) {
    this.selectedChannel = channel;
    this.leaveAndJoinChannel();
    this.renderer.setProperty(this.chats.nativeElement, 'innerHTML', "");
    this.insertReadMoreButton();
    // this.socketService.socket.emit("joinRoom", this.roomName);
  }

  leaveAndJoinChannel() {
    if (this.socketService.socket !== undefined) {
      this.socketService.socket.disconnect();
    }
    this.socketService.setupSocketConnection();
    if (this.socketService.socket !== undefined) {
      this.socketService.socket.emit('joinRoom', { user: this.selectedUser, channel: this.selectedChannel });
      //Message from server
      this.socketService.socket.on("message", (data) => {
        if (data != 400) {
          this.outputMessage(data);
        }
      })

      //Admin message from server 
      this.socketService.socket.on("admin-message", (data) => {
        this.formatAdminMessage(data);
      })
      this.fetchLatestMessages();
    }

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
          this.socketService.socket.emit("chatMessage", this.message);
          this.message = "";
        },
        error: (err) => { throw err }
      })
    }
  }
  onMessageEnter(event) {
    console.log(event);
  }
  fetchLatestMessages() {
    //config pageNumber 
    let paginatorSkip = 0;
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
        dataArray.forEach((message, idx) => {
          message["userName"] = message.userId;
          this.outputMessage(message);
        })
      },
      error: (err) => { throw err }
    })
  }

  fetchMoreMessages(isOld = true) {
    //config pageNumber 
    isOld ? this.morePageNumber = this.morePageNumber + 1 : this.morePageNumber = this.morePageNumber - 1;
    let paginatorSkip = this.morePageNumber > 0 ? ((this.morePageNumber - 1) * this.paginatorLimit) : 0
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
        if (dataArray != undefined && dataArray.length > 0) {
          dataArray.forEach((message, idx) => {
            message["userName"] = message.userId;
            if (isOld) {
              this.previouseMessage(message);
            }
          })
        } else if (dataArray == undefined && data.data.length == 0) {
          this.isDataFetchedAll = true;
        }
      },
      error: (err) => { throw err }
    })
  }

  //#region utils
  outputMessage(message) {
    if (message.text !== "") {
      const div = document.createElement("div");

      div.innerHTML = ` <h5><b>${message.userName}</b></h5>
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

  previouseMessage(message) {
    if (message.text !== "") {
      const div = document.createElement("div");

      div.innerHTML = ` <h5><b>${message.userName}</b></h5>
                        <p>${message.text}</p>
                        `;
      //Scroll down when new message submitted
      const readMoreBtn = document.querySelector(".btn-readMore");
      if (message.userName == this.selectedUser.userName) {
        div.classList.add("message", "outgoing");
      } else {
        div.classList.add("message", "incoming");
      }
      jQuery(div).insertAfter(readMoreBtn);
      // chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  formatAdminMessage(message) {
    if (message.text !== "") {
      const div = document.createElement("div");
      div.innerHTML = `<p><b>${message.text}</p>`;
      //Scroll down when new message submitted
      const chatMessages = document.querySelector(".chats");
      div.classList.add("user-join");
      jQuery(div).insertAfter(chatMessages.firstChild);
      // chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  insertReadMoreButton() {
    const button = document.createElement("button");
    button.innerHTML = `Read More <i class="fa fa-arrow-up"></i>`;
    // <button type="button" class="btn btn-info btn-readMore">
    button.classList.add("btn", "btn-info", "btn-readMore");
    const chatMessages = document.querySelector(".chats");
    chatMessages.appendChild(button);
  }
  //#endregion
  onUserChange(event) {
    let selectedUserId = event.target.value;
    this.selectedUser = (this.users.filter(item => item.userId == selectedUserId))[0];
    this.leaveAndJoinChannel();
    this.renderer.setProperty(this.chats.nativeElement, 'innerHTML', "");
    this.insertReadMoreButton();
  }

  registerEventDelegation() {
    //register event delegate for readmore button
    const chatElement = document.querySelector(".chats");
    chatElement.addEventListener('click', (event: any) => {
      if (event.target.tagName == "BUTTON" && event.target.className == "btn btn-info btn-readMore") {
        this.fetchMoreMessages(true);
      }
    })
  }
  ngAfterViewInit(): void {
    this.registerEventDelegation();
  }



  ngOnDestroy(): void {
    this.socketService.disconnect();
  }



}
