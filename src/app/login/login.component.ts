import { Component, OnInit } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { NotificationService } from '../common/toaster';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import Utility from '../common/utility';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private toaster: NotificationService, private route: Router) { }
  username = ''
  password = ''
  ngOnInit(): void {
  }
  public loginSummit = (event: Event) => {
    event.preventDefault()
    const userData: User = {
      username: this.username,
      password: this.password
    }
    this.userService.loginSubmit(userData).subscribe((data: any) => {
      if (data.data?.accesstoken) {
        Utility.encryptAndStoreOnBrowser('token', data.data.accesstoken)
        this.route.navigate([''])
        this.toaster.showSuccess('Login success', 'Login')
      } else {
        this.toaster.showError('Login failed', 'Login')
      }
    }, (error: HttpErrorResponse) => {
      this.toaster.showError(`${error.error?.message || 'Login failed'}`, 'Login')
    })
  }
}
