import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // At the moment we do not have any components in this SharedModule
    // that require directives of CommonModule or ReactiveFormsModule
    // So we did not include them here in the imports array. We can
    // export a module without importing it first
  ],
  declarations: [],
  // Our Employee FeatureModule requires the CommonModule directives
  // such as ngIf, ngFor etc. Similarly, Employee FeatureModule also
  // requires ReactiveFormsModule directives. So export CommonModule
  // and ReactiveFormsModule.
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }