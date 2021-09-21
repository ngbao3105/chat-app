import { InjectionToken } from "@angular/core";

export interface IChatMessageBase {
  messageId: string;
}

export interface IReactable {
     reactMessage(messageId): void;
     reactList: Array<any>;
}



