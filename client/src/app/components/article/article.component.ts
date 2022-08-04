import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  articles!: Article[]
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
    this.getArticles()
  }

  getArticles() {
    this.articleUser.getArticles().subscribe(data => {
      this.articleUser.getArticles().subscribe(data => {
        if(this.type === 'global') {
          this.articles = data.data as Article[]
          console.log(this.articles)
          return 
        }

        const currentUser = this.userService.getCurrentUser()
        const articles = data.data as Article[]
        this.articles = articles.filter((item: Article) => item.author._id === currentUser._id)
        console.log(this.articles)
      })
    })
  } 
}
