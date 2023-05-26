import { NgModule, inject } from "@angular/core";
import { ResolveFn, RouterModule, Routes } from "@angular/router";
import { FattureComponent } from "./fatture.component";
import { FattureFormComponent } from "./components/fatture-form/fatture-form.component";
import { FattureService } from "./services/fatture.service";
import { Fatture } from "./models/fatture.interface";

const getFatture: ResolveFn<Array<Fatture>> = () => inject(FattureService).getFatture();

const routes: Routes = [
  {
    path: "",
    component: FattureComponent,
    resolve: {
      fatture: getFatture,
    },
  },
  { path: "fatture-form", component: FattureFormComponent },
  {
    path: "fatture-form/:id",
    component: FattureFormComponent,
    resolve: {
      fatture: getFatture,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FattureRoutingModule {}
