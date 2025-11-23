import { Category } from './category.model';

export interface Transaction {
  id: number;
  description: string;
  input: number;
  output: number;
  type?: string;
  categoryId: number;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTransactionRequest {
  description: string;
  input: number;
  output: number;
  type?: string;
  categoryId: number;
}

export interface UpdateTransactionRequest {
  id: number;
  description?: string;
  input?: number;
  output?: number;
  type?: string;
  categoryId?: number;
}

