import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, CreateTransactionRequest, UpdateTransactionRequest } from '../../models/transaction.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transaction`);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${environment.apiUrl}/transaction/${id}`);
  }

  create(transaction: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiUrl}/transaction`, transaction);
  }

  update(transaction: UpdateTransactionRequest): Observable<Transaction> {
    return this.http.put<Transaction>(`${environment.apiUrl}/transaction/${transaction.id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/transaction/${id}`);
  }

  getByDateRange(startDate: string, endDate: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transaction/range?startDate=${startDate}&endDate=${endDate}`);
  }
}

