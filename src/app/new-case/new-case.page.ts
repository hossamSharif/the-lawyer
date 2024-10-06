import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
import { FilterPipe } from './pipe';
import { FilterPipe2 } from './pipe2';
import { FilterPipe3  } from './pipe3';
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavigationExtras, Route, Router } from '@angular/router';
var ls = window.localStorage;

export interface Case {
  id: number;
  case_title: string;
  client_id: number;
  case_type: string;
  client_role: string;
  service_classification: string;
  branch: string;
  court_name: string;
  opponent_name: string;
  opponent_id: number;
  opponent_representative: string;
  case_open_date: String;
  deadline: String;
  billing_type: string;
  claim_type: string;
  work_hour_value: number;
  estimated_work_hours: number;
  case_status: string;
  constraintId_najz: string;
  archive_id_najz: string;
  caseId_najz: string;
  case_classification_najz: string;
  case_open_date_najz: String;
  case_docs: string;
  Plaintiff_Requests: string;
  case_status_najz: string;
  case_subject: string;
}

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.page.html',
  styleUrls: ['./new-case.page.scss'],
})


// Example usage:


export class NewCasePage implements OnInit {
  segVal:string = "basics"
  @ViewChild('popInput') popInput; 
  @ViewChild('popover') popover;
  @ViewChild('popoverNotif') popoverNotif;
  @ViewChild('popoverCase') popoverCase;
  @ViewChild('popoverCaseNagz') popoverCaseNagze;
  @ViewChild('popoverCategNagz') popoverCategNagze;
  @ViewChild('popoverِCustomer') popoverِCustomer;
  @ViewChild('popoverِBranch') popoverِBranch;
  @ViewChild('popoverِِCourt') popoverِِCourt;
  @ViewChild('popoverِِAgent') popoverِِAgent;
  @ViewChild('popoverِِِِCost') popoverِِِِCost;
  @ViewChild('popoverِِِِInvoice') popoverِِِِInvoice;
  @ViewChild('popoverِِِِServClass') popoverِِِِServClass;

 loading:boolean = false
 showEmpty:boolean = false
 sessionsArray:any = []
   isOpenCustType = false ;
   showCustType = false
   usersArr :Array<any> =[]
   selectedLawyersTeamArr :Array<any> =[]
   selectedCustTye : {id:any ,name:any};


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

  isOpen = false; 
  isOpenNotif = false ;
  isOpenCase = false ;
  isOpenCaseNagz = false ;
  isOpenCategNagz = false ;
  searchTerm : any = ""
  aliasTerm :any =""
  searchResult :Array<any> =[]
  costumerArr :Array<any> =[]
  caseTypeArr :Array<any> =[]
  caseTypeArrNagz :Array<any> =[]
  caseCategArrNagz :Array<any> =[]
  caseStatusArr :Array<any> =[]
  aliasResult :Array<any> =[]  
  finalResult :Array<any> =[]
  notifArr : Array<any> =[]
  showNotif = false
  showCase = false
  showCaseNagz = false
  showCategNagz = false
  selectedCustomer : {id:any ,cust_name:any};
  selectedType : {id:any ,name:any };
  selectedCaseStatus : {id:any ,name:any };
  selectedCaseNagz : {id:any ,name:any };
  selectedCategNagz : {id:any ,name:any };

