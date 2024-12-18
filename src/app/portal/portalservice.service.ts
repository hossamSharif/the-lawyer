import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Platform } from '@ionic/angular';
//import { environment } from '../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
//import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PortalserviceService {
  api = 'http://localhost/adalaapi/myapi/api/'
  //api :any =  'https://hossam.gvstech.net/adalaapi/myapi/api/'
 
 
   constructor(public http: HttpClient ) {
   
    }

    login(user){ 
      //console.log(user)
      let params = new HttpParams() 
      params= params.append('email' , user.email )
      params= params.append('password' , user.password) 
    //  params=params.append('level' , 'user')
      return this.http.get(this.api+'subUsers/login.php',{params: params})
    } 

}
