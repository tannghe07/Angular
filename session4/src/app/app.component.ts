import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

function compare(compareWith: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const str = control.parent?.value[compareWith];
    if (control.value !== str)
      return { 'compare': true }
    else
      return null;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'session4';
  frm: FormGroup;
  user: string = '';
  flag: boolean = false;
  data: any;
  constructor(private fb: FormBuilder){
    this.frm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [compare('password')]]
    })
  }
  login(){
    if(this.frm.invalid){
      this.flag=true;
    }else{
      this.flag=false;
      this.user=this.frm.get('user').value;
      this.data=this.frm.value;
    }
  }
}
