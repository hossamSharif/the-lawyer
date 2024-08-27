import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FilterPipe } from './pipe';
import { FilterPipe2 } from './pipe2';
import { FilterPipe3  } from './pipe3';
@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.page.html',
  styleUrls: ['./new-consultation.page.scss'],
})
export class NewConsultationPage implements OnInit {
  @ViewChild('popoverNotif') popoverNotif;
  @ViewChild('popover') popover;
  isOpen = false; 
  items :Array<any> =[]
  showCustType = false ;
  searchResult :Array<any> =[]
  aliasTerm :any =""
  isOpenCustType = false ;
 
  custTypeArr :Array<any> =[]
  selectedCustTye : {id:any ,name:any};

   searchTerm : any = ""
   selectedItem : {id:any ,name:any};
  constructor(private _location : Location , private rout : Router) {
    this.items.push(
      {id:1,name:"خالد المالكي"},
      {id:2,name:"محمد المالكي"},
      {id:3,name:"فهد المالكي"}
    )
    this.selectedItem = {id:"",name:""}
    this.custTypeArr.push(
      {id:1,name:"فرد"},
      {id:2,name:"شركة"}
    )
    this.selectedCustTye = {id:1,name:"فرد"}
   }

  ngOnInit() {
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


  presentPopover(e?: Event) {
    //console.log('preent me', e)
     this.popover.event = e;
     this.isOpen = true;
    // this.clear()
     this.searchResult = this.items
     setTimeout(() => {
   //  this.setFocusOnInput('popInput')
     }, 2000);
   }
  
 
    didDissmis(){
      this.isOpen = false
      //console.log('dismissOver')
      // this.getItemPaysByItemId()
      // this.setFocusOnInput('qtyId')
    }

    selectFromPop(item){
      //console.log(item)
      this.selectedItem = {
        id:item.id,
        name:item.name
      } 
       this.searchTerm = item.item_name
        //console.log( this.selectedItem); 
        this.didDissmis()
       
      }

      searchItem(ev){
        this.searchResult = []
        this.aliasTerm = ev.target.value
       
        const filterPipe = new FilterPipe; 
        const filterPipe2 = new FilterPipe2;
        const filterPipe3 = new FilterPipe3 ;
    
        let  fiteredArr :any
        fiteredArr = filterPipe.transform(this.items,ev.target.value); 
        
       
        const fiteredArr2 = filterPipe2.transform(this.items,this.aliasTerm);  
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


      save(){
        
      }
}
