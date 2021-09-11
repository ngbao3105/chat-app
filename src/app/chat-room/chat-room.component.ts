import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { SocketioService } from '../shared/socketio.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { ChatServiceService } from '../shared/chat-service.service';
import { SharedPropertyService } from '../shared/shared-property.service';
import { takeUntil, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
declare let jQuery: any;
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatRoomComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("chats", { static: true }) chats: ElementRef<HTMLDivElement>;
  private DEBOUNCE_TIME = 500;
  isScrollTop = false;
  oldScrollHeight = 0;
  chatsElement: HTMLElement;
  public messageText: FormControl;
  public message = "";
  public channels: any;
  public users: any;
  public selectedUser: any;
  public selectedChannel: any;
  private morePageNumber = 1;
  private paginatorLimit = 10;
  public isDataFetchedAll = false;
  public isLoading = true;
  panelColor: FormControl;
  constructor(private socketService: SocketioService, private renderer: Renderer2, private service: ChatServiceService, private sharedProperty: SharedPropertyService) {
  }

  ngOnInit(): void {
    forkJoin([this.fetchUsers(), this.fetchChannels()]).subscribe(res => {
      this.isLoading = false;
      this.users = res[0].data.getUsers;
      this.selectedUser = this.users[0];
      this.channels = res[1].data.getChannels;
      this.selectedChannel = this.channels[0];
      this.leaveAndJoinChannel();
      this.messageText = new FormControl(this.getMessageText(this.selectedChannel.channelId));
      this.messageText.valueChanges.pipe(
        debounceTime(this.DEBOUNCE_TIME),
        skip(1),
        distinctUntilChanged()
      ).subscribe(value => {
        this.storeMessageText(this.selectedChannel.channelId, value);
      });
    },error => {
      this.isLoading = false;
      throw error;
    });
  }


  selectChannel(channel) {
    if (this.selectedChannel.channelId != channel.channelId) {
      this.selectedChannel = channel;
      this.resetProperty();
    }
  }

  resetProperty() {
    this.leaveAndJoinChannel();
    this.renderer.setProperty(this.chats.nativeElement, 'innerHTML', "");
    this.messageText.setValue(this.getMessageText(this.selectedChannel.channelId));
  }


  leaveAndJoinChannel() {
    this.socketService.disconnect();
    this.socketService.setupSocketConnection();
    if (this.socketService.socket !== undefined) {
      this.socketService.socket.emit('joinRoom', { user: this.selectedUser, channel: this.selectedChannel });
      //Message from server
      this.socketService.socket.on("message", (data) => {
        if (data != 400) {
          //reverse the array before append child bec
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
    this.isLoading = true;
    if (this.message != "") {
      let body = JSON.stringify({
        query: `
      mutation CreatingMessage{
        postMessage(channelId: \"${this.selectedChannel.channelId}\", text:\"${this.message}\", user:{_id:\"${this.selectedUser._id}\", userName: \"${this.selectedUser.userName}\", avatar: \"${this.selectedUser.avatar}\"}) {
        _id,
        text,
        channelId,
        createdAt,
        user {
          _id,
          userName,
          avatar
      }
    }
  }
    `,
      });
      this.service.postBody(body).pipe().subscribe({
        next: (res) => {
          this.isLoading = false;
          let data = res.data.postMessage;
          data["status"] = "Send";
          data["time"] = moment(data.createdAt).format('hh:mm');
          //Emit message to server
          this.socketService.socket.emit("chatMessage", data);
          // this.message = "";
          this.messageText.setValue("");
          this.storeMessageText(this.selectedChannel.channelId, "");
        },
        error: (err) => {
          let data = {
            channelId: this.selectedChannel.channelId,
            createdAt: moment().format('hh:mm'),
            text: this.message,
            status: "Error",
            user: { _id: this.selectedUser._id, userName: this.selectedUser.userName, avatar: this.selectedUser.avatar }
          };
          this.socketService.socket.emit("chatMessage", data);
          throw err;
        }
      })
    }
  }

  storeMessageText(channelId, value) {
    localStorage.setItem(channelId, value);
  }

  getMessageText(channelId) {
    let textStoredValue = localStorage.getItem(channelId);
    if (textStoredValue != null) {
      return textStoredValue;
    }
    return "";
  }
  onMessageEnter(event) {
    console.log(event);
  }
  //#region APIs
  fetchLatestMessages() {
    this.isLoading = true;
    //config pageNumber 
    this.morePageNumber = 1;
    let paginatorSkip = 0;
    let body = JSON.stringify({
      query: `
query {
  fetchMessages(channelId: \"${this.selectedChannel.channelId}\",paginatorSkip: ${paginatorSkip},paginatorLimit:${this.paginatorLimit}) {
        _id,
      text,
      channelId,
      createdAt,
      user{
        _id,
        userName,
        avatar
      }
    }
  }
`,
    });
    this.service.postBody(body).subscribe({
      next: (data) => {
        this.isLoading = false;
        let dataArray = data.data.fetchMessages;
        dataArray.sort((a, b) => a._id - b._id);
        dataArray.forEach((message, idx) => {
          message["status"] = "Sent";
          message["time"] = moment(message.createdAt).format('hh:mm');
          this.outputMessage(message);
        })
      },
      error: (err) => {
        this.isLoading = false;
        throw err;
      }

    })
  }

  fetchMoreMessages(isOld = true) {
    this.isLoading = true;
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
        user{
          _id,
          userName,
          avatar
        }
    }
  }
`,
    });
    this.service.postBody(body).subscribe({
      next: (data) => {
        this.isLoading = false;
        let dataArray = data.data.fetchMessages;
        if (dataArray != undefined && dataArray.length > 0) {
          dataArray.forEach((message, idx) => {
            message["status"] = "Sent";
            message["time"] = moment(message.createdAt).format('hh:mm');
            if (isOld) {
              this.previouseMessage(message);

            }
          })
          this.keepScrollCurrentPosition();
        } else if (dataArray == undefined && data.data.length == 0) {
          this.isDataFetchedAll = true;
        }
      },
      error: (err) => {
        this.isLoading = false;
        throw err;
      }
    })
  }
  fetchUsers() {
    //config pageNumber 
    let body = JSON.stringify({
      query: `
              query {
                getUsers {
                      _id,
                      userName,
                      avatar
                  }
                }
              `
    });
    return this.service.postBody(body);
  }
  fetchChannels() {
    //config pageNumber 
    let body = JSON.stringify({
      query: `
            query {
              getChannels {
                    channelId,
                    channelName,
                }
              }
           `
    });
    return this.service.postBody(body);
  }
  //#endregion
  keepScrollCurrentPosition() {
    this.chatsElement.scroll(0, this.chatsElement.scrollHeight - this.oldScrollHeight);
  }

  //#region utils
  outputMessage(data) {
    if (data.text !== "") {
      const chatMessages = document.querySelector(".chats");
      if (data.user.userName == this.selectedUser.userName) {
        let div = this.outgoingMessage(data);
        chatMessages.appendChild(div);
      }
      else {
        let div = this.incomingMessage(data);
        chatMessages.appendChild(div);
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  incomingMessage(data) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="chat-avatar">
                      <img src="../assets/img/${data.user.avatar}" alt = "User" />
                      <div class="chat-name"> <b>${data.user.userName}</b></div>
                        </div>
                      <div class="chat-info">
                        <div class="chat-text">
                          ${data.text}
                      </div>
                      <div class="chat-hour" >${data.time} </div>
                    </div>
                                  `;
    div.classList.add("message", "incoming");
    return div;
  }

  outgoingMessage(data) {
    const div = document.createElement("div");
    if (data.status = "Send") {
      div.innerHTML = `<div class="chat-info">
                      <div class="chat-text">
                        ${data.text}
                      </div>
                      <div class="chat-hour">
                        ${data.time}
                        <span class="fa fa-check-circle" style="margin-left: 5px"></span>
                        <span style="margin: 5px" class="chat-message">${data.status}</span>
                      </div>
                    </div>
                    <div class="chat-avatar">
                      <img src="../assets/img/${data.user.avatar}" alt="User" />
                      <div class="chat-name"><b>${data.user.userName}</b></div>
                    </div>`;
    } else if (data.status = "Error") {
      div.innerHTML = `<div class="chat-info">
      <div class="chat-text">
        ${data.text}
      </div>
      <div class="chat-hour">
        ${data.time}
        <span class="fa fa-exclamation-circle" style="margin-left: 5px"></span>
        <span style="margin: 5px" class="chat-message">${data.status}</span>
      </div>
    </div>
    <div class="chat-avatar">
      <img src="../assets/img/${data.user.avatar}" alt="User" />
      <div class="chat-name">${data.user.userName}</div>
    </div>`;
    }
    div.classList.add("message", "outgoing");
    return div;
  }
  previouseMessage(data) {
    if (data.text !== "") {
      const div = document.createElement("div");

      div.innerHTML = ` <h5> <b>${data.user.userName} </b></h5>
  <p>${data.text} </p>
    `;
      const readMoreBtn = document.querySelector(".readmore-section");
      if (data.user.userName == this.selectedUser.userName) {
        let div = this.outgoingMessage(data);
        // jQuery(div).insertAfter(readMoreBtn);
        this.chatsElement.insertBefore(div,this.chatsElement.firstChild);
      }
      else {
        let div = this.incomingMessage(data);
        // jQuery(div).insertAfter(readMoreBtn);
        this.chatsElement.insertBefore(div,this.chatsElement.firstChild);
      }
    }
  }

  formatAdminMessage(message) {
    if (message !== "") {
      const div = document.createElement("div");
      div.innerHTML = `<p> <b>${message} </p>`;
      const chatMessages = document.querySelector(".chats");
      div.classList.add("user-join");
      jQuery(div).insertAfter(chatMessages.lastChild);
    }
  };

  //#endregion
  onUserChange(event) {
    let selectedUserId = event.target.value;
    if (this.selectedUser._id != selectedUserId) {
      this.selectedUser = (this.users.filter(item => item._id == selectedUserId))[0];
      this.resetProperty();
    }
  }

  ngAfterViewInit(): void {
    this.chatsElement = document.querySelector(".chats");
    this.oldScrollHeight = this.chatsElement.scrollHeight;
    this.chatsElement.addEventListener("scroll",(event)=>{
      this.oldScrollHeight = this.chatsElement.scrollHeight;
      this.isScrollTop = false;
      if(this.chatsElement.scrollTop == 0){
        this.isScrollTop = true;
      } 
      
    })
  }
  ngOnDestroy(): void {
    this.socketService.disconnect();
  }



}
