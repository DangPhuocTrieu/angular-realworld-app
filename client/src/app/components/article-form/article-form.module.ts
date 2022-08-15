import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleFormComponent } from './article-form.component';
import { ArticleFormRoutingModule } from './article-form.routing.module';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { InputTextareaModule } from 'primeng/inputtextarea'

@NgModule({
  declarations: [
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArticleFormRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class ArticleFormModule { }
