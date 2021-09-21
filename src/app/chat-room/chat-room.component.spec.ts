import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ChatRoomComponent } from './chat-room.component';

describe('ChatRoomComponent', () => {
  let component: ChatRoomComponent;
  let fixture: ComponentFixture<ChatRoomComponent>;
  let fetchUsers: jasmine.Spy;
  let fetchChannels: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomComponent);
    component = fixture.componentInstance;
    fetchUsers = spyOn(component, "fetchUsers").and.returnValue(new Observable<any>());
    fetchChannels = spyOn(component, "fetchChannels").and.returnValue(new Observable<any>());
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call "fetchUser" when init component',()=>{
    expect(fetchUsers).toHaveBeenCalled();
  })

  it('should call "fetchChannels" when init component',()=>{
    expect(fetchChannels).toHaveBeenCalled();
  })
});
