import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms'
import { ServiceService } from '../service.service';
import { projectModel } from './database.model';
import { HttpClient, } from '@angular/common/http'
import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';



@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  formValue_tab: any;
  tableData: any[] = [];
  formValue!: FormGroup;
  detailsdata : any;
  showadd!:boolean;
  showupdate!:boolean;
  showfliter!:boolean;
  searchText : any;
  projectModelObj: projectModel = new projectModel();
  
options = ["Sam", "Varun", "Jasmine"];
options1 = ["Sam1", "Varun1", "Jasmine1"];

  

  filteredOptions:any
  filteredOptions1:any

 constructor(private formbuilder: FormBuilder, private api: ServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Projects: ['', Validators.required],
      Epic: ['', Validators.required],
      Role_Name: ['', Validators.required],
      what: ['', Validators.required],
      why: ['', Validators.required],
      Table_Name: ['', Validators.required],
      Purpose: ['', Validators.required],
      CRUD_NAME: ['', Validators.required],
    })
    this.getalldetails();
 { 
  this.getNames();
  this.initForm();
  // this.getNames1();
  
}}
  initForm(){
     this.formValue.get('Epic')!.valueChanges.subscribe(res=>{
     console.log('epic',res);
    this.filterData(res);
  })}
 filterData(enteredData: string){
  if (this.formValue.get('Epic')){
  this.filteredOptions = this.options.filter(item=>{
    console.log("filterepic",item)
  return item.toLowerCase().indexOf(enteredData.toLowerCase())>-1
  })} }

 getNames(){
   this.api.getdata().subscribe(res=>{
    console.log("apiepic",res)
    this.options = res;
    // this.filteredOptions=res;
   })}
  
getNames1(){this.api.getwhat().subscribe(res=>{
    console.log("apiwhat",res)
    this.options = res;})
    this.formValue.get('Role_Name')!.valueChanges.subscribe(res=>{
      console.log('Role_Name',res);
     this.filterData1(res);
     })}
filterData1(enteredData: string){
       if (this.formValue.get('Role_Name')){
       this.filteredOptions1 = this.options1.filter(item1=>{
         console.log("filterRole_Name",item1)
       return item1.toLowerCase().indexOf(enteredData.toLowerCase())>-1;
       
       
       })
       }}


 
  clickadddetails(){
    console.log("sasas",ThisReceiver)
    this.formValue.reset();   
    this.showadd=true;
    this.showupdate=false;
  }

  postprojectdetails() { 
    this.projectModelObj.Projects = this.formValue.value.Projects;
    this.projectModelObj.Epic = this.formValue.value.Epic;
    this.projectModelObj.Role_Name = this.formValue.value.Role_Name;
    this.projectModelObj.what = this.formValue.value.what;
    this.projectModelObj.why = this.formValue.value.why;
    this.projectModelObj.Table_Name = this.formValue.value.Table_Name;
    this.projectModelObj.Purpose = this.formValue.value.Purpose;
    this.projectModelObj.CRUD_NAME = this.formValue.value.CRUD_NAME;
    if (this.formValue.valid) {
      this.api.postdetails(this.projectModelObj)
        .subscribe({
          next: (res) => {
            console.log(this.projectModelObj);

            alert('details added sucessfully')
            this.formValue.reset
            let ref = document.getElementById('cancel')
            ref?.click();
            
            this.getalldetails()
          },
          error: () => {
            alert("try again!!!!")
          }
        })}}
  getalldetails(){
    this.api.getdetails()
    .subscribe(res=>{
      this.detailsdata = res;
      console.log(this.detailsdata);
    })
  }

  onDelete(id : number){
    this.api.deletePost(id)
    .subscribe({
      next: (res) => {
        alert('details delete sucessfully');}})

    // 
    this.getalldetails();
  }
onEdit(row:any,){
  this.showadd=false;
  this.showupdate=true;
  this.projectModelObj.id = row.id;
  this.formValue.controls['Projects'].setValue(row.Projects);
  this.formValue.controls['Epic'].setValue(row.Epic);
  this.formValue.controls['Role_Name'].setValue(row.Role_Name);
  this.formValue.controls['what'].setValue(row.what);
  this.formValue.controls['why'].setValue(row.why);
  this.formValue.controls['Table_Name'].setValue(row.Table_Name);
  this.formValue.controls['Purpose'].setValue(row.Purpose);
  this.formValue.controls['CRUD_NAME'].setValue(row.CRUD_NAME);
  
};
filter(){
  this.formValue.reset();
  
} 
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  var filval = filterValue.trim().toLowerCase();
  this.detailsdata = this.detailsdata.filter((it: string | string[]) => {
    return it.includes(filval);
  });

}
updateprojectdetails(){
    this.projectModelObj.Projects = this.formValue.value.Projects;
    this.projectModelObj.Epic = this.formValue.value.Epic;
    this.projectModelObj.Role_Name = this.formValue.value.Role_Name;
    this.projectModelObj.what = this.formValue.value.what;
    this.projectModelObj.why = this.formValue.value.why;
    this.projectModelObj.Table_Name = this.formValue.value.Table_Name;
    this.projectModelObj.Purpose = this.formValue.value.Purpose;
    this.projectModelObj.CRUD_NAME = this.formValue.value.CRUD_NAME;
    if (this.formValue.valid) {
    this.api.updatedetails(this.projectModelObj)
    .subscribe({
      next: (res) => {
        console.log(res);

        alert('details update sucessfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset(); 
        this.getalldetails()
      
      error: () => {
        alert("try again");
      }

        }})
  }}
  }
  

 /*deletedetailss(row:any){
  this.api.deletedetails(row.id)
  .subscribe(res=>{
    alert("project details delete sucessfully")
    this.getalldetails();
  })
}
/* deletedetails(id:string){
  this.api.deletedetails(id)
  .subscribe(res=>{
    this.getalldetails();
  })
}*/

// this.api.updatedetails(this.formValue.value,row.id)

  // onDelete(postId: string){
  //   console.log(postId);
  //   this.api.deletePost(postId);
  // }