import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="header-content">
          <h1>Finance Tracker</h1>
          <div class="user-info">
            <span>Olá, {{ currentUser?.name }}</span>
            <button class="btn btn-secondary" (click)="logout()">Sair</button>
          </div>
        </div>
      </header>

      <main class="dashboard-main">
        <h2>Selecione um Serviço</h2>
        
        <div class="services-grid">
          <div class="service-card" routerLink="/transactions">
            <div class="service-icon">💰</div>
            <h3>Transações</h3>
            <p>Adicione e gerencie seus gastos e ganhos</p>
          </div>

          <div class="service-card" routerLink="/reports">
            <div class="service-icon">📊</div>
            <h3>Relatórios</h3>
            <p>Visualize gráficos e análises dos seus gastos</p>
          </div>

          <div class="service-card" routerLink="/users" *ngIf="isAdmin">
            <div class="service-icon">👥</div>
            <h3>Gerenciar Usuários</h3>
            <p>Configure o acesso dos utilizadores</p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .dashboard-header {
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

    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .user-info span {
      font-weight: 600;
      color: #333;
    }

    .dashboard-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .dashboard-main h2 {
      color: white;
      font-size: 32px;
      margin-bottom: 30px;
      text-align: center;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .service-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .service-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }

    .service-card h3 {
      color: #333;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .service-card p {
      color: #666;
      font-size: 16px;
    }
  `]
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser = this.authService.getCurrentUser();
  isAdmin = this.authService.isAdmin();

  logout() {
    this.authService.logout();
  }
}


