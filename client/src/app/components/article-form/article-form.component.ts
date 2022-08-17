import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Article } from 'src/app/models/Article';
import { Data } from 'src/app/models/Data';
import { ArticleService } from 'src/app/services/article/article.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  articleForm!: FormGroup
  tags: string[] = []
  isDisabled = false

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { 
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: [[]],
      tagInput: ['']
    })
  }

  ngOnInit(): void {
    this.getArticle()
  }

  getArticle(): void {
    const idArticle = this.route.snapshot.paramMap.get('id')

    if(idArticle) {
      this.articleService.getArticle(idArticle).subscribe((res: Data) => {
        const data: Article = res.data as Article

        this.articleForm.addControl('_id', this.fb.control(''))
        this.articleForm.addControl('author', this.fb.control({}))

        this.articleForm.patchValue(data)
        this.tags = (data.tagList && data.tagList.length > 0) ? [ ...data.tagList ] : []
      })
    }
  } 

  handleAddTag(e: any): void {
    if(e.keyCode !== 13) return
    
    if(this.getControlValue('tagInput') && this.getControlValue('tagInput').trim()) {
      this.getControlValue('tagList').push(this.getControlValue('tagInput'))
      this.tags.push(this.getControlValue('tagInput'))
      this.getControl('tagInput').reset()
    }

    e.preventDefault()
  }

  handleRemoveTag(key: number): void {
    this.getControlValue('tagList').splice(key, 1)
    this.tags = [ ...this.getControlValue('tagList') ]
  }

  hanldeSubmitForm(): void {
    this.articleForm.removeControl('tagInput')

    if(this.getControlValue('_id')) {
      // EDIT ARTICLE
      this.articleService.editArticle(this.articleForm.value).subscribe({
        next: (res: Data) => {
          this.isDisabled = true
          const articleUpdated = res.data as Article
          
          setTimeout(() => this.router.navigateByUrl(`/article/${articleUpdated._id}`), 2000)
        },
        error: ({ error }) => {
          this.messageService.add({ severity:'error', summary:'Failed', detail: error.message })
          this.articleForm.addControl('tagInput', this.fb.control(''))
        }
      })
    }
    else {
      // CREATE ARTICLE
      this.articleService.addArticle({
        ...this.articleForm.value,
        author: this.userService.getCurrentUser()._id
      }).subscribe({
        next: (res: Data) => {
          this.isDisabled = true
          const article = res.data as Article
          
          setTimeout(() => this.router.navigateByUrl(`/article/${article._id}`), 2000)
        },
        error: ({ error }) => {
          this.messageService.add({ severity:'error', summary:'Failed', detail: error.message })
          this.articleForm.addControl('tagInput', this.fb.control(''))
        }
      })
    }
  }

  getControl(controlName: string): any {
    return this.articleForm.get(controlName)
  }
  
  getControlValue(controlName: string): any {
    return this.articleForm.get(controlName)?.value
  }
}
