import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { FormatWidth } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ISkill } from './ISkill';
import { IEmployee } from './IEmployee';
import { EmployeeService } from './employee.service';


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
      'required': 'Email is required.',
      'emailDomain': 'Email Domain should be gmail.com.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and confirm email doesnt match',

    },

    'confirmEmail': {
      'required': 'Confirm Email is required.',

    },
    'phone': {
      'required': 'Phone is required.',


    }
  };

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {

  };


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeServices: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('gmail.com')]],
        confirmEmail: ['', [Validators.required]]
      }, { validators: matchEmail }),

      phone: ['', Validators.required],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });


    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });


    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      }
    });
  }
  getEmployee(id: number) {
    this.employeeServices.getEmployee(id).subscribe(
    (employee: IEmployee) => this.editEmployee(employee),
    (err: any) => console.log(err)
    );
  }


  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
  }


  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });

  }

  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);


      // Clear the existing validation errors
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && 
        (abstractControl.touched || abstractControl.dirty || abstractControl.value!=='')) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    });
  }
  onLoadDataClick(): void {

    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('male', Validators.required),
    ]);

    const formGroup = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('male', Validators.required),
    ]);

    console.log(formArray1);
    console.log(formGroup);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }
}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (emailControl.value === confirmEmailControl.value || ( confirmEmailControl.pristine && confirmEmailControl.value==='')) {
    return null;
  }
  else {
    return { 'emailMismatch': true };
  }

}

