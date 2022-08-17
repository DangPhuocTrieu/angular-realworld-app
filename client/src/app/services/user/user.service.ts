import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { CURR_USER } from 'src/app/constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private CURR_USER_KEY = CURR_USER
  private BASE_URL = 'http://localhost:8000/api/user'

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const userJSON = localStorage.getItem(this.CURR_USER_KEY)
    if(userJSON) return JSON.parse(userJSON)
    return null
  }

  editUser(data: any, id: string): Observable<Data> {
    return this.http.put<Data>(`${this.BASE_URL}/${id}`, data)
  }
}
