import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from "./components/users/users.component";
import { AddComponent } from "./components/add/add.component";

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      { path: 'add', component: AddComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
