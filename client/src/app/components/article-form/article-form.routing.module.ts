import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './article-form.component';

const routes: Routes = [
  { path: 'create', component: ArticleFormComponent },
  { path: 'edit/:id', component: ArticleFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleFormRoutingModule {}
