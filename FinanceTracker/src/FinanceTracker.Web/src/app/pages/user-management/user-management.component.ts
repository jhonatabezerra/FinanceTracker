import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="user-management-container">
      <header class="page-header">
        <div class="header-content">
          <h1>Gerenciar Usuários</h1>
          <button class="btn btn-secondary" routerLink="/dashboard">Voltar</button>
        </div>
      </header>

      <main class="page-main">
        <div class="card">
          <h2>Usuários do Sistema</h2>
          <div *ngIf="loading" class="loading">Carregando...</div>
          <div *ngIf="!loading && users.length === 0" class="loading">
            Nenhum usuário encontrado
          </div>
          <table class="table" *ngIf="!loading && users.length > 0">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Último Login</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <select 
                    [value]="user.userRole" 
                    (change)="updateUserRole(user.id, $event)"
                    [disabled]="user.id === currentUserId"
                  >
                    <option [value]="UserRole.Admin">Administrador</option>
                    <option [value]="UserRole.User">Usuário</option>
                    <option [value]="UserRole.Guest">Convidado</option>
                  </select>
                </td>
                <td>{{ user.lastLoginAt ? (user.lastLoginAt | date:'dd/MM/yyyy HH:mm') : 'Nunca' }}</td>
                <td>
                  <button 
                    class="btn btn-danger btn-sm" 
                    (click)="deleteUser(user.id)"
                    [disabled]="user.id === currentUserId"
                  >
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
    .user-management-container {
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

    .table select {
      padding: 6px 12px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
    }

    .table select:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 14px;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  users: User[] = [];
  loading = false;
  UserRole = UserRole;
  currentUserId = this.authService.getCurrentUser()?.id;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  updateUserRole(userId: number, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newRole = parseInt(select.value);

    this.userService.updateRole(userId, newRole).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Erro ao atualizar perfil do usuário:', error);
        alert('Erro ao atualizar perfil do usuário');
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
          alert('Erro ao excluir usuário');
        }
      });
    }
  }
}

