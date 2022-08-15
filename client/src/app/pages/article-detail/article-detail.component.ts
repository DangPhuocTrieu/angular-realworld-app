import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { avt_user_def } from 'src/app/constants';
import { Article } from 'src/app/models/Article';
import { User } from 'src/app/models/User';
import { ArticleService } from 'src/app/services/article/article.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  AVT_USER_DEF: string = avt_user_def
  article!: Article
  user!:User

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getArticle()
    this.user = this.userService.getCurrentUser()
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('id') as string
    this.articleService.getArticle(id).subscribe((res) => {
      this.article = res.data as Article
    })
  }

  handleEditArticle(id: string): void {
    this.router.navigate([`/edit/${id}`])
  }
}
