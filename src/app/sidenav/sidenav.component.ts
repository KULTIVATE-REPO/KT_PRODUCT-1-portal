import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
// import { pmodel } from './sidenav.model';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  Projectform: any;
  tableData: any[] = [];
  // Project:string = '';
  //proaddmob:pmodel = new pmodel()
  //proaddmob:pmodel = new pmodel()

  constructor(private formbuilder: FormBuilder,) { }

  ngOnInit(): void {
  
    this.Projectform = this.formbuilder.group({
      Project: ['', Validators.required],})
  }
  
  Project(){
    this.Projectform.reset();
  }
  proadd(){
     this.Project = this.Projectform.Validators
  }
}