import { Component, OnInit, ViewChild, ElementRef ,Renderer2,Input} from '@angular/core';
import { FilterPipe } from '../new-case/pipe';
import { FilterPipe2 } from '../new-case/pipe2';
import { FilterPipe3  } from '../new-case/pipe3';
import { Location } from '@angular/common'; 
import { ServicesService } from '../stockService/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastButton, ToastController } from '@ionic/angular';
import { Case } from '../new-case/new-case.page';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NewCourtPage } from '../new-court/new-court.page';
import { NewCaseStatusPage } from '../new-case-status/new-case-status.page';
var ls = window.localStorage;

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.page.html',
  styleUrls: ['./edit-case.page.scss'],
})
export class EditCasePage implements OnInit {
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
  selectedCaseStatus : {id:any ,name:any , status_color:any };
  selectedCaseNagz : {id:any ,name:any };
  selectedCategNagz : {id:any ,name:any };

  //intial values of case interface 
   newCase: Case =  {
    id: 0,
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
    deadline: new Date().toISOString(),
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
    court_id: 0
  }

  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(private modalController : ModalController, private route: ActivatedRoute ,private rout : Router ,private toast :ToastController,private loadingController :LoadingController,private formBuilder: FormBuilder,private _location :Location ,private api:ServicesService ) {
    this.ionicForm = this.formBuilder.group({
    case_title: ['' , Validators.required],
   
    })
    this.getAppInfo()

    this.route.queryParams.subscribe(params => {
      if (params && params.case) {
        this.segVal = JSON.parse(params.segVal)
        console.log('segment',JSON.parse(params.segVal))
        console.log('caseRoute',JSON.parse(params.case))
        this.newCase = JSON.parse(params.case)
        this.selectedType.name = this.newCase.case_type
        this.selectedAgent.name = this.newCase.client_role
        this.selectedServ.name = this.newCase.service_classification
        this.selectedBranch.name = this.newCase.branch
        this.selectedCourt.name = this.newCase.court_name
        this.selectedInvoice.name = this.newCase.billing_type
        this.selectedCost.name = this.newCase.claim_type
        this.newCase.case_status =  this.newCase.case_status
        this.selectedCaseStatus.name = this.newCase['status_name']
        this.selectedCaseStatus.status_color = this.newCase['status_color'] 
        this.selectedCategNagz.name = this.newCase.case_classification_najz
        this.addParam()
      }
    });
  }

  ngOnInit() {
  }


  addParam() {
    this.rout.navigate([],
      {
        queryParams: { case: JSON.stringify(this.newCase) },
         queryParamsHandling: 'merge' // This will keep the existing query params and add the new one 

      }
    );
    console.log('queryParams', this.rout.getCurrentNavigation().extras.queryParams)
  }

  close(){
    this._location.back();
  }

