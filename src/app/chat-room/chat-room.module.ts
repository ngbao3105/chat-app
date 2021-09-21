import { NgModule } from '@angular/core';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './chat-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { WidgetMessageComponent } from './widget-message/widget-message.component';
import { IncomingMessageComponent } from './incoming-message/incoming-message.component';
import { OutgoingMessageComponent } from './outgoing-message/outgoing-message.component';



@NgModule({
  declarations: [ChatRoomComponent,
    WidgetMessageComponent,
    IncomingMessageComponent,
    OutgoingMessageComponent],
  imports: [
    CommonModule,
    ChatRoomRoutingModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatOptionModule,
    MatProgressSpinnerModule,
  ]
})
export class ChatRoomModule { }
