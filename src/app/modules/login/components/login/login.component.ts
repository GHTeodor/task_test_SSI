import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { localKey, LocalService, User } from "../../../../shared";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isUserExists: boolean = true;
  seePassword: boolean = false;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly local: LocalService) {
  }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  submit(): void {
    if (this.form.status === "VALID") {
      const user: User = this.local.getData(localKey.users)
        .find((u: User) => u.username.trim().toUpperCase() === this.form.get('username')?.value.trim().toUpperCase());

      if (user) {
        this.local.saveData(localKey.user, user);
        this.isUserExists = true;
        this.router.navigate(['/users']);
      } else
        this.isUserExists = false;
    }
  }

  getErrorMessage(field: string): string {
    if (this.form.get(field)?.hasError('minlength')) {
      if (field === 'username') return 'Username must be at least 2 characters';
      else if (field === 'password') return 'Password must be at least 8 characters';
    }

    return field + ' field is required';
  }

  showPass(e: MouseEvent) {
    e.preventDefault();
    this.seePassword = !this.seePassword;
  }
}
