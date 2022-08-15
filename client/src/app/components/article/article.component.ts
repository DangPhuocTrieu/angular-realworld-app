import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { avt_user_def } from 'src/app/constants';
import { ArticleService } from 'src/app/services/article/article.service';
import { UserService } from 'src/app/services/user/user.service';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnChanges {
  @Input() type!: string
  articles: Article[] = []
  isLoading = false
  AVT_USER_DEF: string = avt_user_def

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private articleUser: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getArticles()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.articles = []
    this.getArticles()
  }

  getArticles(): void {
    this.isLoading = true
    this.articleUser.getArticles()
    .pipe(delay(1000))
    .subscribe(data => {
      if(this.type === 'global') {
        this.articles = data.data as Article[]
        this.isLoading = false
      }
      else {
        const currentUser = this.userService.getCurrentUser()
        const articles = data.data as Article[]
        this.articles = articles.filter((item: Article) => item.author._id === currentUser._id)
      }

      this.isLoading = false
    })
  } 

  handleNavigateDetail(id: string): void {
    this.router.navigateByUrl(`article/${id}`)
  }
}
