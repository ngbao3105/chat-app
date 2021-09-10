import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedPropertyService {

  constructor() { }

  private _textEditorValue: any = {}
  get textEditorValue() {
    return this._textEditorValue;
  }
  set textEditorValue({ channelId, textValue }) {
    this._textEditorValue[channelId] = textValue;
  }
}
