import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { delay, of } from "rxjs";

import { localKey, LocalService } from "../../../../shared";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly local: LocalService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.local.removeData(localKey.user);

    of(([])).pipe(
      delay(800)
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
