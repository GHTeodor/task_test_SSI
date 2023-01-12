import { Component, DoCheck } from '@angular/core';
import { Router } from "@angular/router";

import { initialUsers, localKey, LocalService, User } from "../../../../shared";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements DoCheck {
  users!: User[];

  constructor(private readonly local: LocalService,
              private readonly router: Router) {
  }

  ngDoCheck(): void {
    this.users = this.local.getData(localKey.users);
  }

  clear(): void {
    this.local.clearData();
  }

  getAll() {
    this.router.navigate(['/users']);
    this.users = this.local.getData(localKey.users);
  }

  initUsers() {
    this.router.navigate(['/users']);
    this.local.saveData(localKey.users, initialUsers);
    this.users = initialUsers;
  }
}
