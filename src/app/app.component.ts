import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from "../app/auth/auth-service.service";
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/sales', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  selectedYear : any = null 
  selectedProj :  {projId:any ,projType:any}

  year : {id:any ,yearDesc:any ,yearStart :any,yearEnd:any}
   store_info : {id:any ,store_ref:any , store_name:any , location :any } 
   USER_INFO : { id: any , user_name: any, store_id :any, full_name:any, password:any,

  };
   isAuth :   boolean ;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private alertController :AlertController ,private storage: Storage,private authenticationService: AuthServiceService,private router: Router) {
   
      // Use matchMedia to check the user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

      this.toggleDarkTheme(prefersDark.matches);
  
      // Listen for changes to the prefers-color-scheme media query
      prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
  
      // Add or remove the "dark" class based on if the media query matches
     


    this.USER_INFO = {
      id: "" ,
      user_name: "",
      store_id :"",
      full_name:"",
      password:"",
  
    };

    this.store_info  = {id:"" ,store_ref:"" , store_name:"" , location :"" } 

    this.initializeApp();
  }

   toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }

 
  initializeApp() { 
   
  this.auth();  
  }
  
  async  getAppInfo(){
      await this.storage.create(); 
      this.storage.get('USER_INFO').then((response) => {
        if (response) {
          this.USER_INFO = response
          console.log(response) 
        }
      });
      this.storage.get('STORE_INFO').then((response) => {
        if (response) {
          this.store_info = response
           console.log(response)
           console.log(this.store_info)

        }
      });




      this.storage.get('year').then((response2) => {
        this.year = response2
        this.selectedYear = response2
        
        console .log('rr',this.selectedYear ,  this.selectedProj )
        if (this.selectedYear && this.selectedProj) { 
          this.router.navigate(['folder/dashboard']);   
        }else{
         // this.presentAlertConfirm()
        
        this.year =  {id : '1' , yearDesc : 'السنة المالية الأولي' , yearStart : '2022-12-31',yearEnd : '2022-06-15'}
         this.storage.set('projId',this.selectedProj ).then(() => {
          this.storage.set('year', this.year).then(() => {
            this.router.navigate(['folder/dashboard']);
          });
         });
        }
      }); 
      //  this.storage.get('projId').then((response) => {
      //   this.storage.get('year').then((response2) => {
      //     this.year = response2
      //     this.selectedYear = response2
      //     this.selectedProj = response
      //     console .log('rr',this.selectedYear ,  this.selectedProj )
      //     if (this.selectedYear && this.selectedProj) { 
      //       this.router.navigate(['folder/home']);   
      //     }else{
      //      // this.presentAlertConfirm()
      //     this.selectedProj = {projId : 'Alkamleen' , projType : 'normal'}
      //     this.year =  {id : '1' , yearDesc : 'السنة المالية الأولي' , yearStart : '2022-12-31',yearEnd : '2022-06-15'}
      //      this.storage.set('projId',this.selectedProj ).then(() => {
      //       this.storage.set('year', this.year).then(() => {
      //         this.router.navigate(['folder/home']);
      //       });
      //      });
      //     }
      //   });   
      //  });

      
    }

  
      async auth (){ 
        this.storage.create().then(() => {
          this.authenticationService.authState.subscribe(state => {
          this.isAuth = this.authenticationService.isAuthenticated()
          if (state) { 
            this.getAppInfo()  
          } else {
            this.router.navigate(['folder/login']);
          }
        });
      })
      }

async presentAlertConfirm() {
  let msg:string = 'please set the defualt project and the default finance year , we will redirect you to settings page '
   
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'تأكيد!',
    mode:'ios' ,
    message: msg,
    buttons: [
       {
        text: 'موافق',
        id: 'confirm-button',
        handler: () => {
        //  routing to setting 
        this.router.navigate(['folder/settings']);
        }
      }
    ]
  });

  await alert.present();
}



logOut(){
  this.authenticationService.logout()
}

onClick(event){
  let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  systemDark.addListener(this.colorTest);
  if(event.detail.checked){
    document.body.setAttribute('data-theme', 'dark');
  }
  else{
    document.body.setAttribute('data-theme', 'light');
  }
}

checkhange(ev){
  console.log(ev)
  console.log(ev.target.value)
  document.body.setAttribute('data-theme', 'gray');
}

 colorTest(systemInitiatedDark) {
  if (systemInitiatedDark.matches) {
    document.body.setAttribute('data-theme', 'dark');		
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
}

}
