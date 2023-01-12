import { Component, DoCheck } from '@angular/core';

import { localKey } from "../../shared";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  isUserLogin: boolean = !!localStorage.getItem(localKey.user);

  ngDoCheck(): void {
    this.isUserLogin = !!localStorage.getItem(localKey.user);
  }
}
