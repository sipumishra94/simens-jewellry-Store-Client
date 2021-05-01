import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/_model/login-details.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginDetails: LoginDetails = {
  userName : '',
  password : ''
};
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.logIn(this.loginDetails).subscribe(response => {
      this.router.navigateByUrl('/estimation');
    })
  }

  cancel(){
    this.loginDetails.password = '';
    this.loginDetails.userName = '';
  }

}
