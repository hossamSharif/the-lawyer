import { Component, OnInit,Input } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { ServicesService } from '../stockService/services.service';
@Component({
  selector: 'app-imgodal',
  templateUrl: './imgodal.page.html',
  styleUrls: ['./imgodal.page.scss'],
})
export class ImgodalPage implements OnInit {
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  uploadedFiles
  @Input() item: any;
  @Input() status: any;
  @Input() filterArrayOrign: any;
  @Input() filterArray: any;
  @Input() brandList: any;
  @Input() modelList: any;
  @Input() firstq: any;
  @Input() colSetting: any;
  form: FormGroup;
  uploadResponse;
  segme
  selectedItem : {id:any ,item_name:any,model:any  ,part_no:any  ,min_qty:any ,brand:any,pay_price:any,perch_price:any,item_unit:any,item_desc:any,item_parcode:any,aliasEn:any,tax:any , imgUrl:any};
  firstqObj : {id:any ,item_id:any , store_id:any , quantity :any ,	fq_year:any ,	pay_price:any ,	perch_price:any }
  colSettingpr : {id:any ,item_name:any ,model:any ,part_no:any  ,min_qty:any ,brand:any,pay_price:any,perch_price:any,item_unit:any,item_desc:any,item_parcode:any,profit:any,instock:any,total:any,lastSold:any,edit:any,delete:any,aliasEn:any};
 
  segment :any ='manual'
  price : {payval:any,perchval:any ,type:any, status:any} 
  constructor(private formBuilder: FormBuilder,private loadingController:LoadingController,private api:ServicesService,private modalController: ModalController,private toast :ToastController) {
    this.selectedItem = {id:"" ,item_name:"",model:"",part_no:""  ,min_qty:0 ,brand:"",pay_price:"",perch_price:"",item_unit:"",item_desc:"",item_parcode:"",aliasEn:"" ,tax:0 , imgUrl:""};   
    this.firstqObj = {id:"" ,item_id:"" , store_id:"" , quantity :0 ,	fq_year:"" ,	pay_price:"" ,	perch_price:"" }
    this.colSettingpr = {id:true ,item_name:true ,model:true ,part_no:true  ,min_qty:true ,brand:true,pay_price:true,perch_price:true,item_unit:true,item_desc:true,item_parcode:true,profit:true,instock:true,total:true,lastSold:true,edit:true,delete:true,aliasEn:true};
   
    this.price = {payval:0,perchval:0 ,type: 'pay', status:'plus'}  
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  fileChange(element) {
    //console.log('file', element.target.files[0]['name']);
    this.uploadedFiles = element.target.files[0];
  }
  onChange(event) {
    this.file = event.target.files[0];
 }
  truncateItems(){
    this.presentLoadingWithOptions('uploading ...')
    this.api.truncateItems().subscribe((data) => {
    //console.log(' received is ', data);
    if (data['message'] != 'Post not delete') {
      this.upload()
    } else {
      this.presentToast("خطأ في الإتصال بالسيرفر")
    }
  },(error)=>{ 
    this.presentToast("خطأ في الإتصال بالسيرفر")
  }
  )
   }

   async closeModal() { 
    await this.modalController.dismiss();
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



   upload() {  
    let formData = new FormData();
    formData.append("avatar", this.uploadedFiles);
      // for(let i =0; i < this.uploadedFiles.length; i++){
      // formData.append("files", this.uploadedFiles[i], this.uploadedFiles[i]['name']);
      //   }
    
    console.log(formData)
    this.api.uploadImg(formData).subscribe((response) => {
    console.log('response received is ', response);
      this.loadingController.dismiss()
      this.presentToast('تم الحفظ بنجاح' , 'success')
    },(error)=>{ 
      this.presentToast("خطأ في الإتصال بالسيرفر")
    }
    )
  }

 

  checkstatus(){
    if ( this.status == 'edit') { 
    this.selectedItem = {id:this.item.id ,item_name:this.item.item_name,model:this.item.model,part_no:this.item.part_no  ,min_qty:this.item.min_qty ,brand:this.item.brand,pay_price:this.item.pay_price,perch_price:this.item.perch_price,item_unit:this.item.item_unit,item_desc:this.item.item_desc,item_parcode:this.item.item_parcode, aliasEn:this.item.aliasEn , tax:this.item.tax , imgUrl:this.item.imgUrl}; 
    // this.firstqObj = {id:this.firstq.id ,item_id:this.firstq.item_id,
    //   store_id:this.firstq.store_id,
    //   quantity:this.firstq.quantity  ,
    //   fq_year:this.firstq.fq_year ,
    //   pay_price:this.firstq.pay_price,perch_price:this.firstq.perch_price}; 
     
      } else if (this.status == 'settings'){  
        this.colSettingpr = {id: this.colSetting.id ,item_name:this.colSetting.item_name ,model:this.colSetting.model ,part_no:this.colSetting.part_no  ,min_qty:this.colSetting.min_qty ,brand:this.colSetting.brand,pay_price:this.colSetting.pay_price,perch_price:this.colSetting.perch_price,item_unit:this.colSetting.item_unit,item_desc:this.colSetting.item_desc,item_parcode:this.colSetting.item_parcode,profit:this.colSetting.profit,instock:this.colSetting.instock,total:this.colSetting.total,lastSold:this.colSetting.lastSold,edit:this.colSetting.edit,delete:this.colSetting.delete,aliasEn:this.colSetting.aliasEn};
      }  else if (this.status == 'filter'){  
         this.filterArray = this.filterArrayOrign
         //console.log(this.filterArray)
      }  
   }
   async presentLoadingWithOptions(msg?) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      mode:'ios',
      // duration: 5000,
      message: msg,
      translucent: true,
     // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed with role:', role);
  }

   onUpload() {
    this.loading = !this.loading;
    //console.log(this.file);
    this.api.uploadImg(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') { 
                // Short link via api response
                this.shortLink = event.link; 
                this.loading = false; // Flag variable 
            }
        }
    );
}

onFileSelect(event) {
  console.log(event)
  if (event.target.value.length > 0) {
    const file = event.target.files[0];
    this.form.get('avatar').setValue(file);
  }
}
  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);
    console.log(formData) 
    this.api.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
          console.log(res);
          if(this.uploadResponse.status === 'success'){
            this.update();
          }
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  update(){ 
    this.presentLoadingWithOptions('جاري تعديل البيانات ...')
    this.api.updateItem(this.selectedItem).subscribe(data => {
    //console.log(data)
    if (data['message'] != 'Post Not Updated') {
     this.presentToast('تم التعديل بنجاح' , 'success')

      //   this.getStockItems() 
      
    }else{
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري' , 'danger') 
    }
   
  }, (err) => {
    //console.log(err);
    this.presentToast('لم يتم حفظ البيانات , خطا في الإتصال حاول مرة اخري' , 'danger')
  },() => {
   this.loadingController.dismiss()
 }) 
 }

}
