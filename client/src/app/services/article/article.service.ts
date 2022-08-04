import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../../models/Data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private BASE_URL = 'http://localhost:8000/api/article'

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Data> {
    return this.http.get<Data>(this.BASE_URL)
  }

  getArticle(id: string): Observable<Data> {
    return this.http.get<Data>(`${this.BASE_URL}/${id}`)
  }
}
