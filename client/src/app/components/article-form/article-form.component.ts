import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Article } from 'src/app/models/Article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { Data } from 'src/app/models/Data';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  articleForm!: FormGroup

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['']
    })
  }

  ngOnInit(): void {
    this.getArticle()
  }

  getArticle(): void {
    const idArticle = this.route.snapshot.paramMap.get('id')

    if(idArticle) {
      this.articleService.getArticle(idArticle).subscribe((res: Data) => {
        this.articleForm.patchValue(res.data)
        console.log(this.articleForm.value)
      })
    }
    else {
      console.log(this.articleForm.value)
    }
  }
}
