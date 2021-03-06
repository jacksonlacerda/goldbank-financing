import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  // Validation
  public formValues: FormGroup = this.formBuilder.group({
    propertyValue: [ null, Validators.required ],
    downPayment: [ null, Validators.required ],
    deadline: [ null, [ Validators.required, Validators.max(35) ] ],
    rate: [ null, [ Validators.required, Validators.max(20) ] ]
  })

  // Interface
  public result: boolean = false;
  public background: string = null;

  // Input Fields
  public propertyValue: number = null;
  public downPayment: number = null;
  public rate: number = null;
  public deadline: number = null;

  // Variables ValidationDownPayment()
  public valueMin: number = null;
  public valueMax: number = null;
  public validationMin: boolean = true;
  public validationMax: boolean = true;

  // Variables calc()
  public rateCalc: number = null;
  public deadlineCalc: number = null;
  public instalmentCalc: number = null;

  // Returned Values
  public rateJuros: number = null;
  public firstInstalment : number = null;
  public lastInstalment : number = null;
  public familyIncome: number = null;
  public amountFinanced: number = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Insert the best image according to screen resolution size
    if(window.innerWidth > 1900){
      this.background = 'assets/img/home-largue.jpg';

    }if((window.innerWidth <= 1900) && (window.innerWidth >= 1025)){
      this.background = 'assets/img/home-medium.jpg';

    }if(window.innerWidth <= 1024){
      this.background = 'assets/img/home-small.jpg';
    }
  }

  public validationDownPayment(){
    // Down Payment: 20% is the minimum value and 80% is the maximum value
    this.valueMin = this.propertyValue * 0.2;
    this.valueMax = this.propertyValue * 0.8;

    if((this.downPayment >= this.valueMin) || (this.downPayment == null) || (this.downPayment == 0)){
      this.validationMin = true;

      if(this.downPayment <= this.valueMax){
        this.validationMax = true;

      }else{
        this.validationMax = false;

      }
    }else{
      this.validationMin = false;
      
    }
  }

  public calc(){
    // Interface
    this.result = true;

    // Interest Rate
    this.rateJuros = this.rate;

    // Amount to be financed
    this.amountFinanced = this.propertyValue - this.downPayment;

    // First Installment
    this.rateCalc = ( this.rate / 12) / 100;
    this.deadlineCalc = this.deadline * 12;
    this.instalmentCalc = this.amountFinanced / this.deadlineCalc
    this.firstInstalment = ( this.amountFinanced * this.rateCalc ) + this.instalmentCalc;

    // Last Installment
    this.lastInstalment =  ( this.instalmentCalc * this.rateCalc ) + this.instalmentCalc;

    // Gross Monthly Household Income
    this.familyIncome = ( this.firstInstalment * 100 ) / 30;
  }

}
