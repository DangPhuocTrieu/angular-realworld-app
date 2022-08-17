import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CURR_USER } from 'src/app/constants';
import { Data } from 'src/app/models/Data';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingForm!: FormGroup
  user!: User

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.settingForm = this.fb.group({
      avatar: [''],
      username: ['', Validators.required],
      bio: [''],
      email: ['', Validators.required],
      newPassword: ['']
    })
   }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.settingForm.patchValue(this.user)
  }

  handleSubmit():void {
    if(!this.settingForm.get('newPassword')?.value.trim()) {
      this.settingForm.removeControl('newPassword')
    }

    this.userService.editUser(this.settingForm.value, this.user._id)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/')
          localStorage.setItem(CURR_USER, JSON.stringify({
            ...this.userService.getCurrentUser(),
            ...res['data']
          }))
        },
        error: ({ error }) => {
          this.messageService.add({ severity:'error', summary:'Failed', detail: error.message })
          this.settingForm.addControl('newPassword', this.fb.control(''))
        }
      })
  }

  handleLogout(): void {
    localStorage.removeItem('currentUser')
    this.router.navigateByUrl('/')

  }
}
