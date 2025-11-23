import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryService } from '../../core/services/category.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BaseChartDirective],
  template: `
    <div class="reports-container">
      <header class="page-header">
        <div class="header-content">
          <h1>Relatórios</h1>
          <button class="btn btn-secondary" routerLink="/dashboard">Voltar</button>
        </div>
      </header>

      <main class="page-main">
        <div class="card">
          <h2>Filtros</h2>
          <div class="filters">
            <div class="form-group">
              <label for="startDate">Data Inicial</label>
              <input 
                type="month" 
                id="startDate" 
                name="startDate" 
                [(ngModel)]="startDate"
                (change)="applyFilters()"
              />
            </div>

            <div class="form-group">
              <label for="endDate">Data Final</label>
              <input 
                type="month" 
                id="endDate" 
                name="endDate" 
                [(ngModel)]="endDate"
                (change)="applyFilters()"
              />
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total de Entradas</h3>
            <p class="stat-value positive">R$ {{ totalInput | number:'1.2-2' }}</p>
          </div>
          <div class="stat-card">
            <h3>Total de Saídas</h3>
            <p class="stat-value negative">R$ {{ totalOutput | number:'1.2-2' }}</p>
          </div>
          <div class="stat-card">
            <h3>Saldo</h3>
            <p class="stat-value" [ngClass]="balance >= 0 ? 'positive' : 'negative'">
              R$ {{ balance | number:'1.2-2' }}
            </p>
          </div>
        </div>

        <div class="card">
          <h2>Gráfico de Gastos por Mês</h2>
          <div class="chart-container">
            <canvas baseChart
              [data]="monthlyChartData"
              [type]="monthlyChartType"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>

        <div class="card">
          <h2>Gráfico de Gastos por Categoria</h2>
          <div class="chart-container">
            <canvas baseChart
              [data]="categoryChartData"
              [type]="categoryChartType"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>

        <div class="card">
          <h2>Gráfico de Entradas vs Saídas</h2>
          <div class="chart-container">
            <canvas baseChart
              [data]="comparisonChartData"
              [type]="comparisonChartType"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .reports-container {
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

    .filters {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .stat-card h3 {
      color: #666;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
    }

    .stat-value.positive {
      color: #28a745;
    }

    .stat-value.negative {
      color: #dc3545;
    }

    .chart-container {
      position: relative;
      height: 400px;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .filters {
        grid-template-columns: 1fr;
      }
      
      .chart-container {
        height: 300px;
      }
    }
  `]
})
export class ReportsComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private categoryService = inject(CategoryService);

  transactions: Transaction[] = [];
  startDate = '';
  endDate = '';
  totalInput = 0;
  totalOutput = 0;
  balance = 0;

  // Gráfico de Gastos por Mês
  monthlyChartType: ChartType = 'bar';
  monthlyChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  // Gráfico de Gastos por Categoria
  categoryChartType: ChartType = 'pie';
  categoryChartData: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };

  // Gráfico de Entradas vs Saídas
  comparisonChartType: ChartType = 'line';
  comparisonChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  ngOnInit() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.startDate = this.formatDateForInput(firstDay);
    this.endDate = this.formatDateForInput(now);
    this.loadTransactions();
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  loadTransactions() {
    if (!this.startDate || !this.endDate) return;

    const start = new Date(this.startDate + '-01');
    const end = new Date(this.endDate + '-01');
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);

    this.transactionService.getByDateRange(
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0]
    ).subscribe({
      next: (data) => {
        this.transactions = data;
        this.calculateStats();
        this.updateCharts();
      },
      error: (error) => {
        console.error('Erro ao carregar transações:', error);
      }
    });
  }

  applyFilters() {
    this.loadTransactions();
  }

  calculateStats() {
    this.totalInput = this.transactions.reduce((sum, t) => sum + t.input, 0);
    this.totalOutput = this.transactions.reduce((sum, t) => sum + t.output, 0);
    this.balance = this.totalInput - this.totalOutput;
  }

  updateCharts() {
    this.updateMonthlyChart();
    this.updateCategoryChart();
    this.updateComparisonChart();
  }

  updateMonthlyChart() {
    const monthlyData: { [key: string]: number } = {};
    
    this.transactions.forEach(t => {
      if (t.createdAt) {
        const date = new Date(t.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + t.output;
      }
    });

    this.monthlyChartData = {
      labels: Object.keys(monthlyData).sort(),
      datasets: [{
        label: 'Gastos por Mês',
        data: Object.keys(monthlyData).sort().map(key => monthlyData[key]),
        backgroundColor: 'rgba(102, 126, 234, 0.6)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1
      }]
    };
  }

  updateCategoryChart() {
    const categoryData: { [key: string]: number } = {};
    
    this.transactions.forEach(t => {
      if (t.category) {
        const catName = t.category.name;
        categoryData[catName] = (categoryData[catName] || 0) + t.output;
      }
    });

    const colors = this.generateColors(Object.keys(categoryData).length);

    this.categoryChartData = {
      labels: Object.keys(categoryData),
      datasets: [{
        data: Object.values(categoryData),
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('0.6', '1')),
        borderWidth: 1
      }]
    };
  }

  updateComparisonChart() {
    const monthlyInput: { [key: string]: number } = {};
    const monthlyOutput: { [key: string]: number } = {};
    
    this.transactions.forEach(t => {
      if (t.createdAt) {
        const date = new Date(t.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyInput[monthKey] = (monthlyInput[monthKey] || 0) + t.input;
        monthlyOutput[monthKey] = (monthlyOutput[monthKey] || 0) + t.output;
      }
    });

    const months = Array.from(new Set([...Object.keys(monthlyInput), ...Object.keys(monthlyOutput)])).sort();

    this.comparisonChartData = {
      labels: months,
      datasets: [
        {
          label: 'Entradas',
          data: months.map(m => monthlyInput[m] || 0),
          borderColor: 'rgba(40, 167, 69, 1)',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          tension: 0.4
        },
        {
          label: 'Saídas',
          data: months.map(m => monthlyOutput[m] || 0),
          borderColor: 'rgba(220, 53, 69, 1)',
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          tension: 0.4
        }
      ]
    };
  }

  generateColors(count: number): string[] {
    const colors = [
      'rgba(102, 126, 234, 0.6)',
      'rgba(118, 75, 162, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];
    
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(colors[i % colors.length]);
    }
    return result;
  }
}

