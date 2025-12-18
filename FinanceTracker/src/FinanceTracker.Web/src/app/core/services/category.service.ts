import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CreateCategoryRequest } from '../../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/category`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/category/${id}`);
  }

  create(category: CreateCategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/category`, category);
  }

  update(id: number, category: CreateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}/category/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/category/${id}`);
  }
}


