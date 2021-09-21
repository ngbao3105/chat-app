import { Component, Inject, InjectionToken, Input, OnInit, Optional } from '@angular/core';
import { IChatMessageBase, IReactable } from '../chat-message-base';
export const REACTABLE_TOKEN = new InjectionToken<IReactable>("reactable-ccomponent");
@Component({
  selector: 'incoming-message',
  templateUrl: './incoming-message.component.html',
  styleUrls: ['./incoming-message.component.scss'],
  providers: [
      { provide: REACTABLE_TOKEN, useValue: IncomingMessageComponent }
  ]
})
export class IncomingMessageComponent implements OnInit, IChatMessageBase, IReactable {
  @Input("data") data: any;
  constructor(@Optional() @Inject(REACTABLE_TOKEN) private reactableToken: IReactable) {
  }
  messageId: string;
  reactList: [] = [];

  ngOnInit(): void {
    console.log("incoming message: ", REACTABLE_TOKEN);
    // console.log("incoming message oninit");
  }

  reactMessage(messageId): void {
    console.log("react message: ", messageId);
  }

}