  //intial values of case interface 
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
    case_subject: ''
  }

  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(private rout: Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: FormBuilder,private _location :Location ,private api:ServicesService ) {
    this.ionicForm = this.formBuilder.group({
    case_title: ['' , Validators.required],
    // client_id:  ['' ] ,
    // case_type: ['' ] ,
    // client_role: ['' ] ,
    // service_classification: ['' ] ,
    // branch: ['' ] ,
    // court_name: ['' ] ,
    // opponent_name: ['' ] ,
    // opponent_id: ['' ],
    // opponent_representative: ['' ] ,
    // case_open_date: new  Date,
    // deadline: new Date,
    // billing_type: ['' ] ,
    // claim_type: ['' ] ,
    // work_hour_value: 0,
    // estimated_work_hours: 0,
    // case_status: ['' ] ,
    // constraintId_najz: ['' ] ,
    // archive_id_najz: ['' ] ,
    // caseId_najz: ['' ] ,
    // case_classification_najz: ['' ] ,
    // case_open_date_najz: new Date,
    // case_docs: ['' ] ,
    // Plaintiff_Requests: ['' ] ,
    // case_status_najz: ['' ] ,
    // case_subject: ['' ] 
      // company_phone:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]+$')]],
      // company_name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      // company_email: ['', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // company_ident: ['',Validators.required],
      // company_regno: ['',Validators.required] ,
      // company_represent : ['' , Validators.required]  
    })
    this.getAppInfo()
   
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
      console.log(this.newCase) 
      this.saveInvo() 
    }
  }

  getSessionsByCaseId() {
    this.loading = true 
    this.api.getSessionsByCaseId(this.newCase.id).subscribe(data =>{
      console.log(data)
      let res = data 
      if(res['message'] != 'No Sessions Found'){
        this.sessionsArray = res['data']
      }else{
        this.showEmpty = true
      } 
     
    }, (err) => {
      this.presentToast('خطا في الإتصال حاول مرة اخري' , 'danger')
    } ,
    ()=>{ 
      this.loading = false
  }
  )  
 }  


 getCaseDetails(session){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      session: JSON.stringify(session),
      case : this.newCase 
    }
  }; 
  this.rout.navigate(['edit-session'], navigationExtras);  
 }

 refreshSessions(){
  this.getSessionsByCaseId()
 }

  saveInvo() {
    console.log('saveInvo')
    this.api.saveCase(this.newCase).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Created') {
     this.newCase.id = data['message']
     if (this.selectedLawyersTeamArr.length > 0) {
      this.selectedLawyersTeamArr.forEach(element => {
        element.case_id = this.newCase.id
       });
       this.saveCaseLawers()
     }else{
      this.presentToast('تم حفظ البيانات بنجاح', 'success')
      this.prepareCace()
      this._location.back(); 
     } 
      }else{
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  saveCaseLawers() {
    console.log('saveInvo')
    this.api.saveCaseLawyer(this.selectedLawyersTeamArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     //this.newCase.id = data['message']
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



  prepareCace(){  
    this.caseTypeArr.push(
      {id:1,name:"جنائي"},
      {id:2,name:"تجاري"},
      {id:3,name:"مدني"}
    )

    this.caseTypeArrNagz.push(
      {id:1,name:"جنائي"},
      {id:2,name:"تجاري"},
      {id:3,name:"مدني"}
    )


    this.caseCategArrNagz.push(
      {id:1,name:"تصنيف 1"},
      {id:2,name:"تصنيف 2"},
      {id:3,name:"تصنيف 3"}
    )

  
    this.servArr.push(
      {id:1,name:"مرافعة "},
      {id:2,name:"تنفيذ"} ,
      {id:3,name:"استشارة"}
    )

    this.selectedServ = {id:"",name:""}

    this.caseStatusArr .push(
      {id:1,name:"مفتوح"},
      {id:0,name:"مغلق"}
    ) 

    this.selectedCustTye = {id:1,name:"فرد"}
    
     this.BranchArr.push(
      {id:1,name:"الرياض"},
      {id:2,name:"الدمام"},
      {id:3,name:"القصيم"},
      {id:4,name:"المدينة"}
    )

    this.selectedBranch = {id:"",name:""}
   
    this.invoiceArr.push(
      {id:1,name:"مبلع مقطوع"},
      {id:2,name:"ساعات عمل"} 
     )
    this.selectedInvoice = {id:"",name:""}


     this.courtArr.push(
      {id:1,name:"الرياض"},
      {id:2,name:"الدمام"},
      {id:3,name:"القصيم"},
      {id:4,name:"المدينة"}
      )

     this.selectedCourt = {id:"",name:""}

      this.agentArr.push(
      {id:1,name:"مدعي"},
      {id:2,name:"مدعي عليه"} ,
      {id:3,name:"إدخال  مكتب"} ,
      {id:4,name:"تدخل مكتب"} ,
      {id:5,name:"تحت الدراسة"}  
      )

      this.selectedAgent = {id:"",name:""}

      this.costArr.push(
        {id:1,name:"مطالبة بأجرة"} ,
        {id:2,name:"عين وقف"} ,
        {id:3,name:"تعويض"} ,
        {id:4,name:"إيصال مذايدة"} ,
        {id:5,name:"عربون "} ,
        {id:6,name:"بيع وقف "} ,
        {id:7,name:"أخري"} ,
        {id:8,name:"لا يوجد"} ,
        {id:9,name:"تحت الدراسة"}
       )
    
    this.selectedLawyersTeamArr = []   
    this.selectedCost = {id:"",name:""}
    this.selectedCustomer = {id:"",cust_name:""}
    this.selectedType = {id:"",name:""}
    this.selectedCaseStatus = {id:"",name:""}
    this.selectedCaseNagz = {id:"",name:""}
    this.selectedCategNagz = {id:"",name:""}
    this.selectedServ = {id:"",name:""}
    this.selectedBranch = {id:"",name:""}
    this.selectedInvoice = {id:"",name:""}
    this.selectedCourt = {id:"",name:""}
    this.selectedAgent = {id:"",name:""}
    this.selectedCustTye = {id:1,name:"فرد"}

    this.ionicForm.reset() 
    this.isSubmitted = false 

    this.newCase.case_title = ""
    this.newCase.case_type = ""
    this.newCase.service_classification = ""
    this.newCase.client_role = ""
    this.newCase.client_id = 0
    this.newCase.case_status = ""
    this.newCase.Plaintiff_Requests = ""
    this.newCase.court_name = ""
    this.newCase.caseId_najz = ""
    this.newCase.work_hour_value = 0
    this.newCase.opponent_representative = ""
    this.newCase.constraintId_najz = ""
    this.newCase.archive_id_najz = ""
    this.newCase.case_subject = ""
    this.newCase.opponent_id = 0
    this.newCase.opponent_name = ""

  }

    get errorControl() {
      return this.ionicForm.controls;
    }

      validate(){ 
        this.isSubmitted = true; 
        console.log('validate' , this.isSubmitted , this.newCase.case_title)
        if (this.newCase.case_title == "") { 
          return false
        } else if(this.newCase.client_id == 0){
          return false
        } else if(this.newCase.case_type == ""){
          return false
        } else if(this.newCase.service_classification == ""){
          return false
        }else if(this.newCase.client_role == ""){
          return false
        } else {
          return true
        }  
      }


 getLawyers(){ 
        this.api.getTopUsers().subscribe(data =>{
          console.log(data)
          let res = data
          this.usersArr = res['data']   
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



  presentPopoverAgent(e?: Event) {
    this.popoverِِAgent.event = e;
    console.log('preent me', e)
     this.showAgent = false 
    this.isOpenAgent = true;  
  }


  presentPopoverServ(e?: Event) {
    this.popoverِِِِServClass.event = e;
    console.log('preent me', e)
     this.showServ = false 
    this.isOpenServ = true;  
  }

  presentPopoverCost(e?: Event) {
    this.popoverِِِِCost.event = e;
    console.log('preent me', e)
    this.showCost = false
    this.isOpenCost = true;  
  }

  presentPopoverInvoice(e?: Event) {
    console.log('preent me', e)
    this.showInvoice = false
   this.popoverِِِِInvoice.event = e;
    this.isOpenInvoice = true;  
  }


  presentPopoverCourt(e?: Event) {
    console.log('preent me', e)
    this.showCourt = false
   this.popoverِِCourt.event = e;
    this.isOpenCourt = true;  
  }


  presentPopoverBranches(e?: Event) {
    console.log('preent me', e)
    this.showBranch = false
   this.popoverِBranch.event = e;
    this.isOpenBranch = true;  
  }

  didDissmisCourt( ) {
    this.isOpenCourt = false
    //console.log('dismissOver') 
  }

  didDissmisServ( ) {
    this.isOpenServ = false
    //console.log('dismissOver') 
  }

  didDissmisInvoice( ) {
    this.isOpenInvoice = false
    //console.log('dismissOver') 
  }

  didDissmisCost( ) {
    this.isOpenCost = false
    //console.log('dismissOver') 
  }

  didDissmisAgent( ) {
    this.isOpenAgent = false
    //console.log('dismissOver') 
  }


  selectFromPopServ(item){
    console.log(item )
     this.selectedServ = {
      id:item.id,
      name:item.name
    }   //console.log( this.selectedItem); 
    this.newCase.service_classification = item.name
      this.didDissmisServ()
      //perform calculate here so moataz can get the qty
    }

  selectFromPopCourt(item){
    console.log(item )
     this.selectedCourt = {
      id:item.id,
      name:item.name
    }   //console.log( this.selectedItem);
    this.newCase.court_name = item.name 
      this.didDissmisCourt()
      //perform calculate here so moataz can get the qty
    }

    selectFromPopInvoice(item){
      console.log(item )
      this.newCase.billing_type = item.name
       this.selectedInvoice = {
        id:item.id,
        name:item.name
      }   //console.log( this.selectedItem); 
        this.didDissmisInvoice()
        //perform calculate here so moataz can get the qty
      }

    selectFromPopCost(item){
      console.log(item )
      this.newCase.claim_type = item.name
       this.selectedCost = {
        id:item.id,
        name:item.name
      }   //console.log( this.selectedItem); 
        this.didDissmisCost()
        //perform calculate here so moataz can get the qty
      }

    selectFromPopAgent(item){
      console.log(item )
       this.selectedAgent = {
        id:item.id,
        name:item.name
      }    
      this.newCase.client_role=item.name
        this.didDissmisAgent()
       
      }

      getAppInfo(){ 
        this.prepareCace() 
        this.getTopCustomers()
        this.getLawyers()


      }

  didDissmisBranches( ) {

    this.isOpenBranch = false
    //console.log('dismissOver') 
  }

  selectFromPopBranch(item){
    console.log(item )
    this.newCase.branch = item.name
     this.selectedBranch = {
      id:item.id,
      name:item.name
    } 
     this.newCase.branch = item.name
      //console.log( this.selectedItem); 
      this.didDissmisBranches()
      //perform calculate here so moataz can get the qty
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

    selectFromPopCustTypes(item , index){
      console.log(item ,index)
      // push and pop
      this.selectedCustTye = {
        id:item.id,
        name:item.name
      } 
       
        //console.log( this.selectedItem); 
      //  this.didDissmisCustType()
        //perform calculate here so moataz can get the qty
      }
   

      checkedTeam(event, item ,i ) {
        console.log(event, item ,i )
        let flt = this.selectedLawyersTeamArr.filter(x=>x.user_id == item.id)
        console.log(flt)
        if(event.target.checked == true ){
          this.usersArr[i].checked = true
          if(flt.length == 0){
          this.selectedLawyersTeamArr.push({
            user_id:item.id ,
            case_Id :this.newCase.id ,
            full_name : this.usersArr[i].full_name 
          })
          }
        }else{
          this.usersArr[i].checked = false
          this.selectedLawyersTeamArr.splice(this.selectedLawyersTeamArr.indexOf(item),1)
        } 
        console.log(this.selectedLawyersTeamArr)
      }

      getTopCustomers(){ 
        this.api.getTopCustomers().subscribe(data =>{
          console.log(data)
          let res = data
          this.costumerArr = res['data']   
        }, (err) => {} ,
        ()=>{ 
      }
      )  
     }



    newSessionPage(){
      if(this.newCase.id != null){ 
        let navigationExtras: NavigationExtras = {
          queryParams: {
            team: JSON.stringify(this.selectedLawyersTeamArr) ,
            case: JSON.stringify(this.newCase) 
          }
        }; 
        this.rout.navigate(['/new-session'] , navigationExtras)
      }else{
       this.presentToast('الرجاء حفظ البيانات الأساسية أولاً' ,"danger" ) 
      } 
     }

  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popover.event = e;
     this.isOpen = true;
     this.clear()
     this.searchResult = this.costumerArr
     setTimeout(() => {
     this.setFocusOnInput('popInput')
     }, 2000);
   }

   didDissmis(){
    this.isOpen = false
  }

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

     

     presentPopoverCaseNagz(e?: Event) {
      console.log('preent me', e)
         this.showCaseNagz = false
        this.popoverCaseNagze.event = e;
         this.isOpenCaseNagz = true;
       }

       newSession(){
        
       }

       presentPopoverCategNagz(e?: Event) {
        console.log('preent me', e)
           this.showCategNagz = false
          this.popoverCategNagze.event = e;
           this.isOpenCategNagz = true;
      }
  
  
  
  didDissmisNotif(){
    this.isOpenNotif = false
    //console.log('dismissOver') 
  }
  didDissmisCase(){
    this.isOpenCase = false
    //console.log('dismissOver') 
  }
  didDissmisCaseNagz(){
    this.isOpenCaseNagz = false
    //console.log('dismissOver')
  }
  didDissmisCategNagz(){
    this.isOpenCategNagz = false
    //console.log('dismissOver')
  }
  setFocusOnInput(Input) {
    //console.log('setFocusOnInput')
    // if (Input == 'dst') { 
    //   this.nameField.nativeElement.focus(); 
    //  } else if(Input == 'dstPop') {
    //   this.dstPop.setFocus();
    //   this.isOpen = true;
    //   this.clear()
    //   this.searchResult = this.items
    //   setTimeout(() => {
    //       this.popInput.setFocus(); 
    //   }, 1500);
    
    //  }else if(Input == 'qtyId') {
    //   this.qtyId.setFocus();  
    //  }else
    if(Input == 'popInput'){
     this.popInput.setFocus();  
    }
  }

  selectFromPop(item){
    //console.log(item)
    this.selectedCustomer = {
      id:item.id,
      cust_name:item.cust_name
    }
     this.newCase.client_id = item.id
     this.searchTerm = item.item_name
      //console.log( this.selectedItem); 
      this.didDissmis()
      //perform calculate here so moataz can get the qty
  }

    
    selectFromPopTypes(item){
       
      // Push to arr
      // remove fro Array where index = item.
      
      this.selectedType = {
        id:item.id,
        name:item.name
      } 
       this.newCase.case_type = item.name
        //console.log( this.selectedItem); 
         this.didDissmisNotif()
        //perform calculate here so moataz can get the qty
      }

      selectFromPopCase(item){
        console.log(item)
        this.newCase.case_status = item.id
        this.selectedCaseStatus = {
          id:item.id,
          name:item.name
        } //console.log( this.selectedItem); 
          this.didDissmisCase()
          //perform calculate here so moataz can get the qty
        }

        selectFromPopCaseNagz(item){
          console.log(item)
          this.selectedCaseNagz = {
            id:item.id,
            name:item.name
          }  
            this.didDissmisCaseNagz()   
          }

          selectFromPopCategNagz(item){
            this.newCase.case_classification_najz = item.name
            console.log(item)
            this.selectedCategNagz = {
              id:item.id,
              name:item.name
            }  
              this.didDissmisCategNagz()   
          }


          segmentCHange(event){
            console.log(event.detail.value)
            this.segVal = event.detail.value
            if(this.segVal == 'sessions'){
              if(this.newCase.id){ 
                this.getSessionsByCaseId() 
              }else{
                this.showEmpty = true
              }
            } 
           }

            saveNagz(){
              console.log("save basics")
              this.segVal = 'nagz'
            }
}
