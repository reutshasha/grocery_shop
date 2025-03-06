import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroceryTransaction } from '../../shared/models/GroceryTransaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.SERVER_BASE_API_URL;

  private http = inject(HttpClient);

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}Auth/login`, { username, password });
  }

  getTransactionsByDateRange(startDate: string, endDate: string): Observable<GroceryTransaction[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<GroceryTransaction[]>(this.baseUrl + 'Grocery/transactions', { params });
  }
}
