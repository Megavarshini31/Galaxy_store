import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductComponent } from './display-product/display-product.component';


export const routes: Routes = [
    {path: '',redirectTo: 'addproduct',pathMatch: 'full'},
    {path: 'addproduct',component: AddProductComponent},
    {path: 'displayproduct',component: DisplayProductComponent}
];
