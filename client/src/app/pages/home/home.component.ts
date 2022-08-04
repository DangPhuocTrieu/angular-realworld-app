import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient, 
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()
  }

  handleChangeTab(type: string) {
    console.log(type)
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
