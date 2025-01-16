import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular'; 
// import { CalendarMode } from 'ionic2-calendar/calendar';
import * as moment from 'moment';
import { ServicesService } from '../stockService/services.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-celander',
  templateUrl: './celander.page.html',
  styleUrls: ['./celander.page.scss'],
})
export class CelanderPage implements OnInit {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    // mode: 'month' as CalendarMode ,
    currentDate: new Date()
  };
   
  tasksArr :Array<any> = [] 
  sessionsArr :Array<any> = [] 
  loading:boolean = false
  showEmpty :boolean = false 

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertController: AlertController,private toast :ToastController,private api:ServicesService ,private rout: Router) {



   }

  ngOnInit() {
    this.getTopTasks() 
  }


  addevent(){
    let d =   moment(new Date())
    let startof = d.endOf('day').toDate()
    console.log(startof)
    this.eventSource =  
      [ 
        // { title: 'kkkkkkkk', startTime: new Date('2024-10-20T00:00:00.000Z').toISOString(), endTime: new Date('2024-10-20T00:00:00.000Z').toISOString(), allDay: true, type: 'session', session: { id: '10', lawyer_id: '2', case_id: '21', cust_id: '3', court_name: '', session_date: '2024-10-20', session_time: '19:59:00', session_type: 'مرافعة', session_title: 'kkkkkkkk', opponent_name: '', opponent_representative: '', session_status: '0', session_result: '', lawyer_name: 'ahmed hommam', customer: 'Michael Smith' }}
        { startTime: moment(new Date()).startOf('day').toDate(), endTime: moment(new Date()).endOf('day').toDate(), title: 'Event 1' , allDay: true},
        // { startTime: new Date(), endTime: new Date(), title: 'Event 1' , allDay: true},
        // { startTime: new Date(), endTime: new Date(new Date().setDate(new Date().getDate())), title: 'Event 2', allDay: true }
      ]
  }

 getTopTasks(){
    this.loading = true 
    this.api.getTopTasks().subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No cases Found'){
        this.tasksArr = res['data']
      }  
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    } ,
    ()=>{
      this.getTopSessions()
     // this.loading = false
  }
  )  
 }

 getTopSessions(){
  this.loading = true 
  this.api.getTopSessions().subscribe(data =>{
    console.log(data)
    let res = data 
    if(res['message'] != 'No cases Found'){
      this.sessionsArr = res['data']
    } 
   
  }, (err) => {
    this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
  } ,
  ()=>{ 
    this.prepareEventsource()
   // this.loading = false
  }
)  
}


  prepareEventsource() {
    this.eventSource = [];
    if (this.sessionsArr.length > 0) {
      this.sessionsArr.forEach(element => {
        this.eventSource.push({ 
          startTime: moment(new Date(element.session_date)).startOf('day').toDate()  ,
          endTime: moment(new Date( element.session_date )).endOf('day').toDate() ,
          title: element.session_title,
          allDay: true ,
          type: 'session' ,
          itemDetails: element
        });
      });
    }
    if (this.tasksArr.length > 0) {
      this.tasksArr.forEach(element => {
        this.eventSource.push({ 
          startTime: moment(new Date(element.due_date)).startOf('day').toDate() ,
          endTime: moment(new Date( element.due_date)).endOf('day').toDate() ,
          title: element.title,
          allDay: true ,
          type: 'task' ,
          itemDetails: element
        });
      });
    }

    console.log(this.eventSource)
    
  }

  getTaskDetails(task){
    console.log(task)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        task: JSON.stringify(task) 
      }
    }; 
    this.rout.navigate(['edit-task'], navigationExtras);  
   }
   
   getSessionDetails(session){
    console.log(session)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        session: JSON.stringify(session)
      }
    };
    this.rout.navigate(['edit-session'], navigationExtras);
   }

    onEventSelected(event: any) {
      console.log('Event selected:', event);
      this.presentAlertConfirm(event); 
    } 

    async presentAlertConfirm(event?) {
      let msg:string = ''
      let text:string   
      if(event.type == 'task'){
        msg = event.title
        text = "مهمة"
      } else if(event.type == 'session'){
        msg = event.title
        text = "جلسة" 
      }
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: text,
        mode:'ios' ,
        message: msg,
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
          
            }
          }, {
            text:'عرض ال'+ text,
            id: 'confirm-button',
            handler: () => {
              if(event.type == 'task'){
                this.getTaskDetails(event.itemDetails)
              }else if(event.type == 'session'){
                this.getSessionDetails(event.itemDetails) 
              } 
            }
          }
        ]
      });

      await alert.present();
    }

  loadPrevious() { 
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  } 
  
  loadNext() {
     const swiper = document.querySelector('.swiper-container')['swiper'];
     swiper.slideNext(); 
  }

  // changeMode(mode: CalendarMode) { 
  //   this.calendar.mode = mode; 
  //   console.log(mode) 
  // }

  onViewTitleChanged(title: string) { 
    this.viewTitle = title; 
  }

  

  onTimeSelected(ev: any) {
     this.selectedDay = ev.selectedTime; 
    }
    
  goToToday() { 
    this.calendar.currentDate = new Date();
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




 

 
  // onEventSelected(event) {
  //   // let start = moment(event.startTime).format('LLLL');
  //   // let end = moment(event.endTime).format('LLLL');

  //   // let alert = this.alertCtrl.create({
  //   //   title: '' + event.title,
  //   //   subTitle: 'From: ' + start + '<br>To: ' + end,
  //   //   buttons: ['OK']
  //   // })
  //   // alert.present();
  // }

  // onTimeSelected(ev) {
  //   this.selectedDay = ev.selectedTime;
  // }
}
