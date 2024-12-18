import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
import { FilterPipe } from '../new-case/pipe';
import { FilterPipe2 } from '../new-case/pipe2';
import { FilterPipe3  } from '../new-case/pipe3';
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastButton, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Case } from '../new-case/new-case.page';
import { NewCourtPage } from '../new-court/new-court.page';
 


export interface NewSession {
  id: number;
  lawyer_id: number;
  case_id: number;
  session_title: string;
  court_id: number;
  cust_id: number;
  session_date: string; // Use string for date to handle various date formats
  session_time: string; // Use string for time to handle various time formats
  session_type: string;
  opponent_name: string;
  opponent_representative: string;
  session_status: string;
  session_result: string;
  court_name :string;
}

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.page.html',
  styleUrls: ['./new-session.page.scss'],
})

export class NewSessionPage implements OnInit {
  @ViewChild('popInput') popInput; 
  
  
  
  @ViewChild('popoverCaseNagz') popoverCaseNagze;
  @ViewChild('popoverCategNagz') popoverCategNagze;
  @ViewChild('popoverِCustomer') popoverِCustomer;
  @ViewChild('popoverِBranch') popoverِBranch;
  @ViewChild('popoverِِCourt') popoverِِCourt;
  @ViewChild('popoverِِAgent') popoverِِAgent;
  @ViewChild('popoverِِِِCost') popoverِِِِCost;
  @ViewChild('popoverِِِِInvoice') popoverِِِِInvoice;
  @ViewChild('popoverِِِِServClass') popoverِِِِServClass;

   isOpenCustType = false ;
   showCustType = false
   usersArr :Array<any> =[]
   
   selectedCustTye : {id:any ,name:any};

   loadingCase :boolean = false
   isOpenServ = false ;
   showServ = false 
   servArr :Array<any> =[]
   selectedServ : {id:any ,name:any};


   isOpenCost = false ;
   showCost = false 
   costArr :Array<any> =[]
   selectedCost : {id:any ,name:any};

   isOpenInvoice = false ;
   showInvoice = false 
   invoiceArr :Array<any> =[]
   selectedInvoice : {id:any ,name:any};

   isOpenAgent = false ;
   showAgent = false 
   agentArr :Array<any> =[]
   selectedAgent : {id:any ,name:any};


   isOpenBranch = false ;
   showBranch = false
   BranchArr :Array<any> =[] 
   selectedBranch : {id:any ,name:any};

   isOpenCourt = false ;
   showCourt = false
   courtArr :Array<any> =[] 
   selectedCourt : {id:any ,name:any};

  

  
  
  searchTerm : any = ""
  aliasTerm :any =""
  searchResult :Array<any> =[]
  costumerArr :Array<any> =[]
  
 
   
 
  
  
 
  showNotif = false
  showCase = false
 

  selectedUser : {id:any ,full_name:any};
  
  
  


  //
  selectedLawyersTeamArr :Array<any> =[]

  @ViewChild('popoverNotif') popoverNotif;
  selectedType : {id:any ,name:any };
  caseTypeArr :Array<any> =[]
  isOpenNotif = false ;
  caseTypeArrNagz :Array<any> =[]
  
  @ViewChild('popoverCase') popoverCase;
  @ViewChild('popoverCase2') popoverCase2;
  selectedCaseStatus : {id:any ,name:any };
  isOpenCase = false ;
  isOpenCase2 = false ;
  caseStatusArr :Array<any> =[]

  @ViewChild('popover') popover;
  isOpen = false; 
  //new session 
   newSession: NewSession = {
    id: 1,
    lawyer_id: 0,
    case_id: 0,
    court_id:0,
    cust_id: 0,
    session_title: '',
    opponent_name: '',
    opponent_representative: '',
    session_date: new Date().toISOString(),
    session_time:new Date().toISOString(),
    session_type: '',
    session_status: '',
    session_result: '',
    court_name :'',
  };
  showCaseesDepartent: boolean = false
  newCase: Case =  {
    id: null,
    case_title: '',
    client_id: 0,
    case_type: '',
    client_role: '',
    service_classification: '',
    branch: '',
    court_name: '',
    opponent_name: '',
    opponent_id: 0,
    opponent_representative: '',
    case_open_date: new Date().toISOString(),
    deadline: new Date().toISOString() ,
    billing_type: '',
    claim_type: '',
    work_hour_value: 0,
    estimated_work_hours: 0,
    case_status: '',
    constraintId_najz: '',
    archive_id_najz: '',
    caseId_najz: '',
    case_classification_najz: '',
    case_open_date_najz: new Date().toISOString(),
    case_docs: '',
    Plaintiff_Requests: '',
    case_status_najz: '',
    case_subject: '',
    court_id:0
  }
  segVal:any = 'basics'
 searchTermCourt : any = ""
  CasesArray :Array<any> =[]  
  ionicForm: FormGroup;
  isSubmitted = false;
  category:any = 'session';	
  constructor(private modalController :ModalController , private route: ActivatedRoute ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: FormBuilder,private _location :Location ,private api:ServicesService ) {
   
    this.route.queryParams.subscribe(params => { 
      if (params && params.case) {
        console.log('params')
        this.selectedLawyersTeamArr = JSON.parse(params.team) 
        this.newCase = JSON.parse(params.case) 
        this.showCaseesDepartent = false
        console.log('caseesDepartent' , this.showCaseesDepartent)
        this.newSession.cust_id = this.newCase.client_id
        this.newSession.case_id = this.newCase.id
      } else {
        this.showCaseesDepartent = true
        console.log('caseesDepartent not fout' , this.showCaseesDepartent)
        this.getTopCases() 
      
      } 
      });
    
   
    
    this.ionicForm = this.formBuilder.group({
    session_title: ['' , Validators.required],
   
    })

    this.getAppInfo()
  }


