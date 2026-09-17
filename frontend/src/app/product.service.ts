import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product{
  pid: number;
  pname: string;
  price: number;
  brand: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl= 'http://localhost:7000';

  constructor(private http: HttpClient) { }
  addProduct(product: Product): Observable<any>{
    return this.http.post(`${this.baseUrl}/addproduct`,product);
  }
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/getallproducts`);
  }
}
