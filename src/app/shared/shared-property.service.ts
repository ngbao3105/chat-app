import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedPropertyService {

  constructor() { }

  private _isLoading: boolean = false;

  get isLoading() {
      return this._isLoading;
  }

  set isLoading(isLoading: boolean) {
      this._isLoading = isLoading;
  }
}
