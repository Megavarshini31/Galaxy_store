import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService){
    this.productForm = this.fb.group({
      pid: ['',Validators.required],
      pname: ['',Validators.required],
      price: ['',Validators.required],
      brand: ['',Validators.required]
    });
  }
  onSubmit(): void{
    if(this.productForm.invalid){
      return;
    }
    this.productService.addProduct(this.productForm.value).subscribe({
      next: ()=>{
        alert('Products added successfully!');
        this.productForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong while adding the product');
      }
    });
  }
}