  prepareTeam(){
    this.route.queryParams.subscribe(params => {
      if (params && params.case) {
        let cs = JSON.parse(params.case)
        if (cs['team'].length > 0) {
          console.log('for' , cs['team'])
         //set userArr checked true if in team arr of new case 
          for (let index = 0; index < cs['team'].length; index++) {
            const element = cs['team'][index];
            console.log('id' , element)
               for (let i = 0; i < this.usersArr.length; i++) {
                const element2 = this.usersArr[i];
                if (element2.id == element.id) {
                  element2.checked = true
                  this.selectedLawyersTeamArr.push({
                    user_id:element2.id ,
                    case_id :this.newCase.id ,
                    full_name : element2.full_name 
                  })
                 } 
               } 
          }
          console.log('selectedLawyersTeamArr',  this.selectedLawyersTeamArr , this.usersArr) 
        }

      }
    })
   
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

  saveInvo() {
    console.log('saveInvo')
    this.api.updateCase(this.newCase).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Case Not Updated') { 
      this.deleteCaseLawers() 
      }else{
      this.presentToast('1لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('2لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  deleteCaseLawers() {
    console.log('deleteCaseLawers')
    this.api.deleteCaseLawers(this.newCase.id).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Deleted') {
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
      this.presentToast('3لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('4لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
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

  getCaseStatus(){ 
    this.api.getCaseStatus().subscribe(data =>{
      console.log(data)
      let res = data
      if(data['message'] != 'No case status Found'){ 
        this.caseStatusArr = res['data']
      }   
    }, (err) => {

    } ,
    ()=>{ 
   }
   )  
  }

  saveCaseLawers() {
    console.log('saveInvo' , this.selectedLawyersTeamArr)
    // let arr =[]
    // for (let index = 0; index < this.selectedLawyersTeamArr.length; index++) {
    //   const element = this.selectedLawyersTeamArr[index];
    //   arr.push({
    //     case_id:element.case_Id,
    //     user_id :element.user_id
    //   })
    // }
    console.log('arr' , this.selectedLawyersTeamArr)
    this.api.saveCaseLawyer(this.selectedLawyersTeamArr).subscribe(data => {
      console.log('save',data)
     if(data['message'] != 'Post Not Created') {
     //this.newCase.id = data['message']
     this.presentToast('تم حفظ البيانات بنجاح', 'success')
     this.addParam()
     this.prepareCace()
     this._location.back();
      }else{
      this.presentToast('5لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
      }
    }, (err) => {
      //console.log(err);
      this.presentToast('6لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري', 'danger')
    })
  }

  async presentStatusModal(id?, status?) {
       
    const modal = await this.modalController.create({
      component: NewCaseStatusPage ,
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
        this.doAfterDissmissStatus(dataReturned)
      }
    });
 
    return await modal.present(); 
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

  doAfterDissmissStatus(data){
    if (data.role == 'reload' ) { 
          this.getCaseStatus()
      }   
  }

  prepareCace(){  
    this.caseTypeArr.push(
      {id:1,name:"احوال شخصية"},
      {id:2,name:"تنفيذ"},
      {id:3,name:"جزائية"},
      {id:4,name:"عامة"},
      {id:5,name:"عمالية"},
      {id:6,name:"إنهائات"}
    )

    this.caseTypeArrNagz.push(
      {id:1,name:"احوال شخصية"},
      {id:2,name:"تنفيذ"},
      {id:3,name:"جزائية"},
      {id:4,name:"عامة"},
      {id:5,name:"عمالية"},
      {id:6,name:"إنهائات"}
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
      {id:2,name:"مغلق"}
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
    this.selectedCaseStatus = {id:"",name:"",status_color:""}
    this.selectedCaseNagz = {id:"",name:""}
    this.selectedCategNagz = {id:"",name:""}
    this.ionicForm.reset() 
    this.isSubmitted = false 
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
      } else if(this.newCase.client_role == ""){
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
          this.prepareTeam() 
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
    this.newCase.court_id = item.id
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
      this.newCase.opponent_representative=item.name
        this.didDissmisAgent()
       
      }

      getAppInfo(){ 
        this.prepareCace() 
        this.getTopCustomers()
        this.getLawyers() 
        this.getCourts() 
        this.getCaseStatus() 
      }

  didDissmisBranches( ) {

    this.isOpenBranch = false
    //console.log('dismissOver') 
  }

  selectFromPopBranch(item){
    console.log(item )
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
            case_id :this.newCase.id ,
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
          let flt = this.costumerArr.filter(x=>x.id == this.newCase.client_id)
          console.log('flt custoer',flt)
          this.selectedCustomer = flt[0] 
        }, (err) => {} ,
        ()=>{ 
      }
      )  
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

    
    selectFromPopTypes(item    ){
       
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
          name:item.status_name,
          status_color:item.status_color
        }  
          this.didDissmisCase() 
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

            saveNagz(){
              console.log("save basics")
              this.segVal = 'nagz'
            }
}
