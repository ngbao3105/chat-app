import { Component, Input, OnInit } from '@angular/core';
import { IChatMessageBase } from '../chat-message-base';

@Component({
  selector: 'outgoing-message',
  templateUrl: './outgoing-message.component.html',
  styleUrls: ['./outgoing-message.component.scss']
})
export class OutgoingMessageComponent implements OnInit,IChatMessageBase {
  @Input("data") data:any;
  constructor() { 
  }
  messageId: string;

  ngOnInit(): void {
  }

}
