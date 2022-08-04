import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser!: User

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser()
  }

}
