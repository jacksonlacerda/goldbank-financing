import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  // Interface
  public result: boolean = false;
  public background: string = null;

  // Input Fields
  public propertyValue: number = null;
  public downPayment: number = null;
  public rate: number = null;
  public deadline: number = null;

  // Returned Values
  public rateJuros: number = null;
  public firstInstalment : number = null;
  public lastInstalment : number = null;
  public familyIncome: number = null;
  public amountFinanced: number = null;

  constructor() { }

  ngOnInit(): void {
    // Insert the best image according to screen resolution size
    if(window.innerWidth > 1900){
      this.background = '../assets/img/home-largue.jpg';

    }if((window.innerWidth <= 1900) && (window.innerWidth >= 1025)){
      this.background = '../assets/img/home-medium.jpg';

    }if(window.innerWidth <= 1024){
      this.background = '../assets/img/home-small.jpg';
    }
  }
}
