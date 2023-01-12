import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { localKey, LocalService } from "../../../../shared";
import { checkUniqueUserName, userNormalizer } from "../../helpers";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form!: FormGroup;
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
      username: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(125)]],
    });
  }

  add(): void {
    if (this.form.status === "VALID") {
      const userValues = {
        username: this.form.get('username')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        age: this.form.get('age')?.value,
      };
      const user = userNormalizer(userValues);

      const data = this.local.getData(localKey.users);
      if (data[0]) {
        if (checkUniqueUserName(user.username, data)) {
          alert(`Username must be unique. You can't use '${user.username}'`);
          return;
        }

        data.push(user);
        this.local.saveData(localKey.users, data);
      } else {
        this.local.saveData(localKey.users, [user]);
      }

      this.router.navigate(['/users']);
    }
  }

  getErrorMessage(field: string): string {
    if (field === 'username') {
      if (this.form.get(field)?.hasError('minlength')) return 'Min length 2 characters';
      if (this.form.get(field)?.hasError('maxlength')) return 'Max length 30 characters';
    }

    if (field === 'email') {
      if (this.form.get('email')?.hasError('email')) return 'Not a valid email';
      if (this.form.get('email')?.hasError('maxlength')) return 'Max length 30 characters';
    }

    if (field === 'password') {
      if (this.form.get('password')?.hasError('minlength')) return 'Min length 8 characters';
      if (this.form.get('password')?.hasError('maxlength')) return 'Max length 100 characters';
    }

    if (field === 'age') {
      if (this.form.get('age')?.hasError('max')) return 'Max value 125';
      if (this.form.get('age')?.hasError('min')) return 'Min value 0';
    }

    return field + ' field is required';
  }

  showPass(e: MouseEvent) {
    e.preventDefault();
    this.seePassword = !this.seePassword;
  }
}
