import { AfterViewInit, Component, ContentChild, OnInit } from '@angular/core';
import { IReactable } from '../chat-message-base';
import { REACTABLE_TOKEN } from '../incoming-message/incoming-message.component';

@Component({
  selector: 'widget-message',
  templateUrl: './widget-message.component.html',
  styleUrls: ['./widget-message.component.css'],
})
export class WidgetMessageComponent implements OnInit, AfterViewInit {
  @ContentChild(() => REACTABLE_TOKEN) messageTemplate?: IReactable;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }




}
