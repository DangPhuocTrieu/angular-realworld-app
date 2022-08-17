import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CURR_USER } from 'src/app/constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = ''
  title: String = ''
  authForm!: FormGroup

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
    ) { 
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required ],
      })
    }

  ngOnInit(): void {
    this.authType = this.router.url.substring(1)
    this.title = this.authType === 'login' ? 'Sign in': 'Sign up'
    if(this.authType === 'register') {
      this.authForm.addControl('username', new FormControl('', [Validators.required]))
    }
  }

  handleSubmit(form: FormGroup): void {
    form.markAllAsTouched()
    
    if(form.invalid) return
    
    if(this.authType === 'register') {
      this.authService.register(form.value).subscribe({
        next: data => { 
          this.router.navigateByUrl('/login')
        },
        error: ({ error }) => this.messageService.add({severity:'error', summary:'Failed', detail: error.message })
      })
    }
    else {
      this.authService.login(form.value).subscribe({
        next: data => {
          localStorage.setItem(CURR_USER, JSON.stringify(data.data))
          this.router.navigateByUrl('/')
        },
        error: ({ error }) => this.messageService.add({severity:'error', summary:'Failed', detail: error.message })
      })
    }
  }
}
