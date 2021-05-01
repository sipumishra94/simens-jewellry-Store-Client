import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../_model/user-details.model';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  constructor() { }

  userDetails: UserDetails = {
    userName :"",
    userRole : ""
  };

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user)
      this.userDetails = JSON.parse(user);
  }

}
