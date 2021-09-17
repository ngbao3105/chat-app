import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"", component:AppComponent},
  { path: 'chat-app', loadChildren: () => import('./chat-room/chat-room.module').then(m => m.ChatRoomModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
