import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicesService } from '../stockService/services.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  seledctedUser :{id:any ,user_name :any ,full_name:any,phone:any,email:any,job_title:any,level:any , password:any };
  userArr:Array<any> =[]
  showEmpty :boolean = false 
  loading:boolean = false
  constructor(private rout: Router,private api:ServicesService,private toast :ToastController) { 


   }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.refresh()
   }

    refresh(){
      this.userArr =[] 
      this.getTopUsers()
    }

   getTopUsers(){
    this.showEmpty=false
    this.loading = true
    this.api.getTopUsers().subscribe(data =>{
      console.log('hhhhhh',data)
      let res = data
      if(res['message'] != 'No record Found'){
        this.userArr = res['data'] 
      }
      if(this.userArr.length==0){
        this.showEmpty = true
      }else{
        this.showEmpty = false
      }
      this.loading=false 
    }, (err) => {
     console.log(err);
  },
  ()=>{
   this.loading = false
  })  
   }


   getUserDetails(cust){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(cust) 
      }
    }; 
    this.rout.navigate(['folder/edit-user'], navigationExtras);  
   }

  newCustomer(){
    this.rout.navigate(['folder/new-user']); 
  }

}
