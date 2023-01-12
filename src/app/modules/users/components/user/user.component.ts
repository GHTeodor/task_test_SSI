import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { localKey, LocalService, User, UserForUpdate } from '../../../../shared';
import { UpdateComponent } from "../update/update.component";
import { userNormalizer } from "../../helpers";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input()
  index!: number;
  @Input()
  user!: User;

  // private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly local: LocalService,
              public dialog: MatDialog) {
  }

  remove(): void {
    const data = this.local.getData(localKey.users);
    data.splice(this.index, 1);
    this.local.saveData(localKey.users, data);
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '80vw',
      data: {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        age: this.user.age,
        confirmPassword: null,
      },
    });

    dialogRef.afterClosed()/*.pipe(takeUntil(this.unsubscribe$))*/.subscribe((result: UserForUpdate) => {
      if (result) {
        if (result.password !== result.confirmPassword) {
          alert("'Confirm password' must match with 'password'");
          return;
        }
        const {confirmPassword, ...updatedUser} = result;
        const user = userNormalizer(updatedUser);

        const data = this.local.getData(localKey.users);
        data.splice(index, 1, user)
        this.local.saveData(localKey.users, data);
      }
    });
  }
}
