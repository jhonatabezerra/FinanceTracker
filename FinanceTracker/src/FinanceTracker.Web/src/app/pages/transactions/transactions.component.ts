import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryService } from '../../core/services/category.service';
import { Transaction, CreateTransactionRequest } from '../../models/transaction.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="transactions-container">
      <header class="page-header">
        <div class="header-content">
          <h1>Transações</h1>
          <button class="btn btn-secondary" routerLink="/dashboard">Voltar</button>
        </div>
      </header>

      <main class="page-main">
        <div class="card">
          <h2>Nova Transação</h2>
          <form (ngSubmit)="onSubmit()" #transactionForm="ngForm">
            <div class="form-group">
              <label for="description">Descrição</label>
              <input 
                type="text" 
                id="description" 
                name="description" 
                [(ngModel)]="newTransaction.description" 
                required 
                placeholder="Ex: Aluguel, Salário, etc."
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="input">Entrada (R$)</label>
                <input 
                  type="number" 
                  id="input" 
                  name="input" 
                  [(ngModel)]="newTransaction.input" 
                  step="0.01" 
                  min="0"
                  placeholder="0.00"
                />
              </div>

              <div class="form-group">
                <label for="output">Saída (R$)</label>
                <input 
                  type="number" 
                  id="output" 
                  name="output" 
                  [(ngModel)]="newTransaction.output" 
                  step="0.01" 
                  min="0"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="categoryId">Categoria</label>
              <select 
                id="categoryId" 
                name="categoryId" 
                [(ngModel)]="newTransaction.categoryId" 
                required
              >
                <option value="">Selecione uma categoria</option>
                <option *ngFor="let category of categories" [value]="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="type">Tipo (opcional)</label>
              <input 
                type="text" 
                id="type" 
                name="type" 
                [(ngModel)]="newTransaction.type" 
                placeholder="Ex: Fixo, Variável, etc."
              />
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="!transactionForm.valid || loading">
              <span *ngIf="!loading">Adicionar Transação</span>
              <span *ngIf="loading">Salvando...</span>
            </button>
          </form>
        </div>

        <div class="card">
          <h2>Transações</h2>
          <div *ngIf="loadingTransactions" class="loading">Carregando...</div>
          <div *ngIf="!loadingTransactions && transactions.length === 0" class="loading">
            Nenhuma transação encontrada
          </div>
          <table class="table" *ngIf="!loadingTransactions && transactions.length > 0">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let transaction of transactions">
                <td>{{ transaction.description }}</td>
                <td>{{ transaction.category?.name || 'N/A' }}</td>
                <td class="positive">{{ transaction.input | number:'1.2-2' }}</td>
                <td class="negative">{{ transaction.output | number:'1.2-2' }}</td>
                <td>{{ transaction.type || 'N/A' }}</td>
                <td>{{ transaction.createdAt | date:'dd/MM/yyyy' }}</td>
                <td>
                  <button class="btn btn-danger btn-sm" (click)="deleteTransaction(transaction.id)">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .transactions-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .page-header {
      background: rgba(255, 255, 255, 0.95);
      padding: 20px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content h1 {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 28px;
    }

    .page-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .positive {
      color: #28a745;
      font-weight: 600;
    }

    .negative {
      color: #dc3545;
      font-weight: 600;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TransactionsComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private categoryService = inject(CategoryService);

  transactions: Transaction[] = [];
  categories: Category[] = [];
  loading = false;
  loadingTransactions = false;

  newTransaction: CreateTransactionRequest = {
    description: '',
    input: 0,
    output: 0,
    categoryId: 0,
    type: ''
  };

  ngOnInit() {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions() {
    this.loadingTransactions = true;
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loadingTransactions = false;
      },
      error: (error) => {
        console.error('Erro ao carregar transações:', error);
        this.loadingTransactions = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.transactionService.create(this.newTransaction).subscribe({
      next: () => {
        this.loadTransactions();
        this.newTransaction = {
          description: '',
          input: 0,
          output: 0,
          categoryId: 0,
          type: ''
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao criar transação:', error);
        this.loading = false;
      }
    });
  }

  deleteTransaction(id: number) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.delete(id).subscribe({
        next: () => {
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Erro ao excluir transação:', error);
        }
      });
    }
  }
}