  segmentCHange(event){
    console.log(event.detail.value)
    this.segVal = event.detail.value
    if(this.segVal == 'files'){
      if(this.newCase.id){ 
        //this.getSessionsByCaseId() 
      }else{
       // this.showEmpty = true
      }
    } 
   }

  checkIfCase(){
    console.log('caseesDepartent' , this.showCaseesDepartent)
    if(this.newCase.id == null){
      this.getTopCases() 
      console.log('im')
      this.showCaseesDepartent = true
    }else{
      this.showCaseesDepartent = false
    }
  }


  getTopCases() { 
    this.api.getTopCases().subscribe((data: any) => {
      console.log(data)
      if (data['message'] != 'No record Found') {
        this.CasesArray = data['data']
      } else {
       
      }
    }, (err) => {
     // this.presentToast('خطا في الإتصال حاول مرة اخري', 'danger')
    },
      () => {
         
      }
    )
  }


  getCourts(){ 
    this.api.getCourts().subscribe(data =>{
      console.log(data)
      let res = data
      if(data['message'] != 'No courts Found'){ 
        this.courtArr = res['data']
      }   
    }, (err) => {

    } ,
    ()=>{ 
   }
   )  
  }

  selectFromPopCourt(item){
    console.log(item )
     this.selectedCourt = {
      id:item.id,
      name:item.court_name
    } 
      //console.log( this.selectedItem);
      this.newSession.court_id = item.id  
      this.didDissmisCourt()
      //perform calculate here so moataz can get the qty
    }

    didDissmisCourt( ) {
      this.isOpenCourt = false
      //console.log('dismissOver') 
    }
  

  presentPopoverCase2(e?: Event) {
       console.log('preent me', e) 
       this.showCase = false
       this.popoverCase2.event = e;
       this.isOpenCase2 = true;  
     }

  selectFromPopCase2(item){
    console.log(item)
     this.newCase = item
     this.selectedLawyersTeamArr = item.team
     this.newSession.case_id = this.newCase.id
     this.newSession.cust_id = this.newCase.client_id
     this.didDissmisCase2()  
  }
   
  didDissmisCase2(){
    this.isOpenCase2 = false 
  }

  ngOnInit() {
    
  }

  close(){
    this._location.back();
  }


  saveBasics() {
    // let d: Date = this.payInvo.pay_date
    // this.payInvo.sub_name = this.selectedAccount.sub_name
    // this.payInvo.pay_date = this.datePipe.transform(d, 'yyyy-MM-dd')
   
    if (this.validate() == true) {
      this.presentLoadingWithOptions('جاري حفظ البيانات ...')
      console.log(this.newSession) 
      this.saveInvo() 
    }
  }

  saveInvo() {
    console.log('saveInvo')
    this.api.saveSession(this.newSession).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') { 
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.prepareCace() 
      this._location.back();
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }
 

    selectFromPop(item){
      //console.log(item)
      this.selectedUser = {
        id:item.id,
        full_name:item.full_name
      }
      this.newSession.lawyer_id = item.id   
        this.didDissmis()   
    }

