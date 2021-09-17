import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ContentChild('messageTemplate',{static: true}) messageTempalte: TemplateRef<any>
  constructor() { }

  ngOnInit(): void {
    console.log(this.messageTempalte);
  }

}
