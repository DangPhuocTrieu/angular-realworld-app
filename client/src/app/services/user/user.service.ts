import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { curr_user_key } from 'src/app/constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private CURR_USER_KEY = curr_user_key
  private BASE_URL = 'http://localhost:8000/api/auth'

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const userJSON = localStorage.getItem(this.CURR_USER_KEY)
    if(userJSON) return JSON.parse(userJSON)
    return null
  }
}
