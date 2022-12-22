import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http'
import { map, } from 'rxjs/operators';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  postdetails(data: any) {
    var testres;
    const uri = 'http://127.0.0.1:8000/application/task-Createeeeee/';
    console.log(data);
    return this.http.post<any>( uri, data)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
        testres = res;
      }))

      console.log(testres);
   }
   getdetails(){
    const uri = 'http://127.0.0.1:8000/application/task-last/';

    return this.http.get<any>(uri)
      .pipe(map((res: any) => {
        return res;
    }))
  }
  
  deletePost(data: any){
    console.log(data);
   const uri = ('http://127.0.0.1:8000/application/task-deleteee/')
  
    return this.http.post<any>( uri, data)
    .pipe(map((res: any) => {
      return res;
  }))
}
    //   .subscribe(() => {
  //     console.log('Deleted!');
  //   });
  // }

  updatedetails(data: any){
    
    const uri =('http://127.0.0.1:8000/application/task-updateee/')
    console.log(data);

    return this.http.post<any>( uri, data)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }))}
     getdata(){
        const uri = 'http://127.0.0.1:8000/application/task-epic/';
    
        return this.http.get<any>(uri)
        .pipe(map((res: any) => {
          return res;
      }))
    }
    getwhat(){
      const uri = 'http://127.0.0.1:8000/application/task-Role_Name/';
      
      return this.http.get<any>(uri)
      .pipe(map((res: any) => {
        return res;
    }))
  }
      //     .pipe(map((response:[]) => {
      //       response.map(item => item['Epic']);
      //   }))
      // }
    // return this.http.post<any>( uri,data)
    
    //.subscribe(() => {
      //console.log(data);  
  //     .pipe(map((res: any) => {
  //       console.log(res); 
  //       return res;
  //   }))
  // }
}     