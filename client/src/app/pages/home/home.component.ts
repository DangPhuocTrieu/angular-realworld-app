import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tabActive: number = 0
  type: string = 'your'
  currentUser!: User | null

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()
    if(!this.currentUser) {
      this.tabActive = 1
      this.type = 'global'
    }
  }

  handleChangeTab(type: string) {
    this.type = type
  }

  handleChange() {
    if(this.tabActive === 0) {
      this.type = 'your'
      !this.currentUser && this.router.navigateByUrl('/login')
      return
    }

    this.type = 'global'
  }
}
