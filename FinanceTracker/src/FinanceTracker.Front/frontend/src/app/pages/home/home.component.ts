import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  status: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStatus().subscribe({
      next: (res) => this.status = res.message,
      error: () => this.status = 'Backend offline'
    });
  }
}
