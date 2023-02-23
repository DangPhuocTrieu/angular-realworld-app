import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ArticleComponent } from '../../components/article/article.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    HttpClientModule
  ],
  providers: []
})
export class HomeModule { }
