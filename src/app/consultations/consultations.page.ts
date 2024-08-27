import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.page.html',
  styleUrls: ['./consultations.page.scss'],
})

export class ConsultationsPage implements OnInit {
  
  constructor ( private rout : Router) { 
   }

  ngOnInit() {

  }
  newConsoltation(){
    this.rout.navigate(['folder/new-customer']); 
  }
}
