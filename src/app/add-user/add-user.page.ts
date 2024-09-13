import { Component, OnInit ,ViewChild ,ElementRef ,Renderer2,Input} from '@angular/core';

import { ServicesService } from "../stockService/services.service";
import { Observable, Subscription } from 'rxjs';
import { AlertController, Platform , LoadingController, ModalController, ToastController, MenuController } from '@ionic/angular';
import { DatePipe ,Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../syncService/stock-service.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  @ViewChild('popoverNotif') popoverNotif;
  isOpenCustType = false ;
  showCustType = false ;  
  userTypeArr :Array<any> =[] 
  seledctedUser :{id:any ,user_name :any ,full_name:any,phone:any,email:any,job_title:any,level:any , password:any };

  selectedUserType : {id:any ,name:any}; 
  spinner:boolean = false 
  ionicForm: FormGroup; 
  isSubmitted = false; 
  constructor(private formBuilder: FormBuilder,private _location : Location ,private menuCtrl :MenuController,  private rout : Router ,private platform:Platform,private behavApi:StockServiceService, private route: ActivatedRoute,private modalController: ModalController,private storage: Storage,private loadingController:LoadingController,private api:ServicesService,private toast :ToastController) { 

    this.userTypeArr.push(
      {id:2,name:"super Admin"}, 
      {id:1,name:"admin"},
      {id:0,name:"user"}
    )
    this.selectedUserType = {id:0,name:"user"} 
    this.ionicForm = this.formBuilder.group({
      job_title: ['' , Validators.required], 
      user_name: ['' , Validators.required], 
      password: ['' , Validators.required], 
      level: ['' , Validators.required], 
      full_name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], 
      phone:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]]
      
    })
    
  }

  ngOnInit() {

  }

  prepareInvo(){  
    this.seledctedUser = {id:"" ,user_name :"" ,full_name:"",phone:"",email:"",job_title:"",level:0 , password:""};
    this.ionicForm.reset() 
    this.isSubmitted = false 
  }

save() {
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.seledctedUser) 
      this.saveInvo() 
    } 
}


saveInvo() {
  console.log('saveInvo')
  this.api.saveUser(this.seledctedUser).subscribe(data => {
    console.log('save',data)
   if(data['message'] != 'Post Not Created') {
   // this.selectedِCustmer.id = data['message']
   this.presentToast('تم حفظ البيانات بنجاح', 'success')
   this.prepareInvo()
    }else{
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    }
  }, (err) => {
    //console.log(err);
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
  })
}


get errorControl() {
  return this.ionicForm.controls;
}
 
validate(){
  this.isSubmitted = true;
  if (this.ionicForm.valid == false) {
    //console.log('Please provide all the required values! 1') 
    return false
  }  else {
     return true
  }  
}

 
async presentLoadingWithOptions(msg?) {
  const loading = await this.loadingController.create({
    spinner: 'bubbles',
    mode:'ios',
    duration: 5000,
    message: msg,
    translucent: true,
   // cssClass: 'custom-class custom-loading',
    backdropDismiss: false
  });
  await loading.present(); 
  const { role, data } = await loading.onDidDismiss();
  //console.log('Loading dismissed with role:', role);
}


async presentToast(msg,color?) {
  const toast = await this.toast.create({
    message: msg,
    duration: 2000,
    color:color,
    cssClass:'cust_Toast',
    mode:'ios',
    position:'top' 
  });
  toast.present();
}

close(){
  this._location.back();
}

presentPopoverCustType(e?: Event) {
  console.log('preent me', e)
     this.showCustType = false
    this.popoverNotif.event = e;
     this.isOpenCustType = true;  
   }

  didDissmisCustType(){
    this.isOpenCustType = false
    //console.log('dismissOver') 
  }

  selectFromPopTypes(item){
    console.log(item)
    this.selectedUserType = {
      id:item.id,
      name:item.name
    } 

    this.seledctedUser.level = this.selectedUserType.id
     
      //console.log( this.selectedItem); 
      this.didDissmisCustType()
      //perform calculate here so moataz can get the qty
    }

}
