import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../../models/Data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:8000/api/auth'

  constructor(private http: HttpClient) { }

  login(data: any): Observable<Data> {
    return this.http.post<Data>(`${this.BASE_URL}/login`, data)
  }

  register(data: any): Observable<Data> {
    return this.http.post<Data>(`${this.BASE_URL}/register`, data)
  }
}
