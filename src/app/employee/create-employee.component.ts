import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  

  

// This object contains all the validation messages for this form
validationMessages = {
  'fullName': {
    'required': 'Full Name is required.',
    'minlength': 'Full Name must be greater than 2 characters.',
    'maxlength': 'Full Name must be less than 10 characters.'
  },
  'email': {
    'required': 'Email is required.'
  },
  'skillName': {
    'required': 'Skill Name is required.',
  },
  'experienceInYears': {
    'required': 'Experience is required.',
  },
  'proficiency': {
    'required': 'Proficiency is required.',
  },
};

// This object will hold the messages to be displayed to the user
// Notice, each key in this object has the same name as the
// corresponding form control
formErrors = {
  'fullName': '',
  'email': '',
  'skillName': '',
  'experienceInYears': '',
  'proficiency': ''
};


  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['',[Validators.required]],
      skills: this.fb.group({
        skillName: ['',[Validators.required]],
        experienceInYears: ['',[Validators.required]],
        proficiency: ['',[Validators.required]]
      }),
    });
  }

  logValidationErrors(group:FormGroup):void{
      Object.keys(group.controls).forEach((key:string)=>{
       const abstractControl = group.get(key);
       if(abstractControl instanceof FormGroup){
         this.logValidationErrors(abstractControl);
         
        }
        else{
         abstractControl.markAsDirty();
        }
      });
    }
  onLoadDataClick(): void {
  this.logValidationErrors(this.employeeForm);

  }
  
onSubmit():void{
  console.log(this.employeeForm.value);
}


}
