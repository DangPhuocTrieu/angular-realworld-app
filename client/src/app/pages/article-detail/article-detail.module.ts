import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailRoutingModule } from './auth.routing.module';
import { ArticleDetailComponent } from './article-detail.component';
import { ButtonModule } from 'primeng/button'
import { InputTextareaModule } from 'primeng/inputtextarea'


@NgModule({
  declarations: [
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    ArticleDetailRoutingModule,
    ButtonModule,
    InputTextareaModule
  ]
})
export class ArticleDetailModule { }
