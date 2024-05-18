import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public message: string = '';

  constructor() { }

  public add(message: string) {
    this.message = message;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  public clear() {
    this.message = '';
  }
}
