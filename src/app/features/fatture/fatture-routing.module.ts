import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FattureComponent } from "./fatture.component";
import { FattureFormComponent } from "./components/fatture-form/fatture-form.component";

const routes: Routes = [
  { path: "", component: FattureComponent },
  { path: "fatture-form", component: FattureFormComponent },
  { path: "fatture-form/:id", component: FattureFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FattureRoutingModule {}
