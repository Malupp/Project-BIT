import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsersListRoutingModule } from "./userslist-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserslistComponent } from "./userslist.component";
import { PopuproleComponent } from "./components/popuprole/popuprole.component";

@NgModule({
  declarations: [UserslistComponent, PopuproleComponent],
  imports: [CommonModule, UsersListRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CustomersModule {}