    didDissmis(){
      this.isOpen = false
    }


  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popover.event = e;
     this.isOpen = true;
     this.clear()
     this.searchResult = this.costumerArr
     setTimeout(() => {
    
     }, 2000);
   }


   presentPopoverCourt(e?: Event) {
    console.log('preent me', e)
    this.showCourt = false
    this.popoverِِCourt.event = e;
    this.isOpenCourt = true;  
  }


   async presentCourtModal(id?, status?) {
       
    const modal = await this.modalController.create({
      component: NewCourtPage ,
      // componentProps: {
      //   "item": this.selectedItem,
      //   "colSetting": this.colSetting, 
      //   "filterArrayOrign": this.filterArrayOrign, 
      //   "filterArray": this.filterArray, 
      //   "brandList": this.brandList, 
      //   "modelList": this.modelList,  
      //   "status": status
      // }
    });
    
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
         console.log(dataReturned )
        this.doAfterDissmiss(dataReturned)
      }
    });
 
    return await modal.present(); 
  }
 
  doAfterDissmiss(data){
    if (data.role == 'reload' ) { 
          this.getCourts()
      }   
  }

  prepareCace(){  
    this.caseTypeArr.push( 
      {id:1,name:"مرافعة"},
      {id:2,name:"نطق بالحكم"}
    ) 
    this.selectedCourt = {id:"",name:""}
    this.caseStatusArr .push(
      {id:0,name:"جديدة"}, 
      {id:1,name:"منتهية"}
    )  
   // this.selectedLawyersTeamArr = []   
    this.selectedType = {id:"",name:""}
    this.selectedCaseStatus = {id:"",name:""}
    this.selectedUser = {id:0 , full_name :""}
    this.ionicForm.reset() 
    this.isSubmitted = false   
  }

    get errorControl() {
      return this.ionicForm.controls;
    }

      validate(){
        console.log('validate' , this.isSubmitted , this.newSession)
        this.isSubmitted = true; 
        console.log('validate' , this.isSubmitted , this.newSession.session_title)
        if (this.newSession.session_title == "") { 
          return false
        } else if(this.newSession.lawyer_id == 0){
          return false
        } else if(this.newSession.session_type == ""){
          return false
        }else if(this.newSession.cust_id == 0 ){
          return false
        } else {
          return true
        }  
      }


     getLawyers(){ 
      this.api.getTopUsers().subscribe(data =>{
          console.log("'úsers'", data)
          let res = data
          this.usersArr = res['data'] 
          if (this.showCaseesDepartent == false) {
            // for (let index = 0; index < this.usersArr.length; index++) {
            //   const element = this.usersArr[index]; 
            //   let fltr = this.selectedLawyersTeamArr.filter(el => el.id == +element.id)
            //   console.log(fltr ,this.selectedLawyersTeamArr )
            //   if(fltr.length == 0){
            //   console.log('lenght' )
            //    this.usersArr.splice(index, 1);
            //   }
            //  } 
          }  
           console.log("fltUser",this.usersArr)
        }, (err) => {} ,
        ()=>{ 
      }
      )  
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

 

      getAppInfo(){ 
        this.prepareCace()
        this.getCourts() 
      //  this.getTopCustomers()
        this.getLawyers() 
      }

   
    //   getTopCustomers(){ 
    //     this.api.getTopCustomers().subscribe(data =>{
    //       console.log(data)
    //       let res = data
    //       this.costumerArr = res['data']   
    //     }, (err) => {} ,
    //     ()=>{ 
    //   }
    //   )  
    //  }


   

  searchItem(ev){
    this.searchResult = []
    this.aliasTerm = ev.target.value
   
    const filterPipe = new FilterPipe; 
    const filterPipe2 = new FilterPipe2;
    const filterPipe3 = new FilterPipe3 ;

    let  fiteredArr :any
    fiteredArr = filterPipe.transform(this.costumerArr,ev.target.value); 
    
   
    const fiteredArr2 = filterPipe2.transform(this.costumerArr,this.aliasTerm);  
    //console.log('filte',fiteredArr)
    //console.log('fiteredArr2',fiteredArr2)

    if(fiteredArr.length>0){
      fiteredArr.forEach(element => {
        this.searchResult.push( element)
      });
    }

    if(fiteredArr2.length>0){
       fiteredArr2.forEach(element => {
      this.searchResult.push( element)
    });
    }  
  }

  clear(item_name?){
   if(item_name){
    // this.selectedItem = {
    //   id: undefined,
    //   dateCreated: "", 
    //   pay_ref:this.payInvo.pay_ref,
    //   item_desc: "",
    //   item_name: "",
    //   item_unit: "",
    //   parcode: 0,
    //   pay_price: 0,
    //   perch_price: 0,
    //   qty: 0,
    //   tot: 0,
    //   availQty:0,
    //   aliasEn:""
    // }
   }else{
    this.searchTerm = "" 
   }
  }


  presentPopoverNotif(e?: Event) {
  console.log('preent me', e)
     this.showNotif = false
    this.popoverNotif.event = e;
     this.isOpenNotif = true;  
   }

   presentPopoverCase(e?: Event) {
    console.log('preent me', e) 
       this.showCase = false
       this.popoverCase.event = e;
       this.isOpenCase = true;  
     }
 
  
  didDissmisNotif(){
    this.isOpenNotif = false
    //console.log('dismissOver') 
  }


  didDissmisCase(){
    this.isOpenCase = false
    //console.log('dismissOver') 
  }
   
  

 

    
    selectFromPopTypes(item ){
       
      // Push to arr
      // remove fro Array where index = item.
      
      this.selectedType = {
        id:item.id,
        name:item.name
      } 
       this.newSession.session_type = item.name
        //console.log( this.selectedItem); 
         this.didDissmisNotif()
        //perform calculate here so moataz can get the qty
      }

      selectFromPopCase(item){
        console.log(item)
        this.newSession.session_status = item.id
        this.selectedCaseStatus = {
          id:item.id,
          name:item.name
        } //console.log( this.selectedItem); 
          this.didDissmisCase()
          //perform calculate here so moataz can get the qty
        }

        

         
 
}

