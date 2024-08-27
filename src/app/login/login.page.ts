import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthServiceService } from "../../app/auth/auth-service.service";
import { Storage } from '@ionic/storage';
import { ServicesService } from '../stockService/services.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})




export class LoginPage implements OnInit {
  USER_INFO : {
    id: any ,
    user_name: any,
    store_id :any,
    full_name:any,
    password:any
  };
  offline:boolean = false
  stores:Array<any> =[]
  store_info : {id:any ,store_ref:any , store_name:any , location :any }
  device :any = "" 
  company : { id: any , phone: any, phone2  :any, address :any, logoUrl:any,engName:any,arName:any ,tradNo:any , vatNo:any};

  constructor(private platform:Platform,private api:ServicesService,private storage: Storage,private toast:ToastController ,private loadingController:LoadingController , private authenticationService: AuthServiceService) {
     this.store_info = {id:1 ,store_ref:"sh" , store_name:"sooq sha'by" , location :"" } 
    this.USER_INFO = {
      id: "" ,
      user_name: "",
      store_id :"",
      full_name:"",
      password:"", 
    }
   }


   checkPlatform(){
    if (this.platform.is('desktop')) { 
      this.device = 'desktop'
      console.log('I am an desktop device!');
     }else if(this.platform.is('mobile')){
      this.device = 'mobile'
      console.log('I am an mobile device!'); 
     }
    }


  ngOnInit() {
    this.checkPlatform()
    this.getStore()
    this.getCompany()
  }

  pickDetail(ev){
    let fl= this.stores.filter(x=>x.store_name == ev.target.value)
    console.log(fl);
    this.store_info = {
      id:fl[0]['id'],
      store_name:fl[0]['store_name'],
      store_ref: fl[0]['store_ref'],
      location:fl[0]['location'] 
    }
    this.USER_INFO.store_id =fl[0]['id']
    console.log( this.store_info); 
  }

  getStore(){
    this.api.getStores().subscribe(data =>{
       console.log(data)
       let res = data
       this.stores = res['data']
      this.setStoreLocaly()
      this.setCurrentStoreLocaly()
     }, (err) => {
     console.log(err);
   })  
  }

  getCompany(){
    this.api.getCompany().subscribe(data =>{
        console.log('companay',data)
       let res = data
       this.company = res['data']
     }, (erriho) => {
     //console.log(err);
   })  
  }

  setCurrentStoreLocaly(){
    this.store_info = {id:"1" ,store_ref:"sh" , store_name:"sooq sha'by" , location :"" } 
    this.USER_INFO.store_id = this.store_info.id
    this.storage.set('STORE_INFO', this.store_info).then((response) => { 
      this.storage.set('offline' , false).then((response) => { 

      });
    })

  }
 
  setStoreLocaly(){ 
    this.storage.set('STORES', this.stores).then((response) => { 
      this.storage.set('offline' , false).then((response) => { 

      });
    })
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

  async presentLoadingWithOptions(msg?) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      mode:'ios',
      duration: 2000,
      message: msg,
      translucent: true,
     // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss()
       loading.onDidDismiss().then(data=>{
          console.log(data)
        });

    console.log('Loading dismissed with role:', role);
  }

  

   loginUser( ){
      if(this.USER_INFO.user_name == "" || this.USER_INFO.password == ""){
        this.presentToast('please fill all requaired feild' ,'danger') 
      }else{ 
        this.storage.set('STORE_INFO', this.store_info).then((response) => {
        })
        this.storage.set('company', this.company).then((response) => {
      
        })
            this.authenticationService.login(this.USER_INFO)    
      }

      }

  
}
