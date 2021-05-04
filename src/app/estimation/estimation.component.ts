import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../_model/user-details.model';
import Swal from 'sweetalert2';
import { AccountService } from '../_services/account.service';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }


  userDetails: UserDetails = {
    userName :"",
    userRole : ""
  };

  estimationDetails: any = {};

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.estimationDetails.discount = 0;
    this.estimationDetails.totalPrice = 0;
    if(user)
      this.userDetails = JSON.parse(user);

    if(this.userDetails.userRole && this.userDetails.userRole.toLowerCase() === 'privileged')
      this.accountService.GetDiscount().subscribe((response: any) => {
        if(response)
        this.estimationDetails.discount = response;
      });

  }



  calculate(){
    if(this.estimationDetails.goldPrice && this.estimationDetails.weight){
      const goldPrice = +this.estimationDetails.goldPrice;
      const weight = +this.estimationDetails.weight;
      if(this.estimationDetails.discount && this.estimationDetails.discount > 0){
        const basePrice = goldPrice * weight;
        const discount  = (basePrice * this.estimationDetails.discount) / 100;
        this.estimationDetails.totalPrice = basePrice - discount;
      }
      else
        this.estimationDetails.totalPrice = goldPrice * weight;
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please insert Gold price and Weight!',
      })
    }
  }
  printToScreen(){
    Swal.fire(this.estimationDetails.totalPrice.toString());
  }

  logOut(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  close(){
    this.logOut();
  }

  printToPaper(){
    throw new Error("not Implemented");
  }

  printToFile(){
    let DATA = document.getElementById('estimation')!;
        
    html2canvas(DATA).then(canvas => {
        let fileWidth = 200;
        let fileHeight = 150;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('estimation.pdf');
    });     
  }

}
