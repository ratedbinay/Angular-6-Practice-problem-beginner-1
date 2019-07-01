import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { Router } from '@angular/router';
import { ISkill } from './ISkill';
  import { from } from 'rxjs';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee[];

  constructor(private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe(
      (employeeList) => this.employees = employeeList,
      (err) => console.log(err)
    );
  }

  editButtonClick(employeeId: number) {
    this._router.navigate(['/edit', employeeId]);
  }

}