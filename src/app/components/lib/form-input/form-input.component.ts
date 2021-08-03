import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {  ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray } from '@angular/forms';

export const FORM_INPUT_VALUE_ACCESSOR : any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormInputComponent),
  multi: true,
};


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  providers: [FORM_INPUT_VALUE_ACCESSOR],
})

export class FormInputComponent implements ControlValueAccessor {

  @Input()
  label:string;
  
  @Input()
  formControl:FormControl;

  @Input()
  inputType:string;

  @Input()
  optionLabel:string;

  @Input()
  inputData:any;

  @Input()
  size:number = 20;

  onChange;
  onTouched;
  
  inputValue: any;
  inputDisabled: boolean;
  
  constructor() { }
  
  change( $event ) {
      this.onChange($event);
      this.onTouched($event);
  }
  
  writeValue(obj: any){
      this.inputValue = obj;
  }
  
  registerOnChange( fn : any ) : void {
      this.onChange = fn;
  }

  registerOnTouched( fn : any ) : void {
      this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean){
      this.inputDisabled = isDisabled;
  }

}
