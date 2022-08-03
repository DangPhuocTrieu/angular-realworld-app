import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    HttpClientModule,
    ToastModule
  ],
  declarations: [
    AuthComponent,
  ],
  providers: [ MessageService ]
})
export class AuthModule {}
