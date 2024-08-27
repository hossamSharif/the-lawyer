import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'
@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
})
export class CasesPage implements OnInit {

  constructor(private rout: Router) { }

  ngOnInit() {
  }
  
  newCase(){
    this.rout.navigate(['folder/new-case']); 
  }
}
