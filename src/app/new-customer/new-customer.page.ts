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
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  @ViewChild('popoverNotif') popoverNotif;
   isOpenCustType = false ;
   showCustType = false
   custTypeArr :Array<any> =[]
   selectedCustTye : {id:any ,name:any};
   spinner:boolean = false 
   seledctedCustomer :{id:any ,cust_ref :any ,cust_type:any,cust_name:any,cust_ident:any,phone:any,email:any,company_name:any,company_ident:any ,company_regno:any,company_phone:any,company_represent:any,company_email:any, status:any };
   
  
   ionicForm: FormGroup;
   ionicForm2: FormGroup;
   isSubmitted = false;
   isSubmitted2 = false;
  constructor(private formBuilder: FormBuilder,private _location : Location ,private menuCtrl :MenuController,  private rout : Router ,private platform:Platform,private behavApi:StockServiceService, private route: ActivatedRoute,private renderer : Renderer2,private modalController: ModalController,private alertController: AlertController,private storage: Storage,private loadingController:LoadingController, private datePipe:DatePipe,private api:ServicesService,private toast :ToastController) { 
    this.custTypeArr.push(
      {id:1,name:"فرد"},
      {id:2,name:"شركة"}
    )
    this.selectedCustTye = {id:1,name:"فرد"}

    this.ionicForm2 = this.formBuilder.group({
      company_phone:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]],
      company_name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      company_email: ['', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      company_ident: ['',Validators.required],
      company_regno: ['',Validators.required] ,
      company_represent : ['' , Validators.required]  
    })

    this.ionicForm = this.formBuilder.group({
      cust_ident: ['' , Validators.required], 
      cust_name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], 
      phone:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]]
      
    })


  }

  ngOnInit() {
   this.prepareInvo()
  }


  generateRandom():any{
    let da = new Date 
    //console.log(da)
    let randomsNumber = da.getMonth().toString() + da.getDay().toString() + da.getHours().toString()+ da.getMinutes().toString()+da.getSeconds().toString()+da.getMilliseconds().toString()
    this.seledctedCustomer.cust_ref = 'cust'+ randomsNumber
     console.log(randomsNumber)  
  }

  
  prepareInvo(){  
    this.seledctedCustomer = {id:"" ,cust_ref : "" , cust_type:"",cust_name:"",cust_ident:"",phone:"",email:"",company_name:"",company_ident:"" ,company_regno:"",company_phone:"",company_represent:"",company_email:"", status:"" };
    this.generateRandom()  
  }


  save() {
      if (this.validate() == true) {
        this.presentLoadingWithOptions('جاري حفظ البيانات ...')
        console.log(this.seledctedCustomer) 
        this.saveInvo() 
      } 
  }

  save2() {
      if (this.validate2() == true) {
        this.presentLoadingWithOptions('جاري حفظ البيانات ...')
        console.log(this.seledctedCustomer)
        this.saveInvo()
      }
  }

  

  saveInvo() {
    console.log('saveInvo')
    this.api.saveCostumer(this.seledctedCustomer).subscribe(data => {
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
  get errorControl2() {
    return this.ionicForm2.controls;
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

  validate2(){
    this.isSubmitted2 = true;
    if (this.ionicForm2.valid == false) {
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
      this.selectedCustTye = {
        id:item.id,
        name:item.name
      } 
       
        //console.log( this.selectedItem); 
        this.didDissmisCustType()
        //perform calculate here so moataz can get the qty
      }







}
